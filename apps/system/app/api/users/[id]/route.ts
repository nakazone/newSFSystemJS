import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const id = parseInt((await params).id, 10)
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 })
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true, is_active: true, created_at: true, updated_at: true },
    })
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: user })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const id = parseInt((await params).id, 10)
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const allowed = ['name', 'email', 'phone', 'role', 'is_active']
  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key]
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 })
  }
  try {
    const user = await prisma.user.update({
      where: { id },
      data: data as never,
    })
    return NextResponse.json({ success: true, data: user })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}

