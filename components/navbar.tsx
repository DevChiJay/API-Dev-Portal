"use client"

import Link from "next/link"
import { Book, LayoutDashboard, ShieldCheck, Menu } from "lucide-react"
import { useAuth } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    {
      name: "API Docs",
      href: "/docs",
      icon: Book,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      protected: true,
    },
    {
      name: "Admin",
      href: "/admin/apis",
      icon: ShieldCheck,
      protected: true,
      admin: true,
    },
  ]

  // Filter nav items based on auth status
  const filteredNavItems = navItems.filter(item => {
    if (item.protected && !isSignedIn) return false;
    if (item.admin && !isSignedIn) return false; // In a real app would check admin role
    return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-xl flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">API</span>
            </div>
            <span>DevPortal</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-all hover:text-primary",
                  "text-muted-foreground",
                  "relative py-2"
                )}
              >
                <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLoaded && !isSignedIn && (
            <>
              <Button size="sm" variant="ghost" className="hidden md:flex btn-transition" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="hidden md:flex btn-transition" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          
          {/* Mobile menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-4">
                <Link href="/" className="font-semibold text-lg flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">API</span>
                  </div>
                  DevPortal
                </Link>
                
                <nav className="flex flex-col gap-2">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 py-2 px-3 text-sm rounded-md transition-all",
                        "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {isLoaded && !isSignedIn && (
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Button className="w-full btn-transition" asChild>
                      <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full btn-transition" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
