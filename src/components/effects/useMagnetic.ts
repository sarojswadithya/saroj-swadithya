"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** how strongly the element follows the cursor (0–1) */
  strength?: number;
  /** radius in px within which the effect activates */
  radius?: number;
};

/**
 * Makes an element drift toward the cursor while it's hovered, then
 * spring back to its origin when the cursor leaves. Returns a ref to
 * attach and the live x/y translation.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  radius = 120,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        setPos({ x: dx * strength, y: dy * strength });
      } else {
        setPos({ x: 0, y: 0 });
      }
    },
    [strength, radius],
  );

  const reset = useCallback(() => setPos({ x: 0, y: 0 }), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement ?? el;
    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", reset);
    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", reset);
    };
  }, [handleMove, reset]);

  return { ref, pos };
}
