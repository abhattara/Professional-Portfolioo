/*
  MIDNIGHT QUANT — Deep-Sea Data Noir single-page portfolio.
  Section order mirrors the source deck: Hero → Bio → Value → Vision → Artifact 01 → Artifact 02 → Artifact 03 → Artifact 04 → Outlook → Footer.
  Left nav rail (desktop) / top bar (mobile). Content offset right of the 4rem rail on lg+.
*/
import NavRail from "@/components/NavRail";
import Artifact from "@/components/sections/Artifact";
import Artifact02 from "@/components/sections/Artifact02";
import Artifact03 from "@/components/sections/Artifact03";
import Artifact04 from "@/components/sections/Artifact04";
import Bio from "@/components/sections/Bio";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Outlook from "@/components/sections/Outlook";
import Value from "@/components/sections/Value";
import Vision from "@/components/sections/Vision";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavRail />
      <main className="lg:pl-16 pt-14 lg:pt-0">
        <Hero />
        <Bio />
        <Value />
        <Vision />
        <Artifact />
        <Artifact02 />
        <Artifact03 />
        <Artifact04 />
        <Outlook />
        <Footer />
      </main>
    </div>
  );
}

