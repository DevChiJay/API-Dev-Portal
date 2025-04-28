"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useApiData } from "@/hooks/use-api-data";
import { ChevronLeft, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
// Dynamically import Redoc to avoid SSR issues
const RedocStandalone = dynamic(() => import("redoc").then((mod) => mod.RedocStandalone), { ssr: false });

interface ApiDocumentation {
  id: string;
  name: string;
  description: string;
  specUrl: string;
  version: string;
  specData: any;
}

export default function ApiDocsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: apiDoc, isLoading, error } = useApiData<ApiDocumentation>({
    endpoint: `/api/documentation/${slug}`,
    dependencies: [slug],
  });

  const [activeTab, setActiveTab] = useState<"swagger" | "redoc">("swagger");

  if (isLoading) {
    return <ApiDocsSkeleton />;
  }

  if (error || !apiDoc) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/docs">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Documentation Not Available</CardTitle>
            <CardDescription>
              We couldn't load the documentation for this API. It may be unavailable or you might not have access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Error: {error?.message || "Unknown error"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/docs">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Documentation
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.open(apiDoc.specUrl, '_blank')}>
            <Code className="mr-2 h-4 w-4" />
            Raw Spec
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{apiDoc.name}</CardTitle>
          <CardDescription>
            Version {apiDoc.version} - {apiDoc.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "swagger" | "redoc")}>
            <TabsList className="mb-4">
              <TabsTrigger value="swagger">Swagger UI</TabsTrigger>
              <TabsTrigger value="redoc">ReDoc</TabsTrigger>
            </TabsList>
            <TabsContent value="swagger" className="border rounded-lg p-0 overflow-hidden">
              <div className="swagger-container">
                {/* @ts-ignore: SwaggerUI types are not complete */}
                <SwaggerUI spec={apiDoc.specData} />
              </div>
            </TabsContent>
            <TabsContent value="redoc" className="border rounded-lg overflow-hidden">
              <RedocStandalone spec={apiDoc.specData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ApiDocsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[200px] mb-6" />
          <Skeleton className="h-[500px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}