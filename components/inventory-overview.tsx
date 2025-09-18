"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const inventory = [
  { name: "Розы", current: 245, max: 300, percentage: 82 },
  { name: "Тюльпаны", current: 156, max: 200, percentage: 78 },
  { name: "Лилии", current: 89, max: 150, percentage: 59 },
  { name: "Хризантемы", current: 234, max: 250, percentage: 94 },
  { name: "Гвоздики", current: 67, max: 100, percentage: 67 },
]

export function InventoryOverview() {
  return (
    <Card>
      <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-base sm:text-lg">Остатки товаров</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
        {inventory.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="font-medium text-balance">{item.name}</span>
              <span className="text-muted-foreground flex-shrink-0 ml-2">
                {item.current}/{item.max}
              </span>
            </div>
            <Progress value={item.percentage} className="h-1.5 sm:h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
