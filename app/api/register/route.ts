import { NextResponse } from 'next/server';
import { createUser } from '@/lib/user';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Missing required fields: email, password, and role are required.' },
        { status: 400 }
      );
    }

    // Create the user
    const user = await createUser(email, password, role);

    return NextResponse.json(
      {
        message: 'User created successfully',
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Registration error:', err);

    // Return detailed error message
    return NextResponse.json(
      {
        message: err.message || 'Error creating user',
      },
      { status: 500 }
    );
  }
}
