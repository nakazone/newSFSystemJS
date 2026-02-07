import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (!path.startsWith('/system')) return NextResponse.next()
  if (path === '/system/login') return NextResponse.next()
  const session = request.cookies.get('sf_system_session')?.value
  if (!session) {
    const login = new URL('/system/login', request.url)
    login.searchParams.set('from', path)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/system', '/system/:path*'],
}
