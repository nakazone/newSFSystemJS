import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

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
  const to_user_id = body.to_user_id != null ? Number(body.to_user_id) : 0
  const reason = body.reason != null ? String(body.reason).trim() : null
  const assigned_by = body.assigned_by != null ? Number(body.assigned_by) : null

  if (!lead_id && !customer_id && !project_id) {
    return NextResponse.json(
      { success: false, message: 'At least one of lead_id, customer_id, or project_id is required' },
      { status: 400 }
    )
  }
  if (!to_user_id || !Number.isInteger(to_user_id)) {
    return NextResponse.json({ success: false, message: 'Invalid to_user_id' }, { status: 400 })
  }

  try {
    let from_user_id: number | null = null
    if (lead_id) {
      const lead = await prisma.lead.findUnique({ where: { id: lead_id }, select: { owner_id: true } })
      if (!lead) return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
      from_user_id = lead.owner_id
      await prisma.lead.update({ where: { id: lead_id }, data: { owner_id: to_user_id } })
    } else if (customer_id) {
      const customer = await prisma.customer.findUnique({ where: { id: customer_id }, select: { owner_id: true } })
      if (!customer) return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 })
      from_user_id = customer.owner_id
      await prisma.customer.update({ where: { id: customer_id }, data: { owner_id: to_user_id } })
    } else if (project_id) {
      const project = await prisma.project.findUnique({ where: { id: project_id }, select: { owner_id: true } })
      if (!project) return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
      from_user_id = project.owner_id
      await prisma.project.update({ where: { id: project_id }, data: { owner_id: to_user_id } })
    }

    const history = await prisma.assignmentHistory.create({
      data: {
        lead_id: lead_id || undefined,
        customer_id: customer_id || undefined,
        project_id: project_id || undefined,
        from_user_id: from_user_id ?? undefined,
        to_user_id,
        reason: reason || undefined,
        assigned_by: assigned_by && Number.isInteger(assigned_by) ? assigned_by : undefined,
      },
    })
    return NextResponse.json({ success: true, data: history })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
