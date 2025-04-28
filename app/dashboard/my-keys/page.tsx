"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Key, Plus, RotateCw, Trash2 } from "lucide-react";
import { useApiData } from "@/hooks/use-api-data";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  apiScope: string[];
  status: "active" | "expired" | "revoked";
}

export default function MyApiKeysPage() {
  const { user } = useUser();
  const { data: apiKeys, isLoading, error } = useApiData<ApiKey[]>({
    endpoint: "/api/user/keys",
    dependencies: [user?.id],
  });

  const [revealKey, setRevealKey] = useState<Record<string, boolean>>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const toggleKeyVisibility = (keyId: string) => {
    setRevealKey((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard",
    });
  };

  const handleCreateKey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const scope = formData.get("scope") as string;

    // In a real implementation, you would send this to your API
    toast({
      title: "Creating API Key",
      description: "Your request to create a new API key is being processed",
    });

    setIsCreateDialogOpen(false);
  };

  if (isLoading) {
    return <ApiKeysSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          Error loading API keys: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My API Keys</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateKey}>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Generate a new API key to access our services. Keep your keys secure - they grant access to your account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Key Name</Label>
                  <Input id="name" name="name" placeholder="My Project API Key" required />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="scope">API Scope</Label>
                  <Select name="scope" defaultValue="all" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All APIs</SelectItem>
                      <SelectItem value="auth">Authentication API</SelectItem>
                      <SelectItem value="data">Data API</SelectItem>
                      <SelectItem value="analytics">Analytics API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Generate Key</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {apiKeys?.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No API Keys Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first API key to start accessing our services
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {apiKeys?.map((apiKey) => (
            <Card key={apiKey.id} className={apiKey.status !== "active" ? "opacity-70" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{apiKey.name}</CardTitle>
                    <CardDescription>Created {new Date(apiKey.createdAt).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                    {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-muted p-2 rounded-md font-mono text-sm flex justify-between items-center">
                    <span className="truncate">
                      {revealKey[apiKey.id] ? apiKey.key : apiKey.key.replace(/./g, "•")}
                    </span>
                    <div className="flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        title={revealKey[apiKey.id] ? "Hide key" : "Show key"}
                      >
                        {revealKey[apiKey.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyApiKey(apiKey.key)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Scopes: {apiKey.apiScope.join(", ")}
                </div>
                {apiKey.lastUsed && (
                  <div className="text-sm text-muted-foreground">
                    Last used: {new Date(apiKey.lastUsed).toLocaleString()}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" disabled={apiKey.status !== "active"}>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rotate
                </Button>
                <Button variant="destructive" size="sm" disabled={apiKey.status === "revoked"}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Revoke
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ApiKeysSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-[150px] mb-2" />
                  <Skeleton className="h-4 w-[120px]" />
                </div>
                <Skeleton className="h-6 w-[80px]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[150px]" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-[100px]" />
              <Skeleton className="h-9 w-[100px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
