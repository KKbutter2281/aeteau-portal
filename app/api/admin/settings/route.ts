import { NextResponse } from 'next/server'
import { get, put } from '@vercel/blob'

export async function GET() {
  try {
    const settingsBlob = await get('admin/settings')
    const settings = JSON.parse(await settingsBlob.text())
    return NextResponse.json(settings)
  } catch (error) {
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
    await put('admin/settings', JSON.stringify(settings), { access: 'private' })
    return NextResponse.json({ message: 'Settings updated successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error updating admin settings' }, { status: 500 })
  }
}

