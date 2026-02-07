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
  const limit = Math.min(100, Math.max(5, parseInt(searchParams.get('limit') || '30', 10) || 30))
  try {
    const where = q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { phone: { contains: q } },
            ...(/\d+/.test(q) ? [{ id: parseInt(q, 10) }] : []),
          ],
        }
      : {}
    const customers = await prisma.customer.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        zipcode: true,
        status: true,
        owner_id: true,
        lead_id: true,
        created_at: true,
      },
    })
    return NextResponse.json({ success: true, data: customers })
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
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const address = body.address != null ? String(body.address).trim() : undefined
  const city = body.city != null ? String(body.city).trim() : undefined
  const state = body.state != null ? String(body.state).trim() : undefined
  const zipcode = body.zipcode != null ? String(body.zipcode).replace(/\D/g, '').slice(0, 10) : undefined
  const customer_type = body.customer_type != null ? String(body.customer_type).trim() : undefined
  const owner_id = body.owner_id != null ? Number(body.owner_id) : undefined
  const lead_id = body.lead_id != null ? Number(body.lead_id) : undefined
  const errors: string[] = []
  if (!name || name.length < 2) errors.push('Name is required (min 2 characters)')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!phone || phone.replace(/\D/g, '').length < 8) errors.push('Phone is required (min 8 digits)')
  if (errors.length) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }
  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address: address || undefined,
        city: city || undefined,
        state: state || undefined,
        zipcode: zipcode || undefined,
        customer_type: customer_type || undefined,
        owner_id: owner_id && Number.isInteger(owner_id) ? owner_id : undefined,
        lead_id: lead_id && Number.isInteger(lead_id) ? lead_id : undefined,
      },
    })
    return NextResponse.json({ success: true, data: customer })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
