"use client";

import React, { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;        // depth (0..1)
  r: number;        // base radius
  tw: number;       // twinkle speed
  ph: number;       // twinkle phase
  c: string;        // color
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;     // frames left
  maxLife: number;
};

type Props = {
  /** Approximate number of stars (auto scales by area too) */
  count?: number;
  /** Star base color; default uses currentColor */
  color?: string;
  /** Parallax strength in px */
  parallax?: number;
  /** Twinkle intensity (0–1) */
  twinkle?: number;
  /** How often to spawn a shooting star (seconds, 0 = off) */
  shootingEverySec?: number;
  /** Extra classNames (positioning, z-index, etc.) */
  className?: string;
};

export default function Starfield({
  count = 220,
  color,
  parallax = 30,
  twinkle = 0.35,
  shootingEverySec = 5,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootersRef = useRef<Shooter[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, has: false });
  const lastSpawnRef = useRef<number>(0);

  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const { clientWidth, clientHeight } = canvas;
    canvas.width = Math.floor(clientWidth * dpr);
    canvas.height = Math.floor(clientHeight * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const area = w * h;

    // scale count by area lightly
    const auto = Math.min(600, Math.max(count, Math.floor(area / 3500)));
    const baseColor = color || getComputedStyle(canvas).color || "#ffffff";

    const stars: Star[] = [];
    for (let i = 0; i < auto; i++) {
      // depth layers: more small distant stars + some closer bright ones
      const z = Math.pow(Math.random(), 1.4);      // bias towards small/deep
      const r = rand(0.6, 1.6) * (0.5 + (1 - z));  // closer stars appear larger
      const tone = Math.floor(rand(220, 255));     // near-white tint
      const col =
        color ??
        `rgba(${tone},${tone},${tone},${0.7 + (1 - z) * 0.3})`; // brighter when closer

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z,
        r,
        tw: rand(0.6, 1.5),     // twinkle speed
        ph: Math.random() * Math.PI * 2, // phase
        c: col || baseColor,
      });
    }
    starsRef.current = stars;
    shootersRef.current = [];
    lastSpawnRef.current = performance.now();
  };

  const spawnShooter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // spawn from a random top/left edge, heading diagonally
    const edge = Math.random() < 0.6 ? "top" : "left";
    let x = 0, y = 0, vx = 0, vy = 0;

    if (edge === "top") {
      x = rand(0, w * 0.8);
      y = -10;
      vx = rand(8, 13);
      vy = rand(5, 9);
    } else {
      x = -10;
      y = rand(0, h * 0.8);
      vx = rand(9, 14);
      vy = rand(4, 8);
    }

    shootersRef.current.push({
      x, y, vx, vy,
      life: 60 + Math.floor(Math.random() * 50), // ~1–1.8s at 60fps
      maxLife: 100,
    });
  };

  const tick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const stars = starsRef.current;
    const shooters = shootersRef.current;
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, w, h);

    // background glow (very subtle space haze)
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
    grad.addColorStop(0, "rgba(0,0,10,0.18)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // compute parallax offset
    const nx = mouse.has ? (mouse.x / w) * 2 - 1 : 0;
    const ny = mouse.has ? (mouse.y / h) * 2 - 1 : 0;

    // draw stars with twinkle
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      const ox = -nx * parallax * (0.4 + 0.6 * (1 - s.z)); // closer = stronger parallax
      const oy = -ny * parallax * (0.4 + 0.6 * (1 - s.z));

      // twinkle factor
      s.ph += 0.02 * s.tw;
      const twf = 1 + Math.sin(s.ph) * twinkle * (0.5 + (1 - s.z) * 0.5); // closer twinkles a bit more

      const rr = Math.max(0.2, s.r * twf);

      ctx.beginPath();
      ctx.fillStyle = s.c;
      ctx.shadowBlur = 10 * (1 - s.z);
      ctx.shadowColor = s.c;
      ctx.arc(s.x + ox, s.y + oy, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // update & draw shooting stars
    for (let i = shooters.length - 1; i >= 0; i--) {
      const sh = shooters[i];
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.life--;

      // trail
      const trailLen = 120;
      const gradTrail = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx * 8, sh.y - sh.vy * 8);
      gradTrail.addColorStop(0, "rgba(255,255,255,0.9)");
      gradTrail.addColorStop(1, "rgba(255,255,255,0)");

      ctx.strokeStyle = gradTrail;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sh.x, sh.y);
      ctx.lineTo(sh.x - sh.vx * 6, sh.y - sh.vy * 6);
      ctx.stroke();

      // head
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(sh.x, sh.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      if (sh.life <= 0 || sh.x > w + trailLen || sh.y > h + trailLen) {
        shooters.splice(i, 1);
      }
    }

    // spawn shooters over time
    if (shootingEverySec > 0) {
      const now = performance.now();
      if (now - lastSpawnRef.current > shootingEverySec * 1000) {
        spawnShooter();
        lastSpawnRef.current = now;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    resize();
    init();
    tick();

    const handleResize = () => {
      resize();
      init();
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        has: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.has = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, parallax, color, twinkle, shootingEverySec]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
