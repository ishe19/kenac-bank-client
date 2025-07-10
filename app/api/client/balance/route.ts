import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate fetching user balances
    const balances = [
      { currency: "USD", amount: 12500.75 },
      { currency: "ZWG", amount: 8750.25 },
    ]

    return NextResponse.json({
      success: true,
      balances,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch balances" }, { status: 500 })
  }
}
