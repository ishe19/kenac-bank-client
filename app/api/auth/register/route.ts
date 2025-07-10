import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Simulate registration logic
    // In a real app, you'd save to a database
    if (email === "existing@kenacbank.com") {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: Date.now().toString(),
        name,
        email,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}
