/* eslint-disable @typescript-eslint/no-explicit-any */
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

type Tex = {
  canvas: HTMLCanvasElement;
  bitmap?: ImageBitmap; // fast path when supported
};

const rIC =
  (typeof window !== "undefined" &&
    (window as any).requestIdleCallback?.bind(window)) ||
  ((cb: (d: { didTimeout: boolean; timeRemaining: () => number }) => void) =>
    setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 0));

const cIC =
  (typeof window !== "undefined" &&
    (window as any).cancelIdleCallback?.bind(window)) || clearTimeout;

/** Simple 2D value noise */
const noise2D = (x: number, y: number, seed = 1337) => {
  const s = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return s - Math.floor(s);
};
/** FBM from value noise */
const fbm = (x: number, y: number, oct = 5, seed = 1337) => {
  let v = 0,
    amp = 0.5,
    freq = 1;
  for (let i = 0; i < oct; i++) {
    v += noise2D(x * freq, y * freq, seed + i * 123.45) * amp;
    amp *= 0.5;
    freq *= 2;
  }
  return v;
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
  const idleBuildRef = useRef<number | null>(null);

  // offscreen caches
  const sunTexRef = useRef<Tex | null>(null);
  const sunGlowRef = useRef<Tex | null>(null);
  const coronaTexRef = useRef<Tex | null>(null);
  const galaxyTexRef = useRef<Tex | null>(null);
  const galaxyBloomRef = useRef<Tex | null>(null);
  const dustMaskRef = useRef<Tex | null>(null);
  const starFieldRef = useRef<Tex | null>(null);
  const starSpriteWarmRef = useRef<HTMLCanvasElement | null>(null);
  const starSpriteCoolRef = useRef<HTMLCanvasElement | null>(null);

  // sizes (update on resize)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  // planets preset (more variety)
  const planetsRef = useRef<
    {
      orbit: number;
      size: number;
      speed: number; // radians/sec
      phase: number;
      color: string;
      ring?: boolean;
    }[]
  >([]);

  /** Utility: create an offscreen canvas */
  const make = (w: number, h: number) => {
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.floor(w));
    c.height = Math.max(1, Math.floor(h));
    return c;
  };

  const toBitmap = async (c: HTMLCanvasElement): Promise<Tex> => {
    try {
      if ("createImageBitmap" in window) {
        const bmp = await createImageBitmap(c);
        return { canvas: c, bitmap: bmp };
      }
    } catch {
      // ignore
    }
    return { canvas: c };
  };

  const disposeTex = (t?: Tex | null) => {
    if (!t) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      t.bitmap && "close" in t.bitmap && (t.bitmap as any).close?.();
    } catch {
      /* noop */
    }
  };

  /** Star sprite (radial gradient circle) for cheap stamping */
  const buildStarSprite = (size = 6, warm = true) => {
    const c = make(size, size);
    const ctx = c.getContext("2d")!;
    const r = size / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    if (warm) {
      grad.addColorStop(0, "rgba(255,240,200,1)");
      grad.addColorStop(0.6, "rgba(255,220,170,0.8)");
      grad.addColorStop(1, "rgba(255,220,170,0)");
    } else {
      grad.addColorStop(0, "rgba(220,235,255,1)");
      grad.addColorStop(0.6, "rgba(200,220,255,0.8)");
      grad.addColorStop(1, "rgba(200,220,255,0)");
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return c;
  };

  /** Build the Sun (photosphere + limb darkening + granulation) */
  const buildSunTexture = async (R: number) => {
    const d = Math.ceil(R * 2);
    const c = make(d, d);
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(d, d);
    const cx = R,
      cy = R;

    for (let j = 0; j < d; j++) {
      for (let i = 0; i < d; i++) {
        const dx = i - cx,
          dy = j - cy;
        const rr = Math.hypot(dx, dy);
        const idx = (j * d + i) * 4;

        if (rr <= R) {
          const r01 = rr / R;
          const limb = 1 - Math.pow(r01, 1.8);
          const n =
            fbm(i / 90, j / 90, 5, 99) * 0.8 + fbm(i / 20, j / 20, 2, 221) * 0.2;
          const gran = 0.85 + (n - 0.5) * 0.18;

          const t = limb * gran;
          const rrC = Math.min(255, Math.floor(255 * (0.96 + 0.08 * t)));
          const gC = Math.min(255, Math.floor(210 + 50 * t));
          const bC = Math.min(255, Math.floor(90 + 40 * t));

          img.data[idx + 0] = rrC;
          img.data[idx + 1] = gC;
          img.data[idx + 2] = bC;
          img.data[idx + 3] = 255;
        } else {
          img.data[idx + 3] = 0;
        }
      }
    }

    ctx.putImageData(img, 0, 0);
    disposeTex(sunTexRef.current);
    sunTexRef.current = await toBitmap(c);

    // pre-blurred “glow” (so we never use ctx.filter per-frame)
    const glow = make(Math.ceil(d * 1.25), Math.ceil(d * 1.25));
    const gctx = glow.getContext("2d")!;
    gctx.imageSmoothingQuality = "high";
    // one-time filter usage (off main loop)
    gctx.filter = "blur(8px)";
    gctx.globalAlpha = 0.25 * bloom;
    gctx.drawImage(c, (glow.width - d) / 2, (glow.height - d) / 2);
    gctx.filter = "none";
    disposeTex(sunGlowRef.current);
    sunGlowRef.current = await toBitmap(glow);
  };

  /** Build corona bloom (soft), once */
  const buildCoronaTexture = async (R: number, strength: number) => {
    const d = Math.ceil(R * 5);
    const c = make(d, d);
    const ctx = c.getContext("2d")!;
    const cx = d / 2,
      cy = d / 2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, d / 2);
    grad.addColorStop(0, `rgba(255,220,130,${0.35 * strength})`);
    grad.addColorStop(0.4, `rgba(255,170,70,${0.18 * strength})`);
    grad.addColorStop(1, "rgba(255,150,40,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, d, d);
    disposeTex(coronaTexRef.current);
    coronaTexRef.current = await toBitmap(c);
  };

  /** Build star field using star sprites (fast) */
  const buildStarField = async (w: number, h: number, density: number) => {
    const c = make(w, h);
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, w, h);

    const count = Math.floor((w * h * density) / 14000);
    const warm = starSpriteWarmRef.current!;
    const cool = starSpriteCoolRef.current!;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const t = Math.random();
      const a = 0.6 + Math.random() * 0.4;
      const sprite = t < 0.55 ? cool : warm;
      const sz =
        Math.random() < 0.95
          ? Math.random() * 1.4 + 0.3
          : Math.random() * 2.4 + 0.8;
      const s = Math.max(2, Math.min(8, Math.floor(sz * 4)));
      ctx.globalAlpha = a;
      ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    disposeTex(starFieldRef.current);
    starFieldRef.current = await toBitmap(c);
  };

  /** Build a galaxy texture and a pre-blurred bloom copy + dust mask */
  const buildGalaxy = async (w: number, h: number, q: Quality) => {
    const c = make(w, h);
    const ctx = c.getContext("2d")!;
    const cx = w / 2,
      cy = h / 2;

    const arms = 4;
    const maxR = Math.min(w, h) * 0.48;

    // tuned counts: preserve look, fewer draw ops by sprite stamping
    const armStars = q === "high" ? 20000 : q === "med" ? 14000 : 9000;
    const bulgeStars = Math.floor(armStars * 0.08);

    // bulge glow
    const bulge = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.5);
    bulge.addColorStop(0, "rgba(255,230,150,0.55)");
    bulge.addColorStop(0.5, "rgba(240,210,160,0.25)");
    bulge.addColorStop(1, "rgba(180,180,200,0)");
    ctx.fillStyle = bulge;
    ctx.fillRect(0, 0, w, h);

    // star sprites for galaxy
    const starSmall = starSpriteCoolRef.current!;
    const starWarm = starSpriteWarmRef.current!;

    // bulge stars
    for (let i = 0; i < bulgeStars; i++) {
      const r = Math.pow(Math.random(), 1.5) * maxR * 0.25;
      const a = Math.random() * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      const s = (Math.random() * 1.2 + 0.5) * (q === "high" ? 5 : 4);
      ctx.globalAlpha = 0.85;
      ctx.drawImage(starWarm, x - s / 2, y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;

    // Spiral arms
    const aConst = 2.0;
    const b = 0.22;
    for (let arm = 0; arm < arms; arm++) {
      const armOffset = (arm / arms) * Math.PI * 2;
      for (let i = 0; i < armStars / arms; i++) {
        const theta =
          (Math.random() * 5.4 + 0.4) * (Math.random() < 0.5 ? 1 : -1);
        let r = aConst * Math.exp(b * Math.abs(theta));
        r = (r / (aConst * Math.exp(b * 6))) * maxR;
        if (r > maxR) continue;

        const along = (Math.random() - 0.5) * (maxR * 0.012);
        const across = (Math.random() - 0.5) * (1.2 + r / maxR) * 8;

        const T = theta + armOffset + along / 200;
        const x = cx + Math.cos(T) * r + Math.cos(T + Math.PI / 2) * across;
        const y = cy + Math.sin(T) * r + Math.sin(T + Math.PI / 2) * across;

        const t = r / maxR;
        const s = (q === "high" ? 5 : 4) * (Math.random() * 0.9 + 0.5);
        ctx.globalAlpha = 0.75 - t * 0.35 + Math.random() * 0.15;
        ctx.drawImage(starSmall, x - s / 2, y - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;

    // Dust mask (grayscale with alpha) once
    const dust = make(w, h);
    const dctx = dust.getContext("2d")!;
    const dimg = dctx.createImageData(w, h);
    const scale = q === "high" ? 1 / 260 : q === "med" ? 1 / 200 : 1 / 140;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const nx = x - cx,
          ny = y - cy;
        const rr = Math.hypot(nx, ny);
        const t = rr / maxR;
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

    // pre-blurred bloom copy (one-time)
    const bloomC = make(w, h);
    const bctx = bloomC.getContext("2d")!;
    bctx.filter = "blur(6px)";
    bctx.globalAlpha = Math.max(0, Math.min(1, 0.35 * bloom));
    bctx.drawImage(c, 0, 0);
    bctx.filter = "none";
    bctx.globalAlpha = 1;

    disposeTex(galaxyTexRef.current);
    disposeTex(galaxyBloomRef.current);
    disposeTex(dustMaskRef.current);
    galaxyTexRef.current = await toBitmap(c);
    galaxyBloomRef.current = await toBitmap(bloomC);
    dustMaskRef.current = await toBitmap(dust);
  };

  /** Resize + rebuild textures progressively */
  const resizeAll = () => {
    const canvas = canvasRef.current!;
    const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
    const { clientWidth: W, clientHeight: H } = canvas;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    }) as CanvasRenderingContext2D;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w: W, h: H, dpr };

    // star sprites (build once per resize to scale nicely)
    starSpriteWarmRef.current = buildStarSprite(16, true);
    starSpriteCoolRef.current = buildStarSprite(16, false);

    // Scale sun relative to viewport (keeps your prop semantics)
    const minDim = Math.min(W, H);
    const sunR = Math.max(30, Math.round((sunRadius * minDim) / 900));

    // kick off fast builds immediately (sun, corona, stars)
    void buildSunTexture(sunR);
    void buildCoronaTexture(sunR, Math.max(0, Math.min(1.5, bloom)));
    void buildStarField(
      W,
      H,
      quality === "high" ? 1.0 : quality === "med" ? 0.8 : 0.6
    );

    // galaxy is heavier → defer to idle to avoid blocking first paint
    if (idleBuildRef.current) cIC(idleBuildRef.current);
    idleBuildRef.current = rIC(async () => {
      const gSize = Math.floor(Math.min(W, H) * 0.95);
      await buildGalaxy(gSize, gSize, quality);
    }) as unknown as number;

    // planets (randomized but stable shape per resize)
    if (planets) {
      const base = Math.min(W, H);
      const rand = (i: number) => {
        // deterministic-ish per resize
        const s = Math.sin(i * 12.345 + W * 0.1 + H * 0.07) * 43758.5453;
        return s - Math.floor(s);
      };
      planetsRef.current = [
        {
          orbit: base * 0.14,
          size: 4,
          speed: 0.35,
          phase: rand(1) * Math.PI * 2,
          color: "rgba(150,180,255,0.95)",
        },
        {
          orbit: base * 0.2,
          size: 6,
          speed: 0.22,
          phase: rand(2) * Math.PI * 2,
          color: "rgba(220,210,190,0.95)",
          ring: true,
        },
        {
          orbit: base * 0.265,
          size: 5,
          speed: 0.18,
          phase: rand(3) * Math.PI * 2,
          color: "rgba(180,220,200,0.95)",
        },
        {
          orbit: base * 0.34,
          size: 7,
          speed: 0.12,
          phase: rand(4) * Math.PI * 2,
          color: "rgba(200,170,240,0.95)",
        },
        {
          orbit: base * 0.42,
          size: 5,
          speed: 0.09,
          phase: rand(5) * Math.PI * 2,
          color: "rgba(255,210,180,0.95)",
        },
      ];
    } else {
      planetsRef.current = [];
    }
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
    const starTex = starFieldRef.current;
    if (starTex) {
      ctx.globalCompositeOperation = "screen";
      if (starTex.bitmap) ctx.drawImage(starTex.bitmap, 0, 0, w, h);
      else ctx.drawImage(starTex.canvas, 0, 0, w, h);
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
    const g = galaxyTexRef.current;
    const d = dustMaskRef.current;
    const gb = galaxyBloomRef.current;
    if (g && d) {
      const gW = g.canvas.width,
        gH = g.canvas.height;

      ctx.save();
      ctx.translate(galX, galY);
      ctx.rotate(t * galaxyRotation);

      // base galaxy
      ctx.globalAlpha = 0.95;
      if (g.bitmap) ctx.drawImage(g.bitmap, -gW / 2, -gH / 2);
      else ctx.drawImage(g.canvas, -gW / 2, -gH / 2);

      // dust multiply
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.9;
      if (d.bitmap) ctx.drawImage(d.bitmap, -gW / 2, -gH / 2);
      else ctx.drawImage(d.canvas, -gW / 2, -gH / 2);

      // bloom (pre-blurred)
      if (gb) {
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = Math.max(0, Math.min(1, 0.35 * bloom));
        if (gb.bitmap) ctx.drawImage(gb.bitmap, -gW / 2, -gH / 2);
        else ctx.drawImage(gb.canvas, -gW / 2, -gH / 2);
      }

      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }

    // --- Draw Sun (core + corona + glow + prominences)
    const s = sunTexRef.current;
    const c = coronaTexRef.current;
    const sg = sunGlowRef.current;
    if (s && c) {
      // corona
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = Math.min(1, 0.8 * bloom);
      const cr = c.canvas.width / 2;
      if (c.bitmap) ctx.drawImage(c.bitmap, sunX - cr, sunY - cr);
      else ctx.drawImage(c.canvas, sunX - cr, sunY - cr);

      // subtle rotating glow (pre-blurred sprite)
      if (sg) {
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.rotate(Math.sin(t * 0.35) * 0.06);
        ctx.globalAlpha = 1; // alpha baked into sprite
        const w2 = sg.canvas.width;
        const h2 = sg.canvas.height;
        if (sg.bitmap) ctx.drawImage(sg.bitmap, -w2 / 2, -h2 / 2);
        else ctx.drawImage(sg.canvas, -w2 / 2, -h2 / 2);
        ctx.restore();
      }

      // photosphere (sharp)
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const sw = s.canvas.width,
        sh = s.canvas.height;
      if (s.bitmap) ctx.drawImage(s.bitmap, sunX - sw / 2, sunY - sh / 2);
      else ctx.drawImage(s.canvas, sunX - sw / 2, sunY - sh / 2);

      // prominences (animated arcs) — light cost
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(t * 0.12);
      const promCount = 9;
      ctx.strokeStyle = "rgba(255,180,80,0.28)";
      ctx.lineWidth = 4;
      for (let i = 0; i < promCount; i++) {
        const ang = (i / promCount) * Math.PI * 2 + Math.sin(t * 0.6 + i) * 0.08;
        const r = (sw / 2) * (1.02 + ((Math.sin(t * 1.7 + i) + 1) * 0.06));
        const x = Math.cos(ang) * r;
        const y = Math.sin(ang) * r;
        ctx.beginPath();
        ctx.arc(x, y, 18 + Math.sin(t * 2.1 + i) * 6, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // --- Planets
    if (planets && planetsRef.current.length && s) {
      // sun position used as focal
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;

      for (const p of planetsRef.current) {
        // orbit path
        ctx.beginPath();
        ctx.arc(sunX, sunY, p.orbit, 0, Math.PI * 2);
        ctx.stroke();

        const ang = p.phase + t * p.speed;
        const px = sunX + Math.cos(ang) * p.orbit;
        const py = sunY + Math.sin(ang) * p.orbit;

        // planet body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // optional ring (saturn-like)
        if (p.ring) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(0.8);
          ctx.strokeStyle = "rgba(255,255,255,0.18)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.9, p.size * 0.7, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // tiny specular
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(px - p.size * 0.35, py - p.size * 0.35, Math.max(0.8, p.size * 0.24), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const handleResize = (() => {
      let raf: number | null = null;
      return () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          resizeAll();
        });
      };
    })();

    // pointer from window keeps working even if canvas has pointer-events:none
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        has: e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom,
      };
    };
    const onLeave = () => (mouseRef.current.has = false);

    // initial build
    resizeAll();
    startRef.current = 0;
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize as any);
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseleave", onLeave as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleBuildRef.current) cIC(idleBuildRef.current);
      // dispose bitmaps
      disposeTex(sunTexRef.current);
      disposeTex(sunGlowRef.current);
      disposeTex(coronaTexRef.current);
      disposeTex(galaxyTexRef.current);
      disposeTex(galaxyBloomRef.current);
      disposeTex(dustMaskRef.current);
      disposeTex(starFieldRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sunPos[0],
    sunPos[1],
    galaxyPos[0],
    galaxyPos[1],
    sunRadius,
    galaxyRotation,
    quality,
    bloom,
    parallax,
    planets,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
