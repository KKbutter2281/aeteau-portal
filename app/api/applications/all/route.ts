import { NextResponse } from 'next/server'
import { getBlobData } from '@/lib/blob-storage'

export async function GET() {
  try {
    const applications = await getBlobData('applications/')
    return NextResponse.json(applications)
  } catch (err) {
    console.error('Error fetching applications:', err)
    return NextResponse.json({ message: 'Error fetching applications' }, { status: 500 })
  }
}

