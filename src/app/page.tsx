import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the University Application Platform</h1>
      {session ? (
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      ) : (
        <Link href="/auth/signin">
          <Button>Sign In</Button>
        </Link>
      )}
    </main>
  )
}

