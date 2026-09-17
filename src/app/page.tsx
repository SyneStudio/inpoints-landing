import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { CombatSports } from "@/components/sections/CombatSports";
import { Tools } from "@/components/sections/Tools";
import { DeepDives } from "@/components/sections/DeepDives";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { TimeSaving } from "@/components/sections/TimeSaving";
import { Quote } from "@/components/sections/Quote";

/**
 * La page, dans l'ordre où un organisateur la lit : ce qu'est Inpoints, pour
 * quels sports, avec quels outils, les quatre qui comptent, l'application
 * entière, ce qu'on y gagne, et comment demander un devis.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <CombatSports />
        <Tools />
        <DeepDives />
        <AppShowcase />
        <TimeSaving />
        <Quote />
      </main>
      <Footer />
    </>
  );
}
