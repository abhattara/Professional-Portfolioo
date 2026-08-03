/* MIDNIGHT QUANT — Portfolio Artifact 4: grounded portfolio concierge, setup sheet + capability cells + exhibit link */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";
import { BookMarked, Database, Gauge, ShieldOff } from "lucide-react";
import { Link } from "wouter";

const SETUP = [
  ["Title", "Portfolio Concierge — A Chatbot That Refuses to Guess"],
  [
    "Objective",
    "To build a conversational interface to this portfolio that can only answer from its own content, so that the boundary of what it knows is visible to the person using it rather than hidden behind fluent prose.",
  ],
  [
    "Process",
    "Chunked the portfolio into labelled passages with section citations; implemented BM25 retrieval with tokenization and light stemming in the browser; tuned a confidence floor below which the assistant abstains; surfaced the match score and source passage in the UI so the mechanism is inspectable.",
  ],
  [
    "Tools & Tech",
    "React, TypeScript, Tailwind CSS — BM25 retrieval computed client-side; no language model, no API key, no network calls.",
  ],
  [
    "Value Proposition",
    "Demonstrates the discipline Artifact 3 argues for: an honest refusal is more valuable than a confident hallucination, and a system's knowledge boundary should be a designed, visible property.",
  ],
];

const CAPABILITIES = [
  {
    Icon: Database,
    t: "Grounded Corpus",
    d: "Answers come verbatim from a fixed set of portfolio passages. Nothing is generated, so there is no surface on which the assistant can invent a credential or a project.",
  },
  {
    Icon: BookMarked,
    t: "Cited by Section",
    d: "Every answer names the section it came from and links back to it, so a reader can verify the claim against the portfolio itself instead of trusting the chat window.",
  },
  {
    Icon: Gauge,
    t: "Visible Confidence",
    d: "The normalized BM25 score is displayed with each answer. A weak match looks weak, rather than being delivered in the same assured tone as a strong one.",
  },
  {
    Icon: ShieldOff,
    t: "Designed Refusal",
    d: "Below the confidence floor the assistant abstains and names its closest miss. Refusal is the feature: it is what separates a grounded system from a fluent one.",
  },
];

export default function Artifact04() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="artifact-04" ref={ref} className="relative py-24 lg:py-32 border-t border-border">
      <div className="container">
        <div className="reveal">
          <IndexTag index="07" label="Portfolio Artifact 4" meta="RETRIEVAL / NO LLM" />
        </div>
        <h2
          className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          Portfolio Concierge:{" "}
          <span className="text-primary">A Chatbot That Refuses to Guess</span>
        </h2>
        <p
          className="reveal font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-5"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          Cited answers · visible confidence · honest abstention
        </p>

        <div className="reveal mt-14 border border-border rounded-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-3 border-b border-border bg-card flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Artifact 4 — Setup Details
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">
              bm25 · client-side
            </p>
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
            What Makes It <span className="text-primary">Trustworthy</span>
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

        <div
          className="reveal mt-14 ledger-cell rounded-sm bg-card/40 px-6 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Exhibit · Interactive</p>
            <p className="font-display font-semibold text-lg mt-2">Interrogate the portfolio</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-xl">
              Ask about the background, the artifacts, or the long-term goals — then ask something
              off-topic and watch it decline. Runs entirely in your browser.
            </p>
          </div>
          <Link
            href="/concierge"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-5 py-3 hover:bg-primary/10 hover:border-primary transition-colors duration-150"
          >
            Open Concierge <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
