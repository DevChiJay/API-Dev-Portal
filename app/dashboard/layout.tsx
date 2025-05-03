import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Key, Library, List, Settings, ChevronRight, Bell, Search, Home } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row bg-muted/30">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 h-screen flex-col bg-background border-r shadow-sm">
        <div className="p-4 flex items-center gap-2 border-b">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">API</span>
          </div>
          <span className="font-semibold text-lg">DevChi</span>
        </div>
        
        <ScrollArea className="flex-grow px-3 py-4">
          <nav className="flex flex-col gap-1">
            <div className="mb-1 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Main
            </div>
            <DashboardNavLink 
              href="/dashboard" 
              icon={<Home className="mr-3 h-4 w-4" />}
              label="Dashboard"
            />
            <DashboardNavLink 
              href="/dashboard/my-keys" 
              icon={<Key className="mr-3 h-4 w-4" />}
              label="My API Keys"
            />
            <DashboardNavLink 
              href="/dashboard/available-apis" 
              icon={<Library className="mr-3 h-4 w-4" />}
              label="Available APIs"
              badge={{
                text: "New",
                variant: "default"
              }}
            />
            
            <div className="my-4 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Settings
            </div>
            <DashboardNavLink 
              href="/dashboard/settings" 
              icon={<Settings className="mr-3 h-4 w-4" />}
              label="Account Settings"
            />
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8"
                }
              }}
            />
            <div className="flex flex-col text-sm">
              <span className="font-medium">My Account</span>
              <span className="text-xs text-muted-foreground">Developer</span>
            </div>
            <ModeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <Sheet>
        <div className="flex md:hidden items-center gap-4 border-b bg-background p-4 justify-between">
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="flex md:hidden">
              <List className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">API</span>
            </div>
            <span className="font-semibold">DevChi</span>
          </div>
          
          <div className="flex items-center gap-1">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
        
        <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
          <div className="px-2 py-4 flex items-center gap-2 border-b">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center ml-2">
              <span className="text-xs font-bold text-primary-foreground">API</span>
            </div>
            <span className="font-semibold">DevChi</span>
          </div>
          
          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="px-1 py-3">
              <nav className="flex flex-col gap-1 px-2">
                <DashboardNavLink 
                  href="/dashboard" 
                  icon={<Home className="mr-3 h-4 w-4" />}
                  label="Dashboard"
                  mobile
                />
                <DashboardNavLink 
                  href="/dashboard/my-keys" 
                  icon={<Key className="mr-3 h-4 w-4" />}
                  label="My API Keys"
                  mobile
                />
                <DashboardNavLink 
                  href="/dashboard/available-apis" 
                  icon={<Library className="mr-3 h-4 w-4" />}
                  label="Available APIs"
                  badge={{
                    text: "New",
                    variant: "default"
                  }}
                  mobile
                />
                
                <Separator className="my-4" />
                
                <DashboardNavLink 
                  href="/dashboard/settings" 
                  icon={<Settings className="mr-3 h-4 w-4" />}
                  label="Account Settings"
                  mobile
                />
              </nav>
              
              <div className="mt-6 px-3">
                <ModeToggle />
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-background p-4 hidden md:flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">Developer Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search APIs..." className="pl-8 w-[250px] bg-background" />
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

// Helper component for navigation links
function DashboardNavLink({ 
  href, 
  icon, 
  label, 
  badge,
  mobile = false
}: { 
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: { text: string; variant: "default" | "secondary" | "outline" };
  mobile?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all",
        "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
        mobile && "py-2.5"
      )}
    >
      <span className="flex items-center">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-1">
        {badge && (
          <Badge variant={badge.variant} className={cn("h-5 text-xs", mobile && "hidden")}>
            {badge.text}
          </Badge>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  );
}
