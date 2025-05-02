"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Code, Database, Zap, FileText, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiData } from "@/hooks/use-api-data"
import { RequestApiModal } from "@/components/request-api-modal"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"

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
  // Fetch APIs from the database
  const { data: apisData, isLoading, error } = useApiData<{apis: Api[]}>({
    endpoint: '/api/apis',
    method: 'GET',
  })

  // Add state for the request modal
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const { isSignedIn } = useAuth();

  // Limit to 10 APIs for the landing page
  const featuredApis = apisData?.apis?.slice(0, 10) || [];

  // Handle request API click
  const handleRequestApi = (api: Api) => {
    if (isSignedIn) {
      setSelectedApi(api);
      setShowRequestModal(true);
    } else {
      window.location.href = "/login?redirect_url=" + encodeURIComponent(`/?api=${api.id}`);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-[-1]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-[-1]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Build with Powerful APIs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Access our developer-friendly APIs and tools to create innovative applications and services
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/docs">Explore APIs</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/dashboard">My Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured APIs Section */}
      <section className="py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Featured APIs</h2>
          <p className="text-muted-foreground mt-2">Explore our most popular developer tools</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg p-6">
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
                  <Card key={api.id} className="transition-all hover:shadow-lg border-t-4 border-t-primary/80 overflow-hidden">
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
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/docs/${api.slug}`}>
                          <FileText className="h-4 w-4 mr-1" /> Documentation
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1" 
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
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs" className="flex items-center gap-2">
                  View All APIs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900/30 rounded-3xl my-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Our API Platform</h2>
          <p className="text-muted-foreground mt-2">Built for developers, by developers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-background p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Performance</h3>
            <p className="text-muted-foreground">Our APIs are optimized for speed and reliability, with 99.9% uptime guarantee.</p>
          </div>
          
          <div className="bg-background p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
            <p className="text-muted-foreground">Comprehensive documentation, code samples, and SDKs for multiple languages.</p>
          </div>
          
          <div className="bg-background p-6 rounded-xl shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Plans</h3>
            <p className="text-muted-foreground">From free tiers to enterprise solutions, scale as your needs grow.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Create an account to get started with our APIs and developer tools
        </p>
        <Button size="lg" className="px-8" asChild>
          <Link href="/dashboard">Get Started for Free</Link>
        </Button>
      </section>

      {/* Request API Modal */}
      {selectedApi && (
        <RequestApiModal 
          isOpen={showRequestModal} 
          onClose={() => setShowRequestModal(false)}
          availableApis={apisData?.apis || []}
          selectedApiId={selectedApi.id}
        />
      )}
    </div>
  )
}
