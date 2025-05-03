import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { DashboardNavLinkProps } from "./types";

export function NavLink({ 
  href, 
  icon, 
  label, 
  badge, 
  mobile = false 
}: DashboardNavLinkProps) {
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
