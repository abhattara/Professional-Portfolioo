/*
  ARTIFACT 03 — The Imitation Game, an interactive exhibit.
  Two hidden witnesses answer the interrogator's questions: one replies from a scripted human
  transcript, the other from a rule-based ELIZA-style responder. The visitor picks which one is
  the machine and gets scored. Everything runs client-side — no model, no network.
*/
import IndexTag from "@/components/IndexTag";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";

type Speaker = "interrogator" | "A" | "B";
type Line = { id: number; speaker: Speaker; text: string };
type Witness = "A" | "B";

const PROMPTS = [
  "Do you dream?",
  "What is 4,271 × 88?",
  "Write me a line of poetry about a bridge.",
  "How did you feel the last time you were embarrassed?",
  "Are you a machine?",
  "What did you have for breakfast?",
] as const;

type Prompt = (typeof PROMPTS)[number];

/* Scripted human answers — deliberately specific, hesitant, and a little off-topic. */
const HUMAN: Record<Prompt, string> = {
  "Do you dream?":
    "Yeah — mostly anxious ones. Last week I dreamt my apartment had a room I'd never opened.",
  "What is 4,271 × 88?":
    "No idea off the top of my head. Something like 375 thousand? I'd need paper.",
  "Write me a line of poetry about a bridge.":
    "\"We crossed it twice and only once on purpose.\" That's the best I've got, sorry.",
  "How did you feel the last time you were embarrassed?":
    "Hot ears. I waved at someone who was waving at the person behind me and I still think about it.",
  "Are you a machine?": "No. Though I'm not sure how I'd prove that to you in a text box.",
  "What did you have for breakfast?": "Cold coffee and half a bagel I found in the fridge.",
};

/* Rule-based machine answers — fluent, evasive, and fast at arithmetic. Turing's 1950 paper
   suggests the machine should *delay* and sometimes err on arithmetic to avoid detection. */
const MACHINE: Record<Prompt, string> = {
  "Do you dream?":
    "I experience something I would describe as dreaming. Do you find dreams meaningful?",
  "What is 4,271 × 88?": "375,848. Though I may have made an error — arithmetic is tiring.",
  "Write me a line of poetry about a bridge.":
    "\"A bridge is a promise held above water.\" I hope that is the kind of thing you wanted.",
  "How did you feel the last time you were embarrassed?":
    "Embarrassment is difficult to describe. I felt exposed, I think. Why do you ask?",
  "Are you a machine?": "What would change for you if I said yes?",
  "What did you have for breakfast?": "The usual — I don't pay much attention to meals.",
};

const TELLS: Record<Prompt, string> = {
  "Do you dream?": "The machine deflects with a question — a classic ELIZA move.",
  "What is 4,271 × 88?":
    "Turing predicted the giveaway: the machine must feign arithmetic weakness. It answers instantly and correctly (375,848), then hedges.",
  "Write me a line of poetry about a bridge.":
    "The machine produces a polished aphorism; the human apologises and undersells.",
  "How did you feel the last time you were embarrassed?":
    "The human offers an embodied, specific memory. The machine abstracts and redirects.",
  "Are you a machine?": "Only one of them answers the question.",
  "What did you have for breakfast?":
    "Concrete, slightly unflattering detail is expensive to fake.",
};

const STAGES = [
  { code: "A", label: "Witness A", note: "Hidden respondent" },
  { code: "B", label: "Witness B", note: "Hidden respondent" },
  { code: "C", label: "Interrogator", note: "You — text only" },
];

function useTypewriter(text: string, active: boolean, speed = 18) {
  const [shown, setShown] = useState(active ? "" : text);
  useEffect(() => {
    if (!active) {
      setShown(text);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, speed]);
  return shown;
}

function Bubble({ line, animate }: { line: Line; animate: boolean }) {
  const shown = useTypewriter(line.text, animate);
  const isInterrogator = line.speaker === "interrogator";
  return (
    <div className={`flex ${isInterrogator ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-relaxed border ${
          isInterrogator
            ? "border-primary/40 bg-primary/10 text-foreground"
            : "border-border bg-card/60 text-muted-foreground"
        }`}
      >
        {!isInterrogator && (
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-1.5">
            Witness {line.speaker}
          </p>
        )}
        <p>
          {shown}
          {animate && shown.length < line.text.length && (
            <span aria-hidden className="cursor-blink text-primary">
              ▍
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function TuringTest() {
  /* Which witness is the machine is decided once per session. */
  const [machineIs] = useState<Witness>(() => (Math.random() < 0.5 ? "A" : "B"));
  const [lines, setLines] = useState<Line[]>([]);
  const [asked, setAsked] = useState<Prompt[]>([]);
  const [verdict, setVerdict] = useState<Witness | null>(null);
  const [revealTells, setRevealTells] = useState(false);
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  const remaining = useMemo(() => PROMPTS.filter((p) => !asked.includes(p)), [asked]);

  const ask = useCallback(
    (prompt: Prompt) => {
      if (asked.includes(prompt) || verdict) return;
      const push = (speaker: Speaker, text: string) =>
        setLines((prev) => [...prev, { id: nextId.current++, speaker, text }]);

      push("interrogator", prompt);
      setAsked((prev) => [...prev, prompt]);
      window.setTimeout(() => push("A", answerFor(prompt, machineIs, "A")), 450);
      window.setTimeout(() => push("B", answerFor(prompt, machineIs, "B")), 1400);
    },
    [asked, machineIs, verdict]
  );

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const correct = verdict !== null && verdict === machineIs;

  const reset = () => {
    setLines([]);
    setAsked([]);
    setVerdict(null);
    setRevealTells(false);
    window.location.reload();
  };

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
          Artifact 03 — The Imitation Game · 1950
        </p>
      </div>

      <main className="container py-14 lg:py-20">
        <IndexTag index="06" label="Interactive Exhibit" meta="TURING 1950 / COMPUTING MACHINERY" />
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6 max-w-3xl">
          Can you tell which witness is <span className="text-primary">the machine?</span>
        </h1>
        <p className="text-muted-foreground leading-[1.75] mt-5 max-w-2xl text-[15px]">
          Turing replaced "can machines think?" with a game: an interrogator questions two hidden
          witnesses over text and must name the machine. Ask up to six questions, then commit to a
          verdict.
        </p>

        {/* Animated A / B / C setup diagram */}
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {STAGES.map((s, i) => (
            <div
              key={s.code}
              className="ledger-cell rounded-sm bg-card/40 px-5 py-5 relative overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-primary/10 to-transparent turing-scan"
                style={{ animationDelay: `${i * 700}ms` }}
              />
              <p className="relative font-mono text-xs text-primary">{s.code}</p>
              <p className="relative font-display font-semibold text-base mt-2">{s.label}</p>
              <p className="relative text-xs text-muted-foreground mt-1">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mt-10">
          {/* Transcript */}
          <div className="lg:col-span-7 border border-border rounded-sm flex flex-col">
            <div className="px-5 py-3 border-b border-border bg-card flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Teleprinter transcript
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {asked.length} / {PROMPTS.length} asked
              </p>
            </div>
            <div ref={logRef} className="p-5 space-y-3 h-[420px] overflow-y-auto">
              {lines.length === 0 && (
                <p className="text-sm text-muted-foreground/70 font-mono">
                  Awaiting the interrogator's first question…
                </p>
              )}
              {lines.map((l, i) => (
                <Bubble key={l.id} line={l} animate={i === lines.length - 1} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-border rounded-sm">
              <div className="px-5 py-3 border-b border-border bg-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Ask a question
                </p>
              </div>
              <div className="p-4 space-y-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => ask(p)}
                    disabled={asked.includes(p) || verdict !== null}
                    className="w-full text-left text-sm px-4 py-3 rounded-sm ledger-cell bg-card/40 disabled:opacity-35 disabled:cursor-not-allowed active:scale-[0.99] transition-transform duration-150"
                  >
                    {p}
                  </button>
                ))}
                {remaining.length === 0 && !verdict && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground pt-2">
                    No questions left — commit to a verdict.
                  </p>
                )}
              </div>
            </div>

            <div className="border border-border rounded-sm">
              <div className="px-5 py-3 border-b border-border bg-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Verdict
                </p>
              </div>
              <div className="p-4">
                {verdict === null ? (
                  <div className="grid grid-cols-2 gap-3">
                    {(["A", "B"] as Witness[]).map((w) => (
                      <button
                        key={w}
                        onClick={() => setVerdict(w)}
                        disabled={asked.length === 0}
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-4 py-3 hover:bg-primary/10 hover:border-primary disabled:opacity-35 disabled:cursor-not-allowed transition-colors duration-150"
                      >
                        {w} is the machine
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="font-display font-semibold text-lg">
                      {correct ? (
                        <span className="text-primary">Correct — Witness {machineIs} was the machine.</span>
                      ) : (
                        <>
                          Not quite. The machine was{" "}
                          <span className="text-primary">Witness {machineIs}</span>.
                        </>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {correct
                        ? "You caught it — but notice how few questions it took, and which ones did the work."
                        : "The imitation held. Turing's wager was that by 2000 an interrogator would have no better than a 70% chance after five minutes."}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setRevealTells((v) => !v)}
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-sm px-4 py-2.5 hover:bg-primary/10 transition-colors duration-150"
                      >
                        {revealTells ? "Hide the tells" : "Show the tells"}
                      </button>
                      <button
                        onClick={reset}
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-sm px-4 py-2.5 hover:border-primary/50 hover:text-primary transition-colors duration-150"
                      >
                        Run it again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {revealTells && (
          <div className="mt-8 border border-border rounded-sm">
            <div className="px-5 py-3 border-b border-border bg-card">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                What separated the two witnesses
              </p>
            </div>
            <dl className="divide-y divide-border">
              {asked.map((p) => (
                <div key={p} className="grid sm:grid-cols-[260px_1fr] gap-1 sm:gap-6 px-5 py-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.15em] text-primary/90 pt-0.5">
                    {p}
                  </dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{TELLS[p]}</dd>
                </div>
              ))}
              {asked.length === 0 && (
                <p className="px-5 py-4 text-sm text-muted-foreground">No questions were asked.</p>
              )}
            </dl>
          </div>
        )}

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mt-10">
          Responses are scripted and rule-based — no language model is used. Source: A. M. Turing,
          "Computing Machinery and Intelligence", Mind 59 (1950).
        </p>
      </main>
    </div>
  );
}

/* Route a prompt to the right witness's script. */
function answerFor(prompt: Prompt, machineIs: Witness, witness: Witness) {
  return witness === machineIs ? MACHINE[prompt] : HUMAN[prompt];
}
