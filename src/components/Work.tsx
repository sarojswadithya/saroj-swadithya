import { works } from "@/lib/content";
import Reveal from "./Reveal";
import WorkCard from "./effects/WorkCard";
import ClassifiedCard from "./effects/ClassifiedCard";

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <Reveal className="mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          01 — Selected Work
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Things I&apos;ve built
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          A few projects I&apos;m proud of — from AI-powered SaaS to apps for
          local businesses. Hover to explore.
        </p>
      </Reveal>

      {/* cinematic cards — alternating layout for rhythm */}
      <div className="flex flex-col gap-8 sm:gap-12">
        {works.map((w, i) => (
          <Reveal key={w.title} delay={i * 100}>
            <div
              className={`flex flex-col gap-6 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } lg:items-center lg:gap-12`}
            >
              {/* the card */}
              <div className="w-full lg:w-[64%]">
                <WorkCard work={w} index={i} />
              </div>

              {/* side notes — description only (no title/category repeat) */}
              <div className="flex-1 lg:py-8">
                <p className="text-[15px] leading-relaxed text-muted sm:text-base">
                  {w.description}
                </p>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  Visit live ↗
                </a>
              </div>
            </div>
          </Reveal>
        ))}

        {/* the surprise 4th card — centered */}
        <Reveal delay={120}>
          <div className="mx-auto max-w-2xl">
            <ClassifiedCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
