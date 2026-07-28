/* MIDNIGHT QUANT — value proposition: big numeral left gutter, ledger cards */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";
import { Database, Layers, TrendingUp } from "lucide-react";

export default function Value() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="value" ref={ref} className="relative py-24 lg:py-32 border-t border-border bg-sidebar">
      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left gutter numeral */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="reveal">
            <IndexTag index="02" label="Value Proposition" meta="PROD-GRADE" />
            <p className="font-display font-bold text-7xl sm:text-8xl text-primary glow-cyan mt-8 leading-none">
              4<span className="text-foreground/40">+</span>
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mt-4">
              Years Full-Stack Experience
            </p>
          </div>
          <p className="reveal font-mono text-xs text-muted-foreground/70 leading-relaxed mt-10 lg:mt-0 border-l-2 border-primary/40 pl-4" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            Four years shipping full-stack systems.
            <br />
            Now teaching them to forecast.
          </p>
        </div>

        {/* Right content */}
        <div className="lg:col-span-8">
          <h2 className="reveal font-display font-bold text-3xl sm:text-4xl leading-tight" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            Merging Engineering with <span className="text-primary">AI Leadership</span>
          </h2>
          <div className="reveal space-y-5 text-muted-foreground leading-[1.75] mt-6 text-[15px] sm:text-base" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              My value is centered on delivering{" "}
              <span className="text-foreground font-medium">
                production-grade, secure, and highly scalable software solutions
              </span>
              . By combining standard full-stack paradigms with intelligent AI agents, I
              build applications that solve practical business pain points.
            </p>
            <p>
              Whether optimizing complex database schemas, programming custom web layers,
              or designing fintech prediction APIs, I translate complex client
              requirements into dynamic technology assets.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { Icon: Database, t: "Database Schemas", d: "Optimizing complex data models for scale and integrity", delay: "180ms" },
              { Icon: Layers, t: "Custom Web Layers", d: "Programming secure, production-grade application stacks", delay: "240ms" },
              { Icon: TrendingUp, t: "FinTech Prediction APIs", d: "Designing intelligent market-facing service interfaces", delay: "300ms" },
            ].map(({ Icon, t, d, delay }) => (
              <div key={t} className="reveal ledger-cell rounded-sm px-5 py-6 bg-background/40" style={{ "--reveal-delay": delay } as React.CSSProperties}>
                <Icon className="w-5 h-5 text-primary" aria-hidden />
                <p className="font-display font-semibold text-base mt-4">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
