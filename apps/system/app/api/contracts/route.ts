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
  const project_id = searchParams.get('project_id') ? parseInt(searchParams.get('project_id')!, 10) : null
  const where: Record<string, number> = {}
  if (lead_id) where.lead_id = lead_id
  if (project_id) where.project_id = project_id
  try {
    const contracts = await prisma.contract.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json({ success: true, data: contracts })
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
  const quote_id = body.quote_id != null ? Number(body.quote_id) : null
  const closed_amount = body.closed_amount != null ? Number(String(body.closed_amount).replace(/[,\s]/g, '')) : 0
  const payment_method = body.payment_method != null ? String(body.payment_method).trim() : null
  const installments = body.installments != null ? Number(body.installments) : 1
  const start_date = body.start_date != null ? new Date(String(body.start_date)) : null
  const end_date = body.end_date != null ? new Date(String(body.end_date)) : null
  const responsible_id = body.responsible_id != null ? Number(body.responsible_id) : null

  if (!closed_amount || (!lead_id && !customer_id && !project_id)) {
    return NextResponse.json(
      { success: false, message: 'closed_amount and at least one of lead_id, customer_id, project_id required' },
      { status: 400 }
    )
  }
  const valid_payment = ['cash', 'financing', 'check', 'card', 'other']
  const method = payment_method && valid_payment.includes(payment_method) ? payment_method : undefined
  try {
    const contract = await prisma.contract.create({
      data: {
        lead_id: lead_id || undefined,
        customer_id: customer_id || undefined,
        project_id: project_id || undefined,
        quote_id: quote_id || undefined,
        closed_amount,
        payment_method: method || undefined,
        installments: installments || 1,
        start_date: start_date || undefined,
        end_date: end_date || undefined,
        responsible_id: responsible_id && Number.isInteger(responsible_id) ? responsible_id : undefined,
      },
    })
    if (lead_id) {
      try {
        const stage = await prisma.pipelineStage.findFirst({ where: { slug: 'closed_won' }, select: { id: true } })
        if (stage) {
          await prisma.lead.update({
            where: { id: lead_id },
            data: { pipeline_stage_id: stage.id, status: 'closed_won' },
          })
        }
      } catch {
        // ignore
      }
    }
    if (quote_id) {
      try {
        await prisma.quote.update({
          where: { id: quote_id },
          data: { status: 'approved', approved_at: new Date() },
        })
      } catch {
        // ignore
      }
    }
    return NextResponse.json({ success: true, data: contract })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
