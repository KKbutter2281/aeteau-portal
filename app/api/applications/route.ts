import { NextResponse } from "next/server"
import { put, list } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"
import { getBlobData, putBlobData } from "@/lib/blob-storage"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 })
  }

  try {
    const { blobs } = await list({ prefix: `applications/${userId}/` })
    const applications = await Promise.all(blobs.map(async (blob) => JSON.parse(await getBlobData(blob.url))))
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const userId = formData.get("userId") as string
  const program = formData.get("program") as string
  const personalStatement = formData.get("personalStatement") as string
  const transcript = formData.get("transcript") as File | null

  if (!userId || !program || !personalStatement) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
  }

  try {
    const applicationId = uuidv4()
    const application = {
      id: applicationId,
      userId,
      program,
      personalStatement,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }

    await putBlobData(`applications/${userId}/${applicationId}`, JSON.stringify(application), { access: "public" })

    if (transcript) {
      await putBlobData(`applications/${userId}/${applicationId}/transcript`, transcript, { access: "public" })
    }

    return NextResponse.json({ message: "Application submitted successfully", applicationId }, { status: 201 })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ message: "Error submitting application" }, { status: 500 })
  }
}

