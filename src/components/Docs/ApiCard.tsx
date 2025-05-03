import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { CheckCircle, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Api } from "./types";

export function ApiCard({ api, onRequestClick }: { 
  api: Api; 
  onRequestClick: (api: Api) => void;
}) {
  const { isSignedIn } = useAuth();
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
            <FileText className="h-4 w-4 mr-1 flex-shrink-0" /> Docs
          </Link>
        </Button>
        <Button
          size="sm"
          className="flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => onRequestClick(api)}
          disabled={!isSignedIn}
        >
          <ExternalLink className="h-4 w-4 mr-1 flex-shrink-0" /> Get
        </Button>
      </CardFooter>
    </Card>
  );
}