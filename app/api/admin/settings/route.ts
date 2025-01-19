import { NextResponse } from 'next/server'
import { getBlobData, putBlobData } from '@/lib/blob-storage'

export async function GET() {
  try {
    const settings = await getBlobData('admin/settings')
    return NextResponse.json(settings[0] || {})
  } catch (err) {
    console.error('Error fetching admin settings:', err)
    return NextResponse.json({ message: 'Error fetching admin settings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { applicationDeadline, questionTemplate } = await req.json()

  if (!applicationDeadline || !questionTemplate) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const settings = { applicationDeadline, questionTemplate }
    await putBlobData('admin/settings', settings)
    return NextResponse.json({ message: 'Settings updated successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error updating admin settings:', err)
    return NextResponse.json({ message: 'Error updating admin settings' }, { status: 500 })
  }
}

