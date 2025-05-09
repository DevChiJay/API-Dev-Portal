"use client";

import { useUser } from "@clerk/nextjs";
import { Clock, Key, KeyRound } from "lucide-react";
import { useApiData } from "@/src/hooks/use-api-data";
import Link from "next/link";
import Head from "next/head";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import DashboardSkeleton from "@/src/components/Dashboard/DashboardSkeleton";
import ApiKeys from "@/src/components/Dashboard/ApiKeys";
import { ApiKey, ApiInfo } from "@/src/components/Dashboard/types";

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
    <>
      <Head>
        <title>Dashboard - API Developer Portal</title>
        <meta name="description" content="Manage your API keys and explore available APIs." />
        <meta property="og:title" content="Dashboard - API Developer Portal" />
        <meta property="og:description" content="Manage your API keys and explore available APIs." />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://portal.devchihub.com/dashboard" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
        <ApiKeys keysData={keysData ?? undefined} />
      </div>
    </>
  );
}
