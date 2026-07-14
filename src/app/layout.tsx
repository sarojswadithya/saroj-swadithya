import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";
import ConsoleEgg from "@/components/effects/ConsoleEgg";
import CursorGlow from "@/components/effects/CursorGlow";
import KonamiMatrix from "@/components/effects/KonamiMatrix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.firstName} ${profile.lastName}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.firstName} ${profile.lastName} — ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      // The pre-paint script below adds a `js` class to <html> before
      // hydration, which would otherwise cause a className mismatch.
      // This is the documented pattern for such scripts (theme toggles, etc).
      suppressHydrationWarning
    >
      <head>
        {/* Set the `js` class before paint so .reveal content is hidden only
            when JS is active. Without JS, content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-panel"
        >
          Skip to content
        </a>
        <ConsoleEgg />
        <CursorGlow />
        <KonamiMatrix />
        {children}
      </body>
    </html>
  );
}
