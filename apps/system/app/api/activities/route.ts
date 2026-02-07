import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

const VALID_TYPES = ['email_sent', 'whatsapp_message', 'phone_call', 'meeting_scheduled', 'site_visit', 'proposal_sent', 'note', 'status_change', 'assignment', 'other']

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const lead_id = searchParams.get('lead_id') ? parseInt(searchParams.get('lead_id')!, 10) : null
  const customer_id = searchParams.get('customer_id') ? parseInt(searchParams.get('customer_id')!, 10) : null
  const project_id = searchParams.get('project_id') ? parseInt(searchParams.get('project_id')!, 10) : null
  const activity_type = searchParams.get('activity_type')?.trim() || null
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get('per_page') || '50', 10)))
  const skip = (page - 1) * per_page
  try {
    const where: Record<string, unknown> = {}
    if (lead_id) where.lead_id = lead_id
    if (customer_id) where.customer_id = customer_id
    if (project_id) where.project_id = project_id
    if (activity_type) where.activity_type = activity_type

    const [total, activities] = await Promise.all([
      prisma.activity.count({ where }),
      prisma.activity.findMany({
        where,
        orderBy: [{ activity_date: 'desc' }, { created_at: 'desc' }],
        skip,
        take: per_page,
      }),
    ])
    return NextResponse.json({
      success: true,
      activities,
      pagination: { page, per_page, total, total_pages: Math.ceil(total / per_page) || 0 },
    })
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
  const activity_type = (body.activity_type != null ? String(body.activity_type) : 'note').trim()
  const subject = body.subject != null ? String(body.subject).trim() : null
  const description = body.description != null ? String(body.description).trim() : null
  const activity_date = body.activity_date != null ? new Date(String(body.activity_date)) : new Date()
  const user_id = body.user_id != null ? Number(body.user_id) : null
  const owner_id = body.owner_id != null ? Number(body.owner_id) : null

  if (!VALID_TYPES.includes(activity_type)) {
    return NextResponse.json({ success: false, message: 'Invalid activity type' }, { status: 400 })
  }
  if (!lead_id && !customer_id && !project_id) {
    return NextResponse.json(
      { success: false, message: 'At least one of lead_id, customer_id, or project_id is required' },
      { status: 400 }
    )
  }
  const related_to = lead_id ? 'lead' : customer_id ? 'customer' : 'project'
  try {
    const activity = await prisma.activity.create({
      data: {
        lead_id: lead_id || undefined,
        customer_id: customer_id || undefined,
        project_id: project_id || undefined,
        activity_type,
        subject: subject || undefined,
        description: description || undefined,
        activity_date,
        user_id: user_id && Number.isInteger(user_id) ? user_id : undefined,
        owner_id: owner_id && Number.isInteger(owner_id) ? owner_id : undefined,
        related_to,
      },
    })
    return NextResponse.json({ success: true, data: activity })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
