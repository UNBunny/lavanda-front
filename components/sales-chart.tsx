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
      <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-base sm:text-lg">Динамика продаж</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-muted-foreground"
              fontSize={10}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis
              className="text-muted-foreground"
              fontSize={10}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `₽${value / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [`₽${value.toLocaleString()}`, "Продажи"]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
              className="sm:stroke-[3px] sm:[&>circle]:r-4"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
