import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  { name: "Speech-to-Text", count: 12 },
  { name: "Text-to-Speech", count: 8 },
  { name: "Voice Agents", count: 6 },
  { name: "Voice Coding", count: 5 },
  { name: "Meeting Assistants", count: 4 },
  { name: "Dictation", count: 7 },
]

const tools = [
  { name: "Deepgram", category: "Speech-to-Text", description: "Low-latency speech-to-text API", badge: "Fastest" },
  { name: "AssemblyAI", category: "Speech-to-Text", description: "Speech recognition with AI features", badge: "Popular" },
  { name: "Speechmatics", category: "Speech-to-Text", description: "Enterprise-grade transcription", badge: null },
  { name: "ElevenLabs", category: "Text-to-Speech", description: "Hyper-realistic voice synthesis", badge: "Best Quality" },
  { name: "Murf", category: "Text-to-Speech", description: "AI voice generator for content", badge: null },
  { name: "PlayHT", category: "Text-to-Speech", description: "Text to speech with voice cloning", badge: null },
  { name: "Synthesia", category: "Text-to-Speech", description: "AI video with voiceover", badge: null },
  { name: "WellSaid Labs", category: "Text-to-Speech", description: "Studio-quality voice synthesis", badge: null },
  { name: "Vapi", category: "Voice Agents", description: "Build voice AI agents", badge: "Dev Favorite" },
  { name: "Bland AI", category: "Voice Agents", description: "Hyper-realistic voice bots", badge: null },
  { name: "Voiceflow", category: "Voice Agents", description: "Design voice assistants", badge: null },
  { name: "PolyAI", category: "Voice Agents", description: "Enterprise voice assistants", badge: null },
  { name: "Wispr Flow", category: "Voice Coding", description: "Voice dictation for developers", badge: "Popular" },
  { name: "Talon Voice", category: "Voice Coding", description: "Voice coding for accessibility", badge: "OG" },
  { name: "Serenade", category: "Voice Coding", description: "AI-powered voice coding", badge: null },
  { name: "Cursorless", category: "Voice Coding", description: "Voice navigation for code", badge: null },
  { name: "Otter.ai", category: "Meeting Assistants", description: "AI meeting assistant", badge: "Market Leader" },
  { name: "Fireflies", category: "Meeting Assistants", description: "Meeting transcription & notes", badge: null },
  { name: "Gong", category: "Meeting Assistants", description: "Revenue intelligence", badge: null },
  { name: "SuperWhisper", category: "Dictation", description: "Whisper-powered Mac dictation", badge: "New" },
  { name: "MacWhisper", category: "Dictation", description: "Local Whisper on Mac", badge: null },
  { name: "Spokenly", category: "Dictation", description: "Whisper-powered dictation", badge: null },
]

const categoryColors: Record<string, string> = {
  "Speech-to-Text": "text-emerald-400 border-emerald-800 bg-emerald-950/30",
  "Text-to-Speech": "text-blue-400 border-blue-800 bg-blue-950/30",
  "Voice Agents": "text-violet-400 border-violet-800 bg-violet-950/30",
  "Voice Coding": "text-amber-400 border-amber-800 bg-amber-950/30",
  "Meeting Assistants": "text-cyan-400 border-cyan-800 bg-cyan-950/30",
  "Dictation": "text-rose-400 border-rose-800 bg-rose-950/30",
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-800/50 bg-neutral-900/30 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold text-neutral-100">Tool Directory</h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Comprehensive directory of voice AI tools. Browse by category or search to find what you need.
          </p>
          
          <div className="mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="h-12 border-neutral-700 bg-neutral-900 pl-10 text-neutral-200 placeholder:text-neutral-500 focus:border-emerald-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-neutral-800/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-emerald-950/50 px-4 py-2 font-mono text-sm text-emerald-400 border border-emerald-800">
              All ({tools.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-sm text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 transition-all hover:border-emerald-600/50 hover:bg-neutral-900/50"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {tool.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`mt-2 text-xs ${categoryColors[tool.category]}`}
                    >
                      {tool.category}
                    </Badge>
                  </div>
                  {tool.badge && (
                    <Badge variant="outline" className="border-emerald-700/50 bg-emerald-950/30 text-emerald-300 text-xs">
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-400">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
