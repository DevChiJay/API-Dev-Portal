"use client";

import { useState } from "react";
import { useApiData } from "@/src/hooks/use-api-data";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, ChevronRight, ExternalLink, FileText, Lock, Search } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Textarea } from "@/src/components/ui/textarea";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "@/src/components/ui/use-toast";
import { Skeleton } from "@/src/components/ui/skeleton";
import { RequestApiModal } from "@/src/components/request-api-modal";
import Link from "next/link";

interface ApiInfo {
  id: string;
  name: string;
  description: string;
  slug: string;
  version?: string;
  category?: string;
  access?: "public" | "restricted" | "private";
  status?: "stable" | "beta" | "deprecated";
  hasAccess?: boolean;
  documentation?: string;
}

export default function AvailableApisPage() {
  const { user } = useUser();
  const { data: apisData, isLoading, error } = useApiData<{apis: ApiInfo[]}>({
    endpoint: "/api/apis",
    method: "GET",
    dependencies: [user?.id],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApi, setSelectedApi] = useState<ApiInfo | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const apis = apisData?.apis || [];

  const filteredApis = apis?.filter(api => 
    api.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    api.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group APIs by category (if category exists)
  const apisByCategory: Record<string, ApiInfo[]> = {
    all: filteredApis
  };
  
  // Dynamically populate categories from API data
  filteredApis.forEach(api => {
    if (api.category) {
      if (!apisByCategory[api.category]) {
        apisByCategory[api.category] = [];
      }
      apisByCategory[api.category].push(api);
    }
  });

  // Get unique category names
  const categories = Object.keys(apisByCategory).filter(cat => cat !== 'all');

  const handleRequestApi = (api: ApiInfo) => {
    setSelectedApi(api);
    setShowRequestModal(true);
  };

  if (isLoading) {
    return <AvailableApisSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-semibold mb-2">Failed to load APIs</h2>
        <p className="text-muted-foreground mb-4">
          There was a problem fetching available APIs. Please try again later.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Available APIs</h1>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search APIs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="overflow-x-auto">
          <TabsTrigger value="all">All APIs</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(apisByCategory).map(([category, apis]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {apis.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {apis.map((api) => (
                  <ApiCard 
                    key={api.id} 
                    api={api} 
                    onRequestAccess={handleRequestApi} 
                  />
                ))}
              </div>
            ) : (
              <Card className="py-8">
                <CardContent className="text-center">
                  <p className="text-muted-foreground">No APIs found matching your search criteria</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

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
  );
}

function ApiCard({ api, onRequestAccess }: { api: ApiInfo; onRequestAccess: (api: ApiInfo) => void }) {
  // Determine API access status
  const access = api.access || "public";
  const status = api.status || "stable";
  const hasAccess = api.hasAccess !== false; // Default to true if not specified

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md border-t-2 border-t-primary/30">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-1.5 text-xl mb-1">
              {api.name}
              {access !== "public" && <Lock className="h-4 w-4 text-muted-foreground" />}
              {hasAccess && <CheckCircle2 className="h-4 w-4 text-green-500" />}
            </CardTitle>
            {api.version && (
              <CardDescription className="text-xs">v{api.version}</CardDescription>
            )}
          </div>
          {api.category && (
            <Badge variant="outline" className="capitalize">
              {api.category}
            </Badge>
          )}
          {status && (
            <Badge 
              variant={status === "stable" ? "default" : status === "beta" ? "secondary" : "destructive"}
              className="ml-auto"
            >
              {status}
            </Badge>
          )}
        </div>
        <CardDescription className="mt-2 text-base">{api.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Additional API information could go here */}
      </CardContent>
      <CardFooter className="flex gap-2 border-t pt-4">
        <Button variant="outline" className="flex-1 px-2 sm:px-3 text-xs sm:text-sm" asChild>
          <Link href={`/docs/${api.slug}`}>
            <FileText className="mr-1 h-3.5 w-3.5" />
            Docs
          </Link>
        </Button>
        <Button 
          className="flex-1 px-2 sm:px-3 text-xs sm:text-sm" 
          onClick={() => onRequestAccess(api)}
          variant={access === "private" ? "secondary" : "default"}
          disabled={access === "private"}
        >
          <ExternalLink className="mr-1 h-3.5 w-3.5" />
          {access === "private" ? "Private" : "Request"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function AvailableApisSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-full sm:w-[256px]" />
      </div>

      <Skeleton className="h-10 w-[400px]" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-[150px] mb-2" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-6 w-[80px]" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="flex gap-2 border-t pt-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
