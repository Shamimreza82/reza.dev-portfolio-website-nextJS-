
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate request data
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Store the user in your database
    // 4. Generate a session or JWT token
    // 5. Return the token or set it in a cookie

    // This is a placeholder response
    // Replace with your actual registration logic

    // Simulate checking if email already exists
    if (email === "user@example.com") {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 })
    }

    console.log("User registered:", { name, email, password })

    // Simulate successful registration
    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: "user-" + Math.floor(Math.random() * 1000),
          name,
          email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
