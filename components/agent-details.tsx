"use client"

import { useMemo, useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Agent } from "@/lib/agents"
import { Copy, CheckCheck, LinkIcon, Code2, Database } from "lucide-react"
import { useSound } from "@/components/sound-provider"

type AgentDetailsProps = {
  agent: Agent | null
  onOpenChange?: (open: boolean) => void
}

export default function AgentDetails({ agent, onOpenChange = () => {} }: AgentDetailsProps) {
  const [copied, setCopied] = useState(false)
  const open = !!agent
  const { play } = useSound()

  const json = useMemo(() => (agent ? JSON.stringify(agent, null, 2) : "{}"), [agent])

  async function copySpec() {
    if (!agent) return
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  useEffect(() => {
    if (agent) play("open")
  }, [agent, play])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl md:max-w-2xl bg-neutral-950 text-neutral-200 border-neutral-800"
      >
        {agent && (
          <>
            <SheetHeader>
              <SheetTitle className="text-neutral-100 tracking-[0.08em] uppercase">{agent.name}</SheetTitle>
              <SheetDescription className="text-neutral-400">
                {agent.role} • v{agent.version}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-neutral-700 text-neutral-300 bg-transparent font-mono">
                {agent.category.toUpperCase()}
              </Badge>
              {agent.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="outline" className="border-neutral-700 text-neutral-300 font-mono">
                  {t}
                </Badge>
              ))}
            </div>

            <Separator className="my-4 bg-neutral-800" />

            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-neutral-400">
                UPDATED {new Date(agent.updatedAt).toISOString().slice(0, 16).replace("T", " ")}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    play("click")
                    copySpec()
                  }}
                  className="border-neutral-700 text-neutral-200 hover:bg-neutral-900 bg-transparent"
                >
                  {copied ? <CheckCheck className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Copied" : "Copy JSON"}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="bg-neutral-900/40">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 font-mono text-xs tracking-[0.08em] uppercase"
                >
                  OVERVIEW
                </TabsTrigger>
                <TabsTrigger
                  value="prompts"
                  className="data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 font-mono text-xs tracking-[0.08em] uppercase"
                >
                  PROMPTS
                </TabsTrigger>
                <TabsTrigger
                  value="io"
                  className="data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 font-mono text-xs tracking-[0.08em] uppercase"
                >
                  I/O
                </TabsTrigger>
                <TabsTrigger
                  value="raw"
                  className="data-[state=active]:text-neutral-100 data-[state=active]:border-neutral-700 font-mono text-xs tracking-[0.08em] uppercase"
                >
                  RAW JSON
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-3">
                <div className="space-y-4">
                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-xs text-neutral-400">SUMMARY</h4>
                    <p className="font-mono text-sm leading-relaxed text-neutral-200">{agent.summary}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                      <h4 className="mb-2 font-mono text-xs text-neutral-400">APPLICATION CONTEXT</h4>
                      <p className="font-mono text-sm text-neutral-200 whitespace-pre-wrap">{agent.appContext}</p>
                    </div>
                    <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                      <h4 className="mb-2 font-mono text-xs text-neutral-400">CONTEXT</h4>
                      <p className="font-mono text-sm text-neutral-200 whitespace-pre-wrap">{agent.context}</p>
                    </div>
                  </div>

                  <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                    <h4 className="mb-2 font-mono text-xs text-neutral-400">ENDPOINTS</h4>
                    <div className="space-y-2">
                      {agent.endpoints.map((e, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded border border-neutral-800 bg-neutral-950 p-2"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-mono text-xs text-neutral-200">{e.url}</p>
                            <p className="font-mono text-[11px] text-neutral-500">{e.api}</p>
                          </div>
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-200 hover:bg-neutral-900"
                          >
                            <LinkIcon className="mr-1 h-3.5 w-3.5" />
                            Open
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prompts" className="mt-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="system">
                    <AccordionTrigger className="font-mono text-sm">System Prompt</AccordionTrigger>
                    <AccordionContent>
                      <CodeBlock text={agent.systemPrompt} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="user">
                    <AccordionTrigger className="font-mono text-sm">User Prompt</AccordionTrigger>
                    <AccordionContent>
                      <CodeBlock text={agent.userPrompt} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="context">
                    <AccordionTrigger className="font-mono text-sm">Context</AccordionTrigger>
                    <AccordionContent>
                      <CodeBlock text={agent.context} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="app">
                    <AccordionTrigger className="font-mono text-sm">Application Context</AccordionTrigger>
                    <AccordionContent>
                      <CodeBlock text={agent.appContext} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="io" className="mt-3">
                <div className="rounded border border-neutral-800 bg-neutral-900/40 p-3">
                  <h4 className="mb-2 flex items-center gap-2 font-mono text-xs text-neutral-400">
                    <Database className="h-4 w-4" /> Interfaces
                  </h4>
                  <ul className="list-inside list-disc space-y-1">
                    {agent.endpoints.map((e, idx) => (
                      <li key={idx} className="font-mono text-sm text-neutral-200">
                        {e.api} — {e.url}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="raw" className="mt-3">
                <div className="rounded border border-neutral-800 bg-neutral-950">
                  <ScrollArea className="h-[50vh]">
                    <pre className="m-0 p-3 font-mono text-xs text-neutral-200">{json}</pre>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CodeBlock({ text = "" }: { text?: string }) {
  return (
    <div className="rounded border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-800 px-3 py-1.5">
        <div className="flex items-center gap-2 text-neutral-400">
          <Code2 className="h-3.5 w-3.5" />
          <span className="font-mono text-[11px]">SPEC</span>
        </div>
        {/* Decorative dots */}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-neutral-500/70" />
          <span className="h-2 w-2 rounded-full bg-neutral-400/70" />
          <span className="h-2 w-2 rounded-full bg-neutral-300/70" />
        </div>
      </div>
      <ScrollArea className="max-h-[28vh]">
        <pre className="m-0 whitespace-pre-wrap p-3 font-mono text-xs leading-relaxed text-neutral-200">
          {String(text)}
        </pre>
      </ScrollArea>
    </div>
  )
}

AgentDetails.defaultProps = {
  onOpenChange: () => {},
}
