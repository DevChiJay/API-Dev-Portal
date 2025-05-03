import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Key, Library, List, Settings } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-xl font-bold">
              API Portal
            </Link>
            <ModeToggle />
          </div>

          <nav className="space-y-2 flex-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <List className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/my-keys"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Key className="h-5 w-5" />
              My API Keys
            </Link>
            <Link
              href="/dashboard/available-apis"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Library className="h-5 w-5" />
              Available APIs
            </Link>
          </nav>

          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center gap-2">
              <UserButton />
              <div className="text-sm">
                <p className="font-medium">Account</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
