import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { toast } from "@/src/components/ui/use-toast";
import { ApiInfo, CreateKeyDialogProps } from "./types";

export function CreateKeyDialog({ isOpen, onOpenChange, availableApis, refetch, user }: CreateKeyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      onOpenChange(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
}
