import { NextResponse } from 'next/server'
import { getBlobData, putBlobData } from '@/lib/blob-storage'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { decision, amountAwarded, comment } = await req.json()

  if (!decision) {
    return NextResponse.json({ message: 'Decision is required' }, { status: 400 })
  }

  try {
    const applicationBlob = await getBlobData(`financial-aid/${params.id}`)
    const application = JSON.parse(await applicationBlob.text())

    application.status = decision
    application.comment = comment
    if (decision === 'approved') {
      application.amountAwarded = amountAwarded
    }

    await putBlobData(`financial-aid/${params.id}`, JSON.stringify(application), { access: 'private' })

    return NextResponse.json({ message: 'Financial aid review submitted successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error submitting financial aid review' }, { status: 500 })
  }
}

