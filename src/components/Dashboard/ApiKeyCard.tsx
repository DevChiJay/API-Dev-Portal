import { Copy, Eye, EyeOff, RotateCw, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "@/src/components/ui/use-toast";
import { ApiKey, ApiKeyCardProps } from "./types";

export function ApiKeyCard({ apiKey, revealed, onToggleVisibility, onRotate, onRevoke }: ApiKeyCardProps) {
  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard",
    });
  };

  return (
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
                ? revealed
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
                    onClick={onToggleVisibility}
                    title={revealed ? "Hide key" : "Show key"}
                  >
                    {revealed ? (
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
          onClick={onRotate}
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Rotate
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          disabled={apiKey.status === "revoked"}
          onClick={onRevoke}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Revoke
        </Button>
      </CardFooter>
    </Card>
  );
}
