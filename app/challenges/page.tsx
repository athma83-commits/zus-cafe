"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Coffee,
  Star,
  Gift,
  Trophy,
  Target,
  Users,
  ArrowLeft,
  Clock,
  Share2,
  Zap,
  Crown,
  Medal,
  Award,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  progress: number
  maxProgress: number
  timeLeft: string
  completed: boolean
  type: "daily" | "weekly" | "special"
}

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  points: number
  streak: number
  isCurrentUser?: boolean
}

const challengesData: Challenge[] = [
  {
    id: "morning-rush",
    title: "Early Bird Special",
    description: "Order before 10AM to earn bonus points",
    points: 25,
    progress: 0,
    maxProgress: 1,
    timeLeft: "6h 23m",
    completed: false,
    type: "daily",
  },
  {
    id: "social-share",
    title: "Share the Love",
    description: "Share your coffee moment on social media",
    points: 15,
    progress: 1,
    maxProgress: 1,
    timeLeft: "6h 23m",
    completed: true,
    type: "daily",
  },
  {
    id: "try-new-drink",
    title: "Adventure Seeker",
    description: "Try a drink you've never ordered before",
    points: 30,
    progress: 0,
    maxProgress: 1,
    timeLeft: "6h 23m",
    completed: false,
    type: "daily",
  },
  {
    id: "weekly-visits",
    title: "Regular Customer",
    description: "Visit us 5 times this week",
    points: 100,
    progress: 3,
    maxProgress: 5,
    timeLeft: "3d 12h",
    completed: false,
    type: "weekly",
  },
  {
    id: "spend-threshold",
    title: "Big Spender",
    description: "Spend $50 or more this week",
    points: 75,
    progress: 32,
    maxProgress: 50,
    timeLeft: "3d 12h",
    completed: false,
    type: "weekly",
  },
  {
    id: "double-points-weekend",
    title: "Weekend Warrior",
    description: "Special weekend challenge - Double points on all orders!",
    points: 50,
    progress: 0,
    maxProgress: 2,
    timeLeft: "1d 8h",
    completed: false,
    type: "special",
  },
]

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", avatar: "/woman-with-coffee.png", points: 2847, streak: 12 },
  { rank: 2, name: "Mike Rodriguez", avatar: "/man-with-coffee.png", points: 2634, streak: 8 },
  { rank: 3, name: "Emma Thompson", avatar: "/woman-enjoying-coffee.png", points: 2521, streak: 15 },
  { rank: 4, name: "David Kim", avatar: "/placeholder.svg", points: 2398, streak: 6 },
  { rank: 5, name: "Lisa Wang", avatar: "/placeholder.svg", points: 2287, streak: 9 },
  { rank: 6, name: "Alex Johnson", avatar: "/placeholder.svg", points: 2156, streak: 4 },
  { rank: 7, name: "Maria Garcia", avatar: "/placeholder.svg", points: 2043, streak: 7 },
  { rank: 8, name: "You", avatar: "/placeholder.svg", points: 1987, streak: 5, isCurrentUser: true },
  { rank: 9, name: "James Wilson", avatar: "/placeholder.svg", points: 1876, streak: 3 },
  { rank: 10, name: "Anna Lee", avatar: "/placeholder.svg", points: 1754, streak: 11 },
]

const wheelPrizes = [
  { id: 1, label: "5 Points", points: 5, color: "bg-blue-500" },
  { id: 2, label: "Free Pastry", points: 0, color: "bg-green-500" },
  { id: 3, label: "10 Points", points: 10, color: "bg-purple-500" },
  { id: 4, label: "20% Off", points: 0, color: "bg-orange-500" },
  { id: 5, label: "25 Points", points: 25, color: "bg-red-500" },
  { id: 6, label: "Free Drink", points: 0, color: "bg-yellow-500" },
  { id: 7, label: "15 Points", points: 15, color: "bg-pink-500" },
  { id: 8, label: "Try Again", points: 0, color: "bg-gray-500" },
]

export default function ChallengesPage() {
  const [spinning, setSpinning] = useState(false)
  const [wheelResult, setWheelResult] = useState<string | null>(null)
  const [referralCode] = useState("BREW2024")
  const [copiedCode, setCopiedCode] = useState(false)

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setWheelResult(null)

    // Simulate spinning for 3 seconds
    setTimeout(() => {
      const randomPrize = wheelPrizes[Math.floor(Math.random() * wheelPrizes.length)]
      setWheelResult(randomPrize.label)
      setSpinning(false)
    }, 3000)
  }

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "weekly":
        return <Target className="h-5 w-5 text-green-500" />
      case "special":
        return <Sparkles className="h-5 w-5 text-purple-500" />
      default:
        return <Target className="h-5 w-5" />
    }
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
                <span className="font-serif font-bold text-xl">BrewPoints</span>
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
                Profile
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="font-serif font-bold text-4xl">Challenges & Games</h1>
          <p className="text-muted-foreground text-lg">
            Complete challenges, spin the wheel, and climb the leaderboard for extra rewards
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="wheel" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Spin Wheel
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid gap-6">
              {/* Daily Challenges */}
              <div>
                <h3 className="font-serif font-bold text-2xl mb-4 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                  Daily Challenges
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {challengesData
                    .filter((c) => c.type === "daily")
                    .map((challenge) => (
                      <Card
                        key={challenge.id}
                        className={`${challenge.completed ? "border-green-200 bg-green-50" : ""}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getChallengeIcon(challenge.type)}
                              <div>
                                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                                <CardDescription className="text-sm">{challenge.description}</CardDescription>
                              </div>
                            </div>
                            {challenge.completed && <Badge className="bg-green-500">Complete</Badge>}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-primary border-primary/50">
                                +{challenge.points} points
                              </Badge>
                              <span className="text-sm text-muted-foreground">{challenge.timeLeft} left</span>
                            </div>
                            {challenge.maxProgress > 1 && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>Progress</span>
                                  <span>
                                    {challenge.progress}/{challenge.maxProgress}
                                  </span>
                                </div>
                                <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Weekly Challenges */}
              <div>
                <h3 className="font-serif font-bold text-2xl mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-500" />
                  Weekly Challenges
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {challengesData
                    .filter((c) => c.type === "weekly")
                    .map((challenge) => (
                      <Card key={challenge.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getChallengeIcon(challenge.type)}
                              <div>
                                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                                <CardDescription className="text-sm">{challenge.description}</CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-primary border-primary/50">
                                +{challenge.points} points
                              </Badge>
                              <span className="text-sm text-muted-foreground">{challenge.timeLeft} left</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {challenge.progress}/{challenge.maxProgress}
                                </span>
                              </div>
                              <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Special Challenges */}
              <div>
                <h3 className="font-serif font-bold text-2xl mb-4 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  Special Events
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {challengesData
                    .filter((c) => c.type === "special")
                    .map((challenge) => (
                      <Card key={challenge.id} className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getChallengeIcon(challenge.type)}
                              <div>
                                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                                <CardDescription className="text-sm">{challenge.description}</CardDescription>
                              </div>
                            </div>
                            <Badge className="bg-purple-500">Special</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-purple-600 border-purple-300">
                                +{challenge.points} points
                              </Badge>
                              <span className="text-sm text-muted-foreground">{challenge.timeLeft} left</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {challenge.progress}/{challenge.maxProgress}
                                </span>
                              </div>
                              <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Spin Wheel Tab */}
          <TabsContent value="wheel" className="space-y-6">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Daily Spin Wheel</CardTitle>
                  <CardDescription>Spin once per day for surprise rewards!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Wheel Visual */}
                  <div className="relative mx-auto w-64 h-64">
                    <div
                      className={`w-full h-full rounded-full border-8 border-primary relative overflow-hidden ${spinning ? "animate-spin" : ""}`}
                    >
                      {wheelPrizes.map((prize, index) => (
                        <div
                          key={prize.id}
                          className={`absolute w-full h-full ${prize.color} opacity-80`}
                          style={{
                            clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos(((index * 45 - 22.5) * Math.PI) / 180)}% ${50 + 40 * Math.sin(((index * 45 - 22.5) * Math.PI) / 180)}%, ${50 + 40 * Math.cos(((index * 45 + 22.5) * Math.PI) / 180)}% ${50 + 40 * Math.sin(((index * 45 + 22.5) * Math.PI) / 180)}%)`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold transform rotate-45">{prize.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
                    </div>
                  </div>

                  {/* Spin Button */}
                  <Button onClick={spinWheel} disabled={spinning} size="lg" className="w-full max-w-xs">
                    {spinning ? "Spinning..." : "Spin the Wheel!"}
                  </Button>

                  {/* Result */}
                  {wheelResult && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Gift className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">You won: {wheelResult}!</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <p className="text-sm text-muted-foreground">Next spin available in 18h 42m</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-serif">Invite Friends</CardTitle>
                  <CardDescription>
                    Share your referral code and earn 100 points for each friend who joins!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Referral Code */}
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 rounded-lg p-6">
                      <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                      <div className="flex items-center justify-center gap-2">
                        <code className="text-2xl font-bold font-mono bg-background px-4 py-2 rounded border">
                          {referralCode}
                        </code>
                        <Button onClick={copyReferralCode} variant="outline" size="sm">
                          {copiedCode ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Link
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Users className="h-4 w-4" />
                        Invite via Email
                      </Button>
                    </div>
                  </div>

                  {/* Referral Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="text-center">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-primary">3</div>
                        <div className="text-sm text-muted-foreground">Friends Referred</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">300</div>
                        <div className="text-sm text-muted-foreground">Points Earned</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* How it Works */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">How it works:</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <span>Share your referral code with friends</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span>They sign up and make their first purchase</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <span>You both earn 100 bonus points!</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>Top point earners this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        entry.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-card"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={entry.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{entry.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${entry.isCurrentUser ? "text-primary" : ""}`}>
                            {entry.name}
                          </span>
                          {entry.isCurrentUser && <Badge variant="secondary">You</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{entry.points.toLocaleString()} points</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {entry.streak} day streak
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
