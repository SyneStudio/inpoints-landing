import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { CombatSports } from "@/components/sections/CombatSports";
import { Tools } from "@/components/sections/Tools";
import { Benefits } from "@/components/sections/Benefits";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { Quote } from "@/components/sections/Quote";

/**
 * La page, dans l'ordre où un organisateur la lit : ce qu'est Inpoints, pour
 * quels sports, avec quels outils, ce qu'on y gagne, l'application entière,
 * et comment demander un devis.
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
        <Benefits />
        <AppShowcase />
        <Quote />
      </main>
      <Footer />
    </>
  );
}
