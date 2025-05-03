import { Key, Plus } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { EmptyKeyStateProps } from "./types";

export function EmptyKeyState({ onCreateKey }: EmptyKeyStateProps) {
  return (
    <Card className="text-center py-8">
      <CardContent>
        <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No API Keys Yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first API key to start accessing our services
        </p>
        <Button onClick={onCreateKey}>
          <Plus className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </CardContent>
    </Card>
  );
}
