import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/use-toast";
import { RevokeKeyDialogProps } from "./types";

export function RevokeKeyDialog({ 
  isOpen, 
  onOpenChange, 
  keyId, 
  refetch, 
  user,
  onComplete 
}: RevokeKeyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRevokeKey = async () => {
    if (!keyId) return;
    setIsSubmitting(true);
    
    try {
      // Get token from Clerk
      const token = await user?.getToken();
      
      // Call the API to revoke the key
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys/${keyId}`,
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
      onOpenChange(false);
    } catch (err) {
      const error = err as any;
      toast({
        title: "Error Revoking Key",
        description: error.response?.data?.message || error.message || "Failed to revoke API key",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      onComplete();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke API Key</DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke this API key? This action cannot be undone and the key will no longer work.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
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
  );
}
