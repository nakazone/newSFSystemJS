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
    return NextResponse.json({ success: false, message: 'Invalid customer ID' }, { status: 400 })
  }
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        customer_notes: { orderBy: { created_at: 'desc' } },
        customer_tags: true,
        owner: { select: { id: true, name: true, email: true } },
        projects: { select: { id: true, name: true, status: true, created_at: true } },
      },
    })
    if (!customer) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 })
    }
    return NextResponse.json({
      success: true,
      data: {
        customer,
        notes: customer.customer_notes,
        tags: customer.customer_tags,
        projects: customer.projects,
      },
    })
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
    return NextResponse.json({ success: false, message: 'Invalid customer ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const allowed = [
    'name', 'email', 'phone', 'address', 'city', 'state', 'zipcode',
    'customer_type', 'owner_id', 'status', 'notes', 'lead_id',
  ]
  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key]
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 })
  }
  try {
    const customer = await prisma.customer.update({
      where: { id },
      data: data as never,
    })
    return NextResponse.json({ success: true, data: customer })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
