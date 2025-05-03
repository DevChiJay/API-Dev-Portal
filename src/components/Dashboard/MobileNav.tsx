import React from "react";
import { List, Home, Key, Library, Settings } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Separator } from "@/src/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { NavLink } from "@/src/components/Dashboard/NavLink";
import { ModeToggle } from "@/src/components/mode-toggle";

export function MobileNav() {
  return (
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
                userButtonAvatarBox: "w-8 h-8",
              },
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
              <NavLink
                href="/dashboard"
                icon={<Home className="mr-3 h-4 w-4" />}
                label="Dashboard"
                mobile
              />
              <NavLink
                href="/dashboard/my-keys"
                icon={<Key className="mr-3 h-4 w-4" />}
                label="My API Keys"
                mobile
              />
              <NavLink
                href="/dashboard/available-apis"
                icon={<Library className="mr-3 h-4 w-4" />}
                label="Available APIs"
                badge={{
                  text: "New",
                  variant: "default",
                }}
                mobile
              />

              <Separator className="my-4" />

              <NavLink
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
  );
}
