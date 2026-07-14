import { profile, socials, stats } from "@/lib/content";
import ScrambleText from "./effects/ScrambleText";
import Magnetic from "./effects/Magnetic";

/**
 * The hero — a tall charcoal panel with the name set very large,
 * spilling off the edges like the Dribbble reference.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-panel text-bg"
    >
      {/* subtle grain / glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(199,242,74,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col px-5 pb-10 pt-20 sm:px-8">
        {/* top row: availability + socials */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {profile.available ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-line-dark px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-bg/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
          ) : null}

          <div className="hidden items-center gap-5 font-mono text-xs uppercase tracking-wider text-bg/50 sm:flex">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* the big name */}
        <div className="flex flex-1 flex-col justify-center py-16">
          <p className="mb-6 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-bg/50">
            {profile.role} — {profile.location}
          </p>

          <h1 className="font-sans text-[14vw] font-semibold leading-[0.85] tracking-tight sm:text-[13vw] lg:text-[clamp(4rem,11vw,200px)]">
            <span className="block cursor-default break-words outline-none">
              <ScrambleText
                text={profile.firstName}
                auto
                replayOnHover
                speed={25}
                scrambleFrames={7}
              />
            </span>
            <span className="block cursor-default break-words pl-[8%] text-bg/40 outline-none sm:pl-[12%]">
              <ScrambleText
                text={profile.lastName}
                auto
                replayOnHover
                speed={25}
                scrambleFrames={7}
              />
              <span className="text-accent">.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-bg/70 sm:text-lg">
            {profile.intro}
          </p>
        </div>

        {/* bottom row: stats + scroll cue */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line-dark pt-8 sm:gap-8">
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-bg/50 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bg/50 transition-colors hover:text-accent"
          >
            Scroll
            <Magnetic strength={0.5} radius={80}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-dark transition-colors group-hover:border-accent">
                ↓
              </span>
            </Magnetic>
          </a>
        </div>
      </div>
    </section>
  );
}
