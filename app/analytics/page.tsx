"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Download,
  Eye,
  Star,
  ArrowLeft,
  Home,
} from "lucide-react"
import Link from "next/link"

const salesData = [
  { month: "Янв", sales: 45000, orders: 120, customers: 89 },
  { month: "Фев", sales: 52000, orders: 145, customers: 102 },
  { month: "Мар", sales: 48000, orders: 132, customers: 95 },
  { month: "Апр", sales: 61000, orders: 168, customers: 118 },
  { month: "Май", sales: 55000, orders: 152, customers: 108 },
  { month: "Июн", sales: 67000, orders: 185, customers: 134 },
]

const productData = [
  { name: "Розы", value: 35, color: "#9b8ce8" },
  { name: "Тюльпаны", value: 25, color: "#c4b5fd" },
  { name: "Пионы", value: 20, color: "#ddd6fe" },
  { name: "Композиции", value: 15, color: "#ede9fe" },
  { name: "Другое", value: 5, color: "#f3f4f6" },
]

const topProducts = [
  { name: "Букет из 25 красных роз", sales: 156, revenue: 234000, trend: "up" },
  { name: "Композиция 'Весенняя'", sales: 89, revenue: 178000, trend: "up" },
  { name: "Букет тюльпанов", sales: 134, revenue: 134000, trend: "down" },
  { name: "Пионы в коробке", sales: 67, revenue: 120300, trend: "up" },
  { name: "Букет 'Нежность'", sales: 45, revenue: 90000, trend: "down" },
]

const recentOrders = [
  { id: "#12345", customer: "Анна Петрова", amount: 2500, status: "completed", date: "2024-03-15" },
  { id: "#12346", customer: "Михаил Иванов", amount: 1800, status: "processing", date: "2024-03-15" },
  { id: "#12347", customer: "Елена Сидорова", amount: 3200, status: "completed", date: "2024-03-14" },
  { id: "#12348", customer: "Дмитрий Козлов", amount: 1500, status: "pending", date: "2024-03-14" },
  { id: "#12349", customer: "Ольга Морозова", amount: 4100, status: "completed", date: "2024-03-13" },
]

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Home className="h-4 w-4" />
            Главная
          </Button>
        </Link>
        <Link href="/finance">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />К финансам
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Аналитика и отчеты</h1>
          <p className="text-muted-foreground">Подробная статистика и анализ вашего бизнеса</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="quarter">За квартал</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽328,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% к прошлому месяцу
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">902</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% к прошлому месяцу
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">646</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% к прошлому месяцу
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₽2,340</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.7% к прошлому месяцу
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
          <TabsTrigger value="reports">Отчеты</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Динамика продаж</CardTitle>
                <CardDescription>Выручка по месяцам за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Выручка"]} />
                    <Area type="monotone" dataKey="sales" stroke="#9b8ce8" fill="#9b8ce8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Количество заказов</CardTitle>
                <CardDescription>Динамика заказов по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#9b8ce8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Последние заказы</CardTitle>
              <CardDescription>Актуальная информация о заказах</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Номер заказа</TableHead>
                      <TableHead className="min-w-[150px]">Клиент</TableHead>
                      <TableHead className="min-w-[100px]">Сумма</TableHead>
                      <TableHead className="min-w-[120px]">Статус</TableHead>
                      <TableHead className="min-w-[100px]">Дата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>₽{order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status === "completed"
                              ? "Выполнен"
                              : order.status === "processing"
                                ? "В обработке"
                                : "Ожидает"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString("ru-RU")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Популярность товаров</CardTitle>
                <CardDescription>Распределение продаж по категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Топ товаров</CardTitle>
                <CardDescription>Самые продаваемые товары за месяц</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.sales} продаж</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₽{product.revenue.toLocaleString()}</div>
                        <div
                          className={`text-sm flex items-center gap-1 ${
                            product.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {product.trend === "up" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Новые клиенты</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">За текущий месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Повторные покупки</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <p className="text-xs text-muted-foreground">Коэффициент возврата</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Средняя оценка</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Из 5 звезд</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Активность клиентов</CardTitle>
              <CardDescription>Количество новых клиентов по месяцам</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#9b8ce8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Готовые отчеты</CardTitle>
                <CardDescription>Скачайте готовые отчеты для анализа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Отчет по продажам
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Отчет по товарам
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Отчет по клиентам
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  Финансовый отчет
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Настройка отчетов</CardTitle>
                <CardDescription>Создайте кастомные отчеты</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип отчета" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Продажи</SelectItem>
                    <SelectItem value="inventory">Товары</SelectItem>
                    <SelectItem value="customers">Клиенты</SelectItem>
                    <SelectItem value="finance">Финансы</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Период" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Неделя</SelectItem>
                    <SelectItem value="month">Месяц</SelectItem>
                    <SelectItem value="quarter">Квартал</SelectItem>
                    <SelectItem value="year">Год</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Создать отчет</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
