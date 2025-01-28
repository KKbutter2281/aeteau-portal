import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const prisma = new PrismaClient()

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const application = await prisma.application.findFirst({
    where: { userId: session.user.id },
    orderBy: { submittedAt: "desc" },
  })

  const financialAid = await prisma.financialAid.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard, {session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Application Status</h2>
          {application ? (
            <>
              <p>Status: {application.status}</p>
              <p>Submitted: {application.submittedAt?.toLocaleDateString()}</p>
            </>
          ) : (
            <p>You haven't submitted an application yet.</p>
          )}
          <Link href="/application">
            <Button className="mt-4">{application ? "View Application" : "Start Application"}</Button>
          </Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Financial Aid Status</h2>
          {financialAid ? (
            <>
              <p>Status: {financialAid.status}</p>
              {financialAid.awardAmount && <p>Award Amount: ${financialAid.awardAmount.toFixed(2)}</p>}
            </>
          ) : (
            <p>You haven't applied for financial aid yet.</p>
          )}
          <Link href="/financial-aid">
            <Button className="mt-4">
              {financialAid ? "View Financial Aid Application" : "Apply for Financial Aid"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

