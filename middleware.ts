import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token
    const isAuthPage =
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register" ||
      req.nextUrl.pathname === "/auth/error"

    // Redirect authenticated users away from auth pages
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    // Redirect unauthenticated users to login
    if (!isAuth) {
      const from = req.nextUrl.pathname
      const searchParams = new URLSearchParams(req.nextUrl.search)
      searchParams.set("from", from)
      return NextResponse.redirect(new URL(`/login?${searchParams.toString()}`, req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Let the middleware function handle the logic
    },
  },
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/auth/error",
    "/application/:path*",
    "/financial-aid/:path*",
    "/admin/:path*",
  ],
}

