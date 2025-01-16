import { NextResponse } from 'next/server'
import { hashPassword } from '@/lib/auth'
import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not allowed in production', { status: 403 })
  }

  try {
    const testUser = {
      id: uuidv4(),
      email: 'test@example.com',
      password: await hashPassword('password123'),
      role: 'applicant'
    }

    await put(`users/${testUser.id}`, JSON.stringify(testUser), { access: 'private' })

    return NextResponse.json({
      message: 'Test user created successfully',
      user: {
        id: testUser.id,
        email: testUser.email,
        role: testUser.role
      }
    })
  } catch (error) {
    console.error('Error creating test user:', error)
    return NextResponse.json({ error: 'Failed to create test user' }, { status: 500 })
  }
}

