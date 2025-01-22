"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginCheckPage() {
  const { data: session, status } = useSession()
  const [serverCheck, setServerCheck] = useState<{
    isLoggedIn: boolean
    user?: { email: string; role: string }
  } | null>(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const res = await fetch("/api/login-check")
      const data = await res.json()
      setServerCheck(data)
    }

    checkLoginStatus()
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login Check</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Client-side Check:</h2>
          <p>Status: {status}</p>
          {session && (
            <>
              <p>Email: {session.user.email}</p>
              <p>Role: {session.user.role}</p>
            </>
          )}

          <h2 className="text-lg font-semibold mt-4 mb-2">Server-side Check:</h2>
          {serverCheck ? (
            <>
              <p>Is Logged In: {serverCheck.isLoggedIn ? "Yes" : "No"}</p>
              {serverCheck.user && (
                <>
                  <p>Email: {serverCheck.user.email}</p>
                  <p>Role: {serverCheck.user.role}</p>
                </>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

