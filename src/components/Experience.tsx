import { experiences, education } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Experience & Education — a two-column timeline: roles on the left,
 * education on the right. Honest, scannable, professional.
 */
export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <Reveal className="mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          03 — Experience &amp; Education
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Where I&apos;ve been
        </h2>
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Experience column */}
        <div className="lg:col-span-7">
          <Reveal>
            <h3 className="mb-8 font-mono text-sm uppercase tracking-wider text-muted">
              Experience
            </h3>
          </Reveal>

          <ol className="relative border-l border-line">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={exp.org} delay={i * 90} className="mb-12 ml-6 last:mb-0">
                {/* dot */}
                <span className="absolute -left-[17px] mt-2 h-3 w-3 rounded-full border-2 border-ink bg-bg" />

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-xl font-medium tracking-tight">
                    {exp.role}
                  </h4>
                  <span className="font-mono text-xs text-muted">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-muted">
                  {exp.org}{" "}
                  <span className="ml-2 rounded-full bg-panel/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {exp.type}
                  </span>
                </p>

                <ul className="mt-4 space-y-2">
                  {exp.points.map((p, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Education column */}
        <div className="lg:col-span-5">
          <Reveal delay={120}>
            <h3 className="mb-8 font-mono text-sm uppercase tracking-wider text-muted">
              Education
            </h3>
          </Reveal>

          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={180 + i * 90}>
              <div className="rounded-2xl border border-line bg-panel p-6 text-bg sm:p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {ed.period}
                </span>
                <h4 className="mt-4 text-xl font-medium leading-snug tracking-tight">
                  {ed.degree}
                </h4>
                <p className="mt-2 text-sm text-bg/60">{ed.org}</p>
                <p className="mt-4 border-t border-line-dark pt-4 text-sm font-medium text-bg/80">
                  {ed.detail}
                </p>
              </div>
            </Reveal>
          ))}

          {/* small note */}
          <Reveal delay={260}>
            <p className="mt-6 px-2 text-sm leading-relaxed text-muted">
              Always learning — currently diving into AI, ML, and how to build
              smarter software.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
