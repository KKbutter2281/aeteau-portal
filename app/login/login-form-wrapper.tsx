"use client"

import { useSearchParams } from "next/navigation"
import { LoginForm } from "./login-form"

export function LoginFormWrapper() {
  const searchParams = useSearchParams()
  const from = searchParams?.get("from") || "/dashboard"

  return <LoginForm from={from} />
}

