import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("university_applications")

  const { status } = await request.json()

  const result = await db.collection("applications").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { status } }
  )

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}

