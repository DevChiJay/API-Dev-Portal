"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Code, Database, Zap, FileText, ExternalLink, CheckCircle, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiData } from "@/hooks/use-api-data"
import { RequestApiModal } from "@/components/request-api-modal"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

// Define a type for the API data
type Api = {
  id: string
  name: string
  slug: string
  description: string
  documentation: string
}

// Map for the icons
const iconMap = {
  "Authentication": Code,
  "Database": Database,
  "Analytics": Zap,
  // Default icon if none matches
  "Default": FileText
}

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const { data, isLoading, error } = useApiData<Api[]>({
    endpoint: "/api/apis/featured",
    fallbackData: [],
  });

  const featuredApis = data?.featured || [];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);

  const handleRequestApi = (api: Api) => {
    if (isSignedIn) {
      setSelectedApiId(api.id);
      setModalOpen(true);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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

      {/* Featured APIs Section */}
      <section className="py-16 px-4 container max-w-6xl">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-sm">Featured</Badge>
          <h2 className="text-3xl font-bold">Popular APIs</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Explore our most popular developer tools to power your next project</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-destructive/5 rounded-lg p-6 max-w-lg mx-auto">
            <p className="font-medium">Failed to load APIs</p>
            <p className="text-sm mt-2">Please try again later or contact support</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApis.map((api) => {
                // Determine which icon to use
                const IconComponent = api.name.includes("Authentication") 
                  ? iconMap["Authentication"] 
                  : api.name.includes("Database") 
                    ? iconMap["Database"] 
                    : api.name.includes("Analytics") 
                      ? iconMap["Analytics"] 
                      : iconMap["Default"];
                
                return (
                  <Card key={api.id} className="card-hover-effect border-t-4 border-t-primary/80 overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-md bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{api.name}</CardTitle>
                      </div>
                      <CardDescription className="text-base">{api.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 btn-transition" asChild>
                        <Link href={`/docs/${api.slug}`}>
                          <FileText className="h-4 w-4 mr-1" /> Documentation
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 btn-transition" 
                        onClick={() => handleRequestApi(api)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> Request API
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg" className="gap-2 btn-transition" asChild>
                <Link href="/docs" className="flex items-center gap-2">
                  View All APIs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 hero-gradient rounded-3xl my-6 mx-4 md:mx-10">
        <div className="text-center mb-12">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="text-3xl font-bold">Why Choose Our API Platform</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Built for developers, by developers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-effect p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Performance</h3>
            <p className="text-muted-foreground">Our APIs are optimized for speed and reliability, with 99.9% uptime guarantee.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Low latency responses
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Global CDN distribution
              </li>
            </ul>
          </div>
          
          <div className="glass-effect p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
            <p className="text-muted-foreground">Comprehensive documentation, code samples, and SDKs for multiple languages.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Interactive API explorer
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Multiple SDK options
              </li>
            </ul>
          </div>
          
          <div className="glass-effect p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
            <p className="text-muted-foreground">Robust security with OAuth2, API keys, and comprehensive audit logs.</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Encrypted data transfer
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-primary mr-2" /> Key rotation & revocation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 container">
        <div className="text-center">
          <Badge variant="outline" className="mb-3">Trusted Platform</Badge>
          <h2 className="text-3xl font-bold mb-12">Powering Developers Worldwide</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <p className="text-4xl font-bold text-primary">100+</p>
            <p className="text-muted-foreground mt-2">Active APIs</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">5k+</p>
            <p className="text-muted-foreground mt-2">Developers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">99.9%</p>
            <p className="text-muted-foreground mt-2">Uptime</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-primary">24/7</p>
            <p className="text-muted-foreground mt-2">Support</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5 rounded-3xl mx-4 md:mx-10 my-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers building with our API platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="px-8 btn-transition" asChild>
              <Link href={isSignedIn ? "/dashboard" : "/signup"}>
                {isSignedIn ? "Go to Dashboard" : "Create Free Account"}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 btn-transition" asChild>
              <Link href="/docs">Browse Documentation</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* API Request Modal */}
      <RequestApiModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedApiId={selectedApiId}
        availableApis={featuredApis}
      />
    </div>
  )
}
