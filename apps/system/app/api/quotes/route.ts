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
  const status = searchParams.get('status')?.trim() || null
  const where: Record<string, number | string> = {}
  if (lead_id) where.lead_id = lead_id
  if (customer_id) where.customer_id = customer_id
  if (project_id) where.project_id = project_id
  if (status) where.status = status
  try {
    const quotes = await prisma.quote.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { created_at: 'desc' },
      include: { quote_items: true },
    })
    return NextResponse.json({ success: true, data: quotes })
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
  const created_by = body.created_by != null ? Number(body.created_by) : null
  const items = Array.isArray(body.items) ? body.items as Array<Record<string, unknown>> : []
  if (!lead_id && !customer_id && !project_id) {
    return NextResponse.json(
      { success: false, message: 'At least one of lead_id, customer_id, or project_id is required' },
      { status: 400 }
    )
  }
  let total_amount = 0
  const quoteItems: { floor_type: string; area_sqft: number; unit_price: number; total_price: number; notes?: string }[] = []
  for (const it of items) {
    const area_sqft = Number(it.area_sqft ?? it.quantity ?? 1)
    const unit_price = Number(it.unit_price ?? 0)
    const total_price = area_sqft * unit_price
    total_amount += total_price
    quoteItems.push({
      floor_type: String(it.floor_type ?? it.name ?? 'Item'),
      area_sqft,
      unit_price,
      total_price,
      notes: it.notes != null ? String(it.notes) : undefined,
    })
  }
  if (quoteItems.length === 0) {
    const single = body as { floor_type?: string; area_sqft?: number; unit_price?: number; notes?: string }
    const area = Number(single.area_sqft ?? 1)
    const unit = Number(single.unit_price ?? 0)
    total_amount = area * unit
    quoteItems.push({
      floor_type: String(single.floor_type ?? 'Item'),
      area_sqft: area,
      unit_price: unit,
      total_price: total_amount,
      notes: single.notes != null ? String(single.notes) : undefined,
    })
  }
  try {
    const quote = await prisma.quote.create({
      data: {
        lead_id: lead_id || undefined,
        customer_id: customer_id || undefined,
        project_id: project_id || undefined,
        total_amount,
        labor_amount: 0,
        materials_amount: total_amount,
        status: 'draft',
        created_by: created_by && Number.isInteger(created_by) ? created_by : undefined,
        quote_items: {
          create: quoteItems,
        },
      },
      include: { quote_items: true },
    })
    return NextResponse.json({ success: true, data: quote })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
