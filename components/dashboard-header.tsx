"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DashboardHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  const handleNotifications = () => {
    setIsNotificationsOpen(true)
  }

  const handleSettings = () => {
    setIsSettingsOpen(true)
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  // Простое получение email пользователя
  const userEmail = "admin@lavanda.com"

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

            {/* Простое выпадающее меню без использования компонентов Radix UI */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleProfileMenu} 
                className="h-8 w-8 sm:h-10 sm:w-10"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Профиль
                    </button>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleSettings}
                    >
                      Настройки
                    </button>
                  </div>
                  <div className="py-1 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>
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
