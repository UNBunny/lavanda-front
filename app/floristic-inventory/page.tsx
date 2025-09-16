"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Package, AlertTriangle, TrendingUp, ArrowLeft, Leaf, Scissors, Gift } from "lucide-react"
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
import Link from "next/link"

export default function FloristicInventoryPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const floristicProducts = [
    {
      id: 1,
      name: "Роза красная 'Гран При'",
      sku: "FL-R001",
      category: "Цветы",
      unit: "шт",
      stock: 150,
      minStock: 20,
      price: 120,
      season: "Круглогодично",
      freshnessDays: 7,
      status: "В наличии",
    },
    {
      id: 2,
      name: "Зелень эвкалипта",
      sku: "FL-G002",
      category: "Зелень",
      unit: "пучок",
      stock: 25,
      minStock: 5,
      price: 180,
      season: "Круглогодично",
      freshnessDays: 14,
      status: "В наличии",
    },
    {
      id: 3,
      name: "Лента атласная розовая",
      sku: "FL-L003",
      category: "Ленты",
      unit: "м",
      stock: 45.5,
      minStock: 10,
      price: 85,
      season: "Круглогодично",
      freshnessDays: 365,
      status: "В наличии",
    },
    {
      id: 4,
      name: "Бумага крафт натуральная",
      sku: "FL-P004",
      category: "Упаковка",
      unit: "м²",
      stock: 12.3,
      minStock: 5,
      price: 150,
      season: "Круглогодично",
      freshnessDays: 365,
      status: "В наличии",
    },
    {
      id: 5,
      name: "Тюльпан желтый",
      sku: "FL-T005",
      category: "Цветы",
      unit: "шт",
      stock: 8,
      minStock: 20,
      price: 95,
      season: "Весна",
      freshnessDays: 5,
      status: "Критично",
    },
    {
      id: 6,
      name: "Флористическая губка",
      sku: "FL-S006",
      category: "Материалы",
      unit: "шт",
      stock: 35,
      minStock: 10,
      price: 45,
      season: "Круглогодично",
      freshnessDays: 365,
      status: "В наличии",
    },
    {
      id: 7,
      name: "Проволока флористическая 0.8мм",
      sku: "FL-W007",
      category: "Материалы",
      unit: "м",
      stock: 125.7,
      minStock: 50,
      price: 12,
      season: "Круглогодично",
      freshnessDays: 365,
      status: "В наличии",
    },
    {
      id: 8,
      name: "Пион розовый",
      sku: "FL-P008",
      category: "Цветы",
      unit: "шт",
      stock: 3,
      minStock: 15,
      price: 280,
      season: "Лето",
      freshnessDays: 4,
      status: "Критично",
    },
  ]

  const categories = [
    { value: "all", label: "Все категории", icon: Package },
    { value: "flowers", label: "Цветы", icon: Package },
    { value: "greens", label: "Зелень", icon: Leaf },
    { value: "ribbons", label: "Ленты", icon: Scissors },
    { value: "packaging", label: "Упаковка", icon: Gift },
    { value: "materials", label: "Материалы", icon: Package },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "В наличии":
        return "bg-green-100 text-green-800"
      case "Мало":
        return "bg-yellow-100 text-yellow-800"
      case "Критично":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeasonColor = (season: string) => {
    switch (season) {
      case "Весна":
        return "bg-green-100 text-green-800"
      case "Лето":
        return "bg-yellow-100 text-yellow-800"
      case "Осень":
        return "bg-orange-100 text-orange-800"
      case "Зима":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-purple-100 text-purple-800"
    }
  }

  const filteredProducts =
    selectedCategory === "all"
      ? floristicProducts
      : floristicProducts.filter((product) => {
          switch (selectedCategory) {
            case "flowers":
              return product.category === "Цветы"
            case "greens":
              return product.category === "Зелень"
            case "ribbons":
              return product.category === "Ленты"
            case "packaging":
              return product.category === "Упаковка"
            case "materials":
              return product.category === "Материалы"
            default:
              return true
          }
        })

  const criticalItems = floristicProducts.filter((p) => p.stock <= p.minStock).length
  const totalValue = floristicProducts.reduce((sum, p) => sum + p.stock * p.price, 0)
  const seasonalItems = floristicProducts.filter((p) => p.season !== "Круглогодично").length

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            {/* Навигация назад */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  На главную
                </Button>
              </Link>
              <Link href="/inventory">
                <Button variant="outline" size="sm">
                  <Package className="w-4 h-4 mr-2" />К общему складу
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance">Флористический склад</h1>
                <p className="text-muted-foreground">
                  Специализированный учет цветов, зелени, лент и упаковочных материалов
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Экспорт</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить товар
                </Button>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего позиций</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{floristicProducts.length}</div>
                  <p className="text-xs text-muted-foreground">Флористических товаров</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Критичные остатки</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{criticalItems}</div>
                  <p className="text-xs text-muted-foreground">Требуют пополнения</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общая стоимость</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽{totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Стоимость остатков</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Сезонные товары</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{seasonalItems}</div>
                  <p className="text-xs text-muted-foreground">Ограниченный сезон</p>
                </CardContent>
              </Card>
            </div>

            {/* Фильтры по категориям */}
            <Card>
              <CardHeader>
                <CardTitle>Категории товаров</CardTitle>
                <CardDescription>Быстрый доступ к специализированным категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {category.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Каталог товаров */}
            <Card>
              <CardHeader>
                <CardTitle>Каталог флористических товаров</CardTitle>
                <CardDescription>Управление специализированным ассортиментом с учетом единиц измерения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по названию или артикулу..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>

                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Товар</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Артикул</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Категория</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Остаток</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Ед. изм.</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Цена</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Сезон</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Свежесть</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4 text-muted-foreground">{product.sku}</td>
                            <td className="p-4">{product.category}</td>
                            <td className="p-4 font-mono">{product.stock}</td>
                            <td className="p-4 text-muted-foreground">{product.unit}</td>
                            <td className="p-4">₽{product.price}</td>
                            <td className="p-4">
                              <Badge className={getSeasonColor(product.season)}>{product.season}</Badge>
                            </td>
                            <td className="p-4 text-muted-foreground">{product.freshnessDays} дн.</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  Изменить
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Удалить
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Модальное окно добавления товара */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить флористический товар</DialogTitle>
            <DialogDescription>Заполните информацию с учетом специфики флористики</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название товара</Label>
                <Input id="name" placeholder="Роза красная 'Гран При'" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">Артикул</Label>
                <Input id="sku" placeholder="FL-R001" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flowers">Цветы</SelectItem>
                    <SelectItem value="greens">Зелень</SelectItem>
                    <SelectItem value="ribbons">Ленты</SelectItem>
                    <SelectItem value="packaging">Упаковка</SelectItem>
                    <SelectItem value="materials">Материалы</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Единица измерения</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ед. изм." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piece">шт</SelectItem>
                    <SelectItem value="bunch">пучок</SelectItem>
                    <SelectItem value="meter">м</SelectItem>
                    <SelectItem value="sqmeter">м²</SelectItem>
                    <SelectItem value="kg">кг</SelectItem>
                    <SelectItem value="liter">л</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="season">Сезонность</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сезон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-year">Круглогодично</SelectItem>
                    <SelectItem value="spring">Весна</SelectItem>
                    <SelectItem value="summer">Лето</SelectItem>
                    <SelectItem value="autumn">Осень</SelectItem>
                    <SelectItem value="winter">Зима</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Остаток</Label>
                <Input id="stock" type="number" step="0.1" placeholder="25.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Мин. остаток</Label>
                <Input id="minStock" type="number" step="0.1" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Цена</Label>
                <Input id="price" type="number" placeholder="120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freshness">Свежесть (дни)</Label>
                <Input id="freshness" type="number" placeholder="7" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                alert("Флористический товар добавлен!")
                setIsAddProductOpen(false)
              }}
            >
              Добавить товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Модальное окно фильтров */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фильтры флористических товаров</DialogTitle>
            <DialogDescription>Настройте фильтры с учетом специфики флористики</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="flowers">Цветы</SelectItem>
                    <SelectItem value="greens">Зелень</SelectItem>
                    <SelectItem value="ribbons">Ленты</SelectItem>
                    <SelectItem value="packaging">Упаковка</SelectItem>
                    <SelectItem value="materials">Материалы</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Сезонность</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Все сезоны" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все сезоны</SelectItem>
                    <SelectItem value="all-year">Круглогодично</SelectItem>
                    <SelectItem value="spring">Весна</SelectItem>
                    <SelectItem value="summer">Лето</SelectItem>
                    <SelectItem value="autumn">Осень</SelectItem>
                    <SelectItem value="winter">Зима</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Статус остатков</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="available">В наличии</SelectItem>
                  <SelectItem value="low">Мало</SelectItem>
                  <SelectItem value="critical">Критично</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Свежесть от (дни)</Label>
                <Input type="number" placeholder="1" />
              </div>
              <div className="space-y-2">
                <Label>Свежесть до (дни)</Label>
                <Input type="number" placeholder="365" />
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
