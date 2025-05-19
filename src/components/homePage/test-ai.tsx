"use client"
import { useState, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Send, User,Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import reza from "../../asset/photo/reza.jpg";

export default function AIChat() {
  const [sessionId] = useState("456");
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<{ from: "you" | "ai"; text: string; time: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<Socket>();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  // Connect socket
 useEffect(() => {
  const socket = io(process.env.NEXT_PUBLIC_API_URL!, { transports: ["websocket"] });
  socketRef.current = socket;

  socket.on("connect", () => setIsConnected(true));
  socket.on("disconnect", () => setIsConnected(false));
  socket.on("ai_response", ({ text }) => {
    setIsTyping(false);
    pushMessage("ai", text);
  });
  socket.on("ai_error", (errMsg) => {
    setIsTyping(false);
    pushMessage("ai", `Error: ${errMsg}`);
  });

  socket.emit("join_session", sessionId);

  // cleanup must return void, so wrap the disconnect in a block
  return () => {
    socket.disconnect();
  };
}, [sessionId]);




  
  const pushMessage = (from: "you" | "ai", text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChat((prev) => [...prev, { from, text, time }]);
  };

  const send = async () => {
    if (!prompt.trim()) return;
    pushMessage("you", prompt);
    setPrompt("");
    setIsTyping(true);

    if (socketRef.current?.connected) {
      socketRef.current.emit("ask_ai", { sessionId, prompt });
    } else {
      try {
        const res = await fetch("/api/ask_ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId, prompt }) });
        const { message } = await res.json();
        setIsTyping(false);
        pushMessage("ai", message);
      } catch {
        setIsTyping(false);
        pushMessage("ai", "Sorry, something went wrong.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-br from-slate-100 rounded-2xl to-white">
      <Card className="w-full max-w-md h-[600px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-emerald-500 text-white flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src={reza} alt="Avatar" width={40} height={40} className="rounded-full" />
            <CardTitle className="text-lg font-semibold">Ask me about your Project</CardTitle>
          </div>
          <Badge variant={isConnected ? "outline" : "destructive"} className="text-sm">
            {isConnected ? "Online" : "Offline"}
          </Badge>
        </CardHeader>

        <ScrollArea ref={scrollRef} className="flex-1 bg-slate-50 p-4 space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {chat.length === 0 && !isTyping && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 mt-10"
              >
                <Zap className="mx-auto mb-2" size={48} />
                <p className="text-lg">Start a conversation</p>
                <p className="text-sm">Ask me anything!</p>
              </motion.div>
            )}

            {chat.map(({ from, text, time }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex items-end gap-2 mt-6",
                  from === "you" ? "justify-end" : "justify-start"
                )}
              >
                {from === "ai" && (
                  <Image src={reza} alt="Bot" width={32} height={32} className="rounded-full" />
                )}
                <div className={cn(
                  "relative max-w-[75%] px-4 py-2",
                  from === "you"
                    ? "bg-emerald-500 text-white rounded-bl-2xl rounded-tr-2xl"
                    : "bg-white border border-slate-200 rounded-br-2xl rounded-tl-2xl"
                )}>
                  <div className="whitespace-pre-wrap">{text}</div>
                  <span className="absolute -bottom-5 right-2 text-xs text-gray-400 ">{time}</span>
                </div>
                {from === "you" && <User className="text-emerald-500" />}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                  <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-300" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>

        <CardFooter className="p-4 bg-white">
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex gap-2"
          >
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
              className="flex-1 resize-none h-10"
            />
            <Button type="submit" disabled={!prompt.trim() || !isConnected} className="px-4">
              <Send />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
