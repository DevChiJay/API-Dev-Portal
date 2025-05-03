"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useApiData } from "@/src/hooks/use-api-data";
import { ChevronLeft, Code, FileText, LayoutDashboard } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Skeleton } from "@/src/components/ui/skeleton";
import Link from "next/link";

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
// Dynamically import Redoc to avoid SSR issues
const RedocStandalone = dynamic(() => import("redoc").then((mod) => mod.RedocStandalone), { ssr: false });

interface ApiDocumentation {
  _id: string;
  name: string;
  slug: string;
  description: string;
  baseUrl: string;
  documentation: string;
  authType: string;
  isActive: boolean;
  version?: string;
  specData?: any;
}

export default function ApiDocsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { data: apiDoc, isLoading, error } = useApiData<ApiDocumentation>({
    endpoint: `/api/apis/${slug}`,
    dependencies: [slug],
  });

  const [activeTab, setActiveTab] = useState<"readme" | "swagger" | "redoc">("readme");
  const [markdown, setMarkdown] = useState<string>("");
  const [markdownLoading, setMarkdownLoading] = useState<boolean>(false);
  const [specData, setSpecData] = useState<any>(null);

  useEffect(() => {
    if (apiDoc?.documentation) {
      setMarkdownLoading(true);
      
      // Use our proxy API route instead of direct request to avoid CORS issues
      axios.get(`/api/proxy/documentation?url=${encodeURIComponent(apiDoc.documentation)}`)
        .then(response => {
          setMarkdown(response.data);
          setMarkdownLoading(false);
        })
        .catch(err => {
          console.error("Error loading markdown:", err);
          setMarkdownLoading(false);
        });
    }
    
    // For demo purposes, if we need spec data and it's not already provided
    if (apiDoc?.baseUrl && !apiDoc.specData) {
      // In a real app, you would fetch the OpenAPI spec from somewhere
      // This is just a placeholder
      setSpecData({
        openapi: "3.0.0",
        info: {
          title: apiDoc.name,
          version: apiDoc.version || "1.0.0",
          description: apiDoc.description
        },
        servers: [{ url: apiDoc.baseUrl }],
        paths: {}
      });
    } else if (apiDoc?.specData) {
      setSpecData(apiDoc.specData);
    }
  }, [apiDoc]);

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
          <Button variant="outline" size="sm" onClick={() => window.open(apiDoc.documentation, '_blank')}>
            <Code className="mr-2 h-4 w-4" />
            Raw Documentation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{apiDoc.name}</CardTitle>
          <CardDescription>
            {apiDoc.version ? `Version ${apiDoc.version} - ` : ''}{apiDoc.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "readme" | "swagger" | "redoc")}>
            <TabsList className="mb-4">
              <TabsTrigger value="readme">
                <FileText className="h-4 w-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="swagger">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Swagger UI
              </TabsTrigger>
              <TabsTrigger value="redoc">
                <Code className="h-4 w-4 mr-2" />
                ReDoc
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="readme" className="border rounded-lg p-6 overflow-hidden">
              {markdownLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-8 w-1/4 mt-6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-20 w-full mt-6" />
                </div>
              ) : (
                <div className="markdown-content prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="swagger" className="border rounded-lg p-0 overflow-hidden">
              <div className="swagger-container">
                {/* @ts-ignore: SwaggerUI types are not complete */}
                <SwaggerUI spec={specData || {}} />
              </div>
            </TabsContent>
            
            <TabsContent value="redoc" className="border rounded-lg overflow-hidden">
              <RedocStandalone spec={specData || {}} />
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