/*
  ARTIFACT 02 — MNQ AI Assistant (Pre-Market Briefing), ported from the user's original
  single-file HTML/JS build into React. Preserves the original emerald-on-ink terminal look
  (it is itself a dossier exhibit), with a slim portfolio return bar added on top.
*/
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Scenario = {
  title: string;
  subtitle: string;
  direction: "LONG" | "SHORT";
  status: "Active" | "Triggered" | "Invalidated";
  condition: string;
  target: string;
  stop: string;
};

type Briefing = {
  price: string;
  modelRead: string;
  bias: string;
  summary: string;
  structure: string[];
  metrics: [string, string, string][];
  alignment: {
    score: string;
    summary: string;
    markets: [string, string, string, string][];
  };
  headline: { source: string; text: string; impact: string };
  zones: [string, string, string][];
  scenarios: Scenario[];
};

const BRIEFING_VARIANTS: Briefing[] = [
  {
    price: "21,482.25",
    modelRead: "Moderately Bullish",
    bias: "Bullish above 21,440",
    summary:
      "Overnight price discovery held above the prior value area after sweeping sell-side liquidity near 21,404. The developing profile is accepting higher prices, while responsive buyers defended the London pullback. Favor continuation only while price remains above the overnight POC.",
    structure: [
      "Asia low sweep at 21,404 reclaimed within 15 minutes.",
      "London formed a higher low above the prior day\u2019s value.",
      "Upside liquidity rests above 21,525 and 21,568.",
    ],
    metrics: [
      ["Asia Session", "21,456.75", "21,404.00"],
      ["London Session", "21,510.50", "21,431.25"],
      ["Overnight POC", "21,440.25", "Volume node"],
      ["Value Area", "21,518.00", "21,398.50"],
    ],
    alignment: {
      score: "89% aligned",
      summary:
        "Both index futures support the bullish bias. MNQ is leading the impulse, while MES confirms through higher-lows above its opening range.",
      markets: [
        ["MNQ", "+0.62%", "Leader", "emerald"],
        ["MES", "+0.31%", "Confirming", "cyan"],
      ],
    },
    headline: {
      source: "Market-moving headline · sample feed",
      text: "A high-impact political or macro headline would surface here immediately.",
      impact:
        "Expected response: monitor index-futures volatility and wait for a confirmed 5m close before executing.",
    },
    zones: [
      ["21,446–21,454", "9 EMA + prior POC", "Support"],
      ["21,458–21,466", "21 EMA + London VWAP", "Decision"],
      ["21,525–21,532", "Buy-side liquidity", "Target"],
    ],
    scenarios: [
      {
        title: "Scenario A",
        subtitle: "Liquidity Sweep",
        direction: "LONG",
        status: "Active",
        condition: "If price sweeps 21,431–21,440 and reclaims the level on a 5m close…",
        target: "Then target 21,510 → 21,525",
        stop: "Invalid below 21,418",
      },
      {
        title: "Scenario B",
        subtitle: "9 / 21 EMA Bounce",
        direction: "LONG",
        status: "Active",
        condition: "If price retests the 9 / 21 EMA zone at 21,446–21,454 with buyer absorption…",
        target: "Then target 21,486 → 21,510",
        stop: "Invalid below 21,431",
      },
    ],
  },
  {
    price: "21,475.75",
    modelRead: "Neutral to Bullish",
    bias: "Watch 21,440 pivot",
    summary:
      "The overnight auction remains balanced around the point of control, but sellers failed to extend below the London low. A clean acceptance above the 21 EMA cluster would shift the intraday auction toward the upper liquidity pool.",
    structure: [
      "Overnight profile remains rotational around POC.",
      "Sell-side sweep below London low was absorbed.",
      "A break above 21,510 opens the upper distribution.",
    ],
    metrics: [
      ["Asia Session", "21,462.50", "21,412.25"],
      ["London Session", "21,498.25", "21,429.75"],
      ["Overnight POC", "21,441.50", "Volume node"],
      ["Value Area", "21,512.25", "21,402.00"],
    ],
    alignment: {
      score: "68% aligned",
      summary:
        "MES is holding firm but MNQ is lagging slightly at the 21 EMA. Keep the bullish read conditional until tech catches back up.",
      markets: [
        ["MNQ", "+0.18%", "Lagging", "amber"],
        ["MES", "+0.34%", "Stronger", "emerald"],
      ],
    },
    headline: {
      source: "High-impact monitor · sample feed",
      text: "No new high-impact political or macro headline detected in this simulation.",
      impact:
        "Monitoring: policy remarks, CPI / employment releases, Fed speakers, and unexpected geopolitical headlines.",
    },
    zones: [
      ["21,439–21,447", "9 EMA + POC", "Support"],
      ["21,465–21,474", "21 EMA + VWAP", "Decision"],
      ["21,510–21,518", "Buy-side liquidity", "Target"],
    ],
    scenarios: [
      {
        title: "Scenario A",
        subtitle: "Liquidity Sweep",
        direction: "LONG",
        status: "Triggered",
        condition: "If price sweeps 21,430 and quickly regains the London opening range…",
        target: "Then target 21,498 → 21,512",
        stop: "Invalid below 21,417",
      },
      {
        title: "Scenario B",
        subtitle: "9 / 21 EMA Bounce",
        direction: "LONG",
        status: "Active",
        condition: "If price holds above the 21 EMA cluster on a pullback…",
        target: "Then target 21,510 → 21,535",
        stop: "Invalid below 21,440",
      },
    ],
  },
];

const STATUS_STYLES: Record<Scenario["status"], string> = {
  Active: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  Triggered: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  Invalidated: "border-rose-400/25 bg-rose-400/10 text-rose-200",
};

const MARKET_BORDER: Record<string, string> = {
  emerald: "border-emerald-400/15",
  cyan: "border-cyan-400/15",
  amber: "border-amber-400/15",
  rose: "border-rose-400/15",
};

function useEasternClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const clock = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now),
    [now]
  );
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(now),
    [now]
  );
  return { clock, date };
}

export default function MnqAssistant() {
  const { clock, date } = useEasternClock();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scenarioStatuses, setScenarioStatuses] = useState<Scenario["status"][][]>(
    BRIEFING_VARIANTS.map((b) => b.scenarios.map((s) => s.status))
  );
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>("—");

  const data = BRIEFING_VARIANTS[activeIndex];

  const stampUpdated = useCallback(() => {
    setUpdatedAt(
      `${new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
      }).format(new Date())} EST`
    );
  }, []);

  useEffect(() => {
    stampUpdated();
  }, [stampUpdated]);

  const regenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setActiveIndex((i) => (i + 1) % BRIEFING_VARIANTS.length);
    stampUpdated();
    setLoading(false);
  };

  const cycleScenario = (i: number) => {
    setScenarioStatuses((prev) => {
      const next = prev.map((arr) => [...arr]);
      const cur = next[activeIndex][i];
      next[activeIndex][i] = cur === "Active" ? "Triggered" : cur === "Triggered" ? "Invalidated" : "Active";
      return next;
    });
  };

  return (
    <div className="min-h-screen text-slate-100 antialiased" style={{ background: "#090b10" }}>
      {/* Portfolio return bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-11 border-b border-white/10 bg-[#090b10]/90 backdrop-blur-md">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          ← Back to Portfolio
        </Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Artifact 02 — Live Demo · Simulated Data
        </p>
      </div>

      <main className="mnq-grid-pattern min-h-screen px-4 py-5 sm:px-6 lg:px-8">
        <style>{`
          .mnq-grid-pattern { background-image: linear-gradient(rgba(148,163,184,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.035) 1px, transparent 1px); background-size: 28px 28px; }
          @media (prefers-reduced-motion: no-preference) {
            .mnq-scanline { animation: mnqScan 2.5s ease-in-out infinite; }
            @keyframes mnqScan { 0%,100% { opacity:.15; transform:translateX(-35%); } 50% { opacity:.85; transform:translateX(35%); } }
          }
          .mnq-glow { box-shadow: 0 0 0 1px rgba(52,211,153,.08), 0 16px 48px rgba(0,0,0,.28); }
        `}</style>
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-5 border-b border-[#242936] pb-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="mnq-glow flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-lg font-bold text-emerald-300">
                M
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight text-white">MNQ AI Assistant</h1>
                  <span className="rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-300">
                    LIVE
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  Pre-Market Intelligence <span className="mx-1 text-slate-700">/</span> Micro E-mini Nasdaq-100
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-slate-200">{date}</p>
                <p className="mt-0.5 text-xs text-slate-500">New York session</p>
              </div>
              <div className="h-8 w-px bg-[#242936]" />
              <div className="min-w-[112px]">
                <p className="font-mono text-lg font-semibold tabular-nums text-white">{clock}</p>
                <p className="text-[10px] font-medium tracking-[.16em] text-slate-500">EASTERN TIME</p>
              </div>
              <button
                onClick={regenerate}
                disabled={loading}
                className="group inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/70 disabled:cursor-wait disabled:opacity-70 active:scale-[0.97]"
              >
                <svg
                  className={`h-4 w-4 transition-transform group-hover:rotate-45 ${loading ? "animate-spin" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{loading ? "Analyzing Market…" : "Generate Briefing"}</span>
              </button>
            </div>
          </header>

          {/* Top stats */}
          <section className="mb-5 grid gap-3 md:grid-cols-3">
            <div className="mnq-glow rounded-lg border border-[#242936] bg-[#10131b]/80 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-500">Contract</p>
              <p className="mt-1 text-sm font-semibold text-white">
                MNQ1! <span className="ml-1 text-xs font-normal text-slate-500">Micro Nasdaq Futures</span>
              </p>
            </div>
            <div className="mnq-glow rounded-lg border border-[#242936] bg-[#10131b]/80 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-500">Last Price</p>
              <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">{data.price}</p>
            </div>
            <div className="mnq-glow rounded-lg border border-[#242936] bg-[#10131b]/80 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-500">Model Read</p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">{data.modelRead}</p>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
            {/* Left rail — session reference */}
            <aside className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Session Reference</h2>
                <span className="ml-3 h-px flex-1 bg-[#242936]" />
              </div>
              <div className="space-y-3">
                {data.metrics.map(([label, high, low]) => (
                  <article key={label} className="mnq-glow rounded-xl border border-[#242936] bg-[#10131b] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-500">{label}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-slate-500">{low === "Volume node" ? "Price" : "High / VAH"}</p>
                        <p className="mt-0.5 font-mono text-sm font-semibold text-slate-100">{high}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500">{low === "Volume node" ? "Role" : "Low / VAL"}</p>
                        <p className={`mt-0.5 font-mono text-sm font-semibold ${low === "Volume node" ? "text-violet-300" : "text-slate-300"}`}>
                          {low}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mnq-glow rounded-xl border border-[#242936] bg-[#10131b] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-300">Overnight Range</p>
                  <span className="font-mono text-xs text-slate-400">106.50 pts</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" style={{ width: "74%" }} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                  <span>Low</span>
                  <span>74% from range low</span>
                  <span>High</span>
                </div>
              </div>
            </aside>

            {/* Center — briefing */}
            <section className="mnq-glow overflow-hidden rounded-xl border border-[#242936] bg-[#10131b]">
              <div className="relative overflow-hidden border-b border-[#242936] px-5 py-4 sm:px-6">
                <div className="mnq-scanline absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-emerald-300">09:00 EST AI Briefing</p>
                    <h2 className="mt-1 text-lg font-semibold text-white">Daily Bias &amp; Market Structure</h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {data.bias}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="max-w-3xl text-[15px] leading-7 text-slate-300">{data.summary}</p>
                <div className="my-6 h-px bg-[#242936]" />
                <div className="grid gap-4 lg:grid-cols-2">
                  <article className="rounded-lg border border-cyan-400/15 bg-cyan-400/[.035] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-300" />
                        <h3 className="text-sm font-semibold text-slate-100">MNQ / MES Alignment</h3>
                      </div>
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold text-cyan-200">
                        {data.alignment.score}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-400">{data.alignment.summary}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {data.alignment.markets.map(([market, move, read, color]) => (
                        <div key={market} className={`rounded-md border ${MARKET_BORDER[color] ?? "border-slate-700"} bg-slate-950/30 px-3 py-2`}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-slate-200">{market}</span>
                            <span className="font-mono text-[11px] text-slate-300">{move}</span>
                          </div>
                          <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">{read}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                  <article className="rounded-lg border border-rose-400/20 bg-rose-400/[.035] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
                        <h3 className="text-sm font-semibold text-slate-100">High-Impact Monitor</h3>
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide text-rose-300">HEADLINE ALERT</span>
                    </div>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.12em] text-rose-300">{data.headline.source}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{data.headline.text}</p>
                    <p className="mt-3 border-t border-rose-400/10 pt-2 text-[11px] text-slate-500">{data.headline.impact}</p>
                  </article>
                </div>
                <div className="my-6 h-px bg-[#242936]" />
                <div className="grid gap-5 lg:grid-cols-2">
                  <article className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <h3 className="text-sm font-semibold text-slate-100">Structure Read</h3>
                    </div>
                    <ul className="mt-3 space-y-2.5 text-sm leading-5 text-slate-400">
                      {data.structure.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                  <article className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-violet-400" />
                      <h3 className="text-sm font-semibold text-slate-100">9 / 21 EMA &amp; SMT Convergence</h3>
                    </div>
                    <div className="mt-3 space-y-2">
                      {data.zones.map(([level, reason, tag]) => (
                        <div key={level} className="flex items-center justify-between gap-2 rounded-md border border-slate-800 px-3 py-2">
                          <div>
                            <p className="font-mono text-xs font-semibold text-slate-200">{level}</p>
                            <p className="mt-0.5 text-[10px] text-slate-500">{reason}</p>
                          </div>
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
                <div className="mt-5 rounded-lg border border-amber-400/15 bg-amber-400/[.045] px-4 py-3">
                  <p className="text-xs leading-5 text-amber-100/75">
                    <span className="font-semibold text-amber-200">Risk protocol:</span> Wait for confirmation at stated
                    levels. This briefing is analytical mock data and not financial advice.
                  </p>
                </div>
              </div>
            </section>

            {/* Right rail — scenarios */}
            <aside className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">If / Then Execution</h2>
                <span className="ml-3 h-px flex-1 bg-[#242936]" />
              </div>
              <div className="space-y-3">
                {data.scenarios.map((s, i) => {
                  const status = scenarioStatuses[activeIndex][i];
                  return (
                    <button
                      key={s.title}
                      onClick={() => cycleScenario(i)}
                      className="mnq-glow w-full rounded-xl border border-[#242936] bg-[#10131b] p-4 text-left transition hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-white">
                            {s.title} <span className="font-normal text-slate-500">· {s.subtitle}</span>
                          </p>
                          <p className={`mt-1 text-[10px] font-bold tracking-[.14em] ${s.direction === "LONG" ? "text-emerald-300" : "text-rose-300"}`}>
                            {s.direction}
                          </p>
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${STATUS_STYLES[status]}`}>{status}</span>
                      </div>
                      <p className="mt-4 text-xs leading-5 text-slate-400">{s.condition}</p>
                      <div className="mt-4 space-y-1 border-t border-slate-800 pt-3 text-[11px]">
                        <p className="text-emerald-300">
                          <span className="text-slate-500">TARGET </span>
                          {s.target}
                        </p>
                        <p className="text-rose-300">
                          <span className="text-slate-500">RISK </span>
                          {s.stop}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="px-1 text-[11px] leading-5 text-slate-500">Click a scenario card to cycle its monitoring status.</p>
            </aside>
          </section>

          <footer className="mt-6 flex flex-col justify-between gap-2 border-t border-[#242936] pt-4 text-[11px] text-slate-600 sm:flex-row">
            <p>Signal engine: liquidity sweeps · volume profile · EMA alignment</p>
            <p>Last generated {updatedAt}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
