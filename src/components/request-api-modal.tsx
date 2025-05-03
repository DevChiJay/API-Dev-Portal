"use client";

import React, { useState, useActionState } from "react";
import { useToast } from "@/src/components/ui/use-toast";

import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  Copy,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

interface RequestApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableApis?: { id: string; name: string }[];
  selectedApiId?: string;
}

interface ApiKeyResponse {
  id: string;
  name: string;
  key: string;
  apiId: string;
  status: string;
  permissions: string;
  rateLimit: number;
  createdAt: string;
  expiresAt: string;
}

const endpoint = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/keys`;

export function RequestApiModal({
  isOpen,
  onClose,
  availableApis = [],
  selectedApiId,
}: RequestApiModalProps) {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { getToken } = useAuth();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const submitForm = async (prevState, formData) => {
    const data = {
      apiId: selectedApiId || "",
      name: formData.get("name") || "",
      permissions: formData.get("permissions") || "",
      rateLimit: formData.get("rateLimit") || "1000",
      expiresAt: formData.get("expiresAt") || new Date().toISOString(),
    };

    if (!data.apiId) {
      setError("Please select an API");
      return false;
    }

    if (!data.name) {
      setError("Please enter a key name");
      return false;
    }

    if (!data.permissions) {
      setError("Please select permissions");
      return false;
    }

    if (!data.rateLimit) {
      setError("Please specify a rate limit");
      return false;
    }

    try {
      const token = await getToken();
      const response = await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setShowSuccessModal(true);
      setError(null);

      return {response: response.data}
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  const [state, formAction, isPending] = useActionState(submitForm, {})
  const apiResponse = state?.response

  if (showSuccessModal && apiResponse) {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              API Key Created Successfully
            </DialogTitle>
            <DialogDescription>
              Your API key has been created. Please save this key as it will be
              shown only once.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-2 bg-background rounded border">
                  <code className="text-sm font-mono break-all">
                    {apiResponse?.key}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      apiResponse?.key &&
                      copyToClipboard(apiResponse.key)
                    }
                    className="ml-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 rounded-md p-3">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-400">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This key will not be shown again. Please copy it now and
                    store it securely.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium">Name:</div>
                <div className="col-span-2 text-sm">
                  {apiResponse.name}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium">Permissions:</div>
                <div className="col-span-2 text-sm">
                  {apiResponse.permissions}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium">Rate Limit:</div>
                <div className="col-span-2 text-sm">
                  {apiResponse.rateLimit} requests/day
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-sm font-medium">Expires:</div>
                <div className="col-span-2 text-sm">
                  {new Date(apiResponse.expiresAt).toLocaleDateString()}(
                  {new Date(apiResponse.expiresAt).toLocaleTimeString()})
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={closeSuccessModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Request API Key</DialogTitle>
            <DialogDescription>
              Fill in the form below to request a new API key for your
              application.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiId" className="text-right">
                API
              </Label>
              <div className="col-span-3">
                <Select
                  name="apiId"
                  value={selectedApiId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select API" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableApis.map((api) => (
                      <SelectItem key={api.id} value={api.id}>
                        {api.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Key Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="My Project API Key"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permissions" className="text-right">
                Permissions
              </Label>
              <div className="col-span-3">
                <Select
                  name="permissions"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read-only</SelectItem>
                    <SelectItem value="write">Write-only</SelectItem>
                    <SelectItem value="read_write">Read & Write</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rateLimit" className="text-right">
                Rate Limit
              </Label>
              <Input
                id="rateLimit"
                name="rateLimit"
                type="number"
                placeholder="1000"
                min="1"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiresAt" className="text-right">
                Expires On
              </Label>
              <div className="col-span-3">
                <input
                  type="hidden"
                  name="expiresAt"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date)}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              ) : (
                "Request Key"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
