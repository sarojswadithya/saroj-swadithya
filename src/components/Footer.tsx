import { profile, socials, contact } from "@/lib/content";
import Reveal from "./Reveal";
import Magnetic from "./effects/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-panel text-bg"
    >
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(199,242,74,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8">
        {/* big CTA */}
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-bg/50">
            05 — Contact
          </span>
          <h2 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Let&apos;s build
            <br />
            something{" "}
            <span className="text-bg/40">
              great
              <span className="text-accent">.</span>
            </span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          {/* Primary actions: WhatsApp + email */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {contact.hasWhatsApp && (
              <Magnetic strength={0.25} radius={140}>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-lg font-medium text-panel transition-transform hover:scale-[1.02]"
                >
                  <span aria-hidden className="text-xl">✆</span>
                  Chat on WhatsApp
                  <span aria-hidden>→</span>
                </a>
              </Magnetic>
            )}

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 text-base text-bg/60 underline-offset-4 transition-colors hover:text-accent hover:underline sm:text-lg"
            >
              {contact.email}
            </a>
          </div>
        </Reveal>

        {/* socials grid */}
        <Reveal delay={180}>
          <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group bg-panel p-6 transition-colors hover:bg-panel-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-bg/50">
                    {s.label}
                  </span>
                  <span className="text-bg/30 transition-all group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm text-bg/80">{s.handle}</p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line-dark pt-8 font-mono text-xs uppercase tracking-wider text-bg/40 sm:flex-row sm:items-center">
          <p>
            © {year} {profile.firstName} {profile.lastName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span>     </span><span className="heart-glow" aria-hidden /><span>     </span> by{" "}
            {profile.lastName}
          </p>
        </div>
      </div>
    </footer>
  );
}
