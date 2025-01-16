import { NextResponse } from 'next/server'
import { get, put } from '@vercel/blob'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { decision, comment } = await req.json()

  if (!decision) {
    return NextResponse.json({ message: 'Decision is required' }, { status: 400 })
  }

  try {
    const applicationBlob = await get(`applications/${params.id}`)
    const application = JSON.parse(await applicationBlob.text())

    application.status = decision
    application.comment = comment

    await put(`applications/${params.id}`, JSON.stringify(application), { access: 'private' })

    return NextResponse.json({ message: 'Application review submitted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting application review' }, { status: 500 })
  }
}

