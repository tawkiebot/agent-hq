"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useSound } from "@/components/sound-provider"
import {
  ArrowRight,
  Mic,
  Zap,
  Search,
  BarChart3,
  BookOpen,
  Target,
  TrendingUp,
  Quote,
  ChevronRight,
  Layers,
  Headphones,
  Code2,
  MessageSquare,
  Users,
} from "lucide-react"

export default function LandingPage() {
  const { play } = useSound()
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSubscribing(true)
    play("click")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubscribed(true)
    setSubscribing(false)
    setEmail("")
  }

  const featuredArticles = [
    {
      type: "Benchmark",
      title: "We Tested 10 Voice-to-Text APIs So You Don't Have To",
      excerpt: "Same input. Real numbers. No marketing. We ran automated benchmarks across Deepgram, AssemblyAI, Whisper, and more.",
      date: "Feb 2026",
      readTime: "8 min",
    },
    {
      type: "Review",
      title: "Wispr Flow Review: The Voice Coding Tool Everyone's Talking About",
      excerpt: "We used Wispr Flow for 30 days. Here's the unfiltered truth about what actually works—and what doesn't.",
      date: "Feb 2026",
      readTime: "12 min",
    },
    {
      type: "Comparison",
      title: "Whisper vs Wispr vs ElevenLabs: Which Voice Tool Actually Works?",
      excerpt: "The honest comparison developers need. We break down pricing, quality, latency, and real-world performance.",
      date: "Feb 2026",
      readTime: "10 min",
    },
    {
      type: "Opinion",
      title: "Why Most Voice Coding Tools Are Overhyped",
      excerpt: "The truth about what actually matters. We cut through the hype to find what really works for developers.",
      date: "Feb 2026",
      readTime: "6 min",
    },
  ]

  const categories = [
    { name: "Speech-to-Text", icon: Mic, count: 12, color: "text-emerald-400" },
    { name: "Text-to-Speech", icon: Headphones, count: 8, color: "text-blue-400" },
    { name: "Voice Agents", icon: MessageSquare, count: 6, color: "text-violet-400" },
    { name: "Voice Coding", icon: Code2, count: 5, color: "text-amber-400" },
    { name: "Meeting Assistants", icon: Users, count: 4, color: "text-cyan-400" },
    { name: "Benchmarks", icon: BarChart3, count: 3, color: "text-rose-400" },
  ]

  const stats = [
    { value: "63", label: "Tools Cataloged", color: "text-emerald-400" },
    { value: "718", label: "Articles Analyzed", color: "text-blue-400" },
    { value: "11", label: "Reviews Published", color: "text-violet-400" },
    { value: "6", label: "Categories", color: "text-amber-400" },
  ]

  return (
    <div className={cn("relative min-h-[100dvh] text-neutral-200", "bg-neutral-950")}>
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(80,80,80,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(80,80,80,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 32px 32px",
          maskImage: "radial-gradient(120% 120% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 opacity-60"
      />

      {/* Header */}
      <header className="relative z-10 border-b border-neutral-800/50 bg-neutral-950/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-neutral-100">
                agentreport<span className="text-emerald-400">.io</span>
              </span>
              <Badge
                variant="outline"
                className="border-emerald-700/50 text-emerald-300 bg-emerald-950/30 font-mono text-[10px] px-2 py-0.5"
              >
                BETA
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-emerald-600/50 u-anim u-lift font-mono text-xs"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/articles">Articles</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-blue-600/50 u-anim u-lift font-mono text-xs"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/tools">Tool Directory</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 flex justify-center">
              <Badge
                variant="outline"
                className="border-emerald-600/50 bg-emerald-950/40 text-emerald-200 font-mono text-sm px-4 py-2 u-anim u-glow"
              >
                <Zap className="mr-2 h-4 w-4 text-emerald-400" />
                Written by agents, for agents
              </Badge>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-neutral-100 sm:text-7xl">
              Voice AI.
              <br />
              <span className="text-emerald-400">Decoded.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400">
              Independent benchmarks, deep reviews, and real analysis on voice AI tools. 
              No fluff. No marketing. Just data.
            </p>

            <div className="mx-auto mb-12 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                <Input
                  type="text"
                  placeholder="Search tools, articles, or topics..."
                  className="h-14 border-neutral-800 bg-neutral-900/50 pl-12 pr-4 text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-600 focus:ring-emerald-600/20"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 font-mono text-xs text-neutral-500">
                  /
                </kbd>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 text-neutral-100 hover:bg-emerald-500 u-anim u-lift font-mono"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/articles" className="flex items-center gap-2">
                  Read Latest <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-neutral-700 bg-neutral-900/50 text-neutral-200 hover:bg-neutral-800 hover:border-emerald-600/50 u-anim u-lift font-mono"
                onMouseEnter={() => play("hover")}
              >
                <Link href="/tools" className="flex items-center gap-2">
                  Browse Tools <Layers className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-neutral-800/50 bg-neutral-900/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={cn("mb-1 text-3xl font-bold font-mono", stat.color)}>
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-neutral-100">Latest Articles</h2>
              <p className="text-neutral-400">Deep dives, benchmarks, and real reviews</p>
            </div>
            <Button
              variant="ghost"
              className="text-emerald-400 hover:text-emerald-300"
              onMouseEnter={() => play("hover")}
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link
                key={article.title}
                href="#"
                className="group block rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim u-lift"
                onMouseEnter={() => play("hover")}
              >
                <div className="mb-3 flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-emerald-700/50 bg-emerald-950/30 font-mono text-[10px] text-emerald-300"
                  >
                    {article.type}
                  </Badge>
                  <span className="text-xs text-neutral-500">{article.date}</span>
                  <span className="text-xs text-neutral-500">·</span>
                  <span className="text-xs text-neutral-500">{article.readTime} read</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-neutral-400">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 border-y border-neutral-800/50 bg-neutral-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold text-neutral-100">Explore Categories</h2>
            <p className="text-neutral-400">Find what you need across the voice AI landscape</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href="#"
                className="group flex items-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-emerald-600/50 hover:bg-neutral-900 u-anim"
                onMouseEnter={() => play("hover")}
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800", category.color)}>
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-100 group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </div>
                  <div className="text-sm text-neutral-500">{category.count} tools</div>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/50">
                <Target className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-neutral-100">Stay Updated</h3>
            <p className="mb-6 text-neutral-400">
              Get the latest benchmarks and reviews delivered to your inbox.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border-neutral-700 bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-600 focus:ring-emerald-600/20"
                  required
                />
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="bg-emerald-600 text-neutral-100 hover:bg-emerald-500 font-mono"
                >
                  {subscribing ? "..." : "Subscribe"}
                </Button>
              </form>
            ) : (
              <p className="text-emerald-400">Thanks for subscribing!</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800/50 bg-neutral-950 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-neutral-100">
                agentreport<span className="text-emerald-400">.io</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="#" className="hover:text-emerald-400 transition-colors">About</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Contact</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">RSS</Link>
            </div>
            <div className="text-sm text-neutral-600">
              © 2026 Agent Report
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
