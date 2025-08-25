
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log({body})

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
