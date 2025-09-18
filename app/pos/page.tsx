"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/auth-guard"
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
    <AuthGuard>
      <div className="p-3 sm:p-6 max-w-7xl mx-auto">
        {/* Навигационная панель с кнопкой возврата */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <Receipt className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Касса</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Кассовое приложение с чеками</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/" className="flex-1 sm:flex-initial">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent w-full sm:w-auto" size="sm">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Главная</span>
              </Button>
            </Link>
            <Link href="/orders" className="flex-1 sm:flex-initial">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent w-full sm:w-auto" size="sm">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Назад к заказам</span>
                <span className="sm:hidden">Назад</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Товары */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  Поиск товаров
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                <Input
                  placeholder="Поиск по названию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-sm sm:text-base"
                />

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs sm:text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-xs sm:text-sm text-balance">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          {product.stock} шт
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary text-sm sm:text-base">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
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
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    Корзина
                  </div>
                  <Badge variant="secondary">{itemCount}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-6 sm:py-8 text-sm sm:text-base">Корзина пуста</p>
                ) : (
                  <>
                    <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 sm:p-3 bg-muted/50 rounded-lg gap-2"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs sm:text-sm truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.price} ₽ × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                            <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Trash2 className="h-2 w-2 sm:h-3 sm:w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm sm:text-base">Итого:</span>
                        <span className="font-bold text-base sm:text-lg text-primary">{total} ₽</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full text-sm sm:text-base"
                        onClick={generateReceipt}
                        disabled={cart.length === 0}
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        Пробить чек
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                          <Banknote className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Наличные
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                          <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Карта
                        </Button>
                      </div>

                      <Button variant="destructive" size="sm" className="w-full text-xs sm:text-sm" onClick={clearCart}>
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
              <CardHeader className="px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
                <Button variant="outline" className="w-full justify-start bg-transparent text-xs sm:text-sm" size="sm">
                  Открыть смену
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-xs sm:text-sm" size="sm">
                  Закрыть смену
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-xs sm:text-sm" size="sm">
                  X-отчет
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent text-xs sm:text-sm" size="sm">
                  Z-отчет
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
