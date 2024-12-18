import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getApplications(userId: string) {
  const client = await clientPromise
  const db = client.db("university_applications")
  return db.collection("applications").find({ userId }).toArray()
}

export default async function Applications() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const applications = await getApplications(session.user.id)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app: any) => (
          <Card key={app._id}>
            <CardHeader>
              <CardTitle>{app.school}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Program:</strong> {app.program}</p>
              <p><strong>Status:</strong> <Badge>{app.status}</Badge></p>
              <p><strong>Submitted:</strong> {new Date(app.submittedAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

