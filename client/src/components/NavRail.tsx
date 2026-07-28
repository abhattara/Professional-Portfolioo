/* MIDNIGHT QUANT — thin fixed left rail: monogram, section nav dots, location stamp */
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "bio", label: "Bio" },
  { id: "value", label: "Value" },
  { id: "vision", label: "Vision" },
  { id: "artifact", label: "Artifact 01" },
  { id: "artifact-02", label: "Artifact 02" },
  { id: "artifact-03", label: "Artifact 03" },
  { id: "outlook", label: "Outlook" },
];

export default function NavRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { threshold: [0.15, 0.4], rootMargin: "-15% 0px -35% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop fixed rail */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed left-0 top-0 h-screen w-16 z-40 flex-col items-center justify-between py-6 border-r border-border bg-background/60 backdrop-blur-md"
      >
        <a href="#top" aria-label="Back to top">
          <img src="/assets/logo-ab.webp" alt="AB monogram" className="w-9 h-9" />
        </a>
        <div className="flex flex-col items-center gap-5">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-label={s.label}
              className="group relative flex items-center"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-150 ${
                  active === s.id
                    ? "bg-primary scale-125 shadow-[0_0_10px_oklch(0.82_0.13_211/0.6)]"
                    : "bg-foreground/25 group-hover:bg-foreground/60"
                }`}
              />
              <span className="absolute left-5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-foreground bg-card border border-border px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                {s.label}
              </span>
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-rl] rotate-180">
          Dallas · TX
        </p>
      </nav>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 border-b border-border bg-background/80 backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2">
          <img src="/assets/logo-ab.webp" alt="AB monogram" className="w-7 h-7" />
          <span className="font-display font-600 text-sm tracking-wide">Abhi Bhattarai</span>
        </a>
        <a
          href="#artifact"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-3 py-1.5 active:scale-[0.97] transition-transform duration-150"
        >
          Artifacts
        </a>
      </header>
    </>
  );
}

