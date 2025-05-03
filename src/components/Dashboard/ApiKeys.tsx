"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ApiKey, ApiKeysProps } from "./types";

export default function ApiKeys({ keysData }: ApiKeysProps) {
  return (
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
  );
}
