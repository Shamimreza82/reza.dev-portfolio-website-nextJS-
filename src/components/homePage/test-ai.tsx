/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, Send, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
// Make sure the path to your image is correct
import reza from "../../asset/photo/reza.jpg"

type Message = {
  from: "you" | "ai"
  text: string
}

export default function AIChat() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [chat, setChat] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const socketRef = useRef<Socket>()
  const lastMsgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Session ID logic remains the same
    if (typeof window !== "undefined") {
      let persisted = localStorage.getItem("guestId")
      if (!persisted) {
        persisted = crypto.randomUUID()
        localStorage.setItem("guestId", persisted)
      }
      setSessionId(persisted)
    }
  }, [])

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat, isTyping])

  useEffect(() => {
    if (!sessionId) return

    const socket = io(process.env.NEXT_PUBLIC_API_URL!, { transports: ["websocket"] })
    socketRef.current = socket

    const handleConnect = () => {
      setIsConnected(true)
      socket.emit("join_session", sessionId)
      // ✨ UX IMPROVEMENT: Send the AI's welcome message on connect if chat is empty
      if (chat.length === 0) {
        setIsTyping(true)
        // Simulate a short delay for the welcome message for a natural feel
        setTimeout(() => {
          setIsTyping(false)
          addMessage(
            "ai",
            "Hello! I'm Reza's Assistant, an AI built to answer your questions about Shamim Reza's work. How can I help you today?"
          )
        }, 1000)
      }
    }

    const handleDisconnect = () => setIsConnected(false)
    const handleAiResponse = ({ text }: { text: string }) => {
      setIsTyping(false)
      addMessage("ai", text)
    }
    const handleAiError = (errMsg: string) => {
      setIsTyping(false)
      addMessage("ai", `Error: ${errMsg}`)
    }

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("ai_response", handleAiResponse)
    socket.on("ai_error", handleAiError)

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("ai_response", handleAiResponse)
      socket.off("ai_error", handleAiError)
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const addMessage = (from: "you" | "ai", text: string) => {
    setChat((prev) => [...prev, { from, text }])
  }

  const send = async () => {
    if (!prompt.trim()) return

    addMessage("you", prompt)
    setIsTyping(true)

    if (socketRef.current?.connected) {
      socketRef.current.emit("ask_ai", { sessionId, prompt })
    } else {
      // Fallback logic remains the same
      try {
        const res = await fetch("/api/ask_ai", { // Ensure this endpoint is correct
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, prompt }),
        })
        if (!res.ok) throw new Error("Server error")
        const data = await res.json()
        const text = data.message || "Sorry, there was an error processing your request."
        addMessage("ai", text)
      } catch {
        addMessage("ai", "Sorry, there was an error processing your request.")
      } finally {
        setIsTyping(false)
      }
    }
    setPrompt("")
  }

  return (
    <div className="mx-auto">
      {/* ✨ DESIGN: Using richer background color and subtle border */}
      <Card className="flex flex-col w-full max-w-md max-h-[700px] h-[700px] bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10">
        {/* ✨ DESIGN: Added gradient and border for a premium header feel */}
        <CardHeader className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 border-b border-slate-700">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-white">
              <Image src={reza} alt="Reza" width={40} height={40} className="rounded-full border-2 border-slate-500" />
              Rezas Assistant
            </CardTitle>
            <Badge
              variant={isConnected ? "default" : "destructive"}
              className={cn("flex items-center gap-1.5 transition-colors", isConnected ? "bg-emerald-600 text-white" : "bg-red-600 text-white")}
            >
              <div className={cn("w-2 h-2 rounded-full", isConnected ? "bg-green-400 animate-pulse" : "bg-red-400")} />
              {isConnected ? "Online" : "Offline"}
            </Badge>
          </div>
        </CardHeader>

        {/* ✨ DESIGN: Added a subtle background pattern (optional, see notes below) and more padding */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chat.map((message, index) => {
            const isYou = message.from === "you"
            return (
              // ✨ ANIMATION: Added subtle fade-in and scale animation for new messages
              <div
                key={index}
                ref={index === chat.length - 1 ? lastMsgRef : undefined}
                className={cn(
                  "flex items-end gap-2 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95",
                  isYou ? "justify-end" : "justify-start"
                )}
              >
                {!isYou && <Image src={reza} alt="Reza" width={32} height={32} className="rounded-full self-start" />}
                {/* ✨ DESIGN: Improved message bubble styling for a modern chat look */}
                <div
                  className={cn(
                    "p-3 rounded-2xl shadow-md max-w-[85%]",
                    isYou
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-700 text-slate-200 rounded-bl-none"
                  )}
                >
                  {/* ✨ DESIGN: Improved text styling for markdown content */}
                  <div className="prose prose-sm prose-invert max-w-full prose-p:my-0 prose-headings:my-2">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
                 {isYou && (
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
                    <User size={16} />
                  </div>
                 )}
              </div>
            )
          })}
          {isTyping && (
             // ✨ DESIGN: Polished the typing indicator
            <div className="flex items-end gap-2 justify-start motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
               <Image src={reza} alt="Reza" width={32} height={32} className="rounded-full" />
              <div className="px-4 py-3 bg-slate-700 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex items-center justify-center gap-1.5 h-5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✨ DESIGN: Polished footer and input form */}
        <CardFooter className="p-3 border-t border-slate-700 bg-slate-900/50">
          <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex w-full items-center gap-2">
            <Input
              placeholder="Ask me anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={!isConnected || isTyping}
              className="flex-1 bg-slate-800 text-white border-slate-600 rounded-full focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:ring-offset-slate-900"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!prompt.trim() || !isConnected || isTyping}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white w-10 h-10 flex-shrink-0 transition-all duration-300 disabled:opacity-50 disabled:scale-100 active:scale-95"
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}