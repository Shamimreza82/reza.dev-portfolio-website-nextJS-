"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/types/auth"


interface AuthContextType {
  user: Omit<User, "password"> | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Parse the cookie string to find your token (e.g. "authToken")
        const match = document.cookie
          .split('; ')
          .find((row) => row.startsWith('authToken='))
        const token = match ? match.split('=')[1] : null

        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            // 2. Send it in Authorization header
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
          // 3. If you need cookies (e.g. HTTP-only session cookies) sent as well:
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          console.warn('Auth check failed:', response.status)
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])



  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)

    try {
      const response = await fetch("https://my-multi-server-production.up.railway.app/api/vi/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const data = await response.json()
      setUser(data.user)
      router.push("/dashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API as string}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
      }

      const data = await response.json()
      setUser(data.user)
      router.push("/dashboard")
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      setUser(null)
      router.push("/auth")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}




export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
