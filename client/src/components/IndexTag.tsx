/* MIDNIGHT QUANT — ledger section header: mono index tag with cyan tick + hairline rule + right meta stamp */
export default function IndexTag({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary/90 flex items-center gap-2 whitespace-nowrap">
        <span aria-hidden className="text-primary">▸</span>
        <span className="text-muted-foreground">{index} /</span>
        <span className="text-foreground/90">{label}</span>
      </p>
      <span aria-hidden className="h-px flex-1 bg-border" />
      {meta && (
        <span className="hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 whitespace-nowrap">
          {meta}
        </span>
      )}
    </div>
  );
}
