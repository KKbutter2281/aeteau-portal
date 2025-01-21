import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { putBlobData, getBlobData } from "@/lib/blob-storage"

export async function POST(req: Request) {
  const data = await req.json()
  const { userId, ...applicationData } = data

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 })
  }

  try {
    const applicationId = uuidv4()
    const application = {
      id: applicationId,
      userId,
      ...applicationData,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }

    await putBlobData(`applications/${userId}/${applicationId}`, JSON.stringify(application))

    return NextResponse.json({ message: "Application submitted successfully", applicationId }, { status: 201 })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ message: "Error submitting application" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 })
  }

  try {
    const applications = await getBlobData(`applications/${userId}/`)
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 })
  }
}

