import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentOrders } from "@/components/recent-orders"
import { SalesChart } from "@/components/sales-chart"
import { InventoryOverview } from "@/components/inventory-overview"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Панель управления</h1>
              <p className="text-muted-foreground">Добро пожаловать в вашу ERP-систему</p>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart />
            <InventoryOverview />
          </div>

          <RecentOrders />
        </main>
      </div>
    </div>
  )
}
