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
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Настройки системы</h1>
              <p className="text-muted-foreground">Конфигурация ERP-системы и интеграций</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Сохранить изменения
            </Button>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Общие
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Уведомления
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Безопасность
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Интеграции
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Внешний вид
              </TabsTrigger>
            </TabsList>

            {/* Общие настройки */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основные настройки</CardTitle>
                  <CardDescription>Базовая конфигурация системы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Название компании</Label>
                      <Input id="company-name" defaultValue="LAVANDA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Телефон</Label>
                      <Input id="company-phone" defaultValue="+7 (3812) 21-80-91" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Адрес</Label>
                    <Input id="company-address" defaultValue="г. Омск, ул. Ленина, 1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Описание</Label>
                    <Textarea id="company-description" defaultValue="Доставка цветов в Омске. Круглосуточно" rows={3} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Настройки заказов</CardTitle>
                  <CardDescription>Конфигурация обработки заказов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Автоматическое подтверждение заказов</Label>
                      <p className="text-sm text-muted-foreground">
                        Заказы будут автоматически переводиться в статус "Подтвержден"
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Уведомления о низких остатках</Label>
                      <p className="text-sm text-muted-foreground">
                        Предупреждения при критически низких остатках товаров
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-stock">Минимальный остаток</Label>
                      <Input id="min-stock" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery-time">Время доставки (часы)</Label>
                      <Input id="delivery-time" type="number" defaultValue="2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Интеграции */}
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Активные интеграции</CardTitle>
                  <CardDescription>Управление подключенными сервисами и системами</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrations.map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Database className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{integration.name}</h4>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Последняя синхронизация: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Синхронизировать
                          </Button>
                          <Button variant="outline" size="sm">
                            Настроить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Добавить интеграцию</CardTitle>
                  <CardDescription>Подключение новых сервисов к системе</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                      <Globe className="w-6 h-6" />
                      <span>Интернет-магазин</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                      <Bell className="w-6 h-6" />
                      <span>Push-уведомления</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                      <Database className="w-6 h-6" />
                      <span>Внешняя CRM</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Безопасность */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки безопасности</CardTitle>
                  <CardDescription>Управление доступом и защитой данных</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Двухфакторная аутентификация</Label>
                      <p className="text-sm text-muted-foreground">Дополнительная защита учетных записей</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Автоматическое резервное копирование</Label>
                      <p className="text-sm text-muted-foreground">Ежедневное создание резервных копий данных</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Логирование действий пользователей</Label>
                      <p className="text-sm text-muted-foreground">Ведение журнала всех действий в системе</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Системные предупреждения
                  </CardTitle>
                  <CardDescription>Важные уведомления о безопасности</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        Рекомендуется обновить пароли администраторов (последнее обновление: 3 месяца назад)
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Резервное копирование выполнено успешно (15.01.2024 в 03:00)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Остальные вкладки с базовым содержимым */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Управление пользователями</CardTitle>
                  <CardDescription>Настройка ролей и прав доступа</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>Конфигурация системы оповещений</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки внешнего вида</CardTitle>
                  <CardDescription>Персонализация интерфейса системы</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Функционал в разработке...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
