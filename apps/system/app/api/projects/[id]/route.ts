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
    return NextResponse.json({ success: false, message: 'Invalid project ID' }, { status: 400 })
  }
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        project_notes: { orderBy: { created_at: 'desc' } },
        project_tags: true,
        owner: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, phone: true } },
      },
    })
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json({
      success: true,
      data: {
        project,
        notes: project.project_notes,
        tags: project.project_tags,
        customer: project.customer,
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
    return NextResponse.json({ success: false, message: 'Invalid project ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const allowed = [
    'name', 'customer_id', 'lead_id', 'project_type', 'status', 'post_service_status',
    'address', 'city', 'state', 'zipcode',
    'estimated_start_date', 'estimated_end_date', 'actual_start_date', 'actual_end_date',
    'estimated_cost', 'actual_cost', 'owner_id', 'notes',
  ]
  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) data[key] = body[key]
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 })
  }
  try {
    const project = await prisma.project.update({
      where: { id },
      data: data as never,
    })
    return NextResponse.json({ success: true, data: project })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
