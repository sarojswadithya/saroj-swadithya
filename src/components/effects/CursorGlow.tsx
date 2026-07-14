"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** hex color of the spotlight glow */
  color?: string;
  /** size of the glow in px */
  size?: number;
  /** opacity of the glow at its center */
  intensity?: number;
};

/**
 * A soft spotlight that follows the cursor, injected as a fixed overlay
 * on top of the page. Only visible against dark areas (multiply-ish via
 * radial gradient), so it enhances the charcoal panels without washing
 * out light content.
 */
export default function CursorGlow({
  color = "199, 242, 74",
  size = 380,
  intensity = 0.18,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // skip on touch devices / when reduced motion is preferred
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      // smooth follow (lerp)
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate(${cx - size / 2}px, ${
        cy - size / 2
      }px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full mix-blend-screen"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(${color},${intensity}) 0%, rgba(${color},0) 70%)`,
        willChange: "transform",
      }}
    />
  );
}
