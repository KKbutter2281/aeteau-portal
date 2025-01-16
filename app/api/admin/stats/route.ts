import { NextResponse } from 'next/server'
import { list, get } from '@vercel/blob'

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'applications/' })
    const applications = await Promise.all(
      blobs.map(async (blob) => JSON.parse(await get(blob.url)))
    )

    const stats = {
      totalApplications: applications.length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      rejectedApplications: applications.filter(app => app.status === 'rejected').length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching admin stats' }, { status: 500 })
  }
}

