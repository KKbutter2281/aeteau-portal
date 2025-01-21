"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ApplicantDashboard } from "@/components/ApplicantDashboard"
import { StaffDashboard } from "@/components/StaffDashboard"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/login-check")
        const data = await response.json()

        if (data.isLoggedIn) {
          setUser(data.user)
        } else {
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkLoginStatus()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  switch (user.role) {
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

