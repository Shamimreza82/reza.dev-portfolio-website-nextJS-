/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, Send, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import reza from "../../asset/photo/reza.jpg"

type Message = {
  from: "you" | "ai"
  text: string
  timestamp: string
}

export default function AIChat() {
  const [sessionId, setSessionId] = useState("125")
  const idRef = useRef<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [chat, setChat] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const socketRef = useRef<Socket>()
  const lastMsgRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (typeof window !== "undefined") {
      let persisted = localStorage.getItem("guestId")
      if (!persisted) {
        persisted = crypto.randomUUID()
        localStorage.setItem("guestId", persisted)
      }
      idRef.current = persisted
      setSessionId(persisted)
    }
  }, [])

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [chat, isTyping])

  useEffect(() => {
    if (!sessionId) return

    const socket = io(process.env.NEXT_PUBLIC_API_URL!, { transports: ["websocket"] })
    socketRef.current = socket

    socket.on("connect", () => {
      setIsConnected(true)
      socket.emit("join_session", sessionId)
    })

    socket.on("disconnect", () => setIsConnected(false))

    socket.on("ai_response", ({ text }) => {
      setIsTyping(false)
      addMessage("ai", text)
    })

    socket.on("ai_error", (errMsg) => {
      setIsTyping(false)
      addMessage("ai", `Error: ${errMsg}`)
    })

    return () => {
      socket.disconnect()
    }
  }, [sessionId])

  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const addMessage = (from: "you" | "ai", text: string) => {
    setChat((prev) => [...prev, { from, text, timestamp: getTimestamp() }])
  }

  const send = async () => {
    if (!prompt.trim()) return

    addMessage("you", prompt)
    setIsTyping(true)

    if (socketRef.current?.connected) {
      socketRef.current.emit("ask_ai", { sessionId, prompt })
    } else {
      try {
        const res = await fetch("/ask_ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, prompt }),
        })
        const data = await res.json()
        const text = data.message || "Sorry, there was an error processing your request."
        setIsTyping(false)
        addMessage("ai", text)
      } catch {
        setIsTyping(false)
        addMessage("ai", "Sorry, there was an error processing your request.")
      }
    }
    setPrompt("")
  }

  return (
    <div className="mx-auto">
      <Card className="flex flex-col w-full max-w-md max-h-[620px]  shadow-lg">
        <CardHeader className="bg-slate-800 py-2">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Image src={reza} alt="Reza" width={40} height={40} className="rounded-full" />
              Reza AI Agent
            </CardTitle>
            <Badge
              variant={isConnected ? "default" : "destructive"}
              className={cn(
                "flex items-center gap-1.5",
                isConnected ? "bg-green-600 text-white" : "bg-red-600 text-white"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full animate-pulse", isConnected ? "bg-green-400" : "bg-red-400")} />
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>

        <div className="flex-1 p-3 overflow-y-auto bg-gray-850" style={{ WebkitOverflowScrolling: "touch" }}>
          {chat.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Zap size={40} className="mx-auto mb-3 text-emerald-500 opacity-70" />
              <h3 className="text-lg font-medium">Start a conversation</h3>
              <p className="text-sm text-slate-500 mt-1">Ask me anything about your project or goals</p>
            </div>
          ) : (
            chat.map((message, index) => {
              const isLast = index === chat.length - 1
              const isYou = message.from === "you"
              return (
                <div
                  key={index}
                  ref={isLast ? lastMsgRef : undefined}
                  className={cn("mb-4 flex", isYou ? "justify-end" : "justify-start")}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {!isYou && (
                      <Image src={reza} alt="Reza" width={32} height={32} className="rounded-full" />
                    )}
                    <div
                      className={cn(
                        "p-3 rounded-2xl shadow-md max-w-full",
                        isYou
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-gray-700 text-white border border-slate-600 rounded-tl-none"
                      )}
                    >
                      <div className="prose-sm  max-w-full  text-gray-200">
                        <ReactMarkdown  >{message.text}</ReactMarkdown>
                      </div>
                    </div>
                    {isYou && (
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
          {isTyping && (
            <div className="flex justify-start mt-2">
              <div className="flex items-start gap-2 max-w-[80%]">
                <Image src={reza} alt="Reza" width={32} height={32} className="rounded-full" />
                <div className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg rounded-tl-none shadow-sm">
                  <div className="flex items-center gap-1">
                    {[0, 150, 300].map((delay, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <CardFooter className="p-3 border-t border-slate-700 bg-slate-800">
          <form onSubmit={(e) => { e.preventDefault(); send() }} className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={!isConnected || isTyping}
              className="flex-1 rounded-full border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus-visible:ring-emerald-500"
            />
            <Button type="submit" size="icon" disabled={!prompt.trim() || !isConnected || isTyping} className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md">
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-6 w-6" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}