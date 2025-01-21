import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth-options"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (session) {
    return NextResponse.json({
      isLoggedIn: true,
      user: {
        email: session.user.email,
        role: session.user.role,
      },
    })
  } else {
    return NextResponse.json({ isLoggedIn: false })
  }
}

