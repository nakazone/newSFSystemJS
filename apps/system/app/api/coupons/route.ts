import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const is_active = request.nextUrl.searchParams.get('is_active')
  const where = is_active !== null && is_active !== ''
    ? { is_active: is_active === '1' ? 1 : 0 }
    : undefined
  try {
    const coupons = await prisma.coupon.findMany({
      where,
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json({ success: true, coupons })
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
  const code = String(body.code ?? '').trim().toUpperCase()
  const name = body.name != null ? String(body.name).trim() : undefined
  const discount_type = body.discount_type != null ? String(body.discount_type).trim() : 'percent'
  const discount_value = body.discount_value != null ? Number(body.discount_value) : 0
  const max_uses = body.max_uses != null ? Number(body.max_uses) : null
  const valid_from = body.valid_from != null ? new Date(String(body.valid_from)) : undefined
  const valid_until = body.valid_until != null ? new Date(String(body.valid_until)) : undefined
  const is_active = body.is_active != null ? (Number(body.is_active) ? 1 : 0) : 1
  if (!code || code.length < 2) {
    return NextResponse.json({ success: false, message: 'code is required' }, { status: 400 })
  }
  if (discount_value < 0) {
    return NextResponse.json({ success: false, message: 'discount_value must be >= 0' }, { status: 400 })
  }
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code,
        name: name || undefined,
        discount_type: discount_type || 'percent',
        discount_value,
        max_uses: max_uses ?? undefined,
        valid_from: valid_from || undefined,
        valid_until: valid_until || undefined,
        is_active,
      },
    })
    return NextResponse.json({ success: true, data: coupon })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
