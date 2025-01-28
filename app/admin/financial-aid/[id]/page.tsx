import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const prisma = new PrismaClient()

export default async function AdminFinancialAidReview({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  const financialAid = await prisma.financialAid.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!financialAid) {
    return <div>Financial aid application not found</div>
  }

  const updateFinancialAidStatus = async (formData: FormData) => {
    "use server"
    const status = formData.get("status") as string
    const awardAmount = Number.parseFloat(formData.get("awardAmount") as string)
    await prisma.financialAid.update({
      where: { id: params.id },
      data: { status, awardAmount },
    })
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Financial Aid Application Review</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Applicant: {financialAid.user.name}</h2>
        <p className="mb-4">Status: {financialAid.status}</p>
        <h3 className="text-lg font-semibold mb-2">Financial Information</h3>
        <pre className="bg-gray-100 p-4 rounded mb-4">{JSON.stringify(financialAid.documents, null, 2)}</pre>
        <form action={updateFinancialAidStatus}>
          <div className="mb-4">
            <Label htmlFor="status">Update Status</Label>
            <select name="status" className="w-full p-2 border rounded">
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div className="mb-4">
            <Label htmlFor="awardAmount">Award Amount</Label>
            <Input type="number" name="awardAmount" defaultValue={financialAid.awardAmount || 0} />
          </div>
          <Button type="submit">Update Financial Aid Application</Button>
        </form>
      </div>
    </div>
  )
}

