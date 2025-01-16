import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login',
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/application/:path*',
    '/financial-aid/:path*',
    '/admin/:path*',
    '/test/:path*',
    // Add other protected routes here
  ]
}
