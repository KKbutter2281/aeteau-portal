import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const financialAidData = await req.json()
    const userId = session.user.id

    const application = await prisma.application.findFirst({
      where: { userId },
      orderBy: { submittedAt: "desc" },
    })

    if (!application) {
      return NextResponse.json({ message: "No application found for this user" }, { status: 400 })
    }

    const financialAid = await prisma.financialAid.create({
      data: {
        userId,
        applicationId: application.id,
        documents: financialAidData,
        status: "PENDING",
      },
    })

    return NextResponse.json(
      { message: "Financial aid application submitted successfully", financialAidId: financialAid.id },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while submitting the financial aid application" },
      { status: 500 },
    )
  }
}

