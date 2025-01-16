import { NextResponse } from 'next/server'
import { list, get } from '@vercel/blob'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'applications/' })
    const applications = await Promise.all(
      blobs.map(async (blob) => JSON.parse(await get(blob.url)))
    )
    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching applications' }, { status: 500 })
  }
}

