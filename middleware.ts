import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname

    // Allow access to login-check route
    if (pathname === "/login-check") {
      return NextResponse.next()
    }

    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/auth/")

    const isAuthenticated = !!req.nextauth.token

    if (isAuthPage && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    if (isAuthPage) {
      return NextResponse.next()
    }

    if (!isAuthenticated) {
      const from = pathname
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
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
    "/login-check",
  ],
}

