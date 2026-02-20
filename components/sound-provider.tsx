"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

type SoundId = "hover" | "click" | "select" | "open" | "tab" | "toggle" | "reset" | "focus" | "key"

type SoundChannels = {
  cards: boolean
  tabs: boolean
  typing: boolean
}

type SoundContextValue = {
  enabled: boolean
  volume: number
  channels: SoundChannels
  toggleEnabled: () => void
  setVolume: (v: number) => void
  setChannels: (next: Partial<SoundChannels>) => void
  play: (id: SoundId) => void
}

const defaultChannels: SoundChannels = { cards: true, tabs: true, typing: true }
const SoundContext = createContext<SoundContextValue | null>(null)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [channels, setChannelsState] = useState<SoundChannels>(defaultChannels)

  // Persist/load preferences
  useEffect(() => {
    try {
      const en = localStorage.getItem("snd:enabled")
      if (en != null) setEnabled(en === "1")
      const vol = localStorage.getItem("snd:volume")
      if (vol != null) setVolume(Number.parseFloat(vol))
      const ch = localStorage.getItem("snd:channels")
      if (ch) {
        const parsed = JSON.parse(ch)
        setChannelsState({ ...defaultChannels, ...parsed })
      }
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem("snd:enabled", enabled ? "1" : "0")
    } catch {}
  }, [enabled])
  useEffect(() => {
    try {
      localStorage.setItem("snd:volume", String(volume))
    } catch {}
  }, [volume])
  useEffect(() => {
    try {
      localStorage.setItem("snd:channels", JSON.stringify(channels))
    } catch {}
  }, [channels])

  // Lazily create AudioContext on first user gesture
  const ctxRef = useRef<AudioContext | null>(null)
  const ensureContext = useCallback(async () => {
    if (typeof window === "undefined") return null
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext
        if (!Ctx) return null
        ctxRef.current = new Ctx()
      } catch {
        ctxRef.current = null
      }
    }
    if (ctxRef.current?.state === "suspended") {
      try {
        await ctxRef.current.resume()
      } catch {}
    }
    return ctxRef.current
  }, [])

  useEffect(() => {
    const handler = () => {
      if (!ctxRef.current) ensureContext()
      window.removeEventListener("pointerdown", handler)
      window.removeEventListener("keydown", handler)
    }
    window.addEventListener("pointerdown", handler, { once: true })
    window.addEventListener("keydown", handler, { once: true })
    return () => {
      window.removeEventListener("pointerdown", handler)
      window.removeEventListener("keydown", handler)
    }
  }, [ensureContext])

  const tone = useCallback(
    async (
      freq: number,
      durationMs: number,
      type: OscillatorType = "sine",
      gain = volume,
      curve?: "quick" | "blip",
    ) => {
      const ctx = await ensureContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gainNode.gain.value = 0.0001

      osc.connect(gainNode).connect(ctx.destination)

      const now = ctx.currentTime
      const dur = durationMs / 1000
      const attack = curve === "blip" ? 0.002 : 0.005
      const release = curve === "quick" ? Math.min(0.03, dur / 3) : Math.min(0.06, dur / 2)
      const sustainTime = Math.max(0, dur - attack - release)

      gainNode.gain.setValueAtTime(0.0001, now)
      gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + attack)
      gainNode.gain.setValueAtTime(Math.max(0.0002, gain), now + attack + sustainTime)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + attack + sustainTime + release)

      osc.start(now)
      osc.stop(now + dur + 0.02)
    },
    [ensureContext, volume],
  )

  // Map sound IDs to channels for per-area control
  const channelMap: Partial<Record<SoundId, keyof SoundChannels>> = {
    hover: "cards",
    select: "cards",
    open: "cards",
    tab: "tabs",
    toggle: "tabs",
    key: "typing",
  }

  const play = useCallback(
    (id: SoundId) => {
      if (!enabled) return
      const ch = channelMap[id]
      if (ch && !channels[ch]) return

      switch (id) {
        case "hover":
          tone(2800, 24, "triangle", 0.12, "blip")
          break
        case "key":
          tone(1800, 22, "triangle", 0.1, "blip")
          break
        case "focus":
          tone(900, 60, "sine", 0.15, "quick")
          break
        case "click":
          tone(550, 40, "square", 0.18, "quick")
          break
        case "select":
        case "open":
          tone(620, 50, "sine", 0.18, "quick")
          setTimeout(() => tone(860, 60, "sine", 0.16, "quick"), 60)
          break
        case "tab":
        case "toggle":
          tone(740, 36, "triangle", 0.16, "quick")
          break
        case "reset":
          tone(500, 30, "sine", 0.14, "quick")
          setTimeout(() => tone(380, 50, "sine", 0.12, "quick"), 40)
          break
        default:
          break
      }
    },
    [enabled, channels, tone],
  )

  const toggleEnabled = useCallback(() => setEnabled((e) => !e), [])
  const setChannels = useCallback((next: Partial<SoundChannels>) => {
    setChannelsState((prev) => ({ ...prev, ...next }))
  }, [])

  const value = useMemo<SoundContextValue>(
    () => ({ enabled, volume, channels, toggleEnabled, setVolume, setChannels, play }),
    [enabled, play, volume, channels],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    return {
      enabled: false,
      volume: 0,
      channels: defaultChannels,
      toggleEnabled: () => {},
      setVolume: () => {},
      setChannels: () => {},
      play: (_: SoundId) => {},
    } as SoundContextValue
  }
  return ctx
}
