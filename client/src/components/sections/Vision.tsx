/* MIDNIGHT QUANT — AI-in-FinTech vision: image left, arrow-listed research thrusts right */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";

const THRUSTS = [
  {
    t: "Temporal Fusion Transformers (TFTs)",
    d: "Modeling multi-horizon stock trajectory forecasts while identifying cross-time dependencies.",
  },
  {
    t: "Multimodal Sentiment Engines",
    d: "Leveraging LLMs to analyze earnings transcripts, market headlines, and volatility indices in real time.",
  },
  {
    t: "Autonomous Portfolio Agents",
    d: "Building reinforcement learning pipelines to simulate market stress tests and execute automatic portfolio rebalancing.",
  },
];

export default function Vision() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="vision" ref={ref} className="relative py-24 lg:py-32 border-t border-border">
      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 reveal" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <figure className="relative border border-border">
            <img
              src="/manus-storage/vision-fintech_7db634c5.png"
              alt="Holographic trading dashboard with forecast fan charts and neural nodes"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.25em] text-primary bg-background/85 border-b border-r border-border px-3 py-2">
              FIG. 02 — Market forecasting layer
            </figcaption>
            <p className="absolute bottom-0 inset-x-0 px-5 py-3 bg-gradient-to-t from-black/75 to-transparent font-mono text-[10px] uppercase tracking-[0.25em] text-white/85">
              Multi-horizon forecast fan · probabilistic paths
            </p>
          </figure>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="reveal">
            <IndexTag index="03" label="Core Vision — AI in FinTech" meta="ML × Markets" />
          </div>
          <h2 className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            Revolutionizing <span className="text-primary">Market Forecasting</span>
          </h2>
          <p className="reveal text-muted-foreground leading-[1.75] mt-6 text-[15px] sm:text-base max-w-2xl" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            My long-term aspiration is to build and integrate advanced machine learning
            layers directly into scalable financial applications:
          </p>

          <ol className="mt-8 space-y-px">
            {THRUSTS.map((item, i) => (
              <li
                key={item.t}
                className="reveal ledger-cell rounded-sm bg-card/40 px-5 sm:px-6 py-5 flex gap-5 items-start"
                style={{ "--reveal-delay": `${180 + i * 60}ms` } as React.CSSProperties}
              >
                <span className="font-mono text-primary text-sm pt-0.5 shrink-0">0{i + 1} ▸</span>
                <div>
                  <p className="font-display font-semibold text-base sm:text-lg">{item.t}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{item.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
