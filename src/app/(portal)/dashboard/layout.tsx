import { ReactNode } from "react";
import { Bell, Search } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { MobileNav } from "@/src/components/Dashboard/MobileNav";
import { Sidebar } from "@/src/components/Dashboard/Sidebar"; // New import

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row bg-muted/30">
      <Sidebar />
      <MobileNav />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-background p-4 hidden md:flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">Developer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search APIs..."
                className="pl-8 w-[250px] bg-background"
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
