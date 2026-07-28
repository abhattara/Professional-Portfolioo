/* MIDNIGHT QUANT — bio: asymmetric 7/5 split, code-meets-music accent image in gutter */
import IndexTag from "@/components/IndexTag";
import { useReveal } from "@/hooks/useReveal";

export default function Bio() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="bio" ref={ref} className="relative py-24 lg:py-32 border-t border-border">
      <div className="container grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <div className="reveal">
            <IndexTag index="01" label="Professional Bio" meta="KTM → DAL" />
          </div>
          <h2 className="reveal font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mt-6" style={{ "--reveal-delay": "60ms" } as React.CSSProperties}>
            A Dual-Core <span className="text-primary">Background</span>
          </h2>
          <div className="reveal space-y-5 text-muted-foreground leading-[1.75] mt-8 text-[15px] sm:text-base" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <p>
              I am a Dallas-based Software Engineer, originally from Nepal, who holds a
              unique academic pedigree — a Bachelor's degree in{" "}
              <span className="text-foreground font-medium">Computer Science and Music Performance</span>.
              This foundation enables me to tackle complex coding workflows with
              mathematical precision while leveraging creative, improvisational
              problem-solving.
            </p>
            <p>
              In my free time, I remain highly active, engaging in sports such as
              basketball, soccer, and tennis — keeping my focus sharp and my team
              coordination natural.
            </p>
            <p className="text-foreground/90">
              Four years of full-stack industry experience combined with analytical
              &amp; artistic discipline.
            </p>
          </div>

          <div className="reveal grid sm:grid-cols-3 gap-px bg-border mt-10 border border-border" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            {[
              { t: "Precision", d: "Mathematical rigor from computer science" },
              { t: "Improvisation", d: "Creative problem-solving from music" },
              { t: "Coordination", d: "Team instincts sharpened on the court" },
            ].map((c) => (
              <div key={c.t} className="bg-background px-5 py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{c.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 reveal" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <figure className="relative border border-border">
            <img
              src="/manus-storage/bio-accent_66d8771f.png"
              alt="Illustration blending piano keys, code and sound waves"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <figcaption className="absolute bottom-0 inset-x-0 px-5 py-3 bg-gradient-to-t from-black/75 to-transparent">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/85">
                FIG. 01 — CS × Music Performance, dual discipline
              </p>
            </figcaption>
            <p className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-[0.25em] text-primary bg-background/85 border-b border-r border-border px-3 py-2">
              SRC / BIO
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}
