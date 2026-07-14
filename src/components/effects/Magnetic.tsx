"use client";

import { type ReactNode } from "react";
import { useMagnetic } from "./useMagnetic";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  /** disable on touch / small screens */
  disabled?: boolean;
};

/**
 * Wraps children so they drift toward the cursor when hovered.
 * Use around CTA buttons, arrows, or logos.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.4,
  radius = 100,
  disabled = false,
}: Props) {
  const { ref, pos } = useMagnetic<HTMLSpanElement>({ strength, radius });

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </span>
  );
}
