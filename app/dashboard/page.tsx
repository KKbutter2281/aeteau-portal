"use client"

import { useSession } from "next-auth/react"
import { ApplicantDashboard } from "@/components/ApplicantDashboard"
import { StaffDashboard } from "@/components/StaffDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user) {
    return null
  }

  switch (session.user.role) {
    case "applicant":
      return <ApplicantDashboard />
    case "staff":
      return <StaffDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return <div>Invalid user role.</div>
  }
}

