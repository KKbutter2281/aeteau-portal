import { NextResponse } from 'next/server'
import { createUser } from '@/lib/user'

export async function POST(req: Request) {
  const { email, password, role } = await req.json()

  try {
    const user = await createUser(email, password, role)
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
  }
}

