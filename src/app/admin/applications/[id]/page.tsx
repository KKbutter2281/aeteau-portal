import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UpdateApplicationStatus from "@/components/update-application-status"

async function getApplication(id: string) {
  const client = await clientPromise
  const db = client.db("university_applications")
  return db.collection("applications").findOne({ _id: new ObjectId(id) })
}

export default async function ReviewApplication({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const application = await getApplication(params.id)

  if (!application) {
    return <div>Application not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Review Application</h1>
      <Card>
        <CardHeader>
          <CardTitle>{application.school}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Program:</strong> {application.program}</p>
          <p><strong>Status:</strong> <Badge>{application.status}</Badge></p>
          <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
          <p><strong>Personal Statement:</strong></p>
          <p className="mt-2">{application.personalStatement}</p>
          <UpdateApplicationStatus applicationId={application._id} currentStatus={application.status} />
        </CardContent>
      </Card>
    </div>
  )
}

