'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function ErrorContent() {
  const searchParams = new URLSearchParams(window.location.search)
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'You do not have permission to access this resource.'
      case 'Verification':
        return 'The verification token has expired or has already been used.'
      default:
        return 'An error occurred during authentication. Please try again.'
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-red-600">Authentication Error</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{getErrorMessage(error)}</p>
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
  )
}

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardContent className="p-4">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  )
}

