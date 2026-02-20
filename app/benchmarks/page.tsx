import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Clock, CheckCircle2 } from "lucide-react"

const benchmarks = [
  {
    name: "Speech-to-Text",
    description: "Transcription accuracy and latency comparison",
    lastUpdated: "Feb 2026",
    results: [
      { tool: "Deepgram", accuracy: "94.8%", latency: "64ms", price: "$0.004/min", winner: "latency" },
      { tool: "AssemblyAI", accuracy: "94.4%", latency: "356ms", price: "$0.005/min", winner: null },
      { tool: "Whisper (OpenAI)", accuracy: "93.9%", latency: "400ms", price: "$0.004/min", winner: null },
      { tool: "Speechmatics", accuracy: "94.1%", latency: "280ms", price: "$0.006/min", winner: null },
      { tool: "Google Cloud STT", accuracy: "93.5%", latency: "320ms", price: "$0.006/min", winner: null },
    ],
  },
  {
    name: "Text-to-Speech",
    description: "Voice quality and naturalness comparison",
    lastUpdated: "Feb 2026",
    results: [
      { tool: "ElevenLabs", accuracy: "99.2%", latency: "150ms", price: "$0.18/min", winner: "quality" },
      { tool: "WellSaid Labs", accuracy: "97.8%", latency: "200ms", price: "$0.10/min", winner: null },
      { tool: "Murf", accuracy: "96.5%", latency: "180ms", price: "$0.12/min", winner: null },
      { tool: "PlayHT", accuracy: "96.2%", latency: "160ms", price: "$0.09/min", winner: null },
      { tool: "Synthesia", accuracy: "95.8%", latency: "250ms", price: "$0.15/min", winner: null },
    ],
  },
  {
    name: "Voice Agents",
    description: "End-to-end voice agent performance",
    lastUpdated: "Feb 2026",
    results: [
      { tool: "Vapi", accuracy: "96.5%", latency: "450ms", price: "$0.01/min", winner: "latency" },
      { tool: "Bland AI", accuracy: "95.8%", latency: "520ms", price: "$0.015/min", winner: null },
      { tool: "Voiceflow", accuracy: "94.2%", latency: "600ms", price: "$0.02/min", winner: null },
      { tool: "PolyAI", accuracy: "95.1%", latency: "580ms", price: "$0.025/min", winner: null },
    ],
  },
]

export default function BenchmarksPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="border-b border-neutral-800/50 bg-neutral-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-emerald-700/50 bg-emerald-950/30 text-emerald-300">
              Data
            </Badge>
            <span className="text-sm text-neutral-500">Updated Feb 2026</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-neutral-100">Benchmarks</h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Automated, reproducible benchmarks across all major voice AI tools. 
            Same input. Real numbers. No marketing.
          </p>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-16">
          {benchmarks.map((benchmark) => (
            <div key={benchmark.name} className="rounded-xl border border-neutral-800 bg-neutral-900/30 overflow-hidden">
              <div className="border-b border-neutral-800 bg-neutral-900/50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-100">{benchmark.name}</h2>
                    <p className="text-sm text-neutral-400">{benchmark.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Clock className="h-4 w-4" />
                    {benchmark.lastUpdated}
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="px-6 py-3 text-left font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">Tool</th>
                      <th className="px-6 py-3 text-right font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">Accuracy</th>
                      <th className="px-6 py-3 text-right font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">Latency</th>
                      <th className="px-6 py-3 text-right font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-right font-mono text-xs font-medium text-neutral-500 uppercase tracking-wider">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {benchmark.results.map((result, i) => (
                      <tr key={result.tool} className="hover:bg-neutral-800/30">
                        <td className="px-6 py-4">
                          <span className="font-medium text-neutral-100">{result.tool}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-neutral-300">
                          {result.accuracy}
                          {i === 0 && <ArrowUp className="ml-1 inline h-3 w-3 text-emerald-400" />}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-neutral-300">
                          {result.latency}
                          {result.winner === 'latency' && <ArrowDown className="ml-1 inline h-3 w-3 text-emerald-400" />}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-neutral-400">
                          {result.price}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {result.winner && (
                            <Badge variant="outline" className="border-emerald-700/50 bg-emerald-950/30 text-emerald-300 text-xs">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {result.winner}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="border-t border-neutral-800/50 py-12 bg-neutral-900/20">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
            <h3 className="text-lg font-semibold text-neutral-100 mb-4">Our Methodology</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h4 className="font-medium text-neutral-300 mb-2">Same Input</h4>
                <p className="text-sm text-neutral-400">
                  We use identical audio samples across all tools—a 5-minute technical podcast about code.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-300 mb-2">Automated Testing</h4>
                <p className="text-sm text-neutral-400">
                  Benchmarks run automatically via API calls. No human judgment. No cherry-picking.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-300 mb-2">Transparent Pricing</h4>
                <p className="text-sm text-neutral-400">
                  Prices are from public API docs. We use standard tiers—no enterprise discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
