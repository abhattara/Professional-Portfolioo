/* MIDNIGHT QUANT — strategic outlook: AI-head asset from original deck + responsibility statement */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";

export default function Outlook() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="outlook" ref={ref} className="relative py-24 lg:py-32 border-t border-border bg-sidebar overflow-hidden">
      <img
        src="/assets/ai-head.webp"
        alt=""
        aria-hidden
        className="absolute right-0 top-0 h-full w-auto object-cover opacity-30 pointer-events-none hidden md:block"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/90 to-transparent" />
      <div className="relative container">
        <div className="max-w-2xl">
          <div className="reveal">
            <IndexTag index="08" label="Strategic Outlook" meta="RESPONSIBLE AI" />
          </div>
          <h2 className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            Our Next-Generation <span className="text-primary">Responsibilities</span>
          </h2>
          <div className="reveal space-y-5 text-muted-foreground leading-[1.75] mt-8 text-[15px] sm:text-base" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              Building modern software products goes beyond basic functional scripts. As
              engineers, we must deploy AI models responsibly — ensuring strict{" "}
              <span className="text-foreground font-medium">user data privacy</span>,{" "}
              <span className="text-foreground font-medium">algorithm transparency</span>, and{" "}
              <span className="text-foreground font-medium">bias reduction checks</span>.
            </p>
            <p>
              Understanding our structural roots empowers us to navigate the current
              generative revolution securely, building high-value fintech tools with
              clear parameters.
            </p>
          </div>
          <div className="reveal flex flex-wrap gap-3 mt-9" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            {["Data Privacy", "Algorithm Transparency", "Bias Reduction"].map((t) => (
              <span key={t} className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary border border-primary/35 rounded-sm px-3.5 py-2">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
