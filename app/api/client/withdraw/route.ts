import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, description } = await request.json()

    // Simulate withdrawal processing
    if (amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 })
    }

    if (amount > 5000) {
      return NextResponse.json({ success: false, message: "Amount exceeds daily withdrawal limit" }, { status: 400 })
    }

    // Simulate insufficient funds check
    if (amount > 10000) {
      return NextResponse.json({ success: false, message: "Insufficient funds" }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      message: "Withdrawal processed successfully",
      transaction: {
        id: Date.now().toString(),
        type: "withdrawal",
        amount,
        currency,
        description,
        date: new Date().toISOString(),
        status: "completed",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Withdrawal failed" }, { status: 500 })
  }
}
