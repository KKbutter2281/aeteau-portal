import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("university_applications")

  const { school, program, personalStatement, userId } = await request.json()

  const application = {
    school,
    program,
    personalStatement,
    userId,
    status: 'Submitted',
    submittedAt: new Date(),
  }

  const result = await db.collection("applications").insertOne(application)

  return NextResponse.json({ id: result.insertedId }, { status: 201 })
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db("university_applications")

  const applications = await db.collection("applications")
    .find({ userId: session.user.id })
    .toArray()

  return NextResponse.json(applications)
}

