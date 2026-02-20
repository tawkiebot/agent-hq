import SystemDirectory from "@/components/system-directory"
import { SoundProvider } from "@/components/sound-provider"
import MicroAnimations from "@/components/micro-animations"
import { SupabaseUserProvider } from "@/components/supabase-user-provider"

export const metadata = {
  title: "agentlist.io — Agentic Systems",
  description: "Browse agentic systems by vendor: interfaces, hosting, and versions.",
}

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      <SoundProvider>
        <SupabaseUserProvider>
          <MicroAnimations />
          <SystemDirectory />
        </SupabaseUserProvider>
      </SoundProvider>
    </main>
  )
}
