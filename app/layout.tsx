import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './_components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import { cookies } from 'next/headers'
import { UserResponse } from '@/lib/types'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Starting Template',
  description: 'Starting Template'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const userCookie = cookieStore.get('user')?.value

  let user: UserResponse | null = null
  try {
    user = userCookie ? JSON.parse(userCookie) : null
  } catch (error) {
    user = null
  }

  console.log(user)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Navbar isAdmin={user?.role === 'ADMIN'} isLogin={!!token?.value} />
            {children}
            <Footer />
          </TooltipProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
