"use client"

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, ExternalLink, Search } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useApiData } from "@/hooks/use-api-data";
import { RequestApiModal } from "@/components/request-api-modal";
import { useAuth } from "@clerk/nextjs";

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
  const { data: apisData, isLoading } = useApiData<{apis: Api[]}>({
    endpoint: '/api/apis',
    method: 'GET',
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const { isSignedIn } = useAuth();

  // Filter apis based on search query
  const filteredApis = apisData?.apis?.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleRequestApi = (api: Api) => {
    if (isSignedIn) {
      setSelectedApi(api);
      setShowRequestModal(true);
    } else {
      window.location.href = "/login?redirect_url=" + encodeURIComponent(`/docs?api=${api.id}`);
    }
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore our comprehensive API collection and find the tools you need to build amazing applications.
        </p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search APIs by name or description..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.map((api) => (
              <Card key={api.id} className="flex flex-col h-full transition-all hover:shadow-md border-t-2 border-t-primary/50">
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
                  <div className="text-sm text-muted-foreground">
                    {api.version && <p>Version: {api.version}</p>}
                    {api.updated && <p>Last updated: {api.updated}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/docs/${api.slug}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Docs
                    </Link>
                  </Button>
                  <Button className="flex-1" onClick={() => handleRequestApi(api)}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Request API
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {filteredApis.length === 0 && !isLoading && (
          <div className="text-center py-16 border rounded-lg">
            <p className="text-xl font-medium">No APIs found</p>
            <p className="text-muted-foreground mt-2">Try a different search term</p>
          </div>
        )}
      </div>

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