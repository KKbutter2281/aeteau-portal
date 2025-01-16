import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { NotificationProvider } from '@/components/NotificationProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Notifications from '@/components/Notifications'

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
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
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

