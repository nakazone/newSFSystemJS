import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signSession, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json({ success: false, message: 'ADMIN_PASSWORD not configured' }, { status: 500 })
  }
  if (password !== adminPassword) {
    return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
  }
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: email.split('@')[0] || 'Admin',
        email,
        role: 'admin',
        is_active: 1,
      },
    })
  }
  const token = await signSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'admin',
  })
  await setSessionCookie(token)
  return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}
