import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Get the pathname
    const pathname = req.nextUrl.pathname

    // Check if it's an auth page
    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/auth/")

    // Check if user is authenticated
    const isAuthenticated = !!req.nextauth.token

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Allow access to auth pages
    if (isAuthPage) {
      return NextResponse.next()
    }

    // Protect all other routes
    if (!isAuthenticated) {
      const from = pathname
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle the logic
    },
  },
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/application/:path*",
    "/financial-aid/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/auth/:path*",
  ],
}

