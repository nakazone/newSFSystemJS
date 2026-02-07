import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const lead_id = searchParams.get('lead_id') ? parseInt(searchParams.get('lead_id')!, 10) : null
  const customer_id = searchParams.get('customer_id') ? parseInt(searchParams.get('customer_id')!, 10) : null
  const project_id = searchParams.get('project_id') ? parseInt(searchParams.get('project_id')!, 10) : null
  const seller_id = searchParams.get('seller_id') ? parseInt(searchParams.get('seller_id')!, 10) : null
  const status = searchParams.get('status')?.trim() || null
  const where: { lead_id?: number; customer_id?: number; project_id?: number; seller_id?: number; status?: string } = {}
  if (lead_id) where.lead_id = lead_id
  if (customer_id) where.customer_id = customer_id
  if (project_id) where.project_id = project_id
  if (seller_id) where.seller_id = seller_id
  if (status) where.status = status
  try {
    const visits = await prisma.visit.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { scheduled_at: 'desc' },
    })
    return NextResponse.json({ success: true, data: visits })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const lead_id = body.lead_id != null ? Number(body.lead_id) : null
  const customer_id = body.customer_id != null ? Number(body.customer_id) : null
  const project_id = body.project_id != null ? Number(body.project_id) : null
  const scheduled_at = body.scheduled_at != null ? new Date(String(body.scheduled_at)) : null
  const seller_id = body.seller_id != null ? Number(body.seller_id) : null
  const technician_id = body.technician_id != null ? Number(body.technician_id) : null
  const address = body.address != null ? String(body.address).trim() : undefined
  const notes = body.notes != null ? String(body.notes).trim() : undefined
  const status = (body.status != null ? String(body.status) : 'scheduled').trim()
  if (!scheduled_at || Number.isNaN(scheduled_at.getTime())) {
    return NextResponse.json({ success: false, message: 'scheduled_at is required' }, { status: 400 })
  }
  if (!lead_id && !customer_id && !project_id) {
    return NextResponse.json(
      { success: false, message: 'At least one of lead_id, customer_id, or project_id is required' },
      { status: 400 }
    )
  }
  try {
    const visit = await prisma.visit.create({
      data: {
        lead_id: lead_id || undefined,
        customer_id: customer_id || undefined,
        project_id: project_id || undefined,
        scheduled_at,
        seller_id: seller_id && Number.isInteger(seller_id) ? seller_id : undefined,
        technician_id: technician_id && Number.isInteger(technician_id) ? technician_id : undefined,
        address: address || undefined,
        notes: notes || undefined,
        status: status || 'scheduled',
      },
    })
    return NextResponse.json({ success: true, data: visit })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
