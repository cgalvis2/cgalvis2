"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  Scan,
  TrendingUp,
  BarChart3,
  Zap,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Products",
    href: "/inventory",
    icon: Package,
    badge: null,
  },
  {
    name: "Scanner",
    href: "/scanner",
    icon: Scan,
    badge: "New",
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    badge: null,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    badge: null,
  },
  {
    name: "Analytics",
    href: "/reports",
    icon: BarChart3,
    badge: null,
  },
]

const bottomNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-900 dark:bg-slate-950">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">Inventory</span>
            <span className="text-xs text-slate-400">Pro Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <div className="px-2 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-slate-400 uppercase">Main</h2>
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-800 hover:text-white",
                      isActive ? "bg-primary text-primary-foreground shadow-lg" : "text-slate-300 hover:text-white",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="px-2 py-2">
            <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-slate-400 uppercase">System</h2>
            <div className="space-y-1">
              {bottomNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-800 hover:text-white",
                      isActive ? "bg-primary text-primary-foreground shadow-lg" : "text-slate-300 hover:text-white",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom section */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Upgrade Plan</p>
            <p className="text-xs text-slate-400">Get more features</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72">
        <div className="flex h-full max-h-screen flex-col">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}
