"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Home, AlertTriangle, TrendingDown, Trash2, Package, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Данные о товарах с информацией о свежести
const inventoryItems = [
  {
    id: 1,
    name: "Красные розы",
    category: "Розы",
    quantity: 45,
    arrivalDate: "2024-01-10",
    shelfLife: 7,
    currentAge: 3,
    costPrice: 120,
    sellingPrice: 200,
    status: "fresh",
    location: "Холодильник A1",
  },
  {
    id: 2,
    name: "Белые лилии",
    category: "Лилии",
    quantity: 28,
    arrivalDate: "2024-01-08",
    shelfLife: 10,
    currentAge: 5,
    costPrice: 150,
    sellingPrice: 250,
    status: "good",
    location: "Холодильник B2",
  },
  {
    id: 3,
    name: "Желтые тюльпаны",
    category: "Тюльпаны",
    quantity: 32,
    arrivalDate: "2024-01-06",
    shelfLife: 5,
    currentAge: 4,
    status: "warning",
    costPrice: 80,
    sellingPrice: 140,
    location: "Холодильник A2",
  },
  {
    id: 4,
    name: "Фиолетовые ирисы",
    category: "Ирисы",
    quantity: 15,
    arrivalDate: "2024-01-05",
    shelfLife: 6,
    currentAge: 6,
    status: "critical",
    costPrice: 100,
    sellingPrice: 180,
    location: "Холодильник C1",
  },
  {
    id: 5,
    name: "Розовые пионы",
    category: "Пионы",
    quantity: 8,
    arrivalDate: "2024-01-04",
    shelfLife: 4,
    currentAge: 5,
    status: "expired",
    costPrice: 200,
    sellingPrice: 350,
    location: "Холодильник B1",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "fresh":
      return "bg-green-100 text-green-800 border-green-200"
    case "good":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "critical":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "expired":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "fresh":
      return "Свежий"
    case "good":
      return "Хорошее состояние"
    case "warning":
      return "Требует внимания"
    case "critical":
      return "Критическое состояние"
    case "expired":
      return "Просрочен"
    default:
      return "Неизвестно"
  }
}

const getFreshnessPercentage = (currentAge: number, shelfLife: number) => {
  return Math.max(0, Math.min(100, ((shelfLife - currentAge) / shelfLife) * 100))
}

export default function FreshnessCalendar() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredItems = inventoryItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const statusMatch = selectedStatus === "all" || item.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const categories = [...new Set(inventoryItems.map((item) => item.category))]
  const statuses = [...new Set(inventoryItems.map((item) => item.status))]

  // Статистика
  const totalItems = inventoryItems.reduce((sum, item) => sum + item.quantity, 0)
  const expiredItems = inventoryItems
    .filter((item) => item.status === "expired")
    .reduce((sum, item) => sum + item.quantity, 0)
  const criticalItems = inventoryItems
    .filter((item) => item.status === "critical")
    .reduce((sum, item) => sum + item.quantity, 0)
  const warningItems = inventoryItems
    .filter((item) => item.status === "warning")
    .reduce((sum, item) => sum + item.quantity, 0)

  const potentialLoss = inventoryItems
    .filter((item) => item.status === "expired")
    .reduce((sum, item) => sum + item.costPrice * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Навигационная панель */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              Главная
            </Button>
          </Link>
          <Link href="/inventory">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />К товарам
            </Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Календарь свежести товаров</h1>
            <p className="text-gray-600">Отслеживание жизненного цикла и срока годности цветов</p>
          </div>

          {/* Статистические карточки */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего товаров</CardTitle>
                <Package className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">{totalItems}</div>
                <p className="text-xs text-gray-600">единиц в наличии</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-red-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Просроченные</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-700">{expiredItems}</div>
                <p className="text-xs text-gray-600">требуют утилизации</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Критические</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700">{criticalItems}</div>
                <p className="text-xs text-gray-600">срочная распродажа</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-yellow-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Потенциальные потери</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-700">{potentialLoss.toLocaleString()} ₽</div>
                <p className="text-xs text-gray-600">от просроченных товаров</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="calendar">Календарь свежести</TabsTrigger>
              <TabsTrigger value="alerts">Уведомления</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика потерь</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-6">
              {/* Фильтры */}
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle>Фильтры</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Состояние" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все состояния</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {getStatusText(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Список товаров */}
              <div className="grid gap-4">
                {filteredItems.map((item) => {
                  const freshnessPercentage = getFreshnessPercentage(item.currentAge, item.shelfLife)
                  const daysLeft = Math.max(0, item.shelfLife - item.currentAge)

                  return (
                    <Card key={item.id} className="bg-white/70 backdrop-blur-sm border-purple-100">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                              <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium">Количество:</span> {item.quantity} шт.
                              </div>
                              <div>
                                <span className="font-medium">Поступление:</span> {item.arrivalDate}
                              </div>
                              <div>
                                <span className="font-medium">Дней осталось:</span> {daysLeft}
                              </div>
                              <div>
                                <span className="font-medium">Местоположение:</span> {item.location}
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Свежесть</span>
                                <span>{Math.round(freshnessPercentage)}%</span>
                              </div>
                              <Progress value={freshnessPercentage} className="h-2" />
                            </div>

                            <div className="flex gap-4 text-sm">
                              <div>
                                <span className="font-medium">Себестоимость:</span> {item.costPrice} ₽
                              </div>
                              <div>
                                <span className="font-medium">Цена продажи:</span> {item.sellingPrice} ₽
                              </div>
                              {item.status === "critical" && (
                                <div className="text-orange-600">
                                  <span className="font-medium">Рекомендуемая скидка:</span> 30%
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            {item.status === "expired" && (
                              <Button size="sm" variant="destructive" className="gap-2">
                                <Trash2 className="h-4 w-4" />
                                Списать
                              </Button>
                            )}
                            {item.status === "critical" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-orange-600 border-orange-200 bg-transparent"
                              >
                                <TrendingDown className="h-4 w-4" />
                                Скидка 30%
                              </Button>
                            )}
                            {item.status === "warning" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-yellow-600 border-yellow-200 bg-transparent"
                              >
                                <TrendingDown className="h-4 w-4" />
                                Скидка 15%
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Активные уведомления
                  </CardTitle>
                  <CardDescription>Товары, требующие немедленного внимания</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-semibold text-red-800">Критическое уведомление</span>
                    </div>
                    <p className="text-red-700">Розовые пионы (8 шт.) просрочены и требуют немедленного списания</p>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="font-semibold text-orange-800">Срочная распродажа</span>
                    </div>
                    <p className="text-orange-700">
                      Фиолетовые ирисы (15 шт.) истекают сегодня - рекомендуется скидка 30%
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Предупреждение</span>
                    </div>
                    <p className="text-yellow-700">
                      Желтые тюльпаны (32 шт.) истекают завтра - рекомендуется скидка 15%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                  <CardHeader>
                    <CardTitle>Потери за месяц</CardTitle>
                    <CardDescription>Анализ списанных товаров</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Общая сумма потерь:</span>
                        <span className="font-semibold text-red-600">12,450 ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Количество списаний:</span>
                        <span className="font-semibold">23 позиции</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Средний % потерь:</span>
                        <span className="font-semibold">3.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                  <CardHeader>
                    <CardTitle>Прогноз на неделю</CardTitle>
                    <CardDescription>Ожидаемые списания</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Завтра истекает:</span>
                        <span className="font-semibold text-orange-600">32 шт.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Через 2 дня:</span>
                        <span className="font-semibold text-yellow-600">18 шт.</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Потенциальные потери:</span>
                        <span className="font-semibold text-red-600">8,200 ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle>Рекомендации по оптимизации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800">💡 Установите автоматические скидки за 2 дня до истечения срока</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800">📊 Анализируйте популярность товаров для корректировки закупок</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-purple-800">🎯 Создавайте тематические букеты из товаров с коротким сроком</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
