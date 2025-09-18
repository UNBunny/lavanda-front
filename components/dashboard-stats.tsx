import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Общая выручка",
    value: "₽2,847,500",
    change: "+12.5%",
    trend: "up",
    icon: Banknote,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground text-balance">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-1 text-xs mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-emerald-500 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 flex-shrink-0" />
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
