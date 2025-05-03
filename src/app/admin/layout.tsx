import type { ReactNode } from "react"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link"
import { List, Settings, Users, ShieldCheck, Key, ChevronRight, Filter, Search } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { ModeToggle } from "@/src/components/mode-toggle"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Separator } from "@/src/components/ui/separator"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-muted/30">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 h-screen flex-col bg-background border-r shadow-sm">
        <div className="p-4 flex items-center gap-2 border-b">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">API</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">DevChi</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
        
        <ScrollArea className="flex-grow px-3 py-4">
          <nav className="flex flex-col gap-1">
            <div className="mb-1 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Management
            </div>
            <AdminNavLink
              href="/admin/apis"
              icon={<Key className="mr-3 h-4 w-4" />}
              label="API Management"
            />
            <AdminNavLink
              href="/admin/users"
              icon={<Users className="mr-3 h-4 w-4" />}
              label="User Management"
            />
            <AdminNavLink
              href="/admin/permissions"
              icon={<ShieldCheck className="mr-3 h-4 w-4" />}
              label="Permissions"
            />
            
            <div className="my-4 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">
              System
            </div>
            <AdminNavLink
              href="/admin/settings"
              icon={<Settings className="mr-3 h-4 w-4" />}
              label="System Settings"
            />
          </nav>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8"
                  }
                }}
              />
              <div className="flex flex-col text-sm">
                <span className="font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">Full Access</span>
              </div>
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
            <span className="font-semibold">Admin Panel</span>
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
            <div className="flex flex-col">
              <span className="font-semibold">DevChi</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="px-1 py-3">
              <nav className="flex flex-col gap-1 px-2">
                <AdminNavLink
                  href="/admin/apis"
                  icon={<Key className="mr-3 h-4 w-4" />}
                  label="API Management"
                  mobile
                />
                <AdminNavLink
                  href="/admin/users"
                  icon={<Users className="mr-3 h-4 w-4" />}
                  label="User Management"
                  mobile
                />
                <AdminNavLink
                  href="/admin/permissions"
                  icon={<ShieldCheck className="mr-3 h-4 w-4" />}
                  label="Permissions"
                  mobile
                />
                
                <Separator className="my-4" />
                
                <AdminNavLink
                  href="/admin/settings"
                  icon={<Settings className="mr-3 h-4 w-4" />}
                  label="System Settings"
                  mobile
                />
              </nav>
              
              <div className="mt-6 px-3">
                <div className="flex justify-between items-center">
                  <Link href="/dashboard" className="text-sm text-primary hover:underline">
                    Back to Dashboard
                  </Link>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-background p-4 hidden md:flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">Admin Control Panel</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Filters
            </Button>
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 w-[200px] bg-background" />
            </div>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Exit Admin
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto scrollbar-thin p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

// Helper component for navigation links
function AdminNavLink({ 
  href, 
  icon, 
  label, 
  mobile = false
}: { 
  href: string;
  icon: React.ReactNode;
  label: string;
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
      <ChevronRight className={cn(
        "h-4 w-4 text-muted-foreground transition-transform"
      )} />
    </Link>
  );
}
