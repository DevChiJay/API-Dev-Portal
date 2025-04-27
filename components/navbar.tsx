"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, LayoutDashboard, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Docs",
      href: "/docs",
      icon: Book,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Admin",
      href: "/admin",
      icon: ShieldCheck,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-xl">
            DevPortal
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}
