"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Snowflake, Leaf, Cookie, Plus, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  points: number
  image: string
  popular?: boolean
  recommended?: boolean
}

const menuData = {
  hot: [
    {
      id: "espresso",
      name: "Classic Espresso",
      description: "Rich, bold shot of premium coffee beans",
      price: 2.5,
      points: 25,
      image: "/espresso-shot.png",
      popular: true,
    },
    {
      id: "americano",
      name: "Americano",
      description: "Espresso with hot water for a smooth finish",
      price: 3.0,
      points: 30,
      image: "/americano-coffee.png",
    },
    {
      id: "latte",
      name: "Caffe Latte",
      description: "Espresso with steamed milk and light foam",
      price: 4.5,
      points: 45,
      image: "/caffe-latte.png",
      recommended: true,
    },
    {
      id: "cappuccino",
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and foam",
      price: 4.0,
      points: 40,
      image: "/cappuccino.png",
      popular: true,
    },
    {
      id: "mocha",
      name: "Mocha",
      description: "Espresso with chocolate and steamed milk",
      price: 5.0,
      points: 50,
      image: "/mocha-coffee.png",
    },
    {
      id: "macchiato",
      name: "Caramel Macchiato",
      description: "Espresso with vanilla syrup, steamed milk, and caramel",
      price: 5.5,
      points: 55,
      image: "/caramel-macchiato.png",
    },
  ],
  cold: [
    {
      id: "iced-latte",
      name: "Iced Latte",
      description: "Chilled espresso with cold milk over ice",
      price: 4.75,
      points: 95, // Double points promotion
      image: "/iced-latte.png",
      popular: true,
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      description: "Smooth, slow-steeped coffee served over ice",
      price: 3.75,
      points: 38,
      image: "/cold-brew.png",
      recommended: true,
    },
    {
      id: "frappuccino",
      name: "Vanilla Frappuccino",
      description: "Blended coffee with vanilla and whipped cream",
      price: 5.25,
      points: 53,
      image: "/vanilla-frappuccino.png",
    },
    {
      id: "iced-americano",
      name: "Iced Americano",
      description: "Espresso shots with cold water over ice",
      price: 3.25,
      points: 33,
      image: "/iced-americano.png",
    },
    {
      id: "nitro-cold-brew",
      name: "Nitro Cold Brew",
      description: "Cold brew infused with nitrogen for creamy texture",
      price: 4.25,
      points: 43,
      image: "/nitro-cold-brew.png",
    },
  ],
  seasonal: [
    {
      id: "pumpkin-spice",
      name: "Pumpkin Spice Latte",
      description: "Espresso with pumpkin spice and steamed milk",
      price: 5.75,
      points: 58,
      image: "/pumpkin-spice-latte.png",
      popular: true,
    },
    {
      id: "peppermint-mocha",
      name: "Peppermint Mocha",
      description: "Chocolate and peppermint with espresso",
      price: 5.5,
      points: 55,
      image: "/peppermint-mocha.png",
    },
    {
      id: "eggnog-latte",
      name: "Eggnog Latte",
      description: "Holiday spices with creamy eggnog flavor",
      price: 5.25,
      points: 53,
      image: "/eggnog-latte.png",
    },
    {
      id: "cinnamon-dolce",
      name: "Cinnamon Dolce Latte",
      description: "Sweet cinnamon syrup with steamed milk",
      price: 5.0,
      points: 50,
      image: "/cinnamon-dolce-latte.png",
    },
  ],
  snacks: [
    {
      id: "croissant",
      name: "Butter Croissant",
      description: "Flaky, buttery pastry baked fresh daily",
      price: 3.25,
      points: 33,
      image: "/butter-croissant.png",
    },
    {
      id: "blueberry-muffin",
      name: "Blueberry Muffin",
      description: "Fresh blueberries in a tender muffin",
      price: 3.75,
      points: 38,
      image: "/blueberry-muffin.png",
      popular: true,
    },
    {
      id: "chocolate-chip-cookie",
      name: "Chocolate Chip Cookie",
      description: "Warm, gooey chocolate chip cookie",
      price: 2.75,
      points: 28,
      image: "/chocolate-chip-cookie.png",
    },
    {
      id: "avocado-toast",
      name: "Avocado Toast",
      description: "Smashed avocado on artisan sourdough",
      price: 6.5,
      points: 65,
      image: "/avocado-toast.png",
      recommended: true,
    },
    {
      id: "bagel-cream-cheese",
      name: "Everything Bagel",
      description: "Toasted bagel with cream cheese",
      price: 4.25,
      points: 43,
      image: "/everything-bagel.png",
    },
  ],
}

export default function MenuPage() {
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [activeTab, setActiveTab] = useState("hot")

  const addToCart = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getRecommendedItems = () => {
    const allItems = [...menuData.hot, ...menuData.cold, ...menuData.seasonal, ...menuData.snacks]
    return allItems.filter((item) => item.recommended)
  }

  const renderMenuItem = (item: MenuItem) => (
    <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
        {item.popular && (
          <Badge className="absolute top-3 left-3 bg-secondary">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        )}
        {item.recommended && <Badge className="absolute top-3 left-3 bg-primary">Recommended</Badge>}
        {item.id === "iced-latte" && (
          <Badge className="absolute top-3 right-3 bg-accent animate-pulse">2x Points!</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-serif">{item.name}</CardTitle>
            <CardDescription className="text-sm">{item.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-primary border-primary/50">
            +{item.points} points
          </Badge>
          <Button
            onClick={() => addToCart(item.id)}
            size="sm"
            className="group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                <Coffee className="h-8 w-8 text-primary" />
                <span className="font-serif font-bold text-xl">BrewPoints</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/loyalty">
                <Button variant="ghost" size="sm">
                  Rewards
                </Button>
              </Link>
              <Link href="/challenges">
                <Button variant="ghost" size="sm">
                  Challenges
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Link href="/checkout">
                <Button size="sm" className="relative">
                  Cart
                  {getCartCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getCartCount()}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="font-serif font-bold text-4xl">Our Menu</h1>
          <p className="text-muted-foreground text-lg">
            Discover your next favorite drink and earn points with every sip
          </p>
        </div>

        {/* Recommended For You */}
        <section className="mb-12">
          <h2 className="font-serif font-bold text-2xl mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-primary" />
            Recommended For You
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{getRecommendedItems().map(renderMenuItem)}</div>
        </section>

        {/* Menu Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="hot" className="flex items-center gap-2">
              <Coffee className="h-4 w-4" />
              Hot Coffee
            </TabsTrigger>
            <TabsTrigger value="cold" className="flex items-center gap-2">
              <Snowflake className="h-4 w-4" />
              Cold Drinks
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Seasonal
            </TabsTrigger>
            <TabsTrigger value="snacks" className="flex items-center gap-2">
              <Cookie className="h-4 w-4" />
              Snacks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hot" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{menuData.hot.map(renderMenuItem)}</div>
          </TabsContent>

          <TabsContent value="cold" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{menuData.cold.map(renderMenuItem)}</div>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{menuData.seasonal.map(renderMenuItem)}</div>
          </TabsContent>

          <TabsContent value="snacks" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{menuData.snacks.map(renderMenuItem)}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
