import AgentDirectory from "@/components/agent-directory"
import { SoundProvider } from "@/components/sound-provider"
import MicroAnimations from "@/components/micro-animations"

export const metadata = {
  title: "Agent HQ — AI Agent Directory",
  description: "A directory of AI agents, systems, and templates.",
}

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <SoundProvider>
        <MicroAnimations />
        <AgentDirectory />
      </SoundProvider>
    </main>
  )
}
