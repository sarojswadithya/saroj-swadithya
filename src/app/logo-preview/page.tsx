import Image from "next/image";

export const metadata = {
  title: "Logo Preview — Saroj Swadithya",
};

const sizes = [16, 24, 32, 48, 64, 96, 128, 240];

export default function LogoPreview() {
  return (
    <main className="min-h-screen bg-bg px-6 py-16 text-ink">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Logo System
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Stack S — Logo Preview
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            An S formed from five offset horizontal blocks — software assembled
            from components. The lime keystone (row 3) is the &ldquo;turn&rdquo;
            of the S and the only chromatic element.
          </p>
        </header>

        {/* Hero mark */}
        <section className="mb-16 flex flex-wrap items-center gap-12 rounded-2xl border border-line p-10">
          <div className="text-ink">
            <Image src="/logo.svg" alt="Logo mark" width={160} height={160} />
          </div>
          <div className="flex-1">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Primary mark · currentColor + #c7f24a
            </p>
            <p className="mt-2 text-lg">
              The mark uses <code className="font-mono text-sm">currentColor</code>{" "}
              for four blocks and a fixed lime for the keystone. It adapts to any
              text color automatically.
            </p>
          </div>
        </section>

        {/* On dark */}
        <section className="mb-16 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line-dark bg-panel p-10 text-bg">
            <Image src="/logo.svg" alt="Logo on dark" width={120} height={120} />
            <p className="font-mono text-xs uppercase tracking-wider text-bg/50">
              On charcoal · currentColor = #f4f3ef
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line p-10">
            <Image src="/logo.svg" alt="Logo on light" width={120} height={120} />
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              On warm white · currentColor = #14110f
            </p>
          </div>
        </section>

        {/* Size scale */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">
            Size scale (favicon → hero)
          </h2>
          <div className="flex flex-wrap items-end gap-8 rounded-2xl border border-line p-8">
            {sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Image src="/logo.svg" alt={`${s}px`} width={s} height={s} />
                <span className="font-mono text-[10px] text-muted">{s}px</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            Note: at 16px the mark reads as a solid block — the favicon tile
            version (right) is optimized for that size.
          </p>
        </section>

        {/* Favicon tile */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">
            Favicon tile (app icon)
          </h2>
          <div className="flex flex-wrap items-end gap-8 rounded-2xl border border-line p-8">
            {[16, 32, 64, 128].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Image
                  src="/favicon.svg"
                  alt={`favicon ${s}px`}
                  width={s}
                  height={s}
                />
                <span className="font-mono text-[10px] text-muted">{s}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* Wordmark lockup */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">
            Wordmark lockup
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-line p-8">
              <Image src="/logo.svg" alt="mark" width={56} height={56} />
              <span className="text-2xl font-semibold tracking-tight">
                Saroj Swadithya
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-line-dark bg-panel p-8 text-bg">
              <Image src="/logo.svg" alt="mark" width={56} height={56} />
              <span className="text-2xl font-semibold tracking-tight">
                Saroj Swadithya
              </span>
            </div>
          </div>
        </section>

        {/* Construction grid */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted">
            Construction
          </h2>
          <div className="rounded-2xl border border-line p-8">
            <p className="mb-4 text-sm text-muted">
              240×240 viewBox · 5 blocks on a 32px grid · 24px block height ·
              6px corner radius · lime keystone at row 3.
            </p>
            <div className="text-ink">
              <Image src="/logo.svg" alt="construction" width={320} height={320} />
            </div>
          </div>
        </section>

        <footer className="border-t border-line pt-8 font-mono text-xs uppercase tracking-wider text-muted">
          © 2026 Saroj Swadithya · Original work · All rights reserved
        </footer>
      </div>
    </main>
  );
}
