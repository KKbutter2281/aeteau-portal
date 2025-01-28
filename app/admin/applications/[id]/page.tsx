import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"

const prisma = new PrismaClient()

export default async function AdminApplicationReview({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  const application = await prisma.application.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!application) {
    return <div>Application not found</div>
  }

  const updateApplicationStatus = async (status: string) => {
    "use server"
    await prisma.application.update({
      where: { id: params.id },
      data: { status },
    })
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Application Review</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Applicant: {application.user.name}</h2>
        <p className="mb-4">Status: {application.status}</p>
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(application.personalInfo, null, 2)}</pre>
        <h3 className="text-lg font-semibold mb-2">Academic History</h3>
        <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(application.academicHistory, null, 2)}</pre>
        <h3 className="text-lg font-semibold mb-2">Test Scores</h3>
        <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(application.testScores, null, 2)}</pre>
        <h3 className="text-lg font-semibold mb-2">Essays</h3>
        <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(application.essays, null, 2)}</pre>
        <div className="flex space-x-4 mt-6">
          <form action={updateApplicationStatus.bind(null, "ACCEPTED")}>
            <Button type="submit">Accept</Button>
          </form>
          <form action={updateApplicationStatus.bind(null, "REJECTED")}>
            <Button type="submit" variant="destructive">
              Reject
            </Button>
          </form>
          <form action={updateApplicationStatus.bind(null, "WAITLISTED")}>
            <Button type="submit" variant="outline">
              Waitlist
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

