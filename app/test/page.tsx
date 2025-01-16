'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { signOut } from 'next-auth/react'

export default function TestPage() {
  const { data: session, status } = useSession()
  const [testResult, setTestResult] = useState<string>('')

  // Test protected API endpoint
  const testProtectedApi = async () => {
    try {
      const response = await fetch('/api/test/protected')
      const data = await response.json()
      setTestResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setTestResult('Error accessing protected API')
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Session Status</h2>
            <Alert>
              <AlertTitle>Current Status</AlertTitle>
              <AlertDescription>
                {status === 'authenticated' ? '✅ Authenticated' : '❌ Not authenticated'}
              </AlertDescription>
            </Alert>
          </div>

          {session && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Session Data</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Actions</h2>
            <div className="flex gap-2">
              <Button onClick={testProtectedApi}>
                Test Protected API
              </Button>
              {session && (
                <Button variant="destructive" onClick={() => signOut()}>
                  Sign Out
                </Button>
              )}
            </div>
          </div>

          {testResult && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">API Test Result</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {testResult}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

