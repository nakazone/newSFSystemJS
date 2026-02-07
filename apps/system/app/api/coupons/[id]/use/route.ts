import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const id = parseInt((await params).id, 10)
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid coupon ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const lead_id = body.lead_id != null ? Number(body.lead_id) : null
  const project_id = body.project_id != null ? Number(body.project_id) : null
  const discount_amount = body.discount_amount != null ? Number(body.discount_amount) : null
  const used_by = body.used_by != null ? Number(body.used_by) : null
  if (!lead_id && !project_id) {
    return NextResponse.json(
      { success: false, message: 'Either lead_id or project_id is required' },
      { status: 400 }
    )
  }
  try {
    const coupon = await prisma.coupon.findUnique({ where: { id } })
    if (!coupon) {
      return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 })
    }
    if (!coupon.is_active) {
      return NextResponse.json({ success: false, message: 'Coupon is not active' }, { status: 400 })
    }
    const now = new Date()
    if (coupon.valid_from && now < coupon.valid_from) {
      return NextResponse.json({ success: false, message: 'Coupon is not yet valid' }, { status: 400 })
    }
    if (coupon.valid_until && now > coupon.valid_until) {
      return NextResponse.json({ success: false, message: 'Coupon has expired' }, { status: 400 })
    }
    const used = (coupon.used_count ?? 0) + 1
    if (coupon.max_uses != null && used > coupon.max_uses) {
      return NextResponse.json({ success: false, message: 'Coupon max uses exceeded' }, { status: 400 })
    }
    const usage = await prisma.couponUsage.create({
      data: {
        coupon_id: id,
        lead_id: lead_id || undefined,
        project_id: project_id || undefined,
        discount_amount: discount_amount ?? undefined,
        used_by: used_by && Number.isInteger(used_by) ? used_by : undefined,
      },
    })
    await prisma.coupon.update({
      where: { id },
      data: { used_count: used },
    })
    return NextResponse.json({ success: true, data: usage })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
