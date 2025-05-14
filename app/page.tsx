import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="animate-pulse">
            <Heart className="h-16 w-16 text-pink-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-pink-600">Grievance Portal</h1>

          <p className="text-xl md:text-2xl text-pink-500 font-medium max-w-2xl">
            Welcome to your safe space for complaints 💔
          </p>

          <p className="text-gray-600 max-w-xl">
            A personal, playful space where you can write emotional complaints when he's dumb, late, or forgets
            important things. We'll make sure he feels appropriately guilty.
          </p>

          <div className="pt-6">
            <Link href="/submit">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 group">
                File a Grievance
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { emoji: "😤", title: "Express Yourself", description: "Let out all your frustrations in a safe space" },
              { emoji: "📨", title: "Instant Delivery", description: "Your complaints go straight to his inbox" },
              { emoji: "🥲", title: "Guilt Trip", description: "Watch as he scrambles to make things right" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-pink-100"
              >
                <div className="text-4xl mb-3">{feature.emoji}</div>
                <h3 className="font-bold text-lg text-pink-600">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-sm text-gray-500">
            <p>Made with 💖 (and a little bit of 😤)</p>
          </div>
        </div>
      </main>
    </div>
  )
}
