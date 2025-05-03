"use client"

import { useState } from "react";
import Link from "next/link";
import { FileText, ExternalLink, Search, Filter, CheckCircle } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useApiData } from "@/hooks/use-api-data";
import { RequestApiModal } from "@/components/request-api-modal";
import { useAuth } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type Api = {
  id: string
  name: string
  slug: string
  description: string
  category?: string
  version?: string
  updated?: string
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const { isSignedIn } = useAuth();
  const { data, isLoading, error } = useApiData<Api[]>({
    endpoint: "/api/apis",
    fallbackData: [],
  });

  const apis = data?.apis || [];
  // Categories for filtering
  const categories = Array.from(
    new Set(apis.map((api) => api.category).filter(Boolean))
  );

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Filter APIs based on search and category
  const filteredApis = apis.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      !selectedCategory || api.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter APIs based on tab selection
  const tabFilteredApis = activeTab === "all" 
    ? filteredApis 
    : filteredApis.filter(api => {
        if (activeTab === "new" && api.updated) {
          const updatedDate = new Date(api.updated);
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          return updatedDate > oneMonthAgo;
        }
        if (activeTab === "popular") {
          // In a real app, this would be based on popularity metrics
          return api.name.includes("Auth") || api.name.includes("Data");
        }
        return false;
      });

  const handleRequestClick = (api: Api) => {
    setSelectedApiId(api.id);
    setRequestModalOpen(true);
  };

  if (isLoading) {
    return <DocsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-destructive/10 p-4 rounded-lg text-destructive max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Error Loading Documentation</h2>
          <p>We're having trouble fetching the API documentation. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse our collection of APIs to integrate with your applications. 
          Each API includes detailed documentation, code samples, and endpoints.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filtering options */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search APIs..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Categories
            </h3>
            <ScrollArea className="h-auto max-h-[220px]">
              <div className="space-y-1 pr-4">
                <Button
                  variant={selectedCategory === null ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start font-normal"
                  onClick={() => handleCategorySelect(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start font-normal"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Separator />

          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Need help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Our developer support team is ready to assist you with integration questions.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All APIs</TabsTrigger>
                <TabsTrigger value="new">
                  New
                  <Badge variant="outline" className="ml-2 py-0 text-[10px]">
                    4
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              <p className="text-sm text-muted-foreground">
                Showing {tabFilteredApis.length} of {apis.length} APIs
              </p>
            </div>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {tabFilteredApis.map((api) => (
                  <ApiCard 
                    key={api.id} 
                    api={api} 
                    onRequestClick={handleRequestClick}
                    isSignedIn={isSignedIn}
                  />
                ))}
              </div>
              {tabFilteredApis.length === 0 && (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No APIs found matching your criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setActiveTab("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="new" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {tabFilteredApis.map((api) => (
                  <ApiCard 
                    key={api.id} 
                    api={api} 
                    onRequestClick={handleRequestClick}
                    isSignedIn={isSignedIn}
                  />
                ))}
              </div>
              {tabFilteredApis.length === 0 && (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No new APIs available at this time</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="popular" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {tabFilteredApis.map((api) => (
                  <ApiCard 
                    key={api.id} 
                    api={api} 
                    onRequestClick={handleRequestClick}
                    isSignedIn={isSignedIn}
                  />
                ))}
              </div>
              {tabFilteredApis.length === 0 && (
                <div className="text-center py-12 border rounded-md">
                  <p className="text-muted-foreground">No popular APIs available with current filters</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* API Request Modal */}
      <RequestApiModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        selectedApiId={selectedApiId}
        availableApis={apis}
      />
    </div>
  );
}

// API Card component
function ApiCard({ api, onRequestClick, isSignedIn }: { 
  api: Api, 
  onRequestClick: (api: Api) => void,
  isSignedIn?: boolean
}) {
  const isNewApi = api.updated && (new Date(api.updated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  
  return (
    <Card className="card-hover-effect flex flex-col h-full border-t-2 border-t-primary/50">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{api.name}</CardTitle>
          {api.category && (
            <Badge variant="outline">{api.category}</Badge>
          )}
        </div>
        <CardDescription className="text-base">{api.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-1">
          {api.version && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Version:</span> 
              <span>{api.version}</span>
              {isNewApi && (
                <Badge variant="default" className="ml-2 text-[10px] py-0">New</Badge>
              )}
            </div>
          )}
          {api.updated && <p>Updated: {new Date(api.updated).toLocaleDateString()}</p>}
          
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-1 text-xs">
              <CheckCircle className="h-3 w-3 text-primary" />
              <span>Comprehensive documentation</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <CheckCircle className="h-3 w-3 text-primary" />
              <span>Code samples in multiple languages</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 min-w-0" asChild>
          <Link href={`/docs/${api.slug}`} className="whitespace-nowrap overflow-hidden text-ellipsis">
            <FileText className="h-4 w-4 mr-1 flex-shrink-0" /> Documentation
          </Link>
        </Button>
        <Button
          size="sm"
          className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => onRequestClick(api)}
          disabled={!isSignedIn}
        >
          <ExternalLink className="h-4 w-4 mr-1 flex-shrink-0" /> Request API
        </Button>
      </CardFooter>
    </Card>
  );
}

// Loading skeleton
function DocsPageSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[250px] rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}