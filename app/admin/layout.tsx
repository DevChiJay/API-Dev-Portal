import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}
