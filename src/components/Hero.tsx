import Link from "next/link";
import { Button } from "./ui/button";


function Hero() {
  return (
    <section className="py-20 relative overflow-hidden hero-gradient">
      <div className="absolute inset-0 bg-[url('/grid-pattern.jpg')] bg-cover bg-center bg-no-repeat opacity-10 z-[-1]" />
      
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm text-sm font-medium mb-6 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          New APIs available for developers
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6">
          Build with Powerful APIs
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Access our developer-friendly APIs and tools to create innovative applications and services
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 btn-transition" asChild>
            <Link href="/docs">Explore APIs</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 btn-transition" asChild>
            <Link href="/dashboard">My Dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero