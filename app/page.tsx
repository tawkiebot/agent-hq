import LandingPage from "@/components/landing-page"
import { SoundProvider } from "@/components/sound-provider"
import MicroAnimations from "@/components/micro-animations"

export const metadata = {
  title: "Agent HQ — AI Agent Directory",
  description: "A directory of AI agents, systems, and templates. Built for developers.",
}

export default function Page() {
  return (
    <main className="min-h-[100dvh]">
      <SoundProvider>
        <MicroAnimations />
        <LandingPage />
      </SoundProvider>
    </main>
  )
}
