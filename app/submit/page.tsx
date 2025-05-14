"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { submitGrievance } from "./actions"

const EMOTION_LEVELS = [
  { value: "1", emoji: "🥱", label: "Mildly Annoyed" },
  { value: "2", emoji: "😒", label: "Disappointed" },
  { value: "3", emoji: "😤", label: "Frustrated" },
  { value: "4", emoji: "😠", label: "Angry" },
  { value: "5", emoji: "😡", label: "Furious" },
]

const TAGS = [
  "Ignored me",
  "Late reply",
  "Forgot date",
  "Didn't text back",
  "Said something dumb",
  "Didn't notice my hair",
  "Gaming too much",
  "Other",
]

export default function SubmitGrievance() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    complaint: "",
    severity: "3",
    tags: [] as string[],
  })

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This will eventually send an email via the server action
      await submitGrievance(formData)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting grievance:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-md border border-pink-100">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">💌</div>
            <h1 className="text-2xl font-bold text-pink-600">Grievance Registered!</h1>
            <p className="text-gray-600">
              Thanks! Your emotional wound has been registered. He'll feel guilty shortly 🥲
            </p>
            <div className="pt-6">
              <Link href="/">
                <Button variant="outline" className="rounded-full px-6 border-pink-200 text-pink-600 hover:bg-pink-50">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <main className="container max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-pink-100">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">File a Grievance</h1>
          <p className="text-gray-600 mb-6">Let it all out. What did he do this time?</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="complaint" className="text-pink-600 font-medium">
                Your Complaint
              </Label>
              <Textarea
                id="complaint"
                placeholder="Tell us what happened... Don't hold back!"
                className="mt-1 min-h-[120px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                value={formData.complaint}
                onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="text-pink-600 font-medium">How bad was it?</Label>
              <RadioGroup
                value={formData.severity}
                onValueChange={(value) => setFormData({ ...formData, severity: value })}
                className="mt-2"
              >
                <div className="flex justify-between items-center">
                  {EMOTION_LEVELS.map((level) => (
                    <div key={level.value} className="flex flex-col items-center space-y-1">
                      <div
                        className={`
                        text-2xl cursor-pointer p-2 rounded-full transition-all
                        ${formData.severity === level.value ? "bg-pink-100 transform scale-125" : "hover:bg-pink-50"}
                      `}
                      >
                        {level.emoji}
                      </div>
                      <RadioGroupItem value={level.value} id={`severity-${level.value}`} className="sr-only" />
                      <Label htmlFor={`severity-${level.value}`} className="text-xs text-gray-600 cursor-pointer">
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-pink-600 font-medium">Tags (optional)</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-colors
                      ${
                        formData.tags.includes(tag)
                          ? "bg-pink-500 text-white"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-full py-6 text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              disabled={isSubmitting || !formData.complaint}
            >
              {isSubmitting ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  Send Emotional Damage 💌
                  <Send className="h-5 w-5 ml-1" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-pink-100">
          <h2 className="text-lg font-bold text-pink-600 mb-3">Grievance Stats</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              You've hurt her feelings <span className="font-bold">3</span> times this week 💀
            </p>
            <div className="w-full bg-pink-100 rounded-full h-2.5">
              <div className="bg-pink-500 h-2.5 rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-gray-500">75% of your weekly guilt quota</p>
          </div>
        </div>
      </main>
    </div>
  )
}
