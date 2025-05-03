"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Key, Plus, RotateCw, Trash2, AlertCircle } from "lucide-react";
import { useApiData } from "@/src/hooks/use-api-data";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { toast } from "@/src/components/ui/use-toast";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Badge } from "@/src/components/ui/badge";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  apiScope: string[];
  status: "active" | "expired" | "revoked";
}

interface ApiInfo {
  id: string;
  name: string;
  slug: string;
}

export default function MyApiKeysPage() {
  const { user } = useUser();
  const { 
    data, 
    isLoading, 
    error,
    refetch 
  } = useApiData<{ keys: ApiKey[] }>({
    endpoint: "/api/keys",
    dependencies: [user?.id],
  });
  
  const { 
    data: apisData,
    isLoading: apisLoading 
  } = useApiData<{ apis: ApiInfo[] }>({
    endpoint: "/api/apis",
    dependencies: [user?.id],
  });

  const apiKeys = data?.keys || [];
  const availableApis = apisData?.apis || [];

  const [revealKey, setRevealKey] = useState<Record<string, boolean>>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRotateDialogOpen, setIsRotateDialogOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const scope = formData.get("scope") as string;
      const apiId = formData.get("apiId") as string;

      // Get token from Clerk
      const token = await user?.getToken();
      
      // Call the API to create a new key
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys`,
        { name, apiId, scope },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      toast({
        title: "API Key Created",
        description: "Your new API key has been successfully created",
      });
      
      // Refresh the data
      refetch();
      setIsCreateDialogOpen(false);
    } catch (err) {
      const error = err as any;
      toast({
        title: "Error Creating Key",
        description: error.response?.data?.message || error.message || "Failed to create API key",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRotateKey = async () => {
    if (!selectedKeyId) return;
    setIsSubmitting(true);
    
    try {
      // Get token from Clerk
      const token = await user?.getToken();
      
      // Call the API to rotate the key
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys/${selectedKeyId}/rotate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      toast({
        title: "API Key Rotated",
        description: "Your API key has been successfully rotated",
      });
      
      // Refresh the data
      refetch();
      setIsRotateDialogOpen(false);
    } catch (err) {
      const error = err as any;
      toast({
        title: "Error Rotating Key",
        description: error.response?.data?.message || error.message || "Failed to rotate API key",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setSelectedKeyId(null);
    }
  };

  const handleRevokeKey = async () => {
    if (!selectedKeyId) return;
    setIsSubmitting(true);
    
    try {
      // Get token from Clerk
      const token = await user?.getToken();
      
      // Call the API to revoke the key
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys/${selectedKeyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      toast({
        title: "API Key Revoked",
        description: "Your API key has been successfully revoked",
      });
      
      // Refresh the data
      refetch();
      setIsRevokeDialogOpen(false);
    } catch (err) {
      const error = err as any;
      toast({
        title: "Error Revoking Key",
        description: error.response?.data?.message || error.message || "Failed to revoke API key",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setSelectedKeyId(null);
    }
  };

  if (isLoading || apisLoading) {
    return <ApiKeysSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
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
                  <Label htmlFor="apiId">API</Label>
                  <Select name="apiId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an API" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableApis.map(api => (
                        <SelectItem key={api.id} value={api.id}>{api.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="scope">Scope</Label>
                  <Select name="scope" defaultValue="read" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="write">Write</SelectItem>
                      <SelectItem value="read_write">Read & Write</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Generating..." : "Generate Key"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rotate Key Dialog */}
      <Dialog open={isRotateDialogOpen} onOpenChange={setIsRotateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rotate API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to rotate this API key? This will generate a new key and invalidate the old one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRotateDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleRotateKey} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Rotate Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Key Dialog */}
      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this API key? This action cannot be undone and the key will no longer work.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleRevokeKey} 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Revoke Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {apiKeys.length === 0 ? (
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
          {apiKeys.map((apiKey) => (
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
                      {apiKey.key
                        ? revealKey[apiKey.id]
                          ? apiKey.key
                          : apiKey.key.replace(/./g, "•")
                        : "No key available"}
                    </span>
                    <div className="flex">
                      {apiKey.key && (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Scopes: {apiKey.apiScope?.join(", ") || "None"}
                </div>
                {apiKey.lastUsed && (
                  <div className="text-sm text-muted-foreground">
                    Last used: {new Date(apiKey.lastUsed).toLocaleString()}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={apiKey.status !== "active"}
                  onClick={() => {
                    setSelectedKeyId(apiKey.id);
                    setIsRotateDialogOpen(true);
                  }}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rotate
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  disabled={apiKey.status === "revoked"}
                  onClick={() => {
                    setSelectedKeyId(apiKey.id);
                    setIsRevokeDialogOpen(true);
                  }}
                >
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
