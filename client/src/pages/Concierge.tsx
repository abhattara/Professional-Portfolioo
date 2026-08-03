/*
  ARTIFACT 04 — Portfolio Concierge.
  A grounded chatbot: every answer is a passage retrieved from the portfolio's own corpus, cited
  by section and shown with a match score. Off-corpus questions are refused. All in-browser.
*/
import IndexTag from "@/components/IndexTag";
import { CONFIDENCE_FLOOR, SUGGESTED_QUESTIONS, retrieve, type Retrieval } from "@/lib/concierge";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

type Turn = {
  id: number;
  question: string;
  result: Retrieval;
};

function Confidence({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-24 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {pct}% match
      </span>
    </div>
  );
}

function Answer({ result }: { result: Retrieval }) {
  if (result.grounded) {
    return (
      <div className="border border-border rounded-sm bg-card/60 overflow-hidden">
        <div className="px-5 py-2.5 border-b border-border bg-card flex flex-wrap items-center justify-between gap-3">
          <a
            href={`/#${result.chunk.anchor}`}
            className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:brightness-125 transition-all"
          >
            Source · {result.chunk.section} — {result.chunk.topic}
          </a>
          <Confidence score={result.score} />
        </div>
        <p className="px-5 py-4 text-sm leading-relaxed text-foreground/90">{result.chunk.text}</p>
      </div>
    );
  }
  return (
    <div className="border border-destructive/40 rounded-sm bg-destructive/5 overflow-hidden">
      <div className="px-5 py-2.5 border-b border-destructive/30 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-destructive">
          Refused · below confidence floor
        </p>
        <Confidence score={result.score} />
      </div>
      <div className="px-5 py-4 space-y-2">
        <p className="text-sm leading-relaxed text-foreground/90">
          That is not in my corpus. I only answer from the content of this portfolio, and nothing in
          it is a close enough match to that question — so I would be guessing.
        </p>
        {result.nearest && (
          <p className="text-xs text-muted-foreground">
            Closest passage was{" "}
            <span className="text-primary/90">
              {result.nearest.section} — {result.nearest.topic}
            </span>
            , scoring under the {Math.round(CONFIDENCE_FLOOR * 100)}% floor.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Concierge() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    setTurns((prev) => [...prev, { id: nextId.current++, question: q, result: retrieve(q) }]);
    setDraft("");
  };

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const refused = turns.filter((t) => !t.result.grounded).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-11 border-b border-border bg-background/90 backdrop-blur-md">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:brightness-125 transition-all"
        >
          ← Back to Portfolio
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Artifact 04 — Portfolio Concierge
        </p>
      </div>

      <main className="container py-14 lg:py-20">
        <IndexTag index="07" label="Interactive Exhibit" meta="GROUNDED RETRIEVAL / NO LLM" />
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl">
          Ask about my work — <span className="text-primary">and watch it refuse</span>
        </h1>
        <p className="text-muted-foreground leading-[1.75] mt-5 max-w-2xl text-[15px]">
          Every answer below is a passage retrieved from this portfolio, cited by section and scored.
          Nothing is generated. Ask something outside the corpus and it will tell you so rather than
          inventing an answer.
        </p>

        <div className="grid lg:grid-cols-12 gap-6 mt-10">
          <div className="lg:col-span-8 border border-border rounded-sm flex flex-col">
            <div className="px-5 py-3 border-b border-border bg-card flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Transcript
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {turns.length} asked · {refused} refused
              </p>
            </div>

            <div ref={logRef} className="p-5 space-y-5 h-[460px] overflow-y-auto">
              {turns.length === 0 && (
                <p className="text-sm text-muted-foreground/70 font-mono">
                  Ask a question, or pick one from the panel…
                </p>
              )}
              {turns.map((turn) => (
                <div key={turn.id} className="space-y-3">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-sm px-4 py-3 text-sm border border-primary/40 bg-primary/10">
                      {turn.question}
                    </p>
                  </div>
                  <Answer result={turn.result} />
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(draft);
              }}
              className="flex gap-3 p-4 border-t border-border"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about Abhi's background, artifacts, or goals…"
                aria-label="Ask the concierge a question"
                className="flex-1 bg-card/60 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/60 transition-colors duration-150"
              />
              <button
                type="submit"
                disabled={draft.trim().length === 0}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-5 hover:bg-primary/10 hover:border-primary disabled:opacity-35 disabled:cursor-not-allowed transition-colors duration-150"
              >
                Ask
              </button>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="border border-border rounded-sm">
              <div className="px-5 py-3 border-b border-border bg-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Try one of these
                </p>
              </div>
              <div className="p-4 space-y-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    className="w-full text-left text-sm px-4 py-3 rounded-sm ledger-cell bg-card/40 active:scale-[0.99] transition-transform duration-150"
                  >
                    {q}
                  </button>
                ))}
                <button
                  onClick={() => ask("What is the capital of France?")}
                  className="w-full text-left text-sm px-4 py-3 rounded-sm border border-destructive/40 bg-destructive/5 hover:border-destructive/70 active:scale-[0.99] transition-all duration-150"
                >
                  What is the capital of France?
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-destructive mt-1.5">
                    Out of corpus — should refuse
                  </span>
                </button>
              </div>
            </div>

            <div className="border border-border rounded-sm">
              <div className="px-5 py-3 border-b border-border bg-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  How it works
                </p>
              </div>
              <div className="p-5 text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  The portfolio is chunked into labelled passages. Your question is tokenized,
                  stemmed, and scored against every passage with BM25; the best match is returned
                  verbatim with its section citation.
                </p>
                <p>
                  If the normalized score falls below{" "}
                  <span className="text-primary font-mono">
                    {Math.round(CONFIDENCE_FLOOR * 100)}%
                  </span>
                  , the concierge abstains. No language model, no API key, no network request — the
                  whole engine runs in this tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
