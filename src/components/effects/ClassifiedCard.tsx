"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/content";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01213456789!<>-_/[]{}=+*^?#";

/**
 * The surprise 4th card. At rest it shows a "CLASSIFIED" project — redacted
 * bars, scrambled characters, access-denied vibes. On hover (desktop) or
 * tap (mobile) it "decrypts" into a CTA: "Your project could be next."
 *
 * Interaction model:
 *  - Desktop (pointer: fine): hover/focus reveals
 *  - Touch: tap toggles. Keyboard: Enter/Space toggles.
 */
export default function ClassifiedCard() {
  const [revealed, setRevealed] = useState(false);
  const [scramble, setScramble] = useState("████████████");
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // idle scramble loop — keeps the classified field alive while hidden
  useEffect(() => {
    if (revealed) return;
    const tick = () => {
      setScramble(
        Array.from({ length: 12 }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)],
        ).join(""),
      );
      rafRef.current = setTimeout(tick, 80);
    };
    tick();
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [revealed]);

  const toggle = () => setRevealed((v) => !v);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-line-dark bg-panel-2 sm:aspect-[16/10]"
      // desktop: hover; touch: tap handler below via onClick
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onClick={toggle}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Your project could be next — tap to reveal, then get in touch"
      aria-expanded={revealed}
    >
      <div className="film-grain" aria-hidden />

      {/* redacted bars that fade on reveal */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-bg/30">
            Project 04
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent/70">
            ⚠ Classified
          </span>

          {/* redacted title bar */}
          <div className="h-12 w-2/3 max-w-sm overflow-hidden rounded bg-bg/15">
            <div className="flex h-full items-center justify-center font-mono text-lg tracking-widest text-bg/40">
              {scramble}
            </div>
          </div>

          {/* redacted lines */}
          <div className="space-y-2">
            <div className="h-3 w-64 max-w-full rounded bg-bg/10" />
            <div className="h-3 w-52 max-w-full rounded bg-bg/10" />
            <div className="h-3 w-40 max-w-full rounded bg-bg/10" />
          </div>

          <p className="mt-2 font-mono text-xs text-bg/30">
            [ tap to decrypt ]
          </p>
        </div>
      </div>

      {/* revealed CTA */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center transition-all duration-700 ${
          revealed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          Project 04 — you
        </span>
        <h3 className="max-w-md text-3xl font-semibold leading-tight tracking-tight text-bg sm:text-4xl">
          Your project could be next.
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-bg/60">
          Got an idea? A local business that needs to get online? Let&apos;s
          build it together.
        </p>
        <a
          href={contact.whatsapp || `mailto:${contact.email}`}
          target={contact.whatsapp ? "_blank" : undefined}
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-panel transition-transform hover:scale-105"
          onClick={(e) => e.stopPropagation()}
        >
          Start a project
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
