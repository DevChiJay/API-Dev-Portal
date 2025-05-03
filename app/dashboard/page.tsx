"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { BarChart, Clock, Key, KeyRound, AlertCircle, Plus } from "lucide-react";
import { useApiData } from "@/hooks/use-api-data";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ApiKey {
  id: string;
  name: string;
  status: "active" | "expired" | "revoked";
  createdAt: string;
}

interface ApiInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function Dashboard() {
  const { user } = useUser();
  
  const { data: keysData, isLoading: keysLoading } = useApiData<{ keys: ApiKey[] }>({
    endpoint: "/api/keys",
    dependencies: [user?.id],
  });
  
  const { data: apisData, isLoading: apisLoading } = useApiData<{ apis: ApiInfo[] }>({
    endpoint: "/api/apis",
    dependencies: [user?.id],
  });

  // Derived metrics
  const activeKeysCount = keysData?.keys?.filter(key => key.status === "active").length || 0;
  const totalApisCount = apisData?.apis?.length || 0;

  if (keysLoading || apisLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName || "Developer"}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active API Keys</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeKeysCount}</div>
            <p className="text-xs text-muted-foreground pt-1">
              <Link href="/dashboard/my-keys" className="hover:underline">
                {activeKeysCount === 0 ? "Create your first key" : "Manage your keys"}
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Available APIs</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApisCount}</div>
            <p className="text-xs text-muted-foreground pt-1">
              <Link href="/dashboard/available-apis" className="hover:underline">
                View available APIs
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">All Systems</div>
            <p className="text-xs text-green-500 font-medium pt-1">
              Operational
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div />
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>Recently created API keys</CardDescription>
            </CardHeader>
            <CardContent>
              {keysData?.keys && keysData.keys.length > 0 ? (
                <div className="space-y-4">
                  {keysData.keys.slice(0, 3).map(key => (
                    <div key={key.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{key.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(key.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={key.status === "active" ? "default" : "secondary"}>
                        {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-2">
                    <Link href="/dashboard/my-keys">
                      View all keys
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4 text-muted-foreground">No API keys found</p>
                  <Button asChild>
                    <Link href="/dashboard/my-keys">
                      <Plus className="mr-2 h-4 w-4" />
                      Create API Key
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <Skeleton className="h-5 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px] mb-2" />
              <Skeleton className="h-4 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
