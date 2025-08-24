"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Star, Gift, Trophy, Flame, ArrowLeft, Crown, Zap, ShoppingBag, Percent, Award } from "lucide-react"
import Link from "next/link"

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  type: "drink" | "discount" | "merchandise"
  image: string
  available: boolean
}

const rewardsData: Reward[] = [
  {
    id: "free-latte",
    name: "Free Latte",
    description: "Any size latte of your choice",
    pointsCost: 150,
    type: "drink",
    image: "/caffe-latte.png",
    available: true,
  },
  {
    id: "free-pastry",
    name: "Free Pastry",
    description: "Choose any pastry from our bakery",
    pointsCost: 100,
    type: "drink",
    image: "/butter-croissant.png",
    available: true,
  },
  {
    id: "20-percent-off",
    name: "20% Off Next Order",
    description: "Valid on any order over $10",
    pointsCost: 75,
    type: "discount",
    image: "/discount-coupon.png",
    available: true,
  },
  {
    id: "coffee-mug",
            name: "Zuscoffee Mug",
    description: "Limited edition ceramic mug",
    pointsCost: 300,
    type: "merchandise",
    image: "/simple-coffee-mug.png",
    available: true,
  },
  {
    id: "free-drink",
    name: "Any Free Drink",
    description: "Choose any drink from our menu",
    pointsCost: 200,
    type: "drink",
    image: "/coffee-drinks-variety.png",
    available: false,
  },
  {
    id: "tote-bag",
            name: "Zuscoffee Tote Bag",
    description: "Eco-friendly canvas tote bag",
    pointsCost: 250,
    type: "merchandise",
    image: "/simple-canvas-tote.png",
    available: true,
  },
]

const tierData = {
  bronze: {
    name: "Bronze",
    icon: Award,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    minPoints: 0,
    maxPoints: 499,
    perks: ["Earn 1 point per $1 spent", "Birthday reward", "Member-only offers"],
  },
  silver: {
    name: "Silver",
    icon: Star,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    minPoints: 500,
    maxPoints: 1499,
    perks: [
      "Earn 1.25 points per $1 spent",
      "Free drink on birthday",
      "Early access to new products",
      "Priority support",
    ],
  },
  gold: {
    name: "Gold",
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    minPoints: 1500,
    maxPoints: Number.POSITIVE_INFINITY,
    perks: [
      "Earn 1.5 points per $1 spent",
      "Free drink monthly",
      "Exclusive Gold events",
      "Personal barista recommendations",
      "Free delivery",
    ],
  },
}

export default function LoyaltyPage() {
  const [userPoints] = useState(750) // Current user points
  const [currentStreak] = useState(5) // Days in a row
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([])

  // Determine current tier
  const getCurrentTier = () => {
    if (userPoints >= tierData.gold.minPoints) return tierData.gold
    if (userPoints >= tierData.silver.minPoints) return tierData.silver
    return tierData.bronze
  }

  // Get next tier and progress
  const getNextTierProgress = () => {
    const currentTier = getCurrentTier()
    if (currentTier === tierData.gold) {
      return { nextTier: null, progress: 100, pointsNeeded: 0 }
    }

    const nextTier = currentTier === tierData.bronze ? tierData.silver : tierData.gold
    const progress = ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    const pointsNeeded = nextTier.minPoints - userPoints

    return { nextTier, progress, pointsNeeded }
  }

  const redeemReward = (rewardId: string) => {
    const reward = rewardsData.find((r) => r.id === rewardId)
    if (reward && userPoints >= reward.pointsCost && !redeemedRewards.includes(rewardId)) {
      setRedeemedRewards([...redeemedRewards, rewardId])
      // In a real app, you'd update the user's points here
    }
  }

  const currentTier = getCurrentTier()
  const { nextTier, progress, pointsNeeded } = getNextTierProgress()
  const CurrentTierIcon = currentTier.icon

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
              <Link href="/challenges">
                <Button variant="ghost" size="sm">
                  Challenges
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="font-serif font-bold text-4xl">Your Rewards</h1>
          <p className="text-muted-foreground text-lg">
            Track your points, unlock rewards, and level up your coffee experience
          </p>
        </div>

        {/* Points Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Points */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">{userPoints}</CardTitle>
              <CardDescription>Total Points</CardDescription>
            </CardHeader>
          </Card>

          {/* Current Tier */}
          <Card className={`text-center ${currentTier.bgColor} ${currentTier.borderColor} border-2`}>
            <CardHeader>
              <div
                className={`mx-auto w-16 h-16 ${currentTier.bgColor} rounded-full flex items-center justify-center mb-2 border-2 ${currentTier.borderColor}`}
              >
                <CurrentTierIcon className={`h-8 w-8 ${currentTier.color}`} />
              </div>
              <CardTitle className={`text-2xl font-bold ${currentTier.color}`}>{currentTier.name}</CardTitle>
              <CardDescription>Current Tier</CardDescription>
            </CardHeader>
          </Card>

          {/* Streak */}
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Flame className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="text-3xl font-bold text-orange-500">{currentStreak}</CardTitle>
              <CardDescription>Day Streak</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Progress to {nextTier.name}
              </CardTitle>
              <CardDescription>
                {pointsNeeded} more points to reach {nextTier.name} tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentTier.name}</span>
                  <span>{nextTier.name}</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground text-center">{Math.round(progress)}% complete</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Streak Bonus */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Flame className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Streak Bonus Active!</h3>
                  <p className="text-muted-foreground">{currentStreak} days in a row • Next bonus at 7 days</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                +{currentStreak * 5} bonus points
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards Store
            </TabsTrigger>
            <TabsTrigger value="tiers" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Tier Benefits
            </TabsTrigger>
          </TabsList>

          {/* Rewards Store */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardsData.map((reward) => {
                const canRedeem = userPoints >= reward.pointsCost && reward.available
                const isRedeemed = redeemedRewards.includes(reward.id)

                return (
                  <Card
                    key={reward.id}
                    className={`${!canRedeem ? "opacity-60" : ""} ${isRedeemed ? "border-green-200 bg-green-50" : ""}`}
                  >
                    <div className="relative">
                      <img
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {!reward.available && <Badge className="absolute top-3 right-3 bg-gray-500">Out of Stock</Badge>}
                      {isRedeemed && <Badge className="absolute top-3 right-3 bg-green-500">Redeemed</Badge>}
                      <div className="absolute top-3 left-3">
                        {reward.type === "drink" && <Coffee className="h-5 w-5 text-white bg-primary rounded p-1" />}
                        {reward.type === "discount" && (
                          <Percent className="h-5 w-5 text-white bg-orange-500 rounded p-1" />
                        )}
                        {reward.type === "merchandise" && (
                          <ShoppingBag className="h-5 w-5 text-white bg-purple-500 rounded p-1" />
                        )}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-serif">{reward.name}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-primary border-primary/50">
                          {reward.pointsCost} points
                        </Badge>
                        <Button
                          onClick={() => redeemReward(reward.id)}
                          disabled={!canRedeem || isRedeemed}
                          size="sm"
                          variant={isRedeemed ? "secondary" : "default"}
                        >
                          {isRedeemed ? "Redeemed" : canRedeem ? "Redeem" : "Not Enough Points"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tier Benefits */}
          <TabsContent value="tiers" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(tierData).map(([key, tier]) => {
                const TierIcon = tier.icon
                const isCurrentTier = tier === currentTier

                return (
                  <Card key={key} className={`${isCurrentTier ? `${tier.bgColor} ${tier.borderColor} border-2` : ""}`}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 ${tier.bgColor} rounded-full flex items-center justify-center border-2 ${tier.borderColor}`}
                        >
                          <TierIcon className={`h-6 w-6 ${tier.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className={`text-xl ${tier.color}`}>{tier.name} Tier</CardTitle>
                            {isCurrentTier && <Badge variant="secondary">Current</Badge>}
                          </div>
                          <CardDescription>
                            {tier.maxPoints === Number.POSITIVE_INFINITY
                              ? `${tier.minPoints}+ points`
                              : `${tier.minPoints} - ${tier.maxPoints} points`}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {tier.perks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
