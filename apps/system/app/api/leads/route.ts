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
    const leads = await prisma.lead.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        source: true,
        created_at: true,
        owner_id: true,
      },
    })
    return NextResponse.json({ success: true, data: leads })
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
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()
  const zipcode = String(body.zipcode ?? '').replace(/\D/g, '').slice(0, 10) || null
  const message = (body.message != null ? String(body.message) : '').trim() || null
  const source = (body.source != null ? String(body.source) : 'Manual').trim()
  const owner_id = body.owner_id != null ? Number(body.owner_id) : null
  const errors: string[] = []
  if (!name || name.length < 2) errors.push('Name is required (min 2 characters)')
  if (!phone || phone.replace(/\D/g, '').length < 8) errors.push('Phone is required (min 8 digits)')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email')
  if (errors.length) {
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }
  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email: email || `manual-${Date.now()}@placeholder.local`,
        phone,
        zipcode,
        message,
        source,
        status: 'new',
        priority: 'medium',
        owner_id: owner_id && Number.isInteger(owner_id) ? owner_id : undefined,
      },
    })
    return NextResponse.json({ success: true, data: lead })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
