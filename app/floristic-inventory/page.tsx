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
                <div className="flex-1 flex flex-col min-w-0">
                    <DashboardHeader />
                    <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">

                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-balance">Флористический склад</h1>
                                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                                    Специализированный учет цветов, зелени, лент и упаковочных материалов
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                                    Экспорт
                                </Button>
                                <Button className="w-full sm:w-auto" onClick={() => setIsAddProductOpen(true)}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Добавить позицию
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Всего позиций</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl sm:text-2xl font-bold">{floristicProducts.length}</div>
                                    <p className="text-xs text-muted-foreground">Флористических товаров</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Критичные остатки</CardTitle>
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl sm:text-2xl font-bold text-red-600">{criticalItems}</div>
                                    <p className="text-xs text-muted-foreground">Требуют пополнения</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Общая стоимость</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl sm:text-2xl font-bold">₽{totalValue.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">Стоимость остатков</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Сезонные товары</CardTitle>
                                    <Leaf className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xl sm:text-2xl font-bold">{seasonalItems}</div>
                                    <p className="text-xs text-muted-foreground">Ограниченный сезон</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">Категории товаров</CardTitle>
                                <CardDescription className="text-sm">Быстрый доступ к специализированным категориям</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                    {categories.map((category) => {
                                        const Icon = category.icon
                                        return (
                                            <Button
                                                key={category.value}
                                                variant={selectedCategory === category.value ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setSelectedCategory(category.value)}
                                                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9"
                                            >
                                                <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                                <span className="truncate">{category.label}</span>
                                            </Button>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">Каталог флористических товаров</CardTitle>
                                <CardDescription className="text-sm">
                                    Управление специализированным ассортиментом с учетом единиц измерения
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Поиск по названию или артикулу..." className="pl-10 text-sm" />
                                    </div>
                                    <Button variant="outline" onClick={() => setIsFilterOpen(true)} className="w-full sm:w-auto">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Фильтры
                                    </Button>
                                </div>

                                <div className="block lg:hidden space-y-3">
                                    {filteredProducts.map((product) => (
                                        <Card key={product.id} className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-sm">{product.name}</h3>
                                                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                                                    </div>
                                                    <Badge className={`${getStatusColor(product.status)} text-xs`}>{product.status}</Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="text-muted-foreground">Категория:</span>
                                                        <p>{product.category}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Остаток:</span>
                                                        <p className="font-mono">
                                                            {product.stock} {product.unit}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Цена:</span>
                                                        <p>₽{product.price}</p>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Свежесть:</span>
                                                        <p>{product.freshnessDays} дн.</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <Badge className={`${getSeasonColor(product.season)} text-xs`}>{product.season}</Badge>
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                                                            Изменить
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                                                            Удалить
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="hidden lg:block rounded-md border">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Товар</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Артикул</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Категория</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Остаток</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Ед. изм.</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Цена</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Сезон</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Свежесть</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Статус</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-sm">Действия</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id} className="border-b hover:bg-muted/50">
                                                    <td className="p-4 font-medium text-sm">{product.name}</td>
                                                    <td className="p-4 text-muted-foreground text-sm">{product.sku}</td>
                                                    <td className="p-4 text-sm">{product.category}</td>
                                                    <td className="p-4 font-mono text-sm">{product.stock}</td>
                                                    <td className="p-4 text-muted-foreground text-sm">{product.unit}</td>
                                                    <td className="p-4 text-sm">₽{product.price}</td>
                                                    <td className="p-4">
                                                        <Badge className={`${getSeasonColor(product.season)} text-xs`}>{product.season}</Badge>
                                                    </td>
                                                    <td className="p-4 text-muted-foreground text-sm">{product.freshnessDays} дн.</td>
                                                    <td className="p-4">
                                                        <Badge className={`${getStatusColor(product.status)} text-xs`}>{product.status}</Badge>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex gap-2">
                                                            <Button variant="ghost" size="sm" className="text-xs h-7">
                                                                Изменить
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="text-xs h-7">
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

            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Добавить позицию на склад</DialogTitle>
                        <DialogDescription className="text-sm">
                            Заполните информацию с учетом специфики флористики
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm">
                                    Название товара
                                </Label>
                                <Input id="name" placeholder="Роза красная 'Гран При'" className="text-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sku" className="text-sm">
                                    Артикул
                                </Label>
                                <Input id="sku" placeholder="FL-R001" className="text-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm">
                                    Категория
                                </Label>
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
                                <Label htmlFor="unit" className="text-sm">
                                    Единица измерения
                                </Label>
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
                                <Label htmlFor="season" className="text-sm">
                                    Сезонность
                                </Label>
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
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="stock" className="text-sm">
                                    Остаток
                                </Label>
                                <Input id="stock" type="number" step="0.1" placeholder="25.5" className="text-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="minStock" className="text-sm">
                                    Мин. остаток
                                </Label>
                                <Input id="minStock" type="number" step="0.1" placeholder="5" className="text-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm">
                                    Цена
                                </Label>
                                <Input id="price" type="number" placeholder="120" className="text-sm" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="freshness" className="text-sm">
                                    Свежесть (дни)
                                </Label>
                                <Input id="freshness" type="number" placeholder="7" className="text-sm" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)} className="w-full sm:w-auto">
                            Отмена
                        </Button>
                        <Button
                            onClick={() => {
                                alert("Позиция добавлена на склад!")
                                setIsAddProductOpen(false)
                            }}
                            className="w-full sm:w-auto"
                        >
                            Добавить позицию
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogContent className="w-[95vw] max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Фильтры флористических товаров</DialogTitle>
                        <DialogDescription>Настройте фильтры с учетом специфики флористики</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
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
        </>
    )
}
