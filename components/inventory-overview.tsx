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
      <CardHeader>
        <CardTitle>Остатки товаров</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {inventory.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">
                {item.current}/{item.max}
              </span>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
