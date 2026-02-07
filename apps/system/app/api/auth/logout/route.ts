import { NextRequest, NextResponse } from 'next/server'
import { deleteSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  await deleteSessionCookie()
  const url = request.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}
