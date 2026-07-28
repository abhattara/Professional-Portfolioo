# Design Brainstorm — Abhi Bhattarai Portfolio

Source material: a PPTX portfolio deck (dark navy + cyan fintech/AI aesthetic). The site converts the deck into a single-page scrolling portfolio: Hero → Bio → Value Proposition → AI-in-FinTech Vision → Portfolio Artifact 1 (Seven Eras of AI timeline, Lessons, Outlook) → Footer.

## Three Candidate Directions

### 1. "Terminal Ledger" — Fintech Editorial
Light paper-cream background with ink-black serif display type, financial-report ruling lines, and a single signal-green accent — like a beautifully typeset annual report meets a Bloomberg terminal. Probability: 0.06

### 2. "Midnight Quant" — Deep-Sea Data Noir
A deep navy/ink world with cyan data-glow accents, echoing the deck's own aesthetic — neural wireframes, chart glints, precise mono labels. Feels like the inside of a trading engine. Probability: 0.04

### 3. "Blueprint Draft" — Engineering Schematic
Off-white blueprint-grid canvas with cobalt line-work, stamped labels, and drafting annotations, presenting the portfolio like an engineer's technical drawing set. Probability: 0.02

## CHOSEN: "Midnight Quant" — Deep-Sea Data Noir

Chosen because the source deck already lives in this world (dark navy + cyan, neural network imagery, Dallas skyline glow) and the extracted PPTX assets (title art, AI-head wireframe) integrate seamlessly. This is fidelity-driven, not a reflexive dark-neon choice.

- **Design Movement**: Data-noir editorial — a blend of Swiss typographic rigor and terminal/quant-desk ambiance. Think Palantir's restraint + a Bloomberg terminal's information density, softened with editorial spacing.
- **Core Principles**:
  1. Ink-deep backgrounds with luminous cyan used sparingly as *signal*, never decoration-spam.
  2. Mono-labeled precision: every section carries an index code (01 / BIO) like a data schema.
  3. Asymmetric editorial layout — content rails offset left, marginalia and metrics in a right/left gutter.
  4. Quiet motion: things fade/slide 12–24px, never bounce.
- **Color Philosophy**: Base is near-black ink-navy (oklch ~0.16 hue 240) evoking market pre-dawn; cyan (#22d3ee family) is the "live signal" color reserved for data, links, and key numerals; a soft slate-blue for secondary text. One warm off-white for headlines keeps it human. Emotional intent: calm command-center confidence.
- **Layout Paradigm**: Vertical ledger — a thin fixed left rail with section index + nav dots; main column is asymmetric (7/5 splits), timeline rendered as an actual vertical market-timeline with era nodes; tables styled like trading-desk data sheets.
- **Signature Elements**:
  1. Mono uppercase index tags with a cyan tick (e.g., `▸ 03 / VISION`).
  2. Hairline 1px borders at 10% white forming ledger cells.
  3. A subtle animated "ticker" line / chart-glow gradient under the hero.
- **Interaction Philosophy**: Interface responds like a precise instrument — instant hover states (border brightens to cyan, 150ms), scroll-triggered reveals, no gimmicks.
- **Animation**: IntersectionObserver fade-up (16px, 500ms, cubic-bezier(0.23,1,0.32,1)), staggered 60ms for grouped cards; hero has a slow ambient gradient drift; timeline nodes pulse once when entering view. Respect prefers-reduced-motion.
- **Typography System**: "Space Grotesk" for display headlines (600/700), "IBM Plex Mono" for index labels/metrics/captions, "Inter" strictly for body paragraphs at 15–16px/1.7. Hierarchy: mono eyebrow → grotesk headline → body.
- **Brand Essence**: A Dallas-based engineer who fuses full-stack rigor with AI-driven market intelligence — for teams that need production-grade fintech AI, not demos. Personality: precise, composed, quietly ambitious.
- **Brand Voice**: Declarative, engineered sentences; numbers do the talking. Examples: "Four years shipping full-stack systems. Now teaching them to forecast." / "Signal over noise — in markets and in code."
- **Wordmark & Logo**: Monogram "AB" built from an ascending chart-stroke inside a rounded square; wordmark set in Space Grotesk with a cyan terminal-cursor block after the name ("Abhi Bhattarai ▍").
- **Signature Brand Color**: Signal Cyan — oklch(0.82 0.13 211) / ~#22d3ee, used only where the eye must go.

## Style Decisions

- Every major section must visibly participate in the vertical ledger system: mono section code, cyan tick, hairline rule/cell structure, and a clear relationship to the page's left-side data rail.
- The AB monogram and "Abhi Bhattarai ▍" wordmark must appear in the opening viewport as the primary brand lockup, with Signal Cyan reserved for the cursor, key numerals, and active data signals.
- Imagery must read as technical figures from one AI/fintech dossier — chart overlays, figure labels, Dallas/market references, neural wireframes, and captions — never as standalone generic AI stock visuals.
