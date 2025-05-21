"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { useAuth } from "../auth-provider"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("shamimrezabd67@gmail.com")
  const [password, setPassword] = useState("123456789")
  const router = useRouter()
  const { login } = useAuth()




  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Replace with your API endpoint


      const response = await login(email, password)

      console.log({ response })

      // Handle successful login


      // Store token or user data as needed
      // localStorage.setItem("token", data.token)

      toast.success("You have successfully logged in.")

      // Redirect to dashboard or home page
      router.push("/")
    } catch (error) {
      toast.error(`Login failed`)
      console.error(error)

    } finally {
      setIsLoading(false)
    }
  }




  return (
    <div> 
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 text-slate-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="h-auto p-0 text-xs" asChild>
              <Link href="/forgot-password">Forgot password?</Link>
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            disabled={isLoading}
            className="h-11 text-slate-700"
          />
        </div>

        <Button type="submit" className="w-full h-11 mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  )
}


