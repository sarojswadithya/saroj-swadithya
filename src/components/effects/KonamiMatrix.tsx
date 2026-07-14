"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Listens for the Konami code (↑↑↓↓←→←→ B A) anywhere on the page.
 * When entered, mounts a full-screen Matrix-style rain overlay with a
 * hidden message. Press Escape or click to dismiss.
 */
export default function KonamiMatrix() {
  const [active, setActive] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQUENCE[progressRef.current];

      if (key === expected) {
        progressRef.current++;
        if (progressRef.current === SEQUENCE.length) {
          progressRef.current = 0;
          setActive(true);
        }
      } else {
        // reset on mismatch, but allow re-start if this key is the first
        progressRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // dismiss on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (!active) return null;
  return <MatrixRain onClose={() => setActive(false)} />;
}

function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const glyphs =
      "アァカサタナハマヤラワ0123456789ABCDEF<>=#$%*+:{}[]".split("");
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = new Array(columns).fill(0).map(() => Math.random() * -50);

    let raf = 0;

    const draw = () => {
      // translucent fade for the trailing tail
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // leading glyph is bright; the rest are dimmer
        ctx.fillStyle = Math.random() > 0.975 ? "#ffffff" : "#c7f24a";
        ctx.fillText(char, x, y);

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-label="Secret mode activated. Press Escape or click to close."
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />

      {/* center message */}
      <div className="relative z-10 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {"// secret mode unlocked"}
        </p>
        <h2 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          You found me.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-balance text-lg text-white/70">
          The fact that you tried the Konami code tells me you&apos;re
          exactly the kind of curious person I want to work with.
        </p>
        <p className="mt-8 font-mono text-sm text-accent">
          ↓ hello@sarojswadithya.com
        </p>
        <button
          onClick={onClose}
          className="mt-10 rounded-full border border-white/20 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white/60 transition-colors hover:border-accent hover:text-accent"
        >
          Press ESC or click to exit
        </button>
      </div>
    </div>
  );
}
