import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginFormWrapper } from "./login-form-wrapper"

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginFormWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

