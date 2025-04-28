import { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Explore our available APIs and their detailed documentation
          </p>
        </div>
        
        <main>{children}</main>
      </div>
    </div>
  );
}
