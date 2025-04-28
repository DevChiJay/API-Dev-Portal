import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dummy data for available API documentation
const apiDocs = [
  {
    id: "uptime-monitor",
    name: "Uptime Monitor API",
    description: "Monitor your application's uptime and receive notifications when services go down.",
    version: "v1.0.0",
    category: "Monitoring",
    updated: "2023-05-15"
  },
  {
    id: "user-management",
    name: "User Management API",
    description: "Comprehensive user management with authentication, authorization, and user profile operations.",
    version: "v2.1.0",
    category: "Identity",
    updated: "2023-06-22"
  },
  {
    id: "payment-processing",
    name: "Payment Processing API",
    description: "Process payments, manage subscriptions, and handle refunds securely.",
    version: "v1.3.2",
    category: "Financial",
    updated: "2023-07-10"
  },
  {
    id: "analytics",
    name: "Analytics API",
    description: "Collect and analyze user behavior data to gain insights about your application usage.",
    version: "v1.0.1",
    category: "Data",
    updated: "2023-04-30"
  }
];

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiDocs.map((api) => (
          <Card key={api.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{api.name}</CardTitle>
                <Badge variant="outline">{api.category}</Badge>
              </div>
              <CardDescription>{api.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                <p>Version: {api.version}</p>
                <p>Last updated: {api.updated}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/docs/${api.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}