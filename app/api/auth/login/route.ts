import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simulate authentication logic
    // In a real app, you'd validate against a database
    if (email === "demo@kenacbank.com" && password === "password123") {
      return NextResponse.json({
        success: true,
        token: "mock-jwt-token",
        user: {
          id: "1",
          name: "Demo User",
          email: "demo@kenacbank.com",
        },
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 500 })
  }
}
