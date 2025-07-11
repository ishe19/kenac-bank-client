import { type NextRequest, NextResponse } from "next/server"

// Mock user profile data
let userProfile = {
  name: "Demo User",
  email: "demo@kenacbank.com",
  phone: "+263 77 123 4567",
  address: "123 Enterprise St, Harare, Zimbabwe",
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      profile: userProfile,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProfile = await request.json()

    // Simulate profile update
    userProfile = { ...userProfile, ...updatedProfile }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      profile: userProfile,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 })
  }
}
