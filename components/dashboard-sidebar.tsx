"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Banknote,
  Settings,
  Menu,
  X,
  Home,
  Percent,
  Globe,
  Receipt,
  Flower,
  Calendar,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { LavandaLogo } from "@/components/lavanda-logo"

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Товары", href: "/inventory", icon: Package },
  { name: "Флористический склад", href: "/floristic-inventory", icon: Leaf },
  { name: "Заказы", href: "/orders", icon: ShoppingCart },
  { name: "Сотрудники", href: "/employees", icon: Users },
  { name: "Финансы", href: "/finance", icon: Banknote },
  { name: "Скидки", href: "/discounts", icon: Percent },
  { name: "Конструктор букетов", href: "/bouquet-builder", icon: Flower },
  { name: "Календарь свежести", href: "/freshness", icon: Calendar },
  { name: "Веб-сайт", href: "#", icon: Globe },
  { name: "Касса", href: "/pos", icon: Receipt },
  { name: "Аналитика", href: "/analytics", icon: BarChart3 },
  { name: "Настройки", href: "/settings", icon: Settings },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

function NavigationItems({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        const content = (
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={onItemClick}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span>{item.name}</span>
          </Button>
        )

        if (item.href === "#") {
          return <div key={item.name}>{content}</div>
        }

        return (
          <Link key={item.name} href={item.href}>
            {content}
          </Link>
        )
      })}
    </>
  )
}

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  useEffect(() => {
    setIsSheetOpen(false)
  }, [pathname])

  if (isMobile) {
    return (
      <>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 md:hidden bg-background border shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
              <LavandaLogo />
            </div>
            <nav className="p-4 space-y-2">
              <NavigationItems onItemClick={() => setIsSheetOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="w-0" />
      </>
    )
  }

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 hidden md:block",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2">
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
        {!isCollapsed && <LavandaLogo />}
      </div>

      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const content = (
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-3", isCollapsed && "px-2")}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Button>
          )

          if (item.href === "#") {
            return <div key={item.name}>{content}</div>
          }

          return (
            <Link key={item.name} href={item.href}>
              {content}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
