import { AuthGuard } from "@/components/auth-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Bell, Shield, Database, Globe, Palette, Save, RefreshCw, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
  const integrations = [
    {
      name: "Сайт компании",
      description: "Интеграция с основным сайтом для синхронизации товаров",
      status: "Подключено",
      lastSync: "2024-01-15 14:30",
    },
    {
      name: "Кассовое приложение",
      description: "Подключение к POS-системе для обработки платежей",
      status: "Подключено",
      lastSync: "2024-01-15 14:25",
    },
    {
      name: "SMS-уведомления",
      description: "Отправка SMS клиентам о статусе заказов",
      status: "Настройка",
      lastSync: "Не синхронизировано",
    },
    {
      name: "Email-рассылка",
      description: "Автоматические email-уведомления и маркетинг",
      status: "Отключено",
      lastSync: "Не синхронизировано",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Подключено":
        return "bg-green-100 text-green-800"
      case "Настройка":
        return "bg-yellow-100 text-yellow-800"
      case "Отключено":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-balance">Настройки системы</h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">Конфигурация ERP-системы и интеграций</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto lg:w-auto shrink-0">
                <Save className="w-4 h-4 mr-2" />
                Сохранить изменения
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4 md:space-y-6">
              <div className="w-full overflow-hidden">
                <TabsList className="inline-flex h-auto min-h-[40px] items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full">
                  <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-1">
                    <TabsTrigger
                      value="general"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Общие</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Пользователи</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <Bell className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Уведомления</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Безопасность</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="integrations"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Интеграции</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3 py-1.5"
                    >
                      <Palette className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span>Внешний вид</span>
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>

              {/* Общие настройки */}
              <TabsContent value="general" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Основные настройки</CardTitle>
                    <CardDescription className="text-sm">Базовая конфигурация системы</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name" className="text-sm">
                          Название компании
                        </Label>
                        <Input id="company-name" defaultValue="LAVANDA" className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-phone" className="text-sm">
                          Телефон
                        </Label>
                        <Input id="company-phone" defaultValue="+7 (3812) 21-80-91" className="text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address" className="text-sm">
                        Адрес
                      </Label>
                      <Input id="company-address" defaultValue="г. Омск, ул. Ленина, 1" className="text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-description" className="text-sm">
                        Описание
                      </Label>
                      <Textarea
                        id="company-description"
                        defaultValue="Доставка цветов в Омске. Круглосуточно"
                        rows={3}
                        className="text-sm resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Настройки заказов</CardTitle>
                    <CardDescription className="text-sm">Конфигурация обработки заказов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Label className="text-sm">Автоматическое подтверждение заказов</Label>
                        <p className="text-xs text-muted-foreground">
                          Заказы будут автоматически переводиться в статус "Подтвержден"
                        </p>
                      </div>
                      <Switch defaultChecked className="shrink-0" />
                    </div>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Label className="text-sm">Уведомления о низких остатках</Label>
                        <p className="text-xs text-muted-foreground">
                          Предупреждения при критически низких остатках товаров
                        </p>
                      </div>
                      <Switch defaultChecked className="shrink-0" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="min-stock" className="text-sm">
                          Минимальный остаток
                        </Label>
                        <Input id="min-stock" type="number" defaultValue="5" className="text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delivery-time" className="text-sm">
                          Время доставки (часы)
                        </Label>
                        <Input id="delivery-time" type="number" defaultValue="2" className="text-sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Интеграции */}
              <TabsContent value="integrations" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Активные интеграции</CardTitle>
                    <CardDescription className="text-sm">
                      Управление подключенными сервисами и системами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {integrations.map((integration, index) => (
                        <div
                          key={index}
                          className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 p-4 border rounded-lg"
                        >
                          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                              <Database className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-sm sm:text-base">{integration.name}</h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{integration.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Последняя синхронизация: {integration.lastSync}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                            <Badge className={`${getStatusColor(integration.status)} text-center`}>
                              {integration.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none text-xs bg-transparent"
                              >
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Синхронизировать
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 sm:flex-none text-xs bg-transparent"
                              >
                                Настроить
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Добавить интеграцию</CardTitle>
                    <CardDescription className="text-sm">Подключение новых сервисов к системе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="h-16 sm:h-20 flex flex-col gap-2 bg-transparent text-xs sm:text-sm"
                      >
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Интернет-магазин</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 sm:h-20 flex flex-col gap-2 bg-transparent text-xs sm:text-sm"
                      >
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Push-уведомления</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="h-16 sm:h-20 flex flex-col gap-2 bg-transparent text-xs sm:text-sm"
                      >
                        <Database className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Внешняя CRM</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Безопасность */}
              <TabsContent value="security" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Настройки безопасности</CardTitle>
                    <CardDescription className="text-sm">Управление доступом и защитой данных</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Label className="text-sm">Двухфакторная аутентификация</Label>
                        <p className="text-xs text-muted-foreground">Дополнительная защита учетных записей</p>
                      </div>
                      <Switch className="shrink-0" />
                    </div>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Label className="text-sm">Автоматическое резервное копирование</Label>
                        <p className="text-xs text-muted-foreground">Ежедневное создание резервных копий данных</p>
                      </div>
                      <Switch defaultChecked className="shrink-0" />
                    </div>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <Label className="text-sm">Логирование действий пользователей</Label>
                        <p className="text-xs text-muted-foreground">Ведение журнала всех действий в системе</p>
                      </div>
                      <Switch defaultChecked className="shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 shrink-0" />
                      Системные предупреждения
                    </CardTitle>
                    <CardDescription className="text-sm">Важные уведомления о безопасности</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-yellow-800">
                          Рекомендуется обновить пароли администраторов (последнее обновление: 3 месяца назад)
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-green-800">
                          Резервное копирование выполнено успешно (15.01.2024 в 03:00)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Остальные вкладки с базовым содержимым */}
              <TabsContent value="users" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Управление пользователями</CardTitle>
                    <CardDescription className="text-sm">Настройка ролей и прав доступа</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Функционал в разработке...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Настройки уведомлений</CardTitle>
                    <CardDescription className="text-sm">Конфигурация системы оповещений</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Функционал в разработке...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4 md:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg md:text-xl">Настройки внешнего вида</CardTitle>
                    <CardDescription className="text-sm">Персонализация интерфейса системы</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Функционал в разработке...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
