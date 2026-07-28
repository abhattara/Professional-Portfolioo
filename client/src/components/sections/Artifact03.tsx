/* MIDNIGHT QUANT — Portfolio Artifact 3: the Turing Test, setup sheet + argument cells + interactive exhibit link */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";
import { Brain, MessageSquare, ShieldQuestion, Timer } from "lucide-react";
import { Link } from "wouter";

const SETUP = [
  ["Title", "The Imitation Game — Turing's Test as the Origin of AI"],
  [
    "Objective",
    "To trace modern AI evaluation back to Turing's 1950 proposal, and to show why replacing \"can machines think?\" with a behavioural test set the terms every benchmark still uses.",
  ],
  [
    "Process",
    "Read \"Computing Machinery and Intelligence\" and reviewed the standard objections; distilled the A/B/C interrogation setup into an interactive exhibit; scripted a human transcript against a rule-based responder so the tells are observable rather than asserted.",
  ],
  ["Tools & Tech", "React, TypeScript, Tailwind CSS — deterministic scripts, no language model."],
  [
    "Value Proposition",
    "Turns a philosophy-of-mind argument into something a visitor plays for two minutes and then reasons about — and shows the limits of imitation as a proxy for understanding.",
  ],
];

const POINTS = [
  {
    Icon: MessageSquare,
    t: "The question, restated",
    d: "\"Can machines think?\" is too loaded to answer. Turing swapped it for one that can be run: over a teleprinter, can an interrogator reliably tell the machine from the human?",
  },
  {
    Icon: Timer,
    t: "The 2000 prediction",
    d: "Turing expected that within fifty years a machine would fool an average interrogator at least 30% of the time in five minutes of questioning — a forecast about storage and fluency, not consciousness.",
  },
  {
    Icon: ShieldQuestion,
    t: "The objections",
    d: "Lady Lovelace's \"it only does what we tell it\", the mathematical objection, and the argument from consciousness — Turing answered each, and each resurfaces verbatim in today's LLM debates.",
  },
  {
    Icon: Brain,
    t: "Why it still matters",
    d: "Modern systems pass casual imitation while failing at grounding and reliability. Fluency was never evidence of understanding — a caution that carries directly into deploying AI in finance.",
  },
];

export default function Artifact03() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="artifact-03" ref={ref} className="relative py-24 lg:py-32 border-t border-border">
      <div className="container">
        <div className="reveal">
          <IndexTag index="06" label="Portfolio Artifact 3" meta="TURING 1950 / IMITATION GAME" />
        </div>
        <h2
          className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          The Turing Test:{" "}
          <span className="text-primary">Where the Whole Field Begins</span>
        </h2>
        <p
          className="reveal font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-5"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          Two witnesses · one interrogator · text only
        </p>

        <div className="reveal mt-14 border border-border rounded-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-3 border-b border-border bg-card flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Artifact 3 — Setup Details</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">mind 59 · 1950</p>
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

        <div className="mt-20">
          <h3 className="reveal font-display font-bold text-2xl sm:text-3xl">
            The Argument in <span className="text-primary">Four Moves</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {POINTS.map(({ Icon, t, d }, i) => (
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

        <div
          className="reveal mt-14 ledger-cell rounded-sm bg-card/40 px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Exhibit · Interactive</p>
            <p className="font-display font-semibold text-lg mt-2">Play the imitation game</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-xl">
              Interrogate two hidden witnesses over a simulated teleprinter, name the machine, then
              reveal the tells that gave it away. Scripted and rule-based — no language model.
            </p>
          </div>
          <Link
            href="/turing-test"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-5 py-3 hover:bg-primary/10 hover:border-primary transition-colors duration-150"
          >
            Start the Test <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
