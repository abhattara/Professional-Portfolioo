/* MIDNIGHT QUANT — footer: ledger strip with identity stamp */
export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/logo-ab_3a23113f.png" alt="AB monogram" className="w-9 h-9" />
            <div>
              <p className="font-display font-semibold text-base leading-tight">
                Abhi Bhattarai<span aria-hidden className="cursor-blink text-primary">▍</span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                Software Engineer &amp; AI Change Leader
              </p>
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Dallas, TX · {new Date().getFullYear()}
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/60 uppercase">
            Signal over noise — in markets and in code.
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/60 uppercase">
            Converted from the original portfolio presentation
          </p>
        </div>
      </div>
    </footer>
  );
}
