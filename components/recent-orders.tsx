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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Последние заказы</CardTitle>
          <Button variant="outline" size="sm" onClick={handleAllOrders}>
            Все заказы
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <Badge variant="secondary" className={statusColors[order.status as keyof typeof statusColors]}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                  <p className="text-sm">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAllOrdersOpen} onOpenChange={setIsAllOrdersOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Все заказы</DialogTitle>
            <DialogDescription>Полный список заказов за последние 30 дней</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
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
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      <Badge variant="secondary" className={statusColors[order.status as keyof typeof statusColors]}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
