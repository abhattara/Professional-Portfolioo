/*
  ARTIFACT 04 — Grounded retrieval for the portfolio concierge.
  The corpus is the portfolio's own content. Scoring is BM25 over the chunked corpus, entirely
  client-side: no model, no network, no keys. Below CONFIDENCE_FLOOR the concierge refuses rather
  than answering — an ungrounded answer is the failure mode this artifact exists to demonstrate.
*/

export type Chunk = {
  id: string;
  section: string;
  anchor: string;
  topic: string;
  text: string;
};

export type Retrieval =
  | { grounded: true; chunk: Chunk; score: number; matched: string[] }
  | { grounded: false; score: number; matched: string[]; nearest: Chunk | null };

/* Answers below this normalized score are refused rather than guessed. */
export const CONFIDENCE_FLOOR = 0.18;

export const CORPUS: Chunk[] = [
  {
    id: "identity",
    section: "Intro",
    anchor: "top",
    topic: "Who Abhi is",
    text: "Abhi Bhattarai is a Dallas, Texas based Software Engineer and AI Change Leader. He integrates AI into full-stack architectures and financial technology systems — production-grade, secure, and built to forecast. His guiding principle is signal over noise, in markets and in code.",
  },
  {
    id: "background",
    section: "Bio",
    anchor: "bio",
    topic: "Background and education",
    text: "Originally from Nepal and now based in Dallas, Abhi holds a dual Bachelor's degree in Computer Science and Music Performance. The combination lets him approach complex coding workflows with mathematical precision while drawing on creative, improvisational problem-solving. He has four years of full-stack industry experience, and stays active playing basketball, soccer, and tennis.",
  },
  {
    id: "value",
    section: "Value",
    anchor: "value",
    topic: "What he delivers professionally",
    text: "Abhi's professional value centers on delivering production-grade, secure, and highly scalable software. He combines standard full-stack paradigms with intelligent AI agents to solve practical business problems: optimizing complex database schemas, programming secure custom web layers, and designing fintech prediction APIs. He translates complex client requirements into working technology assets.",
  },
  {
    id: "vision",
    section: "Vision",
    anchor: "vision",
    topic: "Long-term goals in AI and FinTech",
    text: "Abhi's long-term aspiration is to build machine learning layers directly into scalable financial applications. Three directions: Temporal Fusion Transformers for multi-horizon stock trajectory forecasting; multimodal sentiment engines using LLMs to read earnings transcripts, market headlines, and volatility indices in real time; and autonomous portfolio agents using reinforcement learning to simulate market stress tests and rebalance portfolios.",
  },
  {
    id: "artifact-01",
    section: "Artifact 01",
    anchor: "artifact",
    topic: "Artifact 1 — the AI history timeline",
    text: "Artifact 1 is 'The Evolution of AI and ML: Eras, Winters, and Breakthroughs'. It maps more than seventy years of artificial intelligence into seven distinct eras and analyzes what caused the two AI Winters. It was built in PowerPoint and Canva using academic research databases, in collaboration with peers. Its value is a systemic understanding of AI's history that prevents naive engineering assumptions.",
  },
  {
    id: "artifact-01-eras",
    section: "Artifact 01",
    anchor: "artifact",
    topic: "The seven eras of AI",
    text: "The seven eras are: Symbolic AI or GOFAI from 1950 to 1973; the first AI Winter from 1974 to 1980; Expert Systems from 1980 to 1986 including MYCIN and XCON; the second AI Winter from 1987 to 1993; statistical Machine Learning from 1994 to 2011 including SVMs, random forests, and IBM Watson; Deep Learning from 2012 to 2021 driven by GPUs, AlexNet, and AlphaGo; and Generative and Cloud AI from 2022 to 2026 beginning with ChatGPT.",
  },
  {
    id: "artifact-01-lessons",
    section: "Artifact 01",
    anchor: "artifact",
    topic: "Lessons from the AI Winters",
    text: "Three historical lessons. Avoid hype cycles: both AI Winters followed overpromising and underdelivering, so technical benchmarks must stay transparent and honest. Hardware is king: 1980s algorithms failed because processors could not handle the matrix computations. Rules versus probability: narrow logic-only expert systems break under real-world noise, so modern systems need probabilistic classifiers to stay resilient.",
  },
  {
    id: "artifact-02",
    section: "Artifact 02",
    anchor: "artifact-02",
    topic: "Artifact 2 — the Futures AI Assistant",
    text: "Artifact 2 is the Futures AI Assistant, an MNQ pre-market briefing tool for Micro E-mini Nasdaq-100 futures. It compresses a discretionary pre-market routine into a single briefing that states a directional bias and the conditions that would invalidate it. Built with React, TypeScript, Tailwind CSS, and Vite, with the briefing state modeled as typed variants. It is available in the portfolio at the /mnq-assistant route.",
  },
  {
    id: "artifact-02-signals",
    section: "Artifact 02",
    anchor: "artifact-02",
    topic: "What the futures assistant reads",
    text: "The assistant reads four things. Directional bias: a single model read of bias, last price, and confidence derived from overnight price discovery against the prior value area. MNQ and MES alignment: cross-index confirmation, so the Nasdaq read is only trusted when the S&P contract agrees. A high-impact headline monitor. And if/then execution scenarios, each carrying a trigger condition, a target, and an invalidation level. Its signal set includes liquidity sweeps, volume profile, EMA alignment, and SMT divergence. It uses analytical mock data and is not financial advice.",
  },
  {
    id: "artifact-03",
    section: "Artifact 03",
    anchor: "artifact-03",
    topic: "Artifact 3 — the Turing Test exhibit",
    text: "Artifact 3 is 'The Turing Test: Where the Whole Field Begins', an interactive exhibit of Alan Turing's 1950 imitation game from the paper 'Computing Machinery and Intelligence' in Mind 59. Visitors interrogate two hidden witnesses over a simulated teleprinter, name which one is the machine, and then reveal the tells. Both witnesses are scripted and rule-based — no language model is involved. It lives at the /turing-test route.",
  },
  {
    id: "artifact-03-argument",
    section: "Artifact 03",
    anchor: "artifact-03",
    topic: "Turing's argument, the objections, and why it still matters",
    text: "Turing replaced the loaded question 'can machines think?' with a behavioural test that can actually be run. He predicted that within fifty years a machine would fool an average interrogator at least thirty percent of the time in five minutes of questioning — a forecast about storage and fluency, not consciousness. He answered the standard objections: Lady Lovelace's claim that a machine only does what it is told, the mathematical objection, and the argument from consciousness. The lasting lesson is that fluency was never evidence of understanding.",
  },
  {
    id: "artifact-04",
    section: "Artifact 04",
    anchor: "artifact-04",
    topic: "Artifact 4 — this concierge",
    text: "Artifact 4 is the Portfolio Concierge, the chatbot you are using now. It answers questions about Abhi using only the portfolio's own content as its corpus. Retrieval is BM25 over chunked passages, computed in the browser — there is no language model, no API key, and no network call. Every answer cites the section it came from and shows a match score, and questions outside the corpus are refused rather than guessed.",
  },
  {
    id: "artifact-04-why",
    section: "Artifact 04",
    anchor: "artifact-04",
    topic: "Why the concierge refuses questions",
    text: "The refusal behaviour is the point of this artifact. A fluent system that answers everything is indistinguishable from one that understands nothing — the lesson of Artifact 3. Grounding the concierge in a fixed corpus and forcing it to abstain below a confidence floor makes its knowledge boundary visible instead of hidden. Saying 'that is not in my corpus' is a designed feature, not a limitation.",
  },
  {
    id: "outlook",
    section: "Outlook",
    anchor: "outlook",
    topic: "Responsible AI outlook",
    text: "Abhi's strategic outlook centers on responsible AI: deploying intelligent systems with transparent benchmarks, explicit limitations, and human accountability, particularly in financial contexts where an unreliable model does measurable damage.",
  },
  {
    id: "stack",
    section: "Portfolio",
    anchor: "top",
    topic: "How this portfolio is built",
    text: "The portfolio itself is a React and TypeScript single-page application styled with Tailwind CSS, built with Vite, routed with Wouter, and deployed as a static site on Vercel. Its visual system is called Midnight Quant: dark ink-navy backgrounds, signal cyan accents, monospace section labels, hairline ledger borders, and restrained motion. All images are vendored locally so the site has no external service dependencies.",
  },
  {
    id: "contact",
    section: "Footer",
    anchor: "outlook",
    topic: "Location and contact",
    text: "Abhi is based in Dallas, Texas. The portfolio is his professional dossier for 2026, converted from an original portfolio presentation into a deployed web application.",
  },
];

const STOPWORDS = new Set([
  "a","the","is","are","was","were","be","been","being","of","to","in","on","for","with","and","or","but","as","at","by","from","that","this","these","those","it","its","he","she","they","you","your","his","her","their","what","which","who","whom","how","why","when","where","do","does","did","can","could","would","should","will","shall","may","might","must","have","has","had","i","me","my","we","us","our","about","tell","know","there","if","so","than","then","also","any","all",
]);

/* Light stemmer: enough to bridge plural/gerund forms without pulling in a dependency. */
function stem(token: string) {
  return token
    .replace(/(ies)$/, "y")
    .replace(/(sses|shes|ches|xes)$/, "")
    .replace(/([^s])s$/, "$1")
    .replace(/(ing|ed)$/, "");
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .split(/\s+/)
    /* Single digits are kept: "artifact 2" must not collapse into bare "artifact". */
    .filter((t) => (t.length > 1 || /^\d$/.test(t)) && !STOPWORDS.has(t))
    .map(stem);
}

const K1 = 1.5;
const B = 0.75;

const DOCS = CORPUS.map((chunk) => {
  /* Topic is indexed twice so a chunk's own subject outweighs passing mentions elsewhere. */
  const tokens = tokenize(`${chunk.topic} ${chunk.topic} ${chunk.text}`);
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) ?? 0) + 1);
  return { chunk, freq, length: tokens.length };
});

const AVG_LEN = DOCS.reduce((sum, d) => sum + d.length, 0) / DOCS.length;

const DF = (() => {
  const df = new Map<string, number>();
  for (const doc of DOCS) doc.freq.forEach((_count, term) => df.set(term, (df.get(term) ?? 0) + 1));
  return df;
})();

function idf(term: string) {
  const n = DOCS.length;
  const df = DF.get(term) ?? 0;
  return Math.log(1 + (n - df + 0.5) / (df + 0.5));
}

/* Best possible score for this query, used to normalize into a 0–1 confidence. */
function ceiling(terms: string[]) {
  return terms.reduce((sum, t) => sum + idf(t) * ((K1 + 1) / 1), 0);
}

export function retrieve(query: string): Retrieval {
  const terms = tokenize(query);
  if (terms.length === 0) return { grounded: false, score: 0, matched: [], nearest: null };

  let best: { doc: (typeof DOCS)[number]; score: number; matched: string[] } | null = null;
  for (const doc of DOCS) {
    let score = 0;
    const matched: string[] = [];
    for (const term of terms) {
      const tf = doc.freq.get(term);
      if (!tf) continue;
      matched.push(term);
      const norm = tf * (K1 + 1);
      const denom = tf + K1 * (1 - B + (B * doc.length) / AVG_LEN);
      score += idf(term) * (norm / denom);
    }
    if (!best || score > best.score) best = { doc, score, matched };
  }

  if (!best || best.score === 0) return { grounded: false, score: 0, matched: [], nearest: null };

  const confidence = Math.min(1, best.score / ceiling(terms));
  if (confidence < CONFIDENCE_FLOOR) {
    return { grounded: false, score: confidence, matched: best.matched, nearest: best.doc.chunk };
  }
  return { grounded: true, chunk: best.doc.chunk, score: confidence, matched: best.matched };
}

export const SUGGESTED_QUESTIONS = [
  "What is Abhi's background?",
  "What was Artifact 2 about?",
  "Why does the Turing test still matter?",
  "What are his long-term goals in fintech?",
  "What caused the AI Winters?",
  "How is this portfolio built?",
];
