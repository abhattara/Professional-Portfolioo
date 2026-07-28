/* MIDNIGHT QUANT — Portfolio Artifact 1: data-sheet setup table + vertical Seven Eras timeline + lessons */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";
import { AlertTriangle, Cpu, Scale } from "lucide-react";

const SETUP = [
  ["Title", "The Evolution of AI & ML: Eras, Winters, and Breakthroughs"],
  [
    "Objective",
    "To map and contextualize the major scientific, computational, and institutional shifts in artificial intelligence over a 70+ year timeline to project future industry trajectory.",
  ],
  [
    "Process",
    "Collaborated with peers to synthesize historic literature; mapped AI developments into 7 distinct eras; analyzed the catalysts of AI Winters; built visualization artifacts.",
  ],
  ["Tools & Tech", "Microsoft PowerPoint, Academic Research Databases, Canva visual design tools."],
  [
    "Value Proposition",
    "Demonstrates an advanced systemic understanding of AI's history, preventing naive software engineering assumptions and aligning modern gen-AI strategies with stable historical trends.",
  ],
];

const ERAS = [
  {
    n: "01",
    t: "Symbolic AI",
    y: "1950 – 1973",
    d: "Intelligence modeled as formal logical rules (GOFAI). Pushed early theorem proving and simple logic games. Collapsed due to combinatorial complexity limits.",
    winter: false,
  },
  {
    n: "02",
    t: "AI Winter 1",
    y: "1974 – 1980",
    d: "Overhyped promises failed to yield real-world application. Underpowered computers led to a complete drying up of government and corporate research funds.",
    winter: true,
  },
  {
    n: "03",
    t: "Expert Systems",
    y: "1980 – 1986",
    d: "Hand-coded \u201cif-then\u201d rule machines match expert-level diagnostic precision in narrow fields. Systems like MYCIN and DEC's XCON saved companies millions.",
    winter: false,
  },
  {
    n: "04",
    t: "AI Winter 2",
    y: "1987 – 1993",
    d: "Narrow logic programs suffered high maintenance costs and total lack of flexibility, causing a second wave of massive research and deployment cuts globally.",
    winter: true,
  },
  {
    n: "05",
    t: "Machine Learning",
    y: "1994 – 2011",
    d: "Shift from hand-coded rules to statistical inference. Major breakthroughs included Support Vector Machines (SVMs), Random Forests, and IBM's Watson on Jeopardy.",
    winter: false,
  },
  {
    n: "06",
    t: "Deep Learning",
    y: "2012 – 2021",
    d: "Aided by GPU acceleration, large neural networks extracted insights directly from raw datasets. Marked by the AlexNet image recognition explosion and AlphaGo.",
    winter: false,
  },
  {
    n: "07",
    t: "Gen & Cloud AI",
    y: "2022 – 2026",
    d: "ChatGPT democratizes LLMs overnight. Distributed cloud scale (AWS, Azure) enables multimodal models (text, visual, voice) to embed natively into industry workflows.",
    winter: false,
  },
];

const LESSONS = [
  {
    Icon: AlertTriangle,
    t: "Avoid Hype Cycles",
    d: "Both AI Winters were direct consequences of overpromising while underdelivering. As software engineers, we must keep technical benchmarks transparent and honest.",
  },
  {
    Icon: Cpu,
    t: "Hardware is King",
    d: "Algorithms from the 1980s failed because processing nodes couldn't handle the matrix calculations. True scaling only happens when model sizes match structural capacity.",
  },
  {
    Icon: Scale,
    t: "Rules vs. Probability",
    d: "Narrow, logic-only expert systems break under real-world noise. Modern systems must rely on probabilistic deep-learning classifiers to maintain systemic resilience.",
  },
];

export default function Artifact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="artifact" ref={ref} className="relative border-t border-border">
      {/* Header band with artifact artwork */}
      <div className="relative overflow-hidden">
        <img
          src="/manus-storage/eras-artifact_71e77f82.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="relative container py-24 lg:py-28">
          <div className="reveal">
            <IndexTag index="04" label="Portfolio Artifact 1" meta="TIMELINE / 1950–2026" />
          </div>
          <h2 className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            The Evolution of AI &amp; ML:{" "}
            <span className="text-primary">Eras, Winters, and Breakthroughs</span>
          </h2>
          <p className="reveal font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-5" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            70+ years of signal — mapped into seven eras
          </p>
        </div>
      </div>

      <div className="container pb-24 lg:pb-32">
        {/* Setup data sheet */}
        <div className="reveal border border-border rounded-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-3 border-b border-border bg-card flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Artifact 1 — Setup Details</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">ppt final.pptx</p>
          </div>
          <dl className="divide-y divide-border">
            {SETUP.map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4 hover:bg-primary/[0.03] transition-colors duration-150">
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-primary/90 pt-0.5">{k}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Seven Eras vertical timeline */}
        <div className="mt-20">
          <h3 className="reveal font-display font-bold text-2xl sm:text-3xl">
            The Seven <span className="text-primary">Eras of AI</span>
          </h3>
          <p className="reveal text-sm text-muted-foreground mt-2 font-mono tracking-wide" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            1950 → 2026 · two winters, five climbs
          </p>

          <ol className="relative mt-10 ml-3 sm:ml-4 border-l border-border">
            {ERAS.map((era, i) => (
              <li
                key={era.n}
                className="node-pulse reveal relative pl-8 sm:pl-10 pb-10 last:pb-0"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <span
                  aria-hidden
                  className={`node-dot absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    era.winter
                      ? "bg-background border-muted-foreground/60"
                      : "bg-primary border-primary shadow-[0_0_12px_oklch(0.82_0.13_211/0.5)]"
                  }`}
                />
                <div
                  className={`ledger-cell rounded-sm px-5 sm:px-6 py-5 ${
                    era.winter ? "bg-secondary/30 border-dashed" : "bg-card/40"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className={`font-mono text-xs ${era.winter ? "text-muted-foreground" : "text-primary"}`}>{era.n}</span>
                    <h4 className="font-display font-semibold text-lg sm:text-xl">
                      {era.t}
                      {era.winter && (
                        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-sm px-2 py-0.5 align-middle">
                          ❄ Winter
                        </span>
                      )}
                    </h4>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">{era.y}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-3xl">{era.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Key historical lessons */}
        <div className="mt-20">
          <h3 className="reveal font-display font-bold text-2xl sm:text-3xl">
            Key Historical <span className="text-primary">Lessons</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {LESSONS.map(({ Icon, t, d }, i) => (
              <div
                key={t}
                className="reveal ledger-cell rounded-sm bg-card/40 px-6 py-7"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Icon className="w-5 h-5 text-primary" aria-hidden />
                <p className="font-display font-semibold text-lg mt-4">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
