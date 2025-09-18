"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Banknote, CreditCard, Wallet, FileText, Download } from "lucide-react"
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
          <main className="flex-1 p-3 md:p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-balance">Финансы и отчеты</h1>
                <p className="text-sm md:text-base text-muted-foreground">Управление финансами, доходами и расходами</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={handleCreateReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Создать отчет
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
                  <Banknote className="h-4 w-4 text-green-500" />
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

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Доходы и расходы</CardTitle>
                  <CardDescription className="text-sm">Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">Структура расходов</CardTitle>
                  <CardDescription className="text-sm">Распределение расходов по категориям</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        fontSize={10}
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Последние транзакции</CardTitle>
                <CardDescription className="text-sm">История финансовых операций</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="block md:hidden">
                    <div className="space-y-3 p-3">
                      {recentTransactions.map((transaction) => (
                        <Card key={transaction.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge
                                className={`text-xs ${
                                  transaction.type === "Доход"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction.type}
                              </Badge>
                              <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                                {transaction.status}
                              </Badge>
                            </div>
                            <div className="text-sm line-clamp-2">{transaction.description}</div>
                            <div className="flex items-center justify-between">
                              <div className={`font-medium text-sm ${getTransactionColor(transaction.type)}`}>
                                {transaction.amount > 0 ? "+" : ""}₽{Math.abs(transaction.amount).toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">{transaction.date}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-xs md:text-sm">
                            Тип
                          </th>
                          <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-xs md:text-sm">
                            Описание
                          </th>
                          <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-xs md:text-sm">
                            Сумма
                          </th>
                          <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-xs md:text-sm">
                            Дата
                          </th>
                          <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-xs md:text-sm">
                            Статус
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="p-2 md:p-4">
                              <Badge
                                className={`text-xs ${
                                  transaction.type === "Доход"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction.type}
                              </Badge>
                            </td>
                            <td className="p-2 md:p-4 text-xs md:text-sm max-w-[200px] truncate">
                              {transaction.description}
                            </td>
                            <td
                              className={`p-2 md:p-4 font-medium text-xs md:text-sm ${getTransactionColor(transaction.type)}`}
                            >
                              {transaction.amount > 0 ? "+" : ""}₽{Math.abs(transaction.amount).toLocaleString()}
                            </td>
                            <td className="p-2 md:p-4 text-muted-foreground text-xs">{transaction.date}</td>
                            <td className="p-2 md:p-4">
                              <Badge className={`${getStatusColor(transaction.status)} text-xs`}>
                                {transaction.status}
                              </Badge>
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

      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Экспорт финансовых данных</DialogTitle>
            <DialogDescription className="text-sm">Выберите данные для экспорта</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Доступные форматы:</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Экспорт в Excel начат")
                    setIsExportOpen(false)
                  }}
                  className="w-full sm:w-auto text-xs"
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
                  className="w-full sm:w-auto text-xs"
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
                  className="w-full sm:w-auto text-xs"
                >
                  CSV
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Данные для экспорта:</h4>
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
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Создать финансовый отчет</DialogTitle>
            <DialogDescription className="text-sm">Настройте параметры отчета</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Тип отчета:</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    alert("Создается отчет о прибылях и убытках")
                    setIsReportOpen(false)
                  }}
                  className="text-xs"
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
                  className="text-xs"
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
                  className="text-xs"
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
                  className="text-xs"
                >
                  Налоговый отчет
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Период:</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Текущий месяц
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Квартал
                </Button>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
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
