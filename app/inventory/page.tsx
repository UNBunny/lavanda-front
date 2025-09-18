"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Package, AlertTriangle, TrendingUp } from "lucide-react"
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

export default function InventoryPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const products = [
    {
      id: 1,
      name: "Букет роз 'Классик'",
      sku: "BR-001",
      category: "Букеты",
      stock: 25,
      price: 2500,
      status: "В наличии",
    },
    {
      id: 2,
      name: "Композиция 'Весенняя'",
      sku: "KM-002",
      category: "Композиции",
      stock: 8,
      price: 3200,
      status: "Мало",
    },
    {
      id: 3,
      name: "Роза красная (штука)",
      sku: "RZ-003",
      category: "Цветы",
      stock: 150,
      price: 120,
      status: "В наличии",
    },
    { id: 4, name: "Упаковка премиум", sku: "UP-004", category: "Упаковка", stock: 2, price: 450, status: "Критично" },
    { id: 5, name: "Лента атласная", sku: "LT-005", category: "Аксессуары", stock: 45, price: 85, status: "В наличии" },
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

  const handleAddProduct = () => {
    setIsAddProductOpen(true)
  }

  const handleFilter = () => {
    setIsFilterOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    alert(`Редактирование товара: ${product.name}`)
  }

  const handleDeleteProduct = (product: any) => {
    if (confirm(`Удалить товар "${product.name}"?`)) {
      alert(`Товар "${product.name}" удален`)
    }
  }

  const handleExport = () => {
    alert("Экспорт данных начат. Файл будет готов через несколько минут.")
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
                <h1 className="text-3xl font-bold text-balance">Управление товарами</h1>
                <p className="text-muted-foreground">Контроль остатков, цен и характеристик товаров</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddProduct}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить товар
                </Button>
              </div>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего товаров</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Критичные остатки</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">23</div>
                  <p className="text-xs text-muted-foreground">Требуют пополнения</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общая стоимость</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽2,847,320</div>
                  <p className="text-xs text-muted-foreground">+8.2% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Категории</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Активных категорий</p>
                </CardContent>
              </Card>
            </div>

            {/* Фильтры и поиск */}
            <Card>
              <CardHeader>
                <CardTitle>Каталог товаров</CardTitle>
                <CardDescription>Управление товарами, ценами и остатками</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по названию или артикулу..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilter}>
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[200px]">Товар</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[100px]">Артикул</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[120px]">Категория</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[100px]">Остаток</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[100px]">Цена</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[100px]">Статус</th>
                        <th className="h-12 px-4 text-left align-middle font-medium min-w-[180px]">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4 text-muted-foreground">{product.sku}</td>
                          <td className="p-4">{product.category}</td>
                          <td className="p-4">{product.stock} шт.</td>
                          <td className="p-4">₽{product.price.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                                Изменить
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product)}>
                                Удалить
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

      {/* Модальные окна для добавления товара и фильтров */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogDescription>Заполните информацию о новом товаре</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название товара</Label>
                <Input id="name" placeholder="Введите название" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">Артикул</Label>
                <Input id="sku" placeholder="BR-001" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bouquets">Букеты</SelectItem>
                    <SelectItem value="flowers">Цветы</SelectItem>
                    <SelectItem value="compositions">Композиции</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Цена</Label>
                <Input id="price" type="number" placeholder="2500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Количество</Label>
              <Input id="stock" type="number" placeholder="25" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                alert("Товар добавлен!")
                setIsAddProductOpen(false)
              }}
            >
              Добавить товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фильтры товаров</DialogTitle>
            <DialogDescription>Настройте фильтры для поиска товаров</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Категория</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="bouquets">Букеты</SelectItem>
                  <SelectItem value="flowers">Цветы</SelectItem>
                  <SelectItem value="compositions">Композиции</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Статус</Label>
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
                <Label>Цена от</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Цена до</Label>
                <Input type="number" placeholder="10000" />
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
