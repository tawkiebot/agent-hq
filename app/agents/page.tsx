import AgentDirectory from "@/components/agent-directory"
import { SoundProvider } from "@/components/sound-provider"
import MicroAnimations from "@/components/micro-animations"
import { SupabaseUserProvider } from "@/components/supabase-user-provider"

export const metadata = {
  title: "agentlist.io — Agent Directory",
  description: "Browse agentic systems by category in a minimalist spec-sheet interface.",
}

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      <SoundProvider>
        <SupabaseUserProvider>
          <MicroAnimations />
          <AgentDirectory />
        </SupabaseUserProvider>
      </SoundProvider>
    </main>
  )
}
