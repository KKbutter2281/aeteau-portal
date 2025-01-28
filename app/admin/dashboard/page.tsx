import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  const applicationStats = await prisma.application.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  })

  const totalApplications = applicationStats.reduce((sum, stat) => sum + stat._count._all, 0)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Applications</h2>
          <p className="text-3xl font-bold">{totalApplications}</p>
        </div>
        {applicationStats.map((stat) => (
          <div key={stat.status} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{stat.status}</h2>
            <p className="text-3xl font-bold">{stat._count._all}</p>
          </div>
        ))}
      </div>
      {/* Add more admin features here */}
    </div>
  )
}

