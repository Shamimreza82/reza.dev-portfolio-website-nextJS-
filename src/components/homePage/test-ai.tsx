"use client"
import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Loader2, Send, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import reza from "../../asset/photo/reza.jpg"
import Image from "next/image"

export default function AIChat() {
  const [sessionId] = useState("456")
  const [prompt, setPrompt] = useState("")
  const [chat, setChat] = useState<{ from: "you" | "ai"; text: string }[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const socketRef = useRef<Socket>()
  const scrollAreaRef = useRef<HTMLDivElement>(null)


  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [chat, isTyping])



  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ["websocket"],
    })
    socketRef.current = socket

    socket.on("connect", () => {
      console.log("⚡️ Connected", socket.id)
      setIsConnected(true)
      socket.emit("join_session", sessionId)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("ai_response", ({ text }) => {
      setIsTyping(false)
      setChat((c) => [...c, { from: "ai", text }])
    })

    socket.on("ai_error", (errMsg) => {
      console.error("AI error:", errMsg)
      setIsTyping(false)
      setChat((c) => [...c, { from: "ai", text: `Error: ${errMsg}` }])
    })

    return () => {
      socket.disconnect()
    }
  }, [sessionId])

  const send = async () => {
    if (!prompt.trim()) return

    setChat((c) => [...c, { from: "you", text: prompt }])
    setIsTyping(true)

    // WebSocket
    if (socketRef.current?.connected) {
      socketRef.current.emit("ask_ai", { sessionId, prompt })
    } else {
      // REST fallback
      try {
        const response = await fetch("ask_ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, prompt }),
        })

        const data = await response.json()

        console.log(data.messages)

        if (data.message) {
          setIsTyping(false)
          setChat((c) => [...c, { from: "ai", text: data.message }])
        }
      } catch (e) {
        console.error(e)
        setIsTyping(false)
        setChat((c) => [...c, { from: "ai", text: "Sorry, there was an error processing your request." }])
      }
    }

    setPrompt("")
  }

  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <Card className="flex flex-col shadow-lg border-t-4 border-t-emerald-500 lg:w-96 lg:h-96 h-[450px]">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
               <Image src={reza}
                        alt="image"
                        width={40}
                        height={40}
                        className="rounded-full"></Image>
              
              Hi, i am Reza 
            </CardTitle>
            <Badge
              variant={isConnected ? "default" : "destructive"}
              className={cn("flex items-center gap-1.5", isConnected ? "bg-emerald-700" : "bg-red-600")}
            >
              <div
                className={cn("w-2 h-2 rounded-full animate-pulse", isConnected ? "bg-emerald-300" : "bg-red-300")}
              />
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>

        <ScrollArea ref={scrollAreaRef}  className="flex-1 p-4 bg-slate-50 h-32">
          <div className="space-y-4">
            {chat.length === 0 ? (
              <div className="text-center py-12">
                <Zap size={40} className="mx-auto mb-3 text-emerald-500 opacity-50" />
                <h3 className="text-lg font-medium text-slate-700">Start a conversation</h3>
                <p className="text-sm text-slate-500 mt-1">Ask me anything and I ll respond in real-time</p>
              </div>
            ) : (
              chat.map((message, index) => (
                <div key={index} className={cn("flex", message.from === "you" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "flex items-start gap-2 max-w-[80%]",
                      message.from === "you" ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        message.from === "you" ? "bg-emerald-500" : "bg-slate-700",
                      )}
                    >
                      {message.from === "you" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        // <Bot size={16} className="text-white" />
                        <Image src={reza}
                        alt="image"
                        width={150}
                        height={150}
                        className="rounded-full"
                        />
                      )}
                    </div>
                    <div
                      className={cn(
                        "px-4 py-3 rounded-lg",
                        message.from === "you"
                          ? "bg-emerald-500 text-white rounded-tr-none"
                          : "bg-white border border-slate-200 shadow-sm rounded-tl-none",
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.text}</div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                    <Image src={reza}
                        alt="image"
                        width={150}
                        height={150}
                        className="rounded-full"
                        />
                  </div>
                  <div className="px-4 py-3 bg-white border border-slate-200 rounded-lg rounded-tl-none shadow-sm">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <CardFooter className="p-4 border-t bg-white">
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={!isConnected}
            />
            <Button
              type="submit"
              disabled={!prompt.trim() || !isConnected}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
