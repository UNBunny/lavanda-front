"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Percent, Users, Package, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

const discounts = [
  {
    id: 1,
    name: "Весенняя распродажа",
    type: "percentage",
    value: 25,
    code: "SPRING25",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "active",
    usageCount: 156,
    usageLimit: 500,
    category: "Все товары",
  },
  {
    id: 2,
    name: "Скидка для VIP клиентов",
    type: "percentage",
    value: 15,
    code: "VIP15",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usageCount: 89,
    usageLimit: null,
    category: "Премиум букеты",
  },
  {
    id: 3,
    name: "Фиксированная скидка",
    type: "fixed",
    value: 500,
    code: "SAVE500",
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    status: "paused",
    usageCount: 23,
    usageLimit: 100,
    category: "Композиции",
  },
]

export default function DiscountsPage() {
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent w-full sm:w-auto">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Главная</span>
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">К заказам</span>
              <span className="sm:hidden">Назад</span>
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">Управление скидками</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Создавайте и управляйте скидками для ваших товаров
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Создать скидку</span>
                <span className="sm:hidden">Создать</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl mx-2 sm:mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg">Создать новую скидку</DialogTitle>
                <DialogDescription className="text-sm">
                  Настройте параметры новой скидки для ваших товаров
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3 sm:gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount-name" className="text-sm">
                      Название скидки
                    </Label>
                    <Input id="discount-name" placeholder="Введите название" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-code" className="text-sm">
                      Промокод
                    </Label>
                    <Input id="discount-code" placeholder="PROMO2024" className="text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount-type" className="text-sm">
                      Тип скидки
                    </Label>
                    <Select>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Процентная</SelectItem>
                        <SelectItem value="fixed">Фиксированная сумма</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount-value" className="text-sm">
                      Размер скидки
                    </Label>
                    <Input id="discount-value" type="number" placeholder="25" className="text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-sm">
                      Дата начала
                    </Label>
                    <Input id="start-date" type="date" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-sm">
                      Дата окончания
                    </Label>
                    <Input id="end-date" type="date" className="text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm">
                    Категория товаров
                  </Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все товары</SelectItem>
                      <SelectItem value="bouquets">Букеты</SelectItem>
                      <SelectItem value="compositions">Композиции</SelectItem>
                      <SelectItem value="premium">Премиум букеты</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage-limit" className="text-sm">
                    Лимит использований
                  </Label>
                  <Input
                    id="usage-limit"
                    type="number"
                    placeholder="100 (оставьте пустым для безлимитного)"
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm">
                    Описание
                  </Label>
                  <Textarea id="description" placeholder="Описание скидки..." className="text-sm" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active" className="text-sm">
                    Активировать скидку сразу
                  </Label>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="w-full sm:w-auto">
                  Отмена
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)} className="w-full sm:w-auto">
                  Создать скидку
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Активные скидки
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="text-xs sm:text-sm">
              Запланированные
            </TabsTrigger>
            <TabsTrigger value="expired" className="text-xs sm:text-sm">
              Завершенные
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Активные скидки</CardTitle>
                  <Percent className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Действующие промокоды</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Использований</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">За текущий месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                  <CardTitle className="text-xs sm:text-sm font-medium text-balance">Экономия клиентов</CardTitle>
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                  <div className="text-lg sm:text-2xl font-bold">₽18,450</div>
                  <p className="text-xs text-muted-foreground">Общая сумма скидок</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="text-base sm:text-lg">Список скидок</CardTitle>
                <CardDescription className="text-sm">Управляйте всеми скидками и промокодами</CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[120px] sm:min-w-[150px] text-xs sm:text-sm">Название</TableHead>
                        <TableHead className="min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Промокод</TableHead>
                        <TableHead className="min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm">Тип</TableHead>
                        <TableHead className="min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm">Размер</TableHead>
                        <TableHead className="min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Период</TableHead>
                        <TableHead className="min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm">Использовано</TableHead>
                        <TableHead className="min-w-[60px] sm:min-w-[80px] text-xs sm:text-sm">Статус</TableHead>
                        <TableHead className="min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discounts.map((discount) => (
                        <TableRow key={discount.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">{discount.name}</TableCell>
                          <TableCell>
                            <code className="bg-muted px-1 sm:px-2 py-1 rounded text-xs">{discount.code}</code>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {discount.type === "percentage" ? "Процентная" : "Фиксированная"}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {discount.type === "percentage" ? `${discount.value}%` : `₽${discount.value}`}
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>{new Date(discount.startDate).toLocaleDateString("ru-RU")}</div>
                              <div className="text-muted-foreground">
                                {new Date(discount.endDate).toLocaleDateString("ru-RU")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>{discount.usageCount}</div>
                              {discount.usageLimit && (
                                <div className="text-muted-foreground">из {discount.usageLimit}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={discount.status === "active" ? "default" : "secondary"} className="text-xs">
                              {discount.status === "active" ? "Активна" : "Приостановлена"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 sm:gap-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Запланированные скидки</CardTitle>
                <CardDescription>Скидки, которые начнут действовать в будущем</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">Нет запланированных скидок</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired">
            <Card>
              <CardHeader>
                <CardTitle>Завершенные скидки</CardTitle>
                <CardDescription>Архив завершенных и истекших скидок</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">Нет завершенных скидок</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthGuard>
  )
}
