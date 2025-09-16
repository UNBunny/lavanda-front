"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, DollarSign, CreditCard, Wallet, FileText, Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function FinancePage() {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  const monthlyRevenue = [
    { month: "Янв", revenue: 450000, expenses: 320000 },
    { month: "Фев", revenue: 520000, expenses: 340000 },
    { month: "Мар", revenue: 480000, expenses: 350000 },
    { month: "Апр", revenue: 610000, expenses: 380000 },
    { month: "Май", revenue: 580000, expenses: 360000 },
    { month: "Июн", revenue: 720000, expenses: 420000 },
  ]

  const expenseCategories = [
    { name: "Зарплата", value: 1250000, color: "#9b8ce8" },
    { name: "Аренда", value: 180000, color: "#a78bfa" },
    { name: "Закупка товаров", value: 850000, color: "#c4b5fd" },
    { name: "Маркетинг", value: 120000, color: "#ddd6fe" },
    { name: "Прочие расходы", value: 95000, color: "#ede9fe" },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "Доход",
      description: "Оплата заказа #ORD-001",
      amount: 2950,
      date: "2024-01-15 14:30",
      status: "Завершено",
    },
    {
      id: 2,
      type: "Расход",
      description: "Закупка роз у поставщика",
      amount: -15000,
      date: "2024-01-15 10:15",
      status: "Завершено",
    },
    {
      id: 3,
      type: "Доход",
      description: "Оплата заказа #ORD-002",
      amount: 3200,
      date: "2024-01-15 12:45",
      status: "Завершено",
    },
    {
      id: 4,
      type: "Расход",
      description: "Зарплата сотрудникам",
      amount: -125000,
      date: "2024-01-15 09:00",
      status: "Завершено",
    },
    {
      id: 5,
      type: "Доход",
      description: "Оплата заказа #ORD-003",
      amount: 4500,
      date: "2024-01-14 16:20",
      status: "В обработке",
    },
  ]

  const getTransactionColor = (type: string) => {
    return type === "Доход" ? "text-green-600" : "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Завершено":
        return "bg-green-100 text-green-800"
      case "В обработке":
        return "bg-yellow-100 text-yellow-800"
      case "Отклонено":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleExport = () => {
    setIsExportOpen(true)
  }

  const handleCreateReport = () => {
    setIsReportOpen(true)
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
                <h1 className="text-3xl font-bold text-balance">Финансы и отчеты</h1>
                <p className="text-muted-foreground">Управление финансами, доходами и расходами</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Создать отчет
                </Button>
              </div>
            </div>

            {/* Финансовая статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₽3,360,000</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5% за месяц
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общие расходы</CardTitle>
                  <CreditCard className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">₽2,170,000</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% за месяц
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Чистая прибыль</CardTitle>
                  <Wallet className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₽1,190,000</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18.7% за месяц
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Рентабельность</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35.4%</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% за месяц
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Графики */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* График доходов и расходов */}
              <Card>
                <CardHeader>
                  <CardTitle>Доходы и расходы</CardTitle>
                  <CardDescription>Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [`₽${value.toLocaleString()}`, ""]}
                        labelFormatter={(label) => `Месяц: ${label}`}
                      />
                      <Bar dataKey="revenue" fill="#9b8ce8" name="Доходы" />
                      <Bar dataKey="expenses" fill="#c4b5fd" name="Расходы" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Структура расходов */}
              <Card>
                <CardHeader>
                  <CardTitle>Структура расходов</CardTitle>
                  <CardDescription>Распределение расходов по категориям</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`₽${value.toLocaleString()}`, "Сумма"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Последние транзакции */}
            <Card>
              <CardHeader>
                <CardTitle>Последние транзакции</CardTitle>
                <CardDescription>История финансовых операций</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Тип</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Описание</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Сумма</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Дата</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <Badge
                                className={
                                  transaction.type === "Доход"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {transaction.type}
                              </Badge>
                            </td>
                            <td className="p-4">{transaction.description}</td>
                            <td className={`p-4 font-medium ${getTransactionColor(transaction.type)}`}>
                              {transaction.amount > 0 ? "+" : ""}₽{Math.abs(transaction.amount).toLocaleString()}
                            </td>
                            <td className="p-4 text-muted-foreground">{transaction.date}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
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

      {/* Модальные окна для экспорта и создания отчетов */}
      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Экспорт финансовых данных</DialogTitle>
            <DialogDescription>Выберите данные для экспорта</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Доступные форматы:</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Экспорт в Excel начат")
                    setIsExportOpen(false)
                  }}
                >
                  Excel (.xlsx)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Экспорт в PDF начат")
                    setIsExportOpen(false)
                  }}
                >
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Экспорт в CSV начат")
                    setIsExportOpen(false)
                  }}
                >
                  CSV
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Данные для экспорта:</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Доходы и расходы</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span>Транзакции</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Аналитика по категориям</span>
                </label>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать финансовый отчет</DialogTitle>
            <DialogDescription>Настройте параметры отчета</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Тип отчета:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Создается отчет о прибылях и убытках")
                    setIsReportOpen(false)
                  }}
                >
                  Прибыли и убытки
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Создается баланс")
                    setIsReportOpen(false)
                  }}
                >
                  Баланс
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Создается отчет о движении денежных средств")
                    setIsReportOpen(false)
                  }}
                >
                  Движение средств
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Создается налоговый отчет")
                    setIsReportOpen(false)
                  }}
                >
                  Налоговый отчет
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Период:</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Текущий месяц
                </Button>
                <Button variant="outline" size="sm">
                  Квартал
                </Button>
                <Button variant="outline" size="sm">
                  Год
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
