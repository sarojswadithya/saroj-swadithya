"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01213456789!<>-_\\/[]{}—=+*^?#";

type Props = {
  text: string;
  /** ms between each character resolving */
  speed?: number;
  /** how many scramble frames before a slot locks */
  scrambleFrames?: number;
  className?: string;
  /** if true, runs once on mount (no hover trigger) */
  auto?: boolean;
  /** when auto is true, also re-run on hover/focus */
  replayOnHover?: boolean;
};

/**
 * Renders `text`, but scrambles each character through random glyphs
 * before resolving — like a decryption / crypto effect. Triggers on
 * hover (default) or automatically on mount.
 */
export default function ScrambleText({
  text,
  speed = 40,
  scrambleFrames = 6,
  className,
  auto = false,
  replayOnHover = false,
}: Props) {
  const [output, setOutput] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRef = useRef<
    { final: string; start: number; end: number; char: string }[]
  >([]);

  const stop = useCallback(() => {
    if (rafRef.current) clearTimeout(rafRef.current);
    rafRef.current = null;
  }, []);

  const run = useCallback(() => {
    stop();
    frameRef.current = 0;
    setOutput("");

    // Build a queue: each char resolves at a staggered frame.
    queueRef.current = text.split("").map((char, i) => {
      const start = Math.floor((i / text.length) * 20);
      const end = start + scrambleFrames;
      return {
        final: char === " " ? " " : char,
        start,
        end,
        char: char === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
      };
    });

    const tick = () => {
      let complete = 0;
      const next = queueRef.current
        .map((q) => {
          if (frameRef.current >= q.end) {
            complete++;
            return q.final;
          }
          if (frameRef.current >= q.start) {
            if (Math.random() < 0.3) {
              q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return q.char;
          }
          return "";
        })
        .join("");

      setOutput(next);

      if (complete === queueRef.current.length) {
        stop();
        return;
      }
      frameRef.current++;
      rafRef.current = setTimeout(tick, speed);
    };

    rafRef.current = setTimeout(tick, speed);
  }, [text, scrambleFrames, speed, stop]);

  // auto-run on mount
  useEffect(() => {
    if (auto) {
      const t = setTimeout(run, 250);
      return () => {
        clearTimeout(t);
        stop();
      };
    }
    return stop;
  }, [auto, run, stop]);

  // cleanup on unmount
  useEffect(() => stop, [stop]);

  const handlers =
    !auto || replayOnHover
      ? {
          onMouseEnter: run,
          onFocus: run,
        }
      : {};

  return (
    <span
      className={className}
      {...handlers}
      role="text"
      tabIndex={auto && !replayOnHover ? undefined : 0}
    >
      {output || "\u00A0"}
    </span>
  );
}
