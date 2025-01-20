"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get("error")
    setErrorMessage(getErrorMessage(error))
  }, [])

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration."
      case "AccessDenied":
        return "You do not have permission to access this resource."
      case "Verification":
        return "The verification token has expired or has already been used."
      default:
        return "An error occurred during authentication. Please try again."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{errorMessage}</p>
          <div className="flex gap-4">
            <Link href="/login" className="flex-1">
              <Button variant="default" className="w-full">
                Back to Login
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

