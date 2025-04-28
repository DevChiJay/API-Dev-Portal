"use client";

import { useState } from "react";
import { useApiData } from "@/hooks/use-api-data";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, ChevronRight, ExternalLink, Lock, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  category: "authentication" | "data" | "analytics" | "messaging";
  access: "public" | "restricted" | "private";
  status: "stable" | "beta" | "deprecated";
  hasAccess: boolean;
  docsUrl: string;
}

export default function AvailableApisPage() {
  const { user } = useUser();
  const { data: apis, isLoading } = useApiData<ApiInfo[]>({
    endpoint: "/api/available-apis",
    dependencies: [user?.id],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApi, setSelectedApi] = useState<ApiInfo | null>(null);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);

  const filteredApis = apis?.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const apisByCategory = {
    authentication: filteredApis?.filter(api => api.category === "authentication") || [],
    data: filteredApis?.filter(api => api.category === "data") || [],
    analytics: filteredApis?.filter(api => api.category === "analytics") || [],
    messaging: filteredApis?.filter(api => api.category === "messaging") || [],
  };

  const handleRequestAccess = (api: ApiInfo) => {
    setSelectedApi(api);
    setAccessDialogOpen(true);
  };

  const submitAccessRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reason = formData.get("reason") as string;

    // In a real implementation, you would send this to your API
    toast({
      title: "Access Request Submitted",
      description: `Your request for ${selectedApi?.name} has been submitted for review.`,
    });

    setAccessDialogOpen(false);
  };

  if (isLoading) {
    return <AvailableApisSkeleton />;
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
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredApis?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredApis.map((api) => (
                <ApiCard key={api.id} api={api} onRequestAccess={handleRequestAccess} />
              ))}
            </div>
          ) : (
            <Card className="py-8">
              <CardContent className="text-center">
                <p className="text-muted-foreground">No APIs found matching your search</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {(Object.keys(apisByCategory) as Array<keyof typeof apisByCategory>).map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {apisByCategory[category].length ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {apisByCategory[category].map((api) => (
                  <ApiCard key={api.id} api={api} onRequestAccess={handleRequestAccess} />
                ))}
              </div>
            ) : (
              <Card className="py-8">
                <CardContent className="text-center">
                  <p className="text-muted-foreground">No APIs found in this category</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {selectedApi && (
        <Dialog open={accessDialogOpen} onOpenChange={setAccessDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={submitAccessRequest}>
              <DialogHeader>
                <DialogTitle>Request Access to {selectedApi.name}</DialogTitle>
                <DialogDescription>
                  Please provide a reason for why you need access to this API.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reason">Business Use Case</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    placeholder="Explain how you plan to use this API..."
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ApiCard({ api, onRequestAccess }: { api: ApiInfo; onRequestAccess: (api: ApiInfo) => void }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              {api.name}
              {api.access !== "public" && <Lock className="ml-2 h-4 w-4 text-muted-foreground" />}
            </CardTitle>
            <CardDescription>v{api.version}</CardDescription>
          </div>
          <Badge variant={api.status === "stable" ? "default" : api.status === "beta" ? "secondary" : "destructive"}>
            {api.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{api.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 mt-auto">
        {api.hasAccess ? (
          <Button variant="outline" className="w-full" asChild>
            <a href={api.docsUrl} target="_blank" rel="noopener noreferrer">
              View Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button
            variant={api.access === "private" ? "secondary" : "default"}
            className="w-full"
            onClick={() => onRequestAccess(api)}
            disabled={api.access === "private"}
          >
            {api.access === "private" ? "Private Access Only" : "Request Access"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
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
            <CardFooter className="border-t pt-4 mt-auto">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
