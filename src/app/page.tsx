import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Centralization } from "@/components/sections/Centralization";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Scoreboard } from "@/components/sections/Scoreboard";
import { Sports } from "@/components/sections/Sports";
import { TimeSaving } from "@/components/sections/TimeSaving";
import { Personas } from "@/components/sections/Personas";
import { AppScreens } from "@/components/sections/AppScreens";
import { Security } from "@/components/sections/Security";
import { Adaptability } from "@/components/sections/Adaptability";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Centralization />
        <DashboardShowcase />
        <Scoreboard />
        <Sports />
        <TimeSaving />
        <Personas />
        <AppScreens />
        <Security />
        <Adaptability />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
