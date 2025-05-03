import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/use-toast";
import { RotateKeyDialogProps } from "./types";

export function RotateKeyDialog({ 
  isOpen, 
  onOpenChange, 
  keyId, 
  refetch, 
  user,
  onComplete 
}: RotateKeyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRotateKey = async () => {
    if (!keyId) return;
    setIsSubmitting(true);
    
    try {
      // Get token from Clerk
      const token = await user?.getToken();
      
      // Call the API to rotate the key
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys/${keyId}/rotate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      toast({
        title: "API Key Rotated",
        description: "Your API key has been successfully rotated",
      });
      
      // Refresh the data
      refetch();
      onOpenChange(false);
    } catch (err) {
      const error = err as any;
      toast({
        title: "Error Rotating Key",
        description: error.response?.data?.message || error.message || "Failed to rotate API key",
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
          <DialogTitle>Rotate API Key</DialogTitle>
          <DialogDescription>
            Are you sure you want to rotate this API key? This will generate a new key and invalidate the old one.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleRotateKey} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Rotate Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
