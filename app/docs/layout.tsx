import { ReactNode } from "react";
import DocsNavbar from "@/components/docs-navbar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DocsNavbar />
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  );
}
