"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function OrdersPage() {
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const orders = [
    {
      id: "#ORD-001",
      customer: "Анна Петрова",
      phone: "+7 (999) 123-45-67",
      items: "Букет роз 'Классик', Упаковка премиум",
      total: 2950,
      status: "Новый",
      date: "2024-01-15 14:30",
      delivery: "2024-01-16 16:00",
    },
    {
      id: "#ORD-002",
      customer: "Михаил Сидоров",
      phone: "+7 (999) 234-56-78",
      items: "Композиция 'Весенняя'",
      total: 3200,
      status: "В работе",
      date: "2024-01-15 12:15",
      delivery: "2024-01-15 18:00",
    },
    {
      id: "#ORD-003",
      customer: "Елена Козлова",
      phone: "+7 (999) 345-67-89",
      items: "Букет роз красных (25 шт), Лента атласная",
      total: 3085,
      status: "Готов",
      date: "2024-01-15 10:45",
      delivery: "2024-01-15 15:30",
    },
    {
      id: "#ORD-004",
      customer: "Дмитрий Волков",
      phone: "+7 (999) 456-78-90",
      items: "Композиция 'Романтик'",
      total: 4500,
      status: "Доставлен",
      date: "2024-01-14 16:20",
      delivery: "2024-01-15 12:00",
    },
    {
      id: "#ORD-005",
      customer: "Ольга Морозова",
      phone: "+7 (999) 567-89-01",
      items: "Букет тюльпанов",
      total: 1800,
      status: "Отменен",
      date: "2024-01-14 09:30",
      delivery: "2024-01-15 14:00",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Новый":
        return "bg-blue-100 text-blue-800"
      case "В работе":
        return "bg-yellow-100 text-yellow-800"
      case "Готов":
        return "bg-green-100 text-green-800"
      case "Доставлен":
        return "bg-emerald-100 text-emerald-800"
      case "Отменен":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Новый":
        return <ShoppingCart className="w-4 h-4" />
      case "В работе":
        return <Clock className="w-4 h-4" />
      case "Готов":
      case "Доставлен":
        return <CheckCircle className="w-4 h-4" />
      case "Отменен":
        return <XCircle className="w-4 h-4" />
      default:
        return <ShoppingCart className="w-4 h-4" />
    }
  }

  const handleNewOrder = () => {
    setIsNewOrderOpen(true)
  }

  const handleFilter = () => {
    setIsFilterOpen(true)
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    alert(`Просмотр заказа: ${order.id}`)
  }

  const handleEditOrder = (order: any) => {
    alert(`Редактирование заказа: ${order.id}`)
  }

  const handleExport = () => {
    alert("Экспорт заказов начат. Файл будет готов через несколько минут.")
  }

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Управление заказами</h1>
                <p className="text-muted-foreground">Обработка заказов от получения до доставки</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleNewOrder}>
                  <Plus className="w-4 h-4 mr-2" />
                  Новый заказ
                </Button>
              </div>
            </div>

            {/* Статистика заказов */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Новые заказы</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <p className="text-xs text-muted-foreground">Требуют обработки</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">В работе</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <p className="text-xs text-muted-foreground">В процессе выполнения</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Готовы к доставке</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <p className="text-xs text-muted-foreground">Ожидают курьера</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Выручка за день</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽47,320</div>
                  <p className="text-xs text-muted-foreground">+15% к вчера</p>
                </CardContent>
              </Card>
            </div>

            {/* Список заказов */}
            <Card>
              <CardHeader>
                <CardTitle>Список заказов</CardTitle>
                <CardDescription>Управление заказами и их статусами</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по номеру заказа или клиенту..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilter}>
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>

                {/* Таблица заказов */}
                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[140px]">Заказ</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[160px]">Клиент</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[200px]">Товары</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[100px]">Сумма</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[120px]">Статус</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[140px]">Доставка</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[180px]">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{order.id}</div>
                              <div className="text-sm text-muted-foreground">{order.date}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{order.customer}</div>
                              <div className="text-sm text-muted-foreground">{order.phone}</div>
                            </div>
                          </td>
                          <td className="p-4 max-w-xs">
                            <div className="truncate text-sm">{order.items}</div>
                          </td>
                          <td className="p-4 font-medium">₽{order.total.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{order.delivery}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                Просмотр
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditOrder(order)}>
                                Изменить
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Модальные окна для создания заказа и фильтров */}
      <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать новый заказ</DialogTitle>
            <DialogDescription>Заполните информацию о новом заказе</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Имя клиента</Label>
                <Input id="customer" placeholder="Введите имя" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (999) 123-45-67" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="items">Товары</Label>
              <Textarea id="items" placeholder="Опишите заказанные товары..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total">Сумма заказа</Label>
                <Input id="total" type="number" placeholder="2950" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery">Дата доставки</Label>
                <Input id="delivery" type="datetime-local" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки</Label>
                <Textarea id="address" placeholder="Введите адрес доставки..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                alert("Заказ создан!")
                setIsNewOrderOpen(false)
              }}
            >
              Создать заказ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фильтры заказов</DialogTitle>
            <DialogDescription>Настройте фильтры для поиска заказов</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Статус заказа</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новый</SelectItem>
                  <SelectItem value="processing">В работе</SelectItem>
                  <SelectItem value="ready">Готов</SelectItem>
                  <SelectItem value="delivered">Доставлен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата от</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Дата до</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Сумма от</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Сумма до</Label>
                <Input type="number" placeholder="50000" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
              Сбросить
            </Button>
            <Button
              onClick={() => {
                alert("Фильтры применены!")
                setIsFilterOpen(false)
              }}
            >
              Применить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
