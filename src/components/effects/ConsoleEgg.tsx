"use client";

import { useEffect } from "react";

/**
 * Prints a styled banner to the browser console — a wink to fellow
 * engineers and curious recruiters who pop open devtools.
 * Invisible in the UI itself; purely a console delight.
 */
export default function ConsoleEgg() {
  useEffect(() => {
    // Tip: hiring? saroj is open to a conversation.
    const banner = `
%c   ██████  ███████ ███████  ██████ ██    ██
  ██       ██      ██      ██      ██    ██
  ██   ███ █████   ███████ ██      ██    ██
  ██    ██ ██           ██ ██      ██    ██
   ██████  ███████ ███████  ██████  ██████
`;
    const styles = {
      big: "font-size:1px;line-height:1.2em;color:transparent;background:url('');padding:0;",
      accent:
        "color:#c7f24a;background:#1a1714;font-family:monospace;font-weight:bold;padding:6px 10px;border-radius:4px;",
      muted:
        "color:#6b635a;font-family:monospace;font-size:12px;padding:4px 0;",
      link: "color:#c7f24a;font-family:monospace;text-decoration:underline;",
    };

    console.log(banner, styles.big);
    console.log(
      "%c↑ curiosity didn't kill the cat — it got them hired.",
      styles.accent,
    );
    console.log(
      "%cYou're peeking at my portfolio's source. Nice taste. 👀\nIf you like clean code, I'd love to chat.",
      styles.muted,
    );
    console.log(
      "%c→ hello@sarojswadithya.com",
      styles.link,
    );
    console.log(
      "%cPsst… there's a Konami code hidden somewhere on this page. ↑↑↓↓←→←→ B A",
      styles.muted,
    );
  }, []);

  return null;
}
