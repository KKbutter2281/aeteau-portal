import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: 'You must be signed in to access this endpoint.' }),
      { status: 401 }
    )
  }

  return NextResponse.json({
    content: 'This is protected content.',
    session: session
  })
}

