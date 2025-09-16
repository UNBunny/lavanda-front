"use client"

import { useState } from "react"
import { Bell, Search, Settings, User } from "lucide-react"
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

  const handleNotifications = () => {
    setIsNotificationsOpen(true)
  }

  const handleSettings = () => {
    setIsSettingsOpen(true)
  }

  const handleLogout = () => {
    alert("Выход из системы")
  }

  return (
    <>
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center px-6 gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Поиск по системе..." className="pl-10 bg-background" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleNotifications}>
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleSettings}>
              <Settings className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings}>Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Уведомления</DialogTitle>
            <DialogDescription>Последние уведомления системы</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Новый заказ #ORD-123</p>
              <p className="text-sm text-muted-foreground">5 минут назад</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Критичные остатки товаров</p>
              <p className="text-sm text-muted-foreground">15 минут назад</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Смена закрыта</p>
              <p className="text-sm text-muted-foreground">2 часа назад</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Быстрые настройки</DialogTitle>
            <DialogDescription>Основные настройки системы</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Темная тема</span>
              <Button variant="outline" size="sm">
                Переключить
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Уведомления</span>
              <Button variant="outline" size="sm">
                Настроить
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Язык интерфейса</span>
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
