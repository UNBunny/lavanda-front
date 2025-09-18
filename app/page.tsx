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
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-balance">Панель управления</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Добро пожаловать в вашу ERP-систему</p>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <SalesChart />
            <InventoryOverview />
          </div>

          <RecentOrders />
        </main>
      </div>
    </div>
  )
}
