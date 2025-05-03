import Hero from "../components/Hero";
import Featured from "../components/Featured";
import CTA from "../components/CTA";
import Benefits from "../components/Benefits";
import Metrics from "../components/Metrics";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Featured />
      <Benefits />
      <Metrics />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
