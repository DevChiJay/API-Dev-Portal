import Head from "next/head";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import CTA from "../components/CTA";
import Benefits from "../components/Benefits";
import Metrics from "../components/Metrics";
import FAQ from "../components/FAQ";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - API Developer Portal</title>
        <meta name="description" content="Explore our API platform and tools for developers." />
        <meta property="og:title" content="Home - API Developer Portal" />
        <meta property="og:description" content="Explore our API platform and tools for developers." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://portal.devchihub.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Featured />
        <Benefits />
        <Metrics />
        <FAQ />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
