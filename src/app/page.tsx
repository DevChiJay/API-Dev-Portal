"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Code, Database, Zap, FileText, ExternalLink, CheckCircle, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useApiData } from "@/src/hooks/use-api-data"
import { RequestApiModal } from "@/src/components/request-api-modal"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import { Badge } from "@/src/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/src/components/ui/accordion"

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

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-background rounded-3xl mx-4 md:mx-10 my-6" id="faq">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our API platform
            </p>
          </div>

          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Do I need a backend to use this?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    No, our API platform is designed to be used with any frontend technology. You can 
                    use our client SDKs for direct API access without needing your own backend. However, 
                    for sensitive operations and handling authentication tokens securely, we recommend using 
                    a backend to protect your API keys.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is it really free?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Yes, we offer a free tier for all our APIs with reasonable rate limits for development and 
                    small-scale projects. For higher volume usage and premium features, we offer paid plans 
                    that scale with your needs. Check our pricing page for more details on limits and features.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I customize the form?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Our API platform provides full customization options. You can customize the request parameters, 
                    authentication methods, and response formats. We also provide SDKs in multiple languages that 
                    make it easy to integrate our APIs into your applications with your own UI elements.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How do I contact the people who sign up?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    When users register for your API services through our platform, you'll receive notifications 
                    and can access their contact information through the dashboard. Our platform also provides 
                    analytics on API usage and tools for communicating with your users about updates or issues.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Is there a limit to how many signups I can collect?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    On our free tier, there's a limit of 1,000 user signups per month. Our paid plans offer 
                    higher or unlimited signup capacities depending on the tier. You can always upgrade 
                    as your needs grow, and we provide tools to manage and scale your user base effectively.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center pt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <Button asChild>
              <Link href="/docs">Visit Documentation</Link>
            </Button>
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

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Logo and company info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="DevChi Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain" 
                  />
                </div>
                <span className="font-bold text-xl">DevChi</span>
              </div>
              <p className="text-muted-foreground">
                Powerful API management platform for developers and businesses.
              </p>
              <div className="flex items-center gap-3">
                <Link href="https://twitter.com/" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="https://github.com/" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>
                <Link href="https://linkedin.com/" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Product links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              © 2025 DevChi API Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 order-1 md:order-2">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
