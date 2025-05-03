import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { RequestApiModal } from "@/src/components/request-api-modal";
import { ApiCard } from "./ApiCard";
import { AvailableApisSkeleton } from "./AvailableApisSkeleton";
import { ApiInfo, AvailableApisContentProps } from "./types";

export function AvailableApisContent({ apis, isLoading, error }: AvailableApisContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApi, setSelectedApi] = useState<ApiInfo | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

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
          availableApis={apis || []}
          selectedApiId={selectedApi.id}
        />
      )}
    </div>
  );
}
