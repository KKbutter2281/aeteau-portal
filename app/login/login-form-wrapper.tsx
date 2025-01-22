"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginForm } from "./login-form"

export function LoginFormWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams?.get("from") || "/dashboard"

  useEffect(() => {
    if (status === "authenticated") {
      router.push(from)
    }
  }, [status, router, from])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return null
  }

  return <LoginForm from={from} />
}

