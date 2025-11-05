import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full">
        <Header />
        <main className="flex-1 bg-background p-4 sm:p-6 lg:p-8">
          <div className="w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
