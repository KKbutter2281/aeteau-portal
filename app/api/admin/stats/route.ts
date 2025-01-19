import { NextResponse } from 'next/server'
import { list } from '@vercel/blob'
import { getBlobData } from '@/lib/blob-storage'

export async function GET() {
  try {
    const applications = await getBlobData('applications/')
    const stats = {
      totalApplications: applications.length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      rejectedApplications: applications.filter(app => app.status === 'rejected').length,
    }
    return NextResponse.json(stats)
  } catch (err) {
    console.error('Error fetching admin stats:', err)
    return NextResponse.json({ message: 'Error fetching admin stats' }, { status: 500 })
  }
}

