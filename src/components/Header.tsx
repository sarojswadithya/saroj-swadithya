"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nav, profile, contact } from "@/lib/content";
import Magnetic from "./effects/Magnetic";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount gate for portal — document is undefined during SSR, so the portal
  // can only mount after first paint. setState-in-effect is unavoidable here;
  // it runs exactly once and never depends on external/variable data.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // subtle bg intensification on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The menu is rendered via portal at document.body so it escapes the
  // header's stacking context and always sits above page overlays
  // (e.g. CursorGlow at z-60). z-[80] keeps it below the Konami overlay.
  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[80] flex flex-col bg-panel md:hidden ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      style={{ transition: "opacity 0.3s ease" }}
      aria-hidden={!open}
    >
      {/* nav links — fill the space */}
      <nav className="flex flex-1 flex-col justify-center px-6">
        {nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="group flex items-center justify-between border-b border-line-dark py-5 text-3xl font-medium tracking-tight text-bg transition-colors hover:text-accent"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.35s ease ${i * 60 + 80}ms, transform 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 60 + 80}ms`,
            }}
          >
            {item.label}
            <span className="font-mono text-xs text-bg/30 transition-colors group-hover:text-accent">
              0{i + 1}
            </span>
          </Link>
        ))}
      </nav>

      {/* CTA pinned at bottom */}
      <div className="border-t border-line-dark px-6 py-6">
        <a
          href={contact.whatsapp || `mailto:${contact.email}`}
          target={contact.whatsapp ? "_blank" : undefined}
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-panel transition-transform active:scale-[0.98]"
        >
          <span aria-hidden>✆</span>
          Let&apos;s talk on WhatsApp
        </a>
        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-wider text-bg/30">
          {profile.role} · {profile.location}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-line-dark bg-panel/95 backdrop-blur-xl"
            : "border-transparent bg-panel/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          {/* Logo / monogram */}
          <Link
            href="#top"
            onClick={() => setOpen(false)}
            className="font-mono text-sm font-medium tracking-tight text-bg"
          >
            {profile.firstName[0]}
            {profile.lastName[0]}
            <span className="text-accent">.</span>
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-bg/70 transition-colors hover:bg-line-dark hover:text-bg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.4} radius={90}>
              <a
                href={contact.whatsapp || `mailto:${contact.email}`}
                target={contact.whatsapp ? "_blank" : undefined}
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-panel transition-colors hover:bg-accent/90 md:inline-flex"
              >
                <span aria-hidden>✆</span>
                Let&apos;s talk
              </a>
            </Magnetic>

            {/* Hamburger — mobile/tablet */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-bg/20 text-bg transition-colors hover:border-bg/40 hover:bg-bg/5 active:scale-95 md:hidden"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[2px] w-5 rounded-full bg-bg transition-transform duration-300 ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-bg transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-bg transition-transform duration-300 ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Render the mobile menu at the body root so it escapes the
          header's stacking context and always sits above page overlays. */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
