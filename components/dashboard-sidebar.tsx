"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
  Menu,
  X,
  Home,
  Percent,
  Globe,
  Receipt,
  Flower,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Товары", href: "/inventory", icon: Package },
  { name: "Заказы", href: "/orders", icon: ShoppingCart },
  { name: "Сотрудники", href: "/employees", icon: Users },
  { name: "Финансы", href: "/finance", icon: DollarSign },
  { name: "Скидки", href: "/discounts", icon: Percent },
  { name: "Конструктор букетов", href: "/bouquet-builder", icon: Flower },
  { name: "Календарь свежести", href: "/freshness", icon: Calendar }, // добавил ссылку на календарь свежести
  { name: "Веб-сайт", href: "#", icon: Globe },
  { name: "Касса", href: "/pos", icon: Receipt },
  { name: "Аналитика", href: "/analytics", icon: BarChart3 },
  { name: "Настройки", href: "/settings", icon: Settings },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center px-4 border-b border-sidebar-border">
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="mr-2">
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ERP System</span>
          </div>
        )}
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
