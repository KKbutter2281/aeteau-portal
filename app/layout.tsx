import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { NotificationProvider } from '@/components/notification/NotificationProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Notifications } from '@/components/notification/Notifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'College Application Portal',
  description: 'A comprehensive college application portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Notifications />
            </div>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

