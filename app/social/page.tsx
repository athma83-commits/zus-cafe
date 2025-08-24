"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Coffee,
  Star,
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  Camera,
  Play,
  TrendingUp,
  Users,
  Instagram,
  Facebook,
  Twitter,
  Upload,
  Hash,
} from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified?: boolean
  }
  content: {
    text: string
    image: string
    drink?: string
  }
  engagement: {
    likes: number
    comments: number
    shares: number
    liked?: boolean
  }
  timestamp: string
  points: number
  hashtags: string[]
}

interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  drink: string
  rating: number
  text: string
  image: string
  timestamp: string
  helpful: number
}

interface TrendingDrink {
  id: string
  name: string
  image: string
  mentions: number
  avgRating: number
  trend: "up" | "down" | "stable"
}

interface Influencer {
  id: string
  name: string
  username: string
  avatar: string
  followers: string
  verified: boolean
  videoThumbnail: string
  videoTitle: string
  views: string
}

const postsData: Post[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "@sarahc_coffee",
      avatar: "/woman-with-coffee.png",
      verified: true,
    },
    content: {
      text: "Perfect latte art to start my Monday! The baristas here are true artists ✨",
      image: "/latte-art-heart-design.png",
      drink: "Caffe Latte",
    },
    engagement: {
      likes: 247,
      comments: 18,
      shares: 12,
      liked: false,
    },
    timestamp: "2h ago",
    points: 15,
    hashtags: ["#BrewAndEarn", "#LatteArt", "#MondayMotivation"],
  },
  {
    id: "2",
    user: {
      name: "Mike Rodriguez",
      username: "@mike_coffee_lover",
      avatar: "/man-with-coffee.png",
    },
    content: {
      text: "This iced caramel macchiato is everything! Perfect for this hot weather 🧊",
      image: "/iced-coffee-with-whipped-cream.png",
      drink: "Iced Caramel Macchiato",
    },
    engagement: {
      likes: 189,
      comments: 23,
      shares: 8,
      liked: true,
    },
    timestamp: "4h ago",
    points: 10,
    hashtags: ["#BrewAndEarn", "#IcedCoffee", "#SummerVibes"],
  },
  {
    id: "3",
    user: {
      name: "Emma Thompson",
      username: "@emma_studies",
      avatar: "/woman-enjoying-coffee.png",
    },
    content: {
      text: "Best study spot in town! Thanks BrewPoints for the perfect atmosphere and amazing coffee ☕📚",
      image: "/coffee-shop-study.png",
      drink: "Cold Brew",
    },
    engagement: {
      likes: 156,
      comments: 31,
      shares: 15,
      liked: false,
    },
    timestamp: "6h ago",
    points: 20,
    hashtags: ["#BrewAndEarn", "#StudySpot", "#ColdBrew"],
  },
]

const reviewsData: Review[] = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
    },
    drink: "Pumpkin Spice Latte",
    rating: 5,
    text: "Absolutely perfect! The spice blend is just right and not too sweet. Will definitely order again!",
    image: "/pumpkin-spice-latte.png",
    timestamp: "1 day ago",
    helpful: 12,
  },
  {
    id: "2",
    user: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
    },
    drink: "Nitro Cold Brew",
    rating: 4,
    text: "Smooth and creamy texture from the nitrogen infusion. Great coffee flavor, though I wish it was a bit stronger.",
    image: "/nitro-cold-brew.png",
    timestamp: "2 days ago",
    helpful: 8,
  },
  {
    id: "3",
    user: {
      name: "David Kim",
      avatar: "/placeholder.svg",
    },
    drink: "Avocado Toast",
    rating: 5,
    text: "Fresh avocado on perfectly toasted sourdough. The seasoning is spot on. Best breakfast combo with their coffee!",
    image: "/avocado-toast.png",
    timestamp: "3 days ago",
    helpful: 15,
  },
]

const trendingDrinks: TrendingDrink[] = [
  {
    id: "1",
    name: "Iced Latte",
    image: "/iced-latte.png",
    mentions: 342,
    avgRating: 4.8,
    trend: "up",
  },
  {
    id: "2",
    name: "Pumpkin Spice Latte",
    image: "/pumpkin-spice-latte.png",
    mentions: 298,
    avgRating: 4.7,
    trend: "up",
  },
  {
    id: "3",
    name: "Cold Brew",
    image: "/cold-brew.png",
    mentions: 256,
    avgRating: 4.6,
    trend: "stable",
  },
  {
    id: "4",
    name: "Caffe Latte",
    image: "/caffe-latte.png",
    mentions: 234,
    avgRating: 4.5,
    trend: "down",
  },
]

const influencersData: Influencer[] = [
  {
    id: "1",
    name: "Coffee with Kate",
    username: "@coffeewithkate",
    avatar: "/placeholder.svg",
    followers: "125K",
    verified: true,
    videoThumbnail: "/coffee-shop-interior-with-people-enjoying-coffee-a.png",
    videoTitle: "Rating BrewPoints' Seasonal Menu ☕",
    views: "45K",
  },
  {
    id: "2",
    name: "The Brew Master",
    username: "@thebrewmaster",
    avatar: "/placeholder.svg",
    followers: "89K",
    verified: true,
    videoThumbnail: "/latte-art-heart-design.png",
    videoTitle: "Latte Art Tutorial at BrewPoints",
    views: "32K",
  },
  {
    id: "3",
    name: "Daily Coffee Fix",
    username: "@dailycoffeefix",
    avatar: "/placeholder.svg",
    followers: "67K",
    verified: true,
    videoThumbnail: "/iced-coffee-with-whipped-cream.png",
    videoTitle: "Best Iced Drinks for Summer",
    views: "28K",
  },
]

export default function SocialPage() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareText, setShareText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleLike = (postId: string) => {
    // In a real app, this would update the backend
    console.log(`Liked post ${postId}`)
  }

  const handleShare = (postId: string) => {
    // In a real app, this would handle sharing
    console.log(`Shared post ${postId}`)
  }

  const submitPost = () => {
    // In a real app, this would submit to backend
    console.log("Submitting post:", { text: shareText, image: selectedImage })
    setShareDialogOpen(false)
    setShareText("")
    setSelectedImage(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
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
              <Link href="/challenges">
                <Button variant="ghost" size="sm">
                  Challenges
                </Button>
              </Link>
              <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Your Coffee Moment</DialogTitle>
                    <DialogDescription>
                      Post your coffee experience and earn points! Don't forget to use #BrewAndEarn
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="What's brewing? Share your coffee experience..."
                      value={shareText}
                      onChange={(e) => setShareText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Add Photo
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <Hash className="h-4 w-4" />
                        #BrewAndEarn
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-primary">
                        Earn +15 points for posting
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={submitPost}>Post & Earn Points</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="font-serif font-bold text-4xl">Coffee Community</h1>
          <p className="text-muted-foreground text-lg">
            Share your coffee moments, discover trending drinks, and connect with fellow coffee lovers
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Feed
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="influencers" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Creators
            </TabsTrigger>
          </TabsList>

          {/* Community Feed */}
          <TabsContent value="feed" className="space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {postsData.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{post.user.name}</p>
                            {post.user.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {post.user.username} • {post.timestamp}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-primary">
                        +{post.points} points
                      </Badge>
                    </div>
                  </CardHeader>

                  <div className="px-6 pb-4">
                    <p className="text-sm mb-3">{post.content.text}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {post.content.drink && (
                      <Badge className="mb-3 bg-primary/10 text-primary">
                        <Coffee className="h-3 w-3 mr-1" />
                        {post.content.drink}
                      </Badge>
                    )}
                  </div>

                  <div className="px-6">
                    <img
                      src={post.content.image || "/placeholder.svg"}
                      alt="Coffee post"
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>

                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 transition-colors ${
                            post.engagement.liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${post.engagement.liked ? "fill-current" : ""}`} />
                          <span className="text-sm">{post.engagement.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm">{post.engagement.comments}</span>
                        </button>
                        <button
                          onClick={() => handleShare(post.id)}
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                        >
                          <Share2 className="h-5 w-5" />
                          <span className="text-sm">{post.engagement.shares}</span>
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Instagram className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsData.map((review) => (
                <Card key={review.id}>
                  <div className="relative">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.drink}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary">
                      <Coffee className="h-3 w-3 mr-1" />
                      {review.drink}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{review.user.name}</p>
                          <p className="text-xs text-muted-foreground">{review.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDrinks.map((drink, index) => (
                <Card key={drink.id} className="text-center">
                  <div className="relative">
                    <img
                      src={drink.image || "/placeholder.svg"}
                      alt={drink.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary">#{index + 1}</Badge>
                    <div className="absolute top-3 right-3">{getTrendIcon(drink.trend)}</div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">{drink.name}</CardTitle>
                    <div className="flex items-center justify-center gap-1">
                      {renderStars(Math.floor(drink.avgRating))}
                      <span className="text-sm text-muted-foreground ml-1">{drink.avgRating}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mentions</span>
                        <span className="font-semibold">{drink.mentions}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Posts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Influencers Tab */}
          <TabsContent value="influencers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencersData.map((influencer) => (
                <Card key={influencer.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={influencer.videoThumbnail || "/placeholder.svg"}
                      alt={influencer.videoTitle}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">{influencer.views} views</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={influencer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{influencer.name}</p>
                          {influencer.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{influencer.username}</p>
                        <p className="text-xs text-muted-foreground">{influencer.followers} followers</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-3">{influencer.videoTitle}</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Follow
                      </Button>
                      <Button size="sm" className="flex-1">
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
