"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
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
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-balance">Управление товарами</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Контроль остатков, цен и характеристик товаров
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" onClick={handleExport} size="sm" className="bg-transparent">
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddProduct} size="sm">
                  <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Добавить товар</span>
                  <span className="sm:hidden">Добавить</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Всего товаров</CardTitle>
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Критичные остатки</CardTitle>
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold text-red-600">23</div>
                  <p className="text-xs text-muted-foreground">Требуют пополнения</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Общая стоимость</CardTitle>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">₽2,847,320</div>
                  <p className="text-xs text-muted-foreground">+8.2% за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Категории</CardTitle>
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Активных категорий</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-base sm:text-lg">Каталог товаров</CardTitle>
                <CardDescription className="text-sm">Управление товарами, ценами и остатками</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по названию или артикулу..." className="pl-10 text-sm sm:text-base" />
                  </div>
                  <Button variant="outline" onClick={handleFilter} size="sm" className="bg-transparent flex-shrink-0">
                    <Filter className="w-4 h-4 mr-1 sm:mr-2" />
                    Фильтры
                  </Button>
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[150px] sm:min-w-[200px]">
                          Товар
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]">
                          Артикул
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[100px] sm:min-w-[120px]">
                          Категория
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]">
                          Остаток
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]">
                          Цена
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]">
                          Статус
                        </th>
                        <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-xs sm:text-sm min-w-[140px] sm:min-w-[180px]">
                          Действия
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 sm:p-4 font-medium text-xs sm:text-sm">{product.name}</td>
                          <td className="p-2 sm:p-4 text-muted-foreground text-xs sm:text-sm">{product.sku}</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">{product.category}</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">{product.stock} шт.</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">₽{product.price.toLocaleString()}</td>
                          <td className="p-2 sm:p-4">
                            <Badge className={`${getStatusColor(product.status)} text-xs`}>{product.status}</Badge>
                          </td>
                          <td className="p-2 sm:p-4">
                            <div className="flex gap-1 sm:gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                                className="text-xs sm:text-sm px-2 sm:px-3"
                              >
                                Изменить
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProduct(product)}
                                className="text-xs sm:text-sm px-2 sm:px-3"
                              >
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

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Добавить новый товар</DialogTitle>
            <DialogDescription className="text-sm">Заполните информацию о новом товаре</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Название товара
                </Label>
                <Input id="name" placeholder="Введите название" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm">
                  Артикул
                </Label>
                <Input id="sku" placeholder="BR-001" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm">
                  Категория
                </Label>
                <Select>
                  <SelectTrigger className="text-sm">
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
                <Label htmlFor="price" className="text-sm">
                  Цена
                </Label>
                <Input id="price" type="number" placeholder="2500" className="text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-sm">
                Количество
              </Label>
              <Input id="stock" type="number" placeholder="25" className="text-sm" />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)} className="w-full sm:w-auto">
              Отмена
            </Button>
            <Button
              onClick={() => {
                alert("Товар добавлен!")
                setIsAddProductOpen(false)
              }}
              className="w-full sm:w-auto"
            >
              Добавить товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Фильтры товаров</DialogTitle>
            <DialogDescription className="text-sm">Настройте фильтры для поиска товаров</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm">Категория</Label>
              <Select>
                <SelectTrigger className="text-sm">
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
              <Label className="text-sm">Статус</Label>
              <Select>
                <SelectTrigger className="text-sm">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Цена от</Label>
                <Input type="number" placeholder="0" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Цена до</Label>
                <Input type="number" placeholder="10000" className="text-sm" />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsFilterOpen(false)} className="w-full sm:w-auto">
              Сбросить
            </Button>
            <Button
              onClick={() => {
                alert("Фильтры применены!")
                setIsFilterOpen(false)
              }}
              className="w-full sm:w-auto"
            >
              Применить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthGuard>
  )
}
