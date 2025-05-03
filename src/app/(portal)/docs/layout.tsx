import { ReactNode } from "react";
import DocsNavbar from "@/src/components/Docs/Navbar";
import { Separator } from "@/src/components/ui/separator";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <DocsNavbar />
      <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
      <main className="flex-1 container py-8 md:py-10 max-w-5xl">
        {children}
      </main>
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © 2025 DevChi API Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
