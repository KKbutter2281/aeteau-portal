import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const { userId, income, expenses, additionalInfo } = await req.json()

  if (!userId || !income || !expenses) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const applicationId = uuidv4()
    const application = {
      id: applicationId,
      userId,
      income,
      expenses,
      additionalInfo,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    await put(`financial-aid/${userId}/${applicationId}`, JSON.stringify(application), { access: 'private' })

    return NextResponse.json({ message: 'Financial aid application submitted successfully' }, { status: 201 })
  } catch (err) {
    console.error('Error submitting financial aid application:', err)
    return NextResponse.json({ message: 'Error submitting financial aid application' }, { status: 500 })
  }
}

