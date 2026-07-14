import { services } from "@/lib/content";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
      <Reveal className="mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          04 — Services
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          How I can help
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.no} delay={i * 70}>
            <div className="group h-full bg-bg p-8 transition-colors hover:bg-panel hover:text-bg sm:p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-bg/40">
                  {s.no}
                </span>
                <span className="text-xl opacity-0 transition-opacity group-hover:opacity-100">
                  ✦
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors group-hover:text-bg/70">
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
