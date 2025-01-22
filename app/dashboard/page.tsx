"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ApplicantDashboard } from "@/components/ApplicantDashboard"
import { StaffDashboard } from "@/components/StaffDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      setIsLoading(false)
    }
  }, [status, router])

  if (isLoading || status === "loading") {
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

