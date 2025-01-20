"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ApplicantDashboard } from "@/components/ApplicantDashboard"
import { StaffDashboard } from "@/components/StaffDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
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

