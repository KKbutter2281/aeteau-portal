import { NextResponse } from 'next/server'
import { getBlobData, putBlobData } from '@/lib/blob-storage'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { decision, comment } = await req.json()

  if (!decision) {
    return NextResponse.json({ message: 'Decision is required' }, { status: 400 })
  }

  try {
    const applications = await getBlobData(`applications/${params.id}`)
    if (applications.length === 0) {
      return NextResponse.json({ message: 'Application not found' }, { status: 404 })
    }
    const application = applications[0]
    application.status = decision
    application.comment = comment

    await putBlobData(`applications/${params.id}`, application)

    return NextResponse.json({ message: 'Application review submitted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error submitting application review:', err)
    return NextResponse.json({ message: 'Error submitting application review' }, { status: 500 })
  }
}

