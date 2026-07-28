/* MIDNIGHT QUANT — hero: asymmetric left-rail content over drifting data-noir backdrop */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";

export default function Hero() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="top" ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-bg.webp"
          alt=""
          aria-hidden
          className="hero-drift w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      <div className="relative container pb-24 pt-36 lg:pt-40">
        {/* Brand lockup — opening-viewport identity system */}
        <div className="reveal hidden lg:flex items-center justify-between mb-14 -mt-16">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-ab.webp" alt="AB monogram" className="w-10 h-10" />
            <span className="font-display font-semibold tracking-wide text-foreground/90">
              Abhi Bhattarai<span aria-hidden className="cursor-blink text-primary">▍</span>
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            EST. DALLAS, TX · DOSSIER v1.0 · {new Date().getFullYear()}
          </p>
        </div>
        <div className="max-w-3xl">
          <div className="reveal">
            <IndexTag index="00" label="Portfolio" meta="SWE × AI / FinTech" />
          </div>
          <h1 className="reveal font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.04] mt-6 text-foreground" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            Abhi Bhattarai
            <span aria-hidden className="cursor-blink text-primary font-normal">▍</span>
          </h1>
          <p className="reveal font-mono text-sm sm:text-base tracking-[0.08em] text-primary mt-5" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Software Engineer &amp; AI Change Leader — Dallas, TX
          </p>
          <p className="reveal text-base sm:text-lg text-muted-foreground leading-relaxed mt-6 max-w-xl" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            I integrate AI into full-stack architectures and financial technology
            systems — production-grade, secure, built to forecast. Signal over noise,
            in markets and in code.
          </p>
          <div className="reveal flex flex-wrap items-center gap-4 mt-10" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
            <a
              href="#artifact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm hover:brightness-110 active:scale-[0.97] transition-all duration-150"
            >
              View Artifact 01 <span aria-hidden>→</span>
            </a>
            <a
              href="#artifact-02"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm hover:bg-primary/10 hover:border-primary active:scale-[0.97] transition-all duration-150"
            >
              View Artifact 02 <span aria-hidden>→</span>
            </a>
            <a
              href="#artifact-03"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm hover:bg-primary/10 hover:border-primary active:scale-[0.97] transition-all duration-150"
            >
              View Artifact 03 <span aria-hidden>→</span>
            </a>
            <a
              href="#bio"
              className="inline-flex items-center gap-2 border border-border text-foreground/90 font-mono text-xs uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm hover:border-primary/50 hover:text-primary active:scale-[0.97] transition-all duration-150"
            >
              Read the Bio
            </a>
          </div>
        </div>

        {/* Ticker stats strip */}
        <div className="reveal mt-16 grid grid-cols-2 sm:grid-cols-4 border border-border divide-x divide-border bg-background/50 backdrop-blur-sm" style={{ "--reveal-delay": "300ms" } as React.CSSProperties}>
          {[
            { k: "4+", v: "Years Full-Stack" },
            { k: "CS + Music", v: "Dual Degree" },
            { k: "AI × FinTech", v: "Core Focus" },
            { k: "DAL", v: "Based in Dallas" },
          ].map((s, i) => (
            <div key={s.v} className={`px-5 py-4 ${i >= 2 ? "border-t sm:border-t-0 border-border" : ""}`}>
              <p className="font-display font-semibold text-xl text-primary glow-cyan">{s.k}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
