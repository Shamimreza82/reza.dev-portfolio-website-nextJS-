"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // radius
  depth: number; // for parallax strength
};

type Props = {
  /** Particle count (auto-scales a bit with screen size) */
  count?: number;
  /** Particle color (uses currentColor if not provided) */
  color?: string;
  /** Max line distance between particles */
  linkDistance?: number;
  /** Parallax strength in px */
  parallax?: number;
  /** Extra classNames (positioning, z-index, etc.) */
  className?: string;
};

export default function Particles({
  count = 90,
  color,
  linkDistance = 120,
  parallax = 28,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, has: false });

  // Resize & DPR setup
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

  // Init particles
  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const area = w * h;

    // auto-scale count a bit with area
    const base = Math.max(count, Math.min(150, Math.floor(area / 18000)));
    const ps: Particle[] = Array.from({ length: base }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, // slow drift
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
      depth: Math.random() * 1 + 0.3, // 0.3–1.3
    }));
    particlesRef.current = ps;
  };

  // Animation loop
  const tick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    ctx.clearRect(0, 0, w, h);

    // Styles
    const stroke = color || getComputedStyle(canvas).color || "rgba(56,189,248,0.7)"; // tailwind cyan-400-ish
    ctx.fillStyle = stroke;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 0.6;

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // move
      p.x += p.vx;
      p.y += p.vy;

      // wrap
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // parallax offset based on mouse (-1..1)
      const nx = mouse.has ? (mouse.x / w) * 2 - 1 : 0;
      const ny = mouse.has ? (mouse.y / h) * 2 - 1 : 0;
      const ox = -nx * parallax * p.depth;
      const oy = -ny * parallax * p.depth;

      // draw particle
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];

        const nx = mouse.has ? (mouse.x / w) * 2 - 1 : 0;
        const ny = mouse.has ? (mouse.y / h) * 2 - 1 : 0;
        const ax = a.x - nx * parallax * a.depth;
        const ay = a.y - ny * parallax * a.depth;
        const bx = b.x - nx * parallax * b.depth;
        const by = b.y - ny * parallax * b.depth;

        const dx = ax - bx;
        const dy = ay - by;
        const dist = Math.hypot(dx, dy);

        if (dist < linkDistance) {
          ctx.globalAlpha = 1 - dist / linkDistance; // fade with distance
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
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
  }, [count, linkDistance, parallax, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
