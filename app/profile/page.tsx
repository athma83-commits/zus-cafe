"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Coffee,
  ArrowLeft,
  Star,
  Heart,
  Settings,
  Bell,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  Edit,
  Calendar,
  Crown,
  Award,
  Camera,
  Mail,
  Phone,
  Shield,
  LogOut,
  Share2,
} from "lucide-react"
import Link from "next/link"

interface OrderHistory {
  id: string
  date: string
  items: string[]
  total: number
  points: number
  status: "completed" | "pending" | "cancelled"
}

interface FavoriteItem {
  id: string
  name: string
  image: string
  price: number
  points: number
  category: string
}

const orderHistory: OrderHistory[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    items: ["Caffe Latte", "Butter Croissant"],
    total: 7.75,
    points: 78,
    status: "completed",
  },
  {
    id: "ORD-002",
    date: "2024-01-12",
    items: ["Iced Latte", "Chocolate Chip Cookie"],
    total: 7.5,
    points: 123, // Double points promotion
    status: "completed",
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    items: ["Americano", "Blueberry Muffin"],
    total: 6.75,
    points: 68,
    status: "completed",
  },
  {
    id: "ORD-004",
    date: "2024-01-08",
    items: ["Pumpkin Spice Latte", "Avocado Toast"],
    total: 12.25,
    points: 123,
    status: "completed",
  },
  {
    id: "ORD-005",
    date: "2024-01-05",
    items: ["Cold Brew", "Everything Bagel"],
    total: 8.0,
    points: 81,
    status: "completed",
  },
]

const favoriteItems: FavoriteItem[] = [
  {
    id: "latte",
    name: "Caffe Latte",
    image: "/caffe-latte.png",
    price: 4.5,
    points: 45,
    category: "Hot Coffee",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    image: "/iced-latte.png",
    price: 4.75,
    points: 95,
    category: "Cold Drinks",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    image: "/avocado-toast.png",
    price: 6.5,
    points: 65,
    category: "Snacks",
  },
  {
    id: "pumpkin-spice",
    name: "Pumpkin Spice Latte",
    image: "/pumpkin-spice-latte.png",
    price: 5.75,
    points: 58,
    category: "Seasonal",
  },
]

export default function ProfilePage() {
  const [user] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/woman-with-coffee.png",
    joinDate: "2023-06-15",
    tier: "Silver",
    points: 750,
    totalOrders: 23,
    totalSpent: 187.5,
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    pointsExpiry: true,
    newProducts: false,
  })

  const [socialAccounts] = useState({
    instagram: { connected: true, username: "@sarahc_coffee" },
    facebook: { connected: false, username: "" },
    twitter: { connected: true, username: "@sarah_coffee" },
  })

  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Gold":
        return <Crown className="h-5 w-5 text-yellow-600" />
      case "Silver":
        return <Star className="h-5 w-5 text-gray-600" />
      default:
        return <Award className="h-5 w-5 text-amber-600" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold":
        return "bg-yellow-50 text-yellow-800 border-yellow-200"
      case "Silver":
        return "bg-gray-50 text-gray-800 border-gray-200"
      default:
        return "bg-amber-50 text-amber-800 border-amber-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSaveProfile = () => {
    // In a real app, this would update the backend
    console.log("Saving profile:", editForm)
    setEditing(false)
  }

  const removeFavorite = (itemId: string) => {
    // In a real app, this would update the backend
    console.log("Removing favorite:", itemId)
  }

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
                <span className="font-serif font-bold text-xl">Zuscoffee</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/menu">
                <Button variant="ghost" size="sm">
                  Menu
                </Button>
              </Link>
              <Link href="/loyalty">
                <Button variant="ghost" size="sm">
                  Rewards
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0" variant="secondary">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="font-serif font-bold text-3xl">{user.name}</h1>
                  <Badge className={`w-fit ${getTierColor(user.tier)} border`}>
                    {getTierIcon(user.tier)}
                    <span className="ml-1">{user.tier} Member</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="font-bold text-2xl text-primary">{user.points}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">{user.totalOrders}</div>
                    <div className="text-sm text-muted-foreground">Orders</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">${user.totalSpent}</div>
                    <div className="text-sm text-muted-foreground">Spent</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">
                      {new Date(user.joinDate).getFullYear() === new Date().getFullYear() ? "New" : "1Y+"}
                    </div>
                    <div className="text-sm text-muted-foreground">Member</div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setEditing(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Order History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Order History */}
          <TabsContent value="orders" className="space-y-4">
            {orderHistory.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <div className="text-lg font-bold mt-1">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Items:</p>
                      <p className="font-medium">{order.items.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">+{order.points} points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-all duration-200">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">{item.category}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">{item.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                      <Badge variant="outline" className="text-primary border-primary/50">
                        +{item.points} points
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} className="flex-1">
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditing(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Member since {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-updates">Order Updates</Label>
                    <Switch
                      id="order-updates"
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promotions">Promotions & Offers</Label>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="points-expiry">Points Expiry Alerts</Label>
                    <Switch
                      id="points-expiry"
                      checked={notifications.pointsExpiry}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pointsExpiry: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-products">New Products</Label>
                    <Switch
                      id="new-products"
                      checked={notifications.newProducts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newProducts: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Social Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Social Accounts
                  </CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-pink-500" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        {socialAccounts.instagram.connected && (
                          <p className="text-sm text-muted-foreground">{socialAccounts.instagram.username}</p>
                        )}
                      </div>
                    </div>
                    <Button variant={socialAccounts.instagram.connected ? "secondary" : "outline"} size="sm">
                      {socialAccounts.instagram.connected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        {socialAccounts.twitter.connected && (
                          <p className="text-sm text-muted-foreground">{socialAccounts.twitter.username}</p>
                        )}
                      </div>
                    </div>
                    <Button variant={socialAccounts.twitter.connected ? "secondary" : "outline"} size="sm">
                      {socialAccounts.twitter.connected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
