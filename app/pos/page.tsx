"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Receipt,
  CreditCard,
  Banknote,
  Calculator,
  Search,
  ArrowLeft,
  Home,
} from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
}

const products: Product[] = [
  { id: "1", name: "Роза красная", price: 150, category: "Розы", stock: 25 },
  { id: "2", name: "Тюльпан белый", price: 80, category: "Тюльпаны", stock: 40 },
  { id: "3", name: "Лилия розовая", price: 200, category: "Лилии", stock: 15 },
  { id: "4", name: "Хризантема желтая", price: 120, category: "Хризантемы", stock: 30 },
  { id: "5", name: "Букет Весенний", price: 850, category: "Букеты", stock: 8 },
  { id: "6", name: "Композиция Нежность", price: 1200, category: "Композиции", stock: 5 },
]

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")

  const categories = ["Все", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const generateReceipt = () => {
    const receiptData = {
      number: `#${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString("ru-RU"),
      items: cart,
      total,
      cashier: "Анна Петрова",
    }

    // Здесь можно добавить логику печати чека
    console.log("Чек сгенерирован:", receiptData)
    alert(`Чек ${receiptData.number} успешно создан!`)
    clearCart()
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Навигационная панель с кнопкой возврата */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Receipt className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Касса</h1>
            <p className="text-muted-foreground">Кассовое приложение с чеками</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              Главная
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Назад к заказам
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Товары */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Поиск товаров
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Поиск по названию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {product.stock} шт
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">{product.price} ₽</span>
                      <Button size="sm" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Корзина и чек */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Корзина
                </div>
                <Badge variant="secondary">{itemCount}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.price} ₽ × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Итого:</span>
                      <span className="font-bold text-lg text-primary">{total} ₽</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" onClick={generateReceipt} disabled={cart.length === 0}>
                      <Receipt className="h-4 w-4 mr-2" />
                      Пробить чек
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Banknote className="h-4 w-4 mr-1" />
                        Наличные
                      </Button>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Карта
                      </Button>
                    </div>

                    <Button variant="destructive" size="sm" className="w-full" onClick={clearCart}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Очистить
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Быстрые действия */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                Открыть смену
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                Закрыть смену
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                X-отчет
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                Z-отчет
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
