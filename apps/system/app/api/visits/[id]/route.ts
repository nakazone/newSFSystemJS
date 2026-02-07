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
    return NextResponse.json({ success: false, message: 'Invalid visit ID' }, { status: 400 })
  }
  try {
    const visit = await prisma.visit.findUnique({ where: { id } })
    if (!visit) {
      return NextResponse.json({ success: false, message: 'Visit not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: visit })
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
    return NextResponse.json({ success: false, message: 'Invalid visit ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const allowed = [
    'scheduled_at', 'ended_at', 'seller_id', 'technician_id', 'address', 'notes', 'status',
    'lead_id', 'customer_id', 'project_id',
  ]
  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) {
      if (['scheduled_at', 'ended_at'].includes(key)) {
        data[key] = new Date(String(body[key]))
      } else {
        data[key] = body[key]
      }
    }
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 })
  }
  try {
    const visit = await prisma.visit.update({
      where: { id },
      data: data as never,
    })
    return NextResponse.json({ success: true, data: visit })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
