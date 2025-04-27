import Link from "next/link"
import { ArrowRight, Code, Database, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const apis = [
  {
    title: "Authentication API",
    description: "Secure user authentication and authorization services",
    icon: Code,
    cta: "View Documentation",
    href: "/docs/auth",
  },
  {
    title: "Database API",
    description: "Fast, reliable database operations for your applications",
    icon: Database,
    cta: "View Documentation",
    href: "/docs/database",
  },
  {
    title: "Analytics API",
    description: "Comprehensive analytics and reporting capabilities",
    icon: Zap,
    cta: "View Documentation",
    href: "/docs/analytics",
  },
]

export default function Home() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => (
            <Card key={api.title} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-primary/10">
                    <api.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{api.title}</CardTitle>
                </div>
                <CardDescription>{api.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={api.href} className="flex items-center justify-center gap-2">
                    {api.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
