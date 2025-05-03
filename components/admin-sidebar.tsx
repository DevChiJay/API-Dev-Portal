"use client"

import Link from "next/link"
import { Key, Settings, ShieldCheck, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const sidebarItems = [
  {
    title: "Users",
    href: "/admin",
    icon: Users,
  },
  {
    title: "APIs",
    href: "/admin/apis",
    icon: Key,
  },
  {
    title: "Permissions",
    href: "/admin/permissions",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const isMobile = useMobile()

  const SidebarContent = (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Admin Panel</h2>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                "text-muted-foreground hover:text-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden ml-2 mt-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return <div className="hidden md:block w-[240px] flex-shrink-0 border-r">{SidebarContent}</div>
}
