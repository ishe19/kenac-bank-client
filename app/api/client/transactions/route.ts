import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate fetching user transactions
    const transactions = [
      {
        id: "1",
        type: "deposit",
        amount: 1000.0,
        currency: "USD",
        date: "2024-01-15T10:30:00Z",
        description: "Salary deposit",
        status: "completed",
      },
      {
        id: "2",
        type: "withdrawal",
        amount: 250.0,
        currency: "USD",
        date: "2024-01-14T15:45:00Z",
        description: "ATM withdrawal",
        status: "completed",
      },
      {
        id: "3",
        type: "deposit",
        amount: 500.0,
        currency: "ZWG",
        date: "2024-01-13T09:15:00Z",
        description: "Transfer from savings",
        status: "completed",
      },
      {
        id: "4",
        type: "withdrawal",
        amount: 75.5,
        currency: "USD",
        date: "2024-01-12T14:20:00Z",
        description: "Online purchase",
        status: "pending",
      },
      {
        id: "5",
        type: "deposit",
        amount: 2000.0,
        currency: "USD",
        date: "2024-01-10T11:00:00Z",
        description: "Investment return",
        status: "completed",
      },
    ]

    return NextResponse.json({
      success: true,
      transactions,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch transactions" }, { status: 500 })
  }
}
