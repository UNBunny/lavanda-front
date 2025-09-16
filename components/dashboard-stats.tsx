import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Общая выручка",
    value: "₽2,847,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Заказы",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Товары в наличии",
    value: "3,456",
    change: "-2.1%",
    trend: "down",
    icon: Package,
  },
  {
    title: "Активные клиенты",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>{stat.change}</span>
              <span className="text-muted-foreground">за месяц</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
