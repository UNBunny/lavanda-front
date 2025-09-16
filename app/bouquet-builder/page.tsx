"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Home,
  Plus,
  Minus,
  Save,
  Eye,
  Calculator,
  FlowerIcon,
  Star,
  RotateCcw,
  Download,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface Flower {
  id: string
  name: string
  price: number
  color: string
  availability: number
  compatibility: string[]
  image: string
  season: string
}

interface AdditionalItem {
  id: string
  name: string
  price: number
  unit: string
  category: string
  availability: number
  image: string
}

interface BouquetItem {
  flower: Flower
  quantity: number
}

interface BouquetAdditionalItem {
  item: AdditionalItem
  quantity: number
}

interface Template {
  id: string
  name: string
  items: BouquetItem[]
  totalCost: number
  rating: number
}

const flowers: Flower[] = [
  {
    id: "rose-red",
    name: "Красная роза",
    price: 150,
    color: "red",
    availability: 50,
    compatibility: ["white", "pink", "cream"],
    image: "/red-rose.png",
    season: "all",
  },
  {
    id: "rose-white",
    name: "Белая роза",
    price: 140,
    color: "white",
    availability: 30,
    compatibility: ["red", "pink", "purple", "blue"],
    image: "/white-rose.jpg",
    season: "all",
  },
  {
    id: "tulip-pink",
    name: "Розовый тюльпан",
    price: 80,
    color: "pink",
    availability: 25,
    compatibility: ["white", "purple", "yellow"],
    image: "/pink-tulip.jpg",
    season: "spring",
  },
  {
    id: "lily-white",
    name: "Белая лилия",
    price: 200,
    color: "white",
    availability: 15,
    compatibility: ["red", "pink", "green"],
    image: "/white-lily.jpg",
    season: "summer",
  },
  {
    id: "chrysanthemum-yellow",
    name: "Желтая хризантема",
    price: 90,
    color: "yellow",
    availability: 40,
    compatibility: ["orange", "red", "white"],
    image: "/yellow-chrysanthemum.jpg",
    season: "autumn",
  },
  {
    id: "peony-pink",
    name: "Розовый пион",
    price: 250,
    color: "pink",
    availability: 12,
    compatibility: ["white", "cream", "green"],
    image: "/pink-peony.jpg",
    season: "spring",
  },
]

const additionalItems: AdditionalItem[] = [
  {
    id: "ribbon-satin-red",
    name: "Атласная лента красная",
    price: 45,
    unit: "м",
    category: "Ленты",
    availability: 50,
    image: "/red-satin-ribbon.jpg",
  },
  {
    id: "ribbon-satin-white",
    name: "Атласная лента белая",
    price: 40,
    unit: "м",
    category: "Ленты",
    availability: 60,
    image: "/white-satin-ribbon.jpg",
  },
  {
    id: "paper-kraft",
    name: "Крафт-бумага",
    price: 25,
    unit: "м²",
    category: "Упаковка",
    availability: 30,
    image: "/kraft-paper-roll.jpg",
  },
  {
    id: "paper-tissue-pink",
    name: "Тишью розовая",
    price: 15,
    unit: "м²",
    category: "Упаковка",
    availability: 40,
    image: "/pink-tissue-paper.jpg",
  },
  {
    id: "greenery-eucalyptus",
    name: "Эвкалипт",
    price: 120,
    unit: "пучок",
    category: "Зелень",
    availability: 25,
    image: "/eucalyptus-bunch.jpg",
  },
  {
    id: "greenery-fern",
    name: "Папоротник",
    price: 80,
    unit: "пучок",
    category: "Зелень",
    availability: 20,
    image: "/fern-bunch.jpg",
  },
  {
    id: "wire-floral",
    name: "Флористическая проволока",
    price: 5,
    unit: "шт",
    category: "Материалы",
    availability: 100,
    image: "/floral-wire.jpg",
  },
  {
    id: "foam-oasis",
    name: "Флористическая губка",
    price: 35,
    unit: "шт",
    category: "Материалы",
    availability: 50,
    image: "/floral-foam-oasis.jpg",
  },
]

const templates: Template[] = [
  {
    id: "romantic",
    name: "Романтический букет",
    items: [
      { flower: flowers[0], quantity: 7 },
      { flower: flowers[1], quantity: 3 },
    ],
    totalCost: 1470,
    rating: 4.8,
  },
  {
    id: "spring",
    name: "Весенний микс",
    items: [
      { flower: flowers[2], quantity: 5 },
      { flower: flowers[1], quantity: 3 },
      { flower: flowers[5], quantity: 2 },
    ],
    totalCost: 1320,
    rating: 4.6,
  },
]

export default function BouquetBuilderPage() {
  const [selectedFlowers, setSelectedFlowers] = useState<BouquetItem[]>([])
  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState<BouquetAdditionalItem[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [bouquetName, setBouquetName] = useState("")
  const [markup, setMarkup] = useState([50])
  const [activeTab, setActiveTab] = useState("builder")

  const totalCost = selectedFlowers.reduce((sum, item) => sum + item.flower.price * item.quantity, 0)
  const additionalCost = selectedAdditionalItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0)
  const finalPrice = (totalCost + additionalCost) * (1 + markup[0] / 100)

  const addFlower = (flower: Flower) => {
    const existingItem = selectedFlowers.find((item) => item.flower.id === flower.id)
    if (existingItem) {
      setSelectedFlowers((prev) =>
        prev.map((item) =>
          item.flower.id === flower.id ? { ...item, quantity: Math.min(item.quantity + 1, flower.availability) } : item,
        ),
      )
    } else {
      setSelectedFlowers((prev) => [...prev, { flower, quantity: 1 }])
    }
  }

  const removeFlower = (flowerId: string) => {
    setSelectedFlowers((prev) =>
      prev
        .map((item) => (item.flower.id === flowerId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const addAdditionalItem = (item: AdditionalItem) => {
    const existingItem = selectedAdditionalItems.find((selected) => selected.item.id === item.id)
    if (existingItem) {
      setSelectedAdditionalItems((prev) =>
        prev.map((selected) =>
          selected.item.id === item.id
            ? { ...selected, quantity: Math.min(selected.quantity + 1, item.availability) }
            : selected,
        ),
      )
    } else {
      setSelectedAdditionalItems((prev) => [...prev, { item, quantity: 1 }])
    }
  }

  const removeAdditionalItem = (itemId: string) => {
    setSelectedAdditionalItems((prev) =>
      prev
        .map((selected) =>
          selected.item.id === itemId ? { ...selected, quantity: Math.max(selected.quantity - 1, 0) } : selected,
        )
        .filter((selected) => selected.quantity > 0),
    )
  }

  const loadTemplate = (template: Template) => {
    setSelectedFlowers(template.items)
    setSelectedTemplate(template)
    setBouquetName(template.name)
  }

  const clearBouquet = () => {
    setSelectedFlowers([])
    setSelectedAdditionalItems([])
    setSelectedTemplate(null)
    setBouquetName("")
  }

  const getCompatibilityScore = () => {
    if (selectedFlowers.length < 2) return 100

    let compatiblePairs = 0
    let totalPairs = 0

    for (let i = 0; i < selectedFlowers.length; i++) {
      for (let j = i + 1; j < selectedFlowers.length; j++) {
        totalPairs++
        const flower1 = selectedFlowers[i].flower
        const flower2 = selectedFlowers[j].flower

        if (flower1.compatibility.includes(flower2.color) || flower2.compatibility.includes(flower1.color)) {
          compatiblePairs++
        }
      }
    }

    return totalPairs > 0 ? Math.round((compatiblePairs / totalPairs) * 100) : 100
  }

  const compatibilityScore = getCompatibilityScore()

  const groupedAdditionalItems = additionalItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, AdditionalItem[]>,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                На главную
              </Button>
            </Link>
            <Link href="/inventory">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />К товарам
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Конструктор букетов</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearBouquet}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Очистить
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder">Конструктор</TabsTrigger>
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="preview">3D Превью</TabsTrigger>
            <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Flower Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FlowerIcon className="h-5 w-5" />
                      Выбор цветов
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flowers.map((flower) => (
                        <div key={flower.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <img
                              src={flower.image || "/placeholder.svg"}
                              alt={flower.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{flower.name}</h3>
                              <p className="text-sm text-muted-foreground">{flower.price}₽ за шт.</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {flower.availability} шт.
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {flower.season}
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" onClick={() => addFlower(flower)} disabled={flower.availability === 0}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Дополнительные материалы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="Ленты" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-4">
                        {Object.keys(groupedAdditionalItems).map((category) => (
                          <TabsTrigger key={category} value={category} className="text-xs">
                            {category}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {Object.entries(groupedAdditionalItems).map(([category, items]) => (
                        <TabsContent key={category} value={category}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {items.map((item) => (
                              <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                      {item.price}₽ за {item.unit}
                                    </p>
                                    <Badge variant="outline" className="text-xs mt-1">
                                      {item.availability} {item.unit}
                                    </Badge>
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => addAdditionalItem(item)}
                                    disabled={item.availability === 0}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Bouquet Composition */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Состав букета
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bouquet-name">Название букета</Label>
                      <Input
                        id="bouquet-name"
                        value={bouquetName}
                        onChange={(e) => setBouquetName(e.target.value)}
                        placeholder="Введите название..."
                      />
                    </div>

                    {/* Flowers Section */}
                    {selectedFlowers.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Цветы:</h4>
                        {selectedFlowers.map((item) => (
                          <div key={item.flower.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <img
                                src={item.flower.image || "/placeholder.svg"}
                                alt={item.flower.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.flower.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.flower.price}₽ × {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline" onClick={() => removeFlower(item.flower.id)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addFlower(item.flower)}
                                disabled={item.quantity >= item.flower.availability}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedAdditionalItems.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Материалы:</h4>
                        {selectedAdditionalItems.map((item) => (
                          <div
                            key={item.item.id}
                            className="flex items-center justify-between p-3 border rounded-lg bg-accent/20"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={item.item.image || "/placeholder.svg"}
                                alt={item.item.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.item.price}₽ × {item.quantity} {item.item.unit}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline" onClick={() => removeAdditionalItem(item.item.id)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addAdditionalItem(item.item)}
                                disabled={item.quantity >= item.item.availability}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedFlowers.length === 0 && selectedAdditionalItems.length === 0 && (
                      <p className="text-muted-foreground text-center py-8">Выберите цветы и материалы для букета</p>
                    )}

                    {/* Compatibility Score */}
                    {selectedFlowers.length > 1 && (
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Сочетаемость цветов</span>
                          <Badge variant={compatibilityScore >= 70 ? "default" : "destructive"}>
                            {compatibilityScore}%
                          </Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              compatibilityScore >= 70 ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: `${compatibilityScore}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Price Summary */}
                    {(selectedFlowers.length > 0 || selectedAdditionalItems.length > 0) && (
                      <div className="p-3 border rounded-lg bg-accent/20">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Цветы:</span>
                            <span>{totalCost}₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Материалы:</span>
                            <span>{additionalCost}₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Себестоимость:</span>
                            <span>{totalCost + additionalCost}₽</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Наценка ({markup[0]}%):</span>
                            <span>{Math.round(finalPrice - (totalCost + additionalCost))}₽</span>
                          </div>
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Итого:</span>
                            <span>{Math.round(finalPrice)}₽</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      disabled={selectedFlowers.length === 0 && selectedAdditionalItems.length === 0}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить букет
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Популярные шаблоны</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{template.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{template.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {template.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <img
                              src={item.flower.image || "/placeholder.svg"}
                              alt={item.flower.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                            <span>
                              {item.flower.name} × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold">{template.totalCost}₽</span>
                        <Button size="sm" onClick={() => loadTemplate(template)}>
                          Использовать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>3D Превью букета</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-green-50 to-pink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  {selectedFlowers.length > 0 || selectedAdditionalItems.length > 0 ? (
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="w-48 h-48 mx-auto bg-gradient-to-t from-green-200 to-transparent rounded-full flex items-end justify-center">
                          <div className="grid grid-cols-3 gap-2 mb-8">
                            {selectedFlowers.slice(0, 9).map((item, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={item.flower.image || "/placeholder.svg"}
                                  alt={item.flower.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                                  style={{
                                    transform: `rotate(${index * 15}deg) translateY(${index % 2 === 0 ? "-5px" : "5px"})`,
                                  }}
                                />
                                {item.quantity > 1 && (
                                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                                    {item.quantity}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg">{bouquetName || "Новый букет"}</h3>
                        <p className="text-muted-foreground">
                          {selectedFlowers.reduce((sum, item) => sum + item.quantity, 0)} цветов
                          {selectedAdditionalItems.length > 0 && (
                            <span> + {selectedAdditionalItems.length} материалов</span>
                          )}
                        </p>
                        <p className="font-bold text-xl">{Math.round(finalPrice)}₽</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <FlowerIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Добавьте цветы для просмотра 3D превью</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Настройки цены
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Наценка: {markup[0]}%</Label>
                    <Slider value={markup} onValueChange={setMarkup} max={200} min={10} step={5} className="mt-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Себестоимость цветов:</span>
                      <span>{totalCost}₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Стоимость материалов:</span>
                      <span>{additionalCost}₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Работа флориста (20%):</span>
                      <span>{Math.round((totalCost + additionalCost) * 0.2)}₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Наценка ({markup[0]}%):</span>
                      <span>
                        {Math.round(
                          ((totalCost + additionalCost + (totalCost + additionalCost) * 0.2) * markup[0]) / 100,
                        )}
                        ₽
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Итоговая цена:</span>
                        <span>
                          {Math.round(
                            (totalCost + additionalCost + (totalCost + additionalCost) * 0.2) * (1 + markup[0] / 100),
                          )}
                          ₽
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Анализ прибыльности</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(((finalPrice - (totalCost + additionalCost)) / finalPrice) * 100)}%
                      </p>
                      <p className="text-sm text-muted-foreground">Маржа</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.round(finalPrice - (totalCost + additionalCost))}₽
                      </p>
                      <p className="text-sm text-muted-foreground">Прибыль</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Конкурентная цена:</span>
                      <span className="text-orange-600">от {Math.round((totalCost + additionalCost) * 1.3)}₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Премиум сегмент:</span>
                      <span className="text-purple-600">от {Math.round((totalCost + additionalCost) * 2)}₽</span>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Экспорт калькуляции
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
