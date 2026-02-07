import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')?.trim() || ''
  const customer_id = searchParams.get('customer_id')
  const status = searchParams.get('status')?.trim()
  const limit = Math.min(100, Math.max(5, parseInt(searchParams.get('limit') || '30', 10) || 30))
  try {
    const where: Record<string, unknown> = {}
    if (q) {
      where.OR = [
        { name: { contains: q } },
        ...(/\d+/.test(q) ? [{ id: parseInt(q, 10) }] : []),
      ]
    }
    if (customer_id) {
      const cid = parseInt(customer_id, 10)
      if (cid) where.customer_id = cid
    }
    if (status) where.status = status
    const projects = await prisma.project.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        customer_id: true,
        lead_id: true,
        project_type: true,
        status: true,
        address: true,
        city: true,
        state: true,
        estimated_cost: true,
        owner_id: true,
        created_at: true,
      },
    })
    return NextResponse.json({ success: true, data: projects })
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
  const name = String(body.name ?? '').trim()
  const customer_id = body.customer_id != null ? Number(body.customer_id) : null
  const lead_id = body.lead_id != null ? Number(body.lead_id) : undefined
  const project_type = body.project_type != null ? String(body.project_type).trim() : undefined
  const address = body.address != null ? String(body.address).trim() : undefined
  const city = body.city != null ? String(body.city).trim() : undefined
  const state = body.state != null ? String(body.state).trim() : undefined
  const zipcode = body.zipcode != null ? String(body.zipcode).replace(/\D/g, '').slice(0, 10) : undefined
  const owner_id = body.owner_id != null ? Number(body.owner_id) : undefined
  const errors: string[] = []
  if (!name || name.length < 2) errors.push('Name is required (min 2 characters)')
  if (customer_id == null || !Number.isInteger(customer_id) || customer_id < 1) {
    errors.push('customer_id is required and must be a positive integer')
  }
  if (errors.length) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }
  try {
    const project = await prisma.project.create({
      data: {
        name,
        customer_id: customer_id as number,
        lead_id,
        project_type,
        address,
        city,
        state,
        zipcode,
        owner_id: owner_id && Number.isInteger(owner_id) ? owner_id : undefined,
      },
    })
    return NextResponse.json({ success: true, data: project })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
