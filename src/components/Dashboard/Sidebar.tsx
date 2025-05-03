import { UserButton } from "@clerk/nextjs";
import { Key, Library, Settings, Home } from "lucide-react";

import { ModeToggle } from "@/src/components/mode-toggle";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { NavLink } from "@/src/components/Dashboard/NavLink";

export function Sidebar() {
  return (
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
          <NavLink 
            href="/dashboard" 
            icon={<Home className="mr-3 h-4 w-4" />}
            label="Dashboard"
          />
          <NavLink 
            href="/dashboard/my-keys" 
            icon={<Key className="mr-3 h-4 w-4" />}
            label="My API Keys"
          />
          <NavLink 
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
          <NavLink 
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
  );
}
