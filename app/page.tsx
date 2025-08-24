import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coffee, Users, Gift, Star, Instagram, Facebook, Twitter, Heart, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Coffee className="h-8 w-8 text-primary" />
              <span className="font-serif font-bold text-xl">Zuscoffee</span>
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
              <Link href="/social">
                <Button variant="ghost" size="sm">
                  Community
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
              <Button size="sm">Join Now</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-card to-background py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  New Loyalty Program
                </Badge>
                <h1 className="font-serif font-black text-5xl lg:text-6xl leading-tight">
                  Sip. Share. <span className="text-primary">Earn.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join our community of coffee lovers and earn points with every purchase. Share your coffee moments and
                  unlock exclusive rewards.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button size="lg" className="text-lg px-8">
                    Order Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  Join Loyalty Club
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">10K+ Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">4.9 Rating</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/coffee-shop-interior-with-people-enjoying-coffee-a.png"
                alt="Coffee shop atmosphere"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Gift className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Free Drink</div>
                    <div className="text-sm opacity-90">After 10 visits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Promo */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl">Double Points Week!</h3>
                  <p className="text-muted-foreground">
                    Earn 2x points on all Iced Lattes this week. Limited time offer!
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    2x Points
                  </Badge>
                  <Button>Order Iced Latte</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Feed Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif font-bold text-3xl">Coffee Community</h2>
            <p className="text-muted-foreground text-lg">See what our community is brewing and sharing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                user: "Sarah M.",
                avatar: "/woman-with-coffee.png",
                image: "/latte-art-heart-design.png",
                caption: "Perfect latte art to start my Monday! ☕",
                likes: 24,
                points: "+15 points",
              },
              {
                user: "Mike R.",
                avatar: "/man-with-coffee.png",
                image: "/iced-coffee-with-whipped-cream.png",
                caption: "This iced caramel macchiato is everything! 🧊",
                likes: 18,
                points: "+10 points",
              },
              {
                user: "Emma L.",
                avatar: "/woman-enjoying-coffee.png",
                image: "/coffee-shop-study.png",
                caption: "Best study spot in town! Thanks Zuscoffee ☕📚",
                likes: 31,
                points: "+20 points",
              },
            ].map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{post.user}</p>
                        <Badge variant="outline" className="text-xs">
                          {post.points}
                        </Badge>
                      </div>
                    </div>
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <div className="px-6">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Coffee post"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm mb-3">{post.caption}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/social">
              <Button variant="outline" size="lg">
                View All Posts #BrewAndEarn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Login/Signup */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-serif">Join the Community</CardTitle>
              <CardDescription>Sign up to start earning points and sharing your coffee moments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg">
                <Coffee className="h-5 w-5 mr-2" />
                Continue with Email
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="lg">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account? <button className="text-primary hover:underline">Sign in</button>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-primary" />
                <span className="font-serif font-bold text-lg">Zuscoffee</span>
              </div>
              <p className="text-sm text-muted-foreground">Your favorite coffee shop with rewards that matter.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Menu</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Hot Coffee</p>
                <p>Cold Brew</p>
                <p>Seasonal</p>
                <p>Snacks</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Rewards</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Loyalty Program</p>
                <p>Challenges</p>
                <p>Referrals</p>
                <p>Leaderboard</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Connect</h4>
              <div className="flex gap-3">
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
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Zuscoffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
