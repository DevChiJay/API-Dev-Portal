import Link from "next/link";
import { CheckCircle2, ExternalLink, FileText, Lock } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ApiInfo, ApiCardProps } from "./types";

export function ApiCard({ api, onRequestAccess }: ApiCardProps) {
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
