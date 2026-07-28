/* MIDNIGHT QUANT — Portfolio Artifact 2: MNQ Futures AI Assistant setup sheet + capability cells + live demo link */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";
import { Activity, GitCompareArrows, Newspaper, Workflow } from "lucide-react";
import { Link } from "wouter";

const SETUP = [
  ["Title", "Futures AI Assistant — MNQ Pre-Market Briefing"],
  [
    "Objective",
    "To compress a discretionary pre-market routine into a single 09:00 EST briefing that states a directional bias for Micro E-mini Nasdaq futures and the conditions that would invalidate it.",
  ],
  [
    "Process",
    "Defined the signal set (liquidity sweeps, volume profile, EMA alignment, SMT divergence); encoded each read as a structured briefing schema; rendered bias, session reference levels, and if/then execution scenarios into one operator dashboard.",
  ],
  ["Tools & Tech", "React, TypeScript, Tailwind CSS, Vite — briefing state modeled as typed variants."],
  [
    "Value Proposition",
    "Shows AI applied to markets as an engineering problem: an opinionated, falsifiable output with explicit levels and risk, rather than an open-ended chat response.",
  ],
];

const CAPABILITIES = [
  {
    Icon: Activity,
    t: "Directional Bias",
    d: "A single model read — bias, last price, and confidence — derived from overnight price discovery against the prior value area.",
  },
  {
    Icon: GitCompareArrows,
    t: "MNQ / MES Alignment",
    d: "Cross-index confirmation scoring: the Nasdaq read is only trusted when the S&P contract agrees on structure.",
  },
  {
    Icon: Newspaper,
    t: "High-Impact Monitor",
    d: "Headline risk surfaced alongside the technical read, with an explicit statement of how it changes the session's expected path.",
  },
  {
    Icon: Workflow,
    t: "If / Then Execution",
    d: "Every scenario carries a trigger condition, target, and invalidation level, so the plan is testable before the session opens.",
  },
];

export default function Artifact02() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="artifact-02" ref={ref} className="relative py-24 lg:py-32 border-t border-border">
      <div className="container">
        <div className="reveal">
          <IndexTag index="05" label="Portfolio Artifact 2" meta="MNQ1! / PRE-MARKET" />
        </div>
        <h2
          className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          Futures AI Assistant:{" "}
          <span className="text-primary">Stock Trend Intelligence</span>
        </h2>
        <p
          className="reveal font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-5"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          One briefing · one bias · explicit invalidation
        </p>

        {/* Setup data sheet */}
        <div className="reveal mt-14 border border-border rounded-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-3 border-b border-border bg-card flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Artifact 2 — Setup Details</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">mnq-assistant</p>
          </div>
          <dl className="divide-y divide-border">
            {SETUP.map(([k, v]) => (
              <div
                key={k}
                className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4 hover:bg-primary/[0.03] transition-colors duration-150"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-primary/90 pt-0.5">{k}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Signal capabilities */}
        <div className="mt-20">
          <h3 className="reveal font-display font-bold text-2xl sm:text-3xl">
            What the Assistant <span className="text-primary">Reads</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {CAPABILITIES.map(({ Icon, t, d }, i) => (
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

        {/* Live exhibit link */}
        <div
          className="reveal mt-14 ledger-cell rounded-sm bg-card/40 px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Exhibit · Interactive</p>
            <p className="font-display font-semibold text-lg mt-2">Open the pre-market briefing dashboard</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-xl">
              Generates a fresh briefing variant with session reference levels, alignment scoring, and
              cycleable execution scenarios. Analytical mock data — not financial advice.
            </p>
          </div>
          <Link
            href="/mnq-assistant"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-5 py-3 hover:bg-primary/10 hover:border-primary transition-colors duration-150"
          >
            Launch Assistant <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
