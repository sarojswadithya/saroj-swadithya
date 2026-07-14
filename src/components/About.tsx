import { about } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-y border-line bg-panel text-bg">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* heading column */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-bg/50">
              02 — About
            </span>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {about.heading}
            </h2>
          </Reveal>
        </div>

        {/* body column */}
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="space-y-6 text-lg leading-relaxed text-bg/75">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-bg/40">
                Currently focused on
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-line-dark px-4 py-2 text-sm text-bg/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
