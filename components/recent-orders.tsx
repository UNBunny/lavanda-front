"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const orders = [
  {
    id: "#12847",
    customer: "Анна Петрова",
    product: "Букет из 25 роз",
    amount: "₽4,500",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "#12846",
    customer: "Михаил Иванов",
    product: "Композиция с лилиями",
    amount: "₽3,200",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "#12845",
    customer: "Елена Сидорова",
    product: "Свадебный букет",
    amount: "₽8,900",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "#12844",
    customer: "Дмитрий Козлов",
    product: "Букет тюльпанов",
    amount: "₽2,100",
    status: "completed",
    date: "2024-01-14",
  },
]

const statusColors = {
  completed: "bg-emerald-100 text-emerald-800",
  processing: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
}

const statusLabels = {
  completed: "Выполнен",
  processing: "В работе",
  pending: "Ожидает",
}

export function RecentOrders() {
  const [isAllOrdersOpen, setIsAllOrdersOpen] = useState(false)

  const handleAllOrders = () => {
    setIsAllOrdersOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-base sm:text-lg">Последние заказы</CardTitle>
          <Button variant="outline" size="sm" onClick={handleAllOrders} className="w-full sm:w-auto bg-transparent">
            Все заказы
          </Button>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors space-y-2 sm:space-y-0"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base">{order.id}</span>
                    <Badge
                      variant="secondary"
                      className={`${statusColors[order.status as keyof typeof statusColors]} text-xs w-fit`}
                    >
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{order.customer}</p>
                  <p className="text-xs sm:text-sm text-balance">{order.product}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="font-semibold text-sm sm:text-base">{order.amount}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAllOrdersOpen} onOpenChange={setIsAllOrdersOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Все заказы</DialogTitle>
            <DialogDescription className="text-sm">Полный список заказов за последние 30 дней</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 sm:space-y-4 max-h-[60vh] overflow-y-auto">
            {orders
              .concat([
                {
                  id: "#12843",
                  customer: "Сергей Николаев",
                  product: "Композиция с орхидеями",
                  amount: "₽5,200",
                  status: "completed",
                  date: "2024-01-13",
                },
                {
                  id: "#12842",
                  customer: "Мария Волкова",
                  product: "Букет пионов",
                  amount: "₽3,800",
                  status: "processing",
                  date: "2024-01-13",
                },
              ])
              .map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors space-y-2 sm:space-y-0"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium text-sm sm:text-base">{order.id}</span>
                      <Badge
                        variant="secondary"
                        className={`${statusColors[order.status as keyof typeof statusColors]} text-xs w-fit`}
                      >
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs sm:text-sm text-balance">{order.product}</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="font-semibold text-sm sm:text-base">{order.amount}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
