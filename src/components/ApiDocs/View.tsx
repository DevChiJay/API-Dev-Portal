import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { FileText, LayoutDashboard, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/src/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
// Dynamically import Redoc to avoid SSR issues
const RedocStandalone = dynamic(() => import("redoc").then((mod) => mod.RedocStandalone), { ssr: false });

type DocViewProps = {
  apiDoc: {
    name: string;
    description: string;
    version?: string;
    documentation: string;
  };
  markdown: string;
  markdownLoading: boolean;
  specData: any;
};

export function DocView({ apiDoc, markdown, markdownLoading, specData }: DocViewProps) {
  const [activeTab, setActiveTab] = useState<"readme" | "swagger" | "redoc">("readme");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{apiDoc.name}</CardTitle>
        <CardDescription>
          {apiDoc.version ? `Version ${apiDoc.version} - ` : ""}
          {apiDoc.description}
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
  );
}