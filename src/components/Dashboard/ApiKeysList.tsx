import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { EmptyKeyState } from "./EmptyKeyState";
import { ApiKeyCard } from "./ApiKeyCard";
import { CreateKeyDialog } from "./CreateKeyDialog";
import { RotateKeyDialog } from "./RotateKeyDialog";
import { RevokeKeyDialog } from "./RevokeKeyDialog";
import { ApiKey, ApiInfo, ApiKeysListProps } from "./types";

export function ApiKeysList({ apiKeys, availableApis, refetch, user }: ApiKeysListProps) {
  const [revealKey, setRevealKey] = useState<Record<string, boolean>>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRotateDialogOpen, setIsRotateDialogOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  
  const toggleKeyVisibility = (keyId: string) => {
    setRevealKey((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  if (apiKeys.length === 0) {
    return (
      <>
        <EmptyKeyState onCreateKey={() => setIsCreateDialogOpen(true)} />
        <CreateKeyDialog 
          isOpen={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen}
          availableApis={availableApis}
          refetch={refetch}
          user={user}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My API Keys</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {apiKeys.map((apiKey) => (
          <ApiKeyCard 
            key={apiKey.id} 
            apiKey={apiKey} 
            revealed={!!revealKey[apiKey.id]} 
            onToggleVisibility={() => toggleKeyVisibility(apiKey.id)}
            onRotate={() => {
              setSelectedKeyId(apiKey.id);
              setIsRotateDialogOpen(true);
            }}
            onRevoke={() => {
              setSelectedKeyId(apiKey.id);
              setIsRevokeDialogOpen(true);
            }}
          />
        ))}
      </div>
      
      <CreateKeyDialog 
        isOpen={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        availableApis={availableApis}
        refetch={refetch}
        user={user}
      />
      
      <RotateKeyDialog 
        isOpen={isRotateDialogOpen} 
        onOpenChange={setIsRotateDialogOpen}
        keyId={selectedKeyId}
        refetch={refetch}
        user={user}
        onComplete={() => setSelectedKeyId(null)}
      />
      
      <RevokeKeyDialog 
        isOpen={isRevokeDialogOpen} 
        onOpenChange={setIsRevokeDialogOpen}
        keyId={selectedKeyId}
        refetch={refetch}
        user={user}
        onComplete={() => setSelectedKeyId(null)}
      />
    </>
  );
}
