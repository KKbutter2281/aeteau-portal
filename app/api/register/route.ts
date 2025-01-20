import { NextResponse } from 'next/server'
import { createUser } from '@/lib/user'

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json()
    const user = await createUser(email, password, role)
    return NextResponse.json({ 
      message: 'User created successfully',
      userId: user.id 
    }, { status: 201 })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ 
      message: 'Error creating user' 
    }, { status: 500 })
  }
}

