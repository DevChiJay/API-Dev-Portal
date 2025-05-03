export interface ApiInfo {
  id: string;
  name: string;
  description: string;
  slug: string;
  version?: string;
  category?: string;
  access?: "public" | "restricted" | "private";
  status?: "stable" | "beta" | "deprecated";
  hasAccess?: boolean;
  documentation?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  status: "active" | "expired" | "revoked";
  createdAt: string;
  key?: string;
  lastUsed?: string | null;
  apiScope?: string[];
}

export interface DashboardNavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: { text: string; variant: "default" | "secondary" | "outline" };
  mobile?: boolean;
}

export interface ApiCardProps {
  api: ApiInfo;
  onRequestAccess: (api: ApiInfo) => void;
}

export interface ApiKeyCardProps {
  apiKey: ApiKey;
  revealed: boolean;
  onToggleVisibility: () => void;
  onRotate: () => void;
  onRevoke: () => void;
}

export interface ApiKeysProps {
  keysData: { keys: ApiKey[] } | undefined;
}

export interface ApiKeysListProps {
  apiKeys: ApiKey[];
  availableApis: ApiInfo[];
  refetch: () => void;
  user: any;
}

export interface AvailableApisContentProps {
  apis: ApiInfo[];
  isLoading: boolean;
  error: any;
}

export interface CreateKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableApis: ApiInfo[];
  refetch: () => void;
  user: any;
}

export interface EmptyKeyStateProps {
  onCreateKey: () => void;
}

export interface RotateKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  keyId: string | null;
  refetch: () => void;
  user: any;
  onComplete: () => void;
}

export interface RevokeKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  keyId: string | null;
  refetch: () => void;
  user: any;
  onComplete: () => void;
}
