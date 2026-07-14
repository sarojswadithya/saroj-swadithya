"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import ScrambleText from "./ScrambleText";

type Work = {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href: string;
  banner: string;
  accent: string;
  position: string;
};

/**
 * A cinematic project card: full-bleed banner with 3D mouse-tracked
 * tilt, parallax depth layers, film grain, and a scramble-on-hover title.
 *
 * The tilt is disabled on touch / coarse pointers to avoid jitter while
 * scrolling.
 */
export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    // skip tilt on touch devices — prevents scroll jitter
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateX = (py - 0.5) * -10;
    const rotateY = (px - 0.5) * 12;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlare({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className="work-card group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line-dark bg-panel"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform }}
    >
      <div className="work-card-inner relative h-full w-full">
        {/* Banner image */}
        <div className="absolute inset-0 work-depth">
          <Image
            src={work.banner}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: work.position }}
            priority={index < 2}
          />
        </div>

        {/* darkening gradient for legibility (bottom-heavy) */}
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent" />

        {/* accent glare on hover */}
        <div
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${work.accent}33, transparent 60%)`,
          }}
        />

        {/* film grain */}
        <div className="film-grain" aria-hidden />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8">
          {/* top row: number + year */}
          <div className="work-depth flex items-start justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-bg/50 drop-shadow">
              {String(index + 1).padStart(2, "0")} / 03
            </span>
            <span className="font-mono text-xs text-bg/50 drop-shadow">
              {work.year}
            </span>
          </div>

          {/* bottom: category + title + tags + link */}
          <div className="work-depth-lg">
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] drop-shadow"
              style={{ color: work.accent }}
            >
              {work.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-bg drop-shadow-lg sm:text-4xl">
              <ScrambleText text={work.title} speed={35} scrambleFrames={5} />
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line-dark bg-panel/40 px-3 py-1 font-mono text-[11px] text-bg/70 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-bg px-4 py-1.5 text-xs font-medium text-panel transition-all hover:gap-2.5"
              >
                View ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
