"use client"

import Link from "next/link"
import { ArrowRight, Code, Database, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiData } from "@/hooks/use-api-data"

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
  "Default": Code
}

export default function Home() {
  // Fetch APIs from the database
  const { data: apis, isLoading, error } = useApiData<Api[]>({
    endpoint: '/api/apis',
    method: 'GET',
  })

  return (
    <div className="container py-10">
      <section className="flex flex-col items-center text-center space-y-4 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Developer Portal</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Access powerful APIs and tools to build amazing applications
        </p>
        <div className="flex gap-4 mt-6">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">Read Documentation</Link>
          </Button>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Available APIs</h2>
        
        {isLoading ? (
          <div className="text-center py-8">Loading APIs...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Failed to load APIs. Please try again.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.apis?.map((api) => {
              // Determine which icon to use
              const IconComponent = api.name.includes("Authentication") 
                ? iconMap["Authentication"] 
                : api.name.includes("Database") 
                  ? iconMap["Database"] 
                  : api.name.includes("Analytics") 
                    ? iconMap["Analytics"] 
                    : iconMap["Default"];
              
              return (
                <Card key={api.id} className="transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{api.name}</CardTitle>
                    </div>
                    <CardDescription>{api.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/docs/${api.slug}`} className="flex items-center justify-center gap-2">
                        View Documentation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  )
}
