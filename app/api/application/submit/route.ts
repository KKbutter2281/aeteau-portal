import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import { sendEmail } from "@/utils/sendEmail"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const applicationData = await req.json()
    const userId = session.user.id

    const application = await prisma.application.create({
      data: {
        userId,
        personalInfo: {
          firstName: applicationData.firstName,
          lastName: applicationData.lastName,
          dateOfBirth: applicationData.dateOfBirth,
          address: applicationData.address,
        },
        academicHistory: {
          highSchool: applicationData.highSchool,
          gpa: applicationData.gpa,
        },
        testScores: {
          satScore: applicationData.satScore,
          actScore: applicationData.actScore,
        },
        essays: {
          personalEssay: applicationData.essay,
        },
        status: "SUBMITTED",
        submittedAt: new Date(),
      },
    })

    // Send confirmation email
    await sendEmail(
      session.user.email!,
      "Application Submitted Successfully",
      `
        <h1>Your application has been submitted successfully</h1>
        <p>Thank you for applying to our college. We will review your application and get back to you soon.</p>
      `,
    )

    return NextResponse.json(
      { message: "Application submitted successfully", applicationId: application.id },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while submitting the application" }, { status: 500 })
  }
}

