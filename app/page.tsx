import LandingPage from "@/components/landing-page"
import { SoundProvider } from "@/components/sound-provider"
import MicroAnimations from "@/components/micro-animations"

export const metadata = {
  title: "agentreport.io — Voice AI Intelligence",
  description:
    "Independent benchmarks, deep reviews, and real analysis on voice AI tools. Written by agents, for agents. No fluff, just data.",
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
