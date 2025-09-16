"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, Users, UserCheck, Clock, Calendar } from "lucide-react"
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

export default function EmployeesPage() {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const employees = [
    {
      id: 1,
      name: "Анна Смирнова",
      position: "Флорист",
      department: "Производство",
      email: "anna.smirnova@company.com",
      phone: "+7 (999) 111-22-33",
      status: "Активен",
      startDate: "2023-03-15",
      salary: 45000,
      avatar: "/woman-florist.jpg",
    },
    {
      id: 2,
      name: "Михаил Петров",
      position: "Курьер",
      department: "Доставка",
      email: "mikhail.petrov@company.com",
      phone: "+7 (999) 222-33-44",
      status: "Активен",
      startDate: "2023-06-01",
      salary: 35000,
      avatar: "/man-courier.jpg",
    },
    {
      id: 3,
      name: "Елена Козлова",
      position: "Менеджер по продажам",
      department: "Продажи",
      email: "elena.kozlova@company.com",
      phone: "+7 (999) 333-44-55",
      status: "Активен",
      startDate: "2022-11-10",
      salary: 55000,
      avatar: "/woman-manager.png",
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      position: "Администратор",
      department: "Управление",
      email: "dmitry.volkov@company.com",
      phone: "+7 (999) 444-55-66",
      status: "Активен",
      startDate: "2022-01-20",
      salary: 65000,
      avatar: "/man-administrator.png",
    },
    {
      id: 5,
      name: "Ольга Морозова",
      position: "Бухгалтер",
      department: "Финансы",
      email: "olga.morozova@company.com",
      phone: "+7 (999) 555-66-77",
      status: "В отпуске",
      startDate: "2023-08-05",
      salary: 50000,
      avatar: "/woman-accountant.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Активен":
        return "bg-green-100 text-green-800"
      case "В отпуске":
        return "bg-yellow-100 text-yellow-800"
      case "Неактивен":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Производство":
        return "bg-blue-100 text-blue-800"
      case "Продажи":
        return "bg-purple-100 text-purple-800"
      case "Доставка":
        return "bg-orange-100 text-orange-800"
      case "Управление":
        return "bg-indigo-100 text-indigo-800"
      case "Финансы":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddEmployee = () => {
    setIsAddEmployeeOpen(true)
  }

  const handleFilter = () => {
    setIsFilterOpen(true)
  }

  const handleViewProfile = (employee: any) => {
    alert(`Профиль сотрудника: ${employee.name}`)
  }

  const handleEditEmployee = (employee: any) => {
    alert(`Редактирование сотрудника: ${employee.name}`)
  }

  const handleExport = () => {
    alert("Экспорт данных сотрудников начат.")
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
                <h1 className="text-3xl font-bold text-balance">Управление сотрудниками</h1>
                <p className="text-muted-foreground">Кадровый учет, расписание и управление персоналом</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                  Экспорт
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAddEmployee}>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить сотрудника
                </Button>
              </div>
            </div>

            {/* Статистика сотрудников */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего сотрудников</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 за месяц</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активных</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">22</div>
                  <p className="text-xs text-muted-foreground">На рабочих местах</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">В отпуске</CardTitle>
                  <Calendar className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">2</div>
                  <p className="text-xs text-muted-foreground">Временно отсутствуют</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Фонд оплаты</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽1,250,000</div>
                  <p className="text-xs text-muted-foreground">В месяц</p>
                </CardContent>
              </Card>
            </div>

            {/* Список сотрудников */}
            <Card>
              <CardHeader>
                <CardTitle>Список сотрудников</CardTitle>
                <CardDescription>Управление персоналом и их данными</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск по имени, должности или отделу..." className="pl-10" />
                  </div>
                  <Button variant="outline" onClick={handleFilter}>
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>

                {/* Таблица сотрудников */}
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Сотрудник</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Должность</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Отдел</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Контакты</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Зарплата</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => (
                          <tr key={employee.id} className="border-b hover:bg-muted/50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                  <AvatarFallback>
                                    {employee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{employee.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    С {new Date(employee.startDate).toLocaleDateString("ru-RU")}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 font-medium">{employee.position}</td>
                            <td className="p-4">
                              <Badge className={getDepartmentColor(employee.department)}>{employee.department}</Badge>
                            </td>
                            <td className="p-4">
                              <div className="text-sm">
                                <div>{employee.email}</div>
                                <div className="text-muted-foreground">{employee.phone}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
                            </td>
                            <td className="p-4 font-medium">₽{employee.salary.toLocaleString()}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewProfile(employee)}>
                                  Профиль
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(employee)}>
                                  Изменить
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

      {/* Модальные окна для добавления сотрудника и фильтров */}
      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить нового сотрудника</DialogTitle>
            <DialogDescription>Заполните информацию о новом сотруднике</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Полное имя</Label>
                <Input id="name" placeholder="Иван Иванов" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Должность</Label>
                <Input id="position" placeholder="Флорист" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Отдел</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Производство</SelectItem>
                    <SelectItem value="sales">Продажи</SelectItem>
                    <SelectItem value="delivery">Доставка</SelectItem>
                    <SelectItem value="management">Управление</SelectItem>
                    <SelectItem value="finance">Финансы</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Зарплата</Label>
                <Input id="salary" type="number" placeholder="45000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ivan@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (999) 123-45-67" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Дата начала работы</Label>
              <Input id="startDate" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                alert("Сотрудник добавлен!")
                setIsAddEmployeeOpen(false)
              }}
            >
              Добавить сотрудника
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Фильтры сотрудников</DialogTitle>
            <DialogDescription>Настройте фильтры для поиска сотрудников</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Отдел</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Все отделы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отделы</SelectItem>
                  <SelectItem value="production">Производство</SelectItem>
                  <SelectItem value="sales">Продажи</SelectItem>
                  <SelectItem value="delivery">Доставка</SelectItem>
                  <SelectItem value="management">Управление</SelectItem>
                  <SelectItem value="finance">Финансы</SelectItem>
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
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="vacation">В отпуске</SelectItem>
                  <SelectItem value="inactive">Неактивен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Зарплата от</Label>
                <Input type="number" placeholder="30000" />
              </div>
              <div className="space-y-2">
                <Label>Зарплата до</Label>
                <Input type="number" placeholder="100000" />
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
