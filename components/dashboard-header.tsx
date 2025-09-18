"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DashboardHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const router = useRouter()

  const handleNotifications = () => {
    setIsNotificationsOpen(true)
  }

  const handleSettings = () => {
    setIsSettingsOpen(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null

  return (
    <>
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center px-3 sm:px-6 gap-2 sm:gap-4">
          <div className="w-12 md:w-0" />

          <div className="flex-1 flex items-center gap-2 sm:gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Поиск..." className="pl-10 bg-background text-sm sm:text-base" />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={handleNotifications} className="h-8 w-8 sm:h-10 sm:w-10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleSettings} className="h-8 w-8 sm:h-10 sm:w-10">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userEmail ? userEmail : "Мой аккаунт"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="max-w-md mx-4 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Уведомления</DialogTitle>
            <DialogDescription>Последние уведомления системы</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="p-3 sm:p-4 border rounded-lg">
              <p className="font-medium text-sm sm:text-base">Новый заказ #ORD-123</p>
              <p className="text-xs sm:text-sm text-muted-foreground">5 минут назад</p>
            </div>
            <div className="p-3 sm:p-4 border rounded-lg">
              <p className="font-medium text-sm sm:text-base">Критичные остатки товаров</p>
              <p className="text-xs sm:text-sm text-muted-foreground">15 минут назад</p>
            </div>
            <div className="p-3 sm:p-4 border rounded-lg">
              <p className="font-medium text-sm sm:text-base">Смена закрыта</p>
              <p className="text-xs sm:text-sm text-muted-foreground">2 часа назад</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md mx-4 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Быстрые настройки</DialogTitle>
            <DialogDescription>Основные настройки системы</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base">Темная тема</span>
              <Button variant="outline" size="sm">
                Переключить
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base">Уведомления</span>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base">Язык интерфейса</span>
              <Button variant="outline" size="sm">
                Русский
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
