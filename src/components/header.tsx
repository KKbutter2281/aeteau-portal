"use client"

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          UniApp
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="mr-2">Dashboard</Button>
              </Link>
              <Button onClick={() => signOut()} variant="secondary">Sign Out</Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

