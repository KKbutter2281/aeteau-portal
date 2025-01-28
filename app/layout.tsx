import "./globals.css"
import { Inter } from "next/font/google"
import { Notifications } from "@/components/Notifications"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "College Application Portal",
  description: "A comprehensive college application portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Notifications />
        </SessionProvider>
      </body>
    </html>
  )
}

