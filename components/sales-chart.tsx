"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Янв", sales: 65000 },
  { name: "Фев", sales: 78000 },
  { name: "Мар", sales: 82000 },
  { name: "Апр", sales: 95000 },
  { name: "Май", sales: 88000 },
  { name: "Июн", sales: 102000 },
  { name: "Июл", sales: 115000 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика продаж</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} tickFormatter={(value) => `₽${value / 1000}k`} />
            <Tooltip
              formatter={(value) => [`₽${value.toLocaleString()}`, "Продажи"]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
