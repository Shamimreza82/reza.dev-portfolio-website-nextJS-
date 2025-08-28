"use client";

import React, { useEffect, useRef } from "react";

/** Quality presets */
type Quality = "low" | "med" | "high";

type Props = {
  className?: string;
  /** 0..1 positions (fractions of width/height) */
  sunPos?: [number, number];
  galaxyPos?: [number, number];
  /** Sun base radius in px (scaled on resize) */
  sunRadius?: number;
  /** Galaxy rotation (radians/sec) */
  galaxyRotation?: number;
  /** Visual quality */
  quality?: Quality;
  /** Global bloom strength (0..1.5) */
  bloom?: number;
  /** Parallax strength in px */
  parallax?: number;
  /** Disable planets for cleaner scene */
  planets?: boolean;
};

export default function CosmosRealistic({
  className = "",
  sunPos = [0.26, 0.58],
  galaxyPos = [0.68, 0.42],
  sunRadius = 95,
  galaxyRotation = 0.12,
  quality = "med",
  bloom = 0.9,
  parallax = 18,
  planets = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, has: false });

  // offscreen caches
  const sunTexRef = useRef<HTMLCanvasElement | null>(null);
  const coronaTexRef = useRef<HTMLCanvasElement | null>(null);
  const galaxyTexRef = useRef<HTMLCanvasElement | null>(null);
  const dustMaskRef = useRef<HTMLCanvasElement | null>(null);
  const starFieldRef = useRef<HTMLCanvasElement | null>(null);

  // sizes (update on resize)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  /** Utility: create an offscreen canvas */
  const make = (w: number, h: number) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  };

  /** Simple 2D noise (value noise) */
  const noise2D = (x: number, y: number, seed = 1337) => {
    const s = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return s - Math.floor(s);
  };

  /** FBM (fractal brownian motion) from value noise */
  const fbm = (x: number, y: number, oct = 5, seed = 1337) => {
    let v = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < oct; i++) {
      v += noise2D(x * freq, y * freq, seed + i * 123.45) * amp;
      amp *= 0.5;
      freq *= 2;
    }
    return v;
  };

  /** Build the Sun (photosphere + limb darkening + granulation) */
  const buildSunTexture = (R: number) => {
    const d = Math.ceil(R * 2);
    const c = make(d, d);
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(d, d);
    const cx = R, cy = R;

    for (let j = 0; j < d; j++) {
      for (let i = 0; i < d; i++) {
        const dx = i - cx, dy = j - cy;
        const rr = Math.sqrt(dx * dx + dy * dy);
        const idx = (j * d + i) * 4;

        if (rr <= R) {
          const r01 = rr / R;

          // Limb darkening (intensity falls near edge)
          const limb = 1 - Math.pow(r01, 1.8);

          // Granulation via fbm
          const n = fbm(i / 90, j / 90, 5, 99) * 0.8 + fbm(i / 20, j / 20, 2, 221) * 0.2;
          const gran = 0.85 + (n - 0.5) * 0.18;

          // Base temperature color ramp: hot center -> orange rim
          const t = limb * gran;
          const r = Math.min(255, Math.floor(255 * (0.96 + 0.08 * t)));
          const g = Math.min(255, Math.floor(210 + 50 * t));
          const b = Math.min(255, Math.floor(90 + 40 * t));

          img.data[idx + 0] = r;
          img.data[idx + 1] = g;
          img.data[idx + 2] = b;
          img.data[idx + 3] = 255;
        } else {
          img.data[idx + 3] = 0;
        }
      }
    }

    ctx.putImageData(img, 0, 0);
    sunTexRef.current = c;
  };

  /** Build corona bloom (soft) */
  const buildCoronaTexture = (R: number, strength: number) => {
    const d = Math.ceil(R * 5); // big halo
    const c = make(d, d);
    const ctx = c.getContext("2d")!;
    const cx = d / 2, cy = d / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, d / 2);
    grad.addColorStop(0, `rgba(255,220,130,${0.35 * strength})`);
    grad.addColorStop(0.4, `rgba(255,170,70,${0.18 * strength})`);
    grad.addColorStop(1, "rgba(255,150,40,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, d, d);
    coronaTexRef.current = c;
  };

  /** Build star field for background depth */
  const buildStarField = (w: number, h: number, density: number) => {
    const c = make(w, h);
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);

    const count = Math.floor((w * h * density) / 14000);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      // color temperature variation
      const t = Math.random();
      // warm white to cool blue-white
      const r = Math.floor(200 + 55 * (1 - t * 0.6));
      const g = Math.floor(210 + 45 * (1 - t * 0.4));
      const b = Math.floor(230 + 25 * t);
      const a = 0.6 + Math.random() * 0.4;

      const sz = Math.random() < 0.95 ? Math.random() * 1.4 + 0.3 : Math.random() * 2.4 + 0.8;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${r},${g},${b},${a})`;
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.beginPath();
      ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    starFieldRef.current = c;
  };

  /** Build a galaxy texture (bulge + arms + color gradient) and a dust mask */
  const buildGalaxy = (w: number, h: number, quality: Quality) => {
    const c = make(w, h);
    const ctx = c.getContext("2d")!;
    const cx = w / 2, cy = h / 2;

    // Parameters based on quality
    const arms = 4;
    const maxR = Math.min(w, h) * 0.48;
    const armStars =
      quality === "high" ? 26000 : quality === "med" ? 18000 : 11000;
    const bulgeStars = Math.floor(armStars * 0.08);

    ctx.clearRect(0, 0, w, h);

    // Bulge glow (yellowish core → whiter outer)
    const bulge = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.5);
    bulge.addColorStop(0, "rgba(255,230,150,0.55)");
    bulge.addColorStop(0.5, "rgba(240,210,160,0.25)");
    bulge.addColorStop(1, "rgba(180,180,200,0)");
    ctx.fillStyle = bulge;
    ctx.fillRect(0, 0, w, h);

    // Draw bulge stars densely near center
    for (let i = 0; i < bulgeStars; i++) {
      const r = Math.pow(Math.random(), 1.5) * maxR * 0.25;
      const a = Math.random() * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      const sz = Math.random() * 1.4 + 0.3;
      ctx.fillStyle = `rgba(${240 + Math.random() * 15},${220 + Math.random() * 20},${170 + Math.random() * 30},0.9)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255,230,180,0.8)";
      ctx.beginPath();
      ctx.arc(x, y, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Spiral arms: r = a * e^(b * theta)
    // We'll sample points along multiple arms with jitter, with color shift toward bluish on outer disk
    const a = 2.0;
    const b = 0.22; // arm tightness
    for (let arm = 0; arm < arms; arm++) {
      const armOffset = (arm / arms) * Math.PI * 2;
      for (let i = 0; i < armStars / arms; i++) {
        // theta range to fill disk
        const theta = (Math.random() * 5.4 + 0.4) * (Math.random() < 0.5 ? 1 : -1);
        let r = a * Math.exp(b * Math.abs(theta));
        r = (r / (a * Math.exp(b * 6))) * maxR; // normalize
        // skip too large
        if (r > maxR) continue;

        // add jitter along and across the arm
        const along = (Math.random() - 0.5) * (maxR * 0.015);
        const across = (Math.random() - 0.5) * (1.2 + r / maxR) * 10;

        const T = theta + armOffset + along / 200;
        const x = cx + Math.cos(T) * r + Math.cos(T + Math.PI / 2) * across;
        const y = cy + Math.sin(T) * r + Math.sin(T + Math.PI / 2) * across;

        // color: inner warm → outer blue
        const t = r / maxR;
        const rC = Math.floor(230 - 60 * t);
        const gC = Math.floor(235 - 40 * t);
        const bC = Math.floor(255 - 5 * t + 60 * t); // more blue outward
        const alpha = 0.75 - t * 0.35 + Math.random() * 0.2;
        const sz = (quality === "high" ? 1.1 : 0.9) * (Math.random() * 1.2 + (t < 0.2 ? 0.7 : 0.4));

        ctx.fillStyle = `rgba(${rC},${gC},${bC},${alpha})`;
        ctx.shadowBlur = 6 * (1 - t);
        ctx.shadowColor = `rgba(${rC},${gC},${bC},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, sz, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;

    // Dust mask: noisy, feathered lanes that we will multiply over galaxy to darken regions
    const dust = make(w, h);
    const dctx = dust.getContext("2d")!;
    const dimg = dctx.createImageData(w, h);
    const scale = quality === "high" ? 1 / 260 : quality === "med" ? 1 / 200 : 1 / 140;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const nx = x - cx, ny = y - cy;
        const rr = Math.sqrt(nx * nx + ny * ny);
        const t = rr / maxR;
        // heavier dust in mid-disk, less in bulge and outskirts
        const ring = Math.max(0, 1 - Math.abs(t - 0.55) * 3);
        const n = fbm(x * scale, y * scale, 4, 777);
        const v = (0.35 + n * 0.65) * ring;
        const shade = Math.floor(255 * (1 - v * 0.55));
        const idx = (y * w + x) * 4;
        dimg.data[idx + 0] = shade;
        dimg.data[idx + 1] = shade;
        dimg.data[idx + 2] = shade;
        dimg.data[idx + 3] = Math.floor(255 * (0.35 + ring * 0.45));
      }
    }
    dctx.putImageData(dimg, 0, 0);

    galaxyTexRef.current = c;
    dustMaskRef.current = dust;
  };

  /** Resize + rebuild textures */
  const resizeAll = () => {
    const canvas = canvasRef.current!;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const { clientWidth: W, clientHeight: H } = canvas;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w: W, h: H, dpr };

    // build textures at logical sizes (no DPR upscaling needed because we set transform)
    const sunR = Math.min(W, H) * (sunRadius / 800 * 8); // gentle scaling relative to viewport
    buildSunTexture(sunR);
    buildCoronaTexture(sunR, Math.max(0, Math.min(1.5, bloom)));

    // background star field
    buildStarField(W, H, quality === "high" ? 1 : quality === "med" ? 0.8 : 0.6);

    // galaxy canvas ~ 70% of min dimension
    const gSize = Math.floor(Math.min(W, H) * 0.95);
    buildGalaxy(gSize, gSize, quality);
  };

  /** Main draw */
  const draw = (tNow: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { w, h } = sizeRef.current;

    if (!startRef.current) startRef.current = tNow;
    const t = (tNow - startRef.current) / 1000; // seconds

    // clear + faint space gradient
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "rgba(0,10,20,0.75)");
    bg.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // subtle background stars
    if (starFieldRef.current) {
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(starFieldRef.current, 0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    }

    const nx = mouseRef.current.has ? (mouseRef.current.x / w) * 2 - 1 : 0;
    const ny = mouseRef.current.has ? (mouseRef.current.y / h) * 2 - 1 : 0;

    // positions with parallax
    const sunX = w * sunPos[0] - nx * parallax * 0.5;
    const sunY = h * sunPos[1] - ny * parallax * 0.5;

    const galX = w * galaxyPos[0] + nx * parallax * 0.7;
    const galY = h * galaxyPos[1] + ny * parallax * 0.7;

    // --- Draw Galaxy (rotating)
    if (galaxyTexRef.current && dustMaskRef.current) {
      const g = galaxyTexRef.current;
      const d = dustMaskRef.current;
      const gW = g.width, gH = g.height;

      ctx.save();
      ctx.translate(galX, galY);
      ctx.rotate(t * galaxyRotation);

      // base galaxy
      ctx.globalAlpha = 0.95;
      ctx.drawImage(g, -gW / 2, -gH / 2);

      // apply dust lanes via multiply (darkening)
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.9;
      ctx.drawImage(d, -gW / 2, -gH / 2);

      // gentle bloom (screen) by drawing again blurred by scaling
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.35 * bloom;
      ctx.filter = "blur(6px)";
      ctx.drawImage(g, -gW / 2, -gH / 2);
      ctx.filter = "none";

      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }

    // --- Draw Sun (core + corona + animated prominences)
    if (sunTexRef.current && coronaTexRef.current) {
      const s = sunTexRef.current;
      const c = coronaTexRef.current;

      // corona
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = Math.min(1, 0.8 * bloom);
      const cr = c.width / 2;
      ctx.drawImage(c, sunX - cr, sunY - cr);

      // rotating tiny turbulence to give living corona feel
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(Math.sin(t * 0.35) * 0.06);
      ctx.globalAlpha = 0.25 * bloom;
      ctx.filter = "blur(8px)";
      ctx.drawImage(s, -s.width / 2, -s.height / 2, s.width * 1.25, s.height * 1.25);
      ctx.filter = "none";
      ctx.restore();

      // photosphere (sharp)
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(s, sunX - s.width / 2, sunY - s.height / 2);

      // prominences (animated arcs)
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(t * 0.12);
      const promCount = 9;
      for (let i = 0; i < promCount; i++) {
        const ang = (i / promCount) * Math.PI * 2 + Math.sin(t * 0.6 + i) * 0.08;
        const r = (s.width / 2) * (1.02 + (Math.sin(t * 1.7 + i) + 1) * 0.06);
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;

        ctx.strokeStyle = "rgba(255,180,80,0.28)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, 18 + Math.sin(t * 2.1 + i) * 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // optional planets (kept minimal for realism)
    if (planets) {
      const orbit = Math.min(w, h) * 0.18;
      const ang = t * 0.4;
      const px = sunX + Math.cos(ang) * orbit;
      const py = sunY + Math.sin(ang) * orbit;

      // orbit path
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sunX, sunY, orbit, 0, Math.PI * 2);
      ctx.stroke();

      // planet
      ctx.fillStyle = "rgba(150,180,255,0.95)";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      // tiny specular
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(px - 1.2, py - 1.2, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const handleResize = () => resizeAll();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, has: true };
    };
    const onLeave = () => (mouseRef.current.has = false);

    resizeAll();
    startRef.current = 0;
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sunPos[0], sunPos[1], galaxyPos[0], galaxyPos[1], sunRadius, galaxyRotation, quality, bloom, parallax, planets]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
