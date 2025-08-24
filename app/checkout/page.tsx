"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Coffee,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Truck,
  Star,
  Gift,
  Share2,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  points: number
  image: string
  quantity: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ComponentType<any>
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    icon: Wallet,
    description: "PayPal, Apple Pay, Samsung Pay",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: Truck,
    description: "Pay when you receive your order",
  },
]

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "latte",
      name: "Caffe Latte",
      price: 4.5,
      points: 45,
      image: "/caffe-latte.png",
      quantity: 2,
    },
    {
      id: "iced-latte",
      name: "Iced Latte",
      price: 4.75,
      points: 95,
      image: "/iced-latte.png",
      quantity: 1,
    },
    {
      id: "croissant",
      name: "Butter Croissant",
      price: 3.25,
      points: 33,
      image: "/butter-croissant.png",
      quantity: 1,
    },
  ])

  const [userPoints] = useState(750)
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [usePoints, setUsePoints] = useState(false)
  const [pointsToRedeem, setPointsToRedeem] = useState(0)
  const [orderComplete, setOrderComplete] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalPoints = cartItems.reduce((sum, item) => sum + item.points * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const pointsDiscount = pointsToRedeem * 0.01 // 1 point = $0.01
  const total = Math.max(0, subtotal + tax - pointsDiscount)

  const maxRedeemablePoints = Math.min(userPoints, Math.floor(subtotal * 100)) // Max 100% of subtotal

  useEffect(() => {
    if (usePoints) {
      setPointsToRedeem(Math.min(100, maxRedeemablePoints)) // Default to 100 points or max available
    } else {
      setPointsToRedeem(0)
    }
  }, [usePoints, maxRedeemablePoints])

  const updateQuantity = (itemId: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const handlePlaceOrder = () => {
    // In a real app, this would process the payment and create the order
    setOrderComplete(true)
    setTimeout(() => {
      setShareDialogOpen(true)
    }, 2000)
  }

  const handleShare = (platform: string) => {
    // In a real app, this would handle social sharing
    console.log(`Sharing order on ${platform}`)
    setShareDialogOpen(false)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="font-serif font-bold text-2xl mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Your order has been placed successfully. You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold">+{totalPoints} points earned!</span>
              </div>
              <p className="text-sm text-muted-foreground">Estimated pickup time: 15-20 minutes</p>
            </div>
            <div className="flex gap-3">
              <Link href="/menu" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Order Again
                </Button>
              </Link>
              <Link href="/loyalty" className="flex-1">
                <Button className="w-full">View Rewards</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Order & Earn Points!</DialogTitle>
              <DialogDescription>Share your coffee order on social media and earn +10 bonus points</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="text-primary border-primary/50 mb-4">
                  Earn +10 points for sharing
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  Let your friends know about your amazing coffee experience!
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                  onClick={() => handleShare("instagram")}
                >
                  <Instagram className="h-6 w-6" />
                  <span className="text-xs">Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-6 w-6" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-6 w-6" />
                  <span className="text-xs">Twitter</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShareDialogOpen(false)} className="flex-1">
                  Skip
                </Button>
                <Button onClick={() => handleShare("custom")} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/menu" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                <Coffee className="h-8 w-8 text-primary" />
                <span className="font-serif font-bold text-xl">Zuscoffee</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-primary">
                {userPoints} points available
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Order Summary</CardTitle>
                <CardDescription>Review your items before checkout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} • +{item.points} points
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Points Redemption */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Redeem Points
                </CardTitle>
                <CardDescription>Use your points to save on this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-points"
                    checked={usePoints}
                    onCheckedChange={(checked) => setUsePoints(checked as boolean)}
                  />
                  <Label htmlFor="use-points">Use points for this order</Label>
                </div>
                {usePoints && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="points-amount" className="text-sm">
                        Points to redeem:
                      </Label>
                      <Input
                        id="points-amount"
                        type="number"
                        value={pointsToRedeem}
                        onChange={(e) =>
                          setPointsToRedeem(
                            Math.min(maxRedeemablePoints, Math.max(0, Number.parseInt(e.target.value) || 0)),
                          )
                        }
                        max={maxRedeemablePoints}
                        className="w-24"
                      />
                      <Button variant="outline" size="sm" onClick={() => setPointsToRedeem(maxRedeemablePoints)}>
                        Max
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maximum redeemable: {maxRedeemablePoints} points (${(maxRedeemablePoints * 0.01).toFixed(2)})
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment & Checkout */}
          <div className="space-y-6">
            {/* Order Total */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {pointsToRedeem > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Points discount ({pointsToRedeem} points)</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-semibold">You'll earn {totalPoints} points!</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {selectedPayment === "card" && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedPayment === "upi" && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">UPI Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input id="upi-id" placeholder="yourname@paytm" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Place Order Button */}
            <Button onClick={handlePlaceOrder} size="lg" className="w-full text-lg">
              <Coffee className="h-5 w-5 mr-2" />
              Place Order • ${total.toFixed(2)}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
