import { NextRequest, NextResponse } from 'next/server'
import { UserResponse } from './lib/types'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get token and user from cookies
  const token = request.cookies.get('token')?.value
  const userCookie = request.cookies.get('user')?.value

  // Safely parse user from cookie
  let user: UserResponse | undefined
  try {
    user = userCookie ? JSON.parse(userCookie) : undefined
  } catch (error) {
    user = undefined
  }

  // If user is logged in and trying to access login/register, redirect based on role
  if (token && user && (pathname === '/login' || pathname === '/register')) {
    // If ADMIN role, redirect to /admin
    if (user.role === 'ADMIN') {
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    }
    // If USER role, redirect to landing page
    else if (user.role === 'USER') {
      const homeUrl = new URL('/', request.url)
      return NextResponse.redirect(homeUrl)
    }
  }

  // Check if path starts with /admin
  if (pathname.startsWith('/admin')) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // If user role is not ADMIN, redirect to login
    if (user?.role !== 'ADMIN') {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Configure which routes to apply middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)'
  ]
}
