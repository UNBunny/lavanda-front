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
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Home className="h-4 w-4" />
            Главная
          </Button>
        </Link>
        <Link href="/orders">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />К заказам
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Управление скидками</h1>
          <p className="text-muted-foreground">Создавайте и управляйте скидками для ваших товаров</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Создать скидку
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать новую скидку</DialogTitle>
              <DialogDescription>Настройте параметры новой скидки для ваших товаров</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-name">Название скидки</Label>
                  <Input id="discount-name" placeholder="Введите название" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-code">Промокод</Label>
                  <Input id="discount-code" placeholder="PROMO2024" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount-type">Тип скидки</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Процентная</SelectItem>
                      <SelectItem value="fixed">Фиксированная сумма</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount-value">Размер скидки</Label>
                  <Input id="discount-value" type="number" placeholder="25" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Дата начала</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Дата окончания</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Категория товаров</Label>
                <Select>
                  <SelectTrigger>
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
                <Label htmlFor="usage-limit">Лимит использований</Label>
                <Input id="usage-limit" type="number" placeholder="100 (оставьте пустым для безлимитного)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Описание скидки..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Активировать скидку сразу</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Создать скидку</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Активные скидки</TabsTrigger>
          <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
          <TabsTrigger value="expired">Завершенные</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активные скидки</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Действующие промокоды</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Использований</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">За текущий месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Экономия клиентов</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₽18,450</div>
                <p className="text-xs text-muted-foreground">Общая сумма скидок</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Список скидок</CardTitle>
              <CardDescription>Управляйте всеми скидками и промокодами</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Промокод</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Размер</TableHead>
                    <TableHead>Период</TableHead>
                    <TableHead>Использовано</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">{discount.name}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{discount.code}</code>
                      </TableCell>
                      <TableCell>{discount.type === "percentage" ? "Процентная" : "Фиксированная"}</TableCell>
                      <TableCell>
                        {discount.type === "percentage" ? `${discount.value}%` : `₽${discount.value}`}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(discount.startDate).toLocaleDateString("ru-RU")}</div>
                          <div className="text-muted-foreground">
                            {new Date(discount.endDate).toLocaleDateString("ru-RU")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{discount.usageCount}</div>
                          {discount.usageLimit && <div className="text-muted-foreground">из {discount.usageLimit}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={discount.status === "active" ? "default" : "secondary"}>
                          {discount.status === "active" ? "Активна" : "Приостановлена"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
  )
}
