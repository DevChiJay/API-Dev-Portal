import type { ReactNode } from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}
