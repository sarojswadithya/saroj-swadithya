import { skills } from "@/lib/content";

/**
 * Infinite horizontal marquee of skills — a band that bridges the dark
 * hero and the light content sections below.
 */
export default function Marquee() {
  // duplicated once so the loop is seamless (translateX -50%)
  const items = [...skills, ...skills];

  return (
    <div className="overflow-hidden border-y border-line-dark bg-panel-2 py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {items.map((skill, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-mono text-sm uppercase tracking-wider text-bg/60">
              {skill}
            </span>
            <span className="text-accent">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
