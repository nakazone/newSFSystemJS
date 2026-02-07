import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const id = parseInt((await params).id, 10)
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid quote ID' }, { status: 400 })
  }
  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: { quote_items: true },
    })
    if (!quote) {
      return NextResponse.json({ success: false, message: 'Quote not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: { ...quote, items: quote.quote_items } })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const id = parseInt((await params).id, 10)
  if (!id) {
    return NextResponse.json({ success: false, message: 'Invalid quote ID' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const allowed = [
    'status', 'total_amount', 'labor_amount', 'materials_amount', 'margin_percent',
    'sent_at', 'viewed_at', 'approved_at', 'pdf_path',
  ]
  const data: Record<string, unknown> = {}
  for (const key of allowed) {
    if (body[key] !== undefined) {
      if (['sent_at', 'viewed_at', 'approved_at'].includes(key)) {
        data[key] = body[key] ? new Date(String(body[key])) : null
      } else {
        data[key] = body[key]
      }
    }
  }
  if (body.status === 'sent' && !data.sent_at) {
    data.sent_at = new Date()
  }
  if (body.status === 'approved' && !data.approved_at) {
    data.approved_at = new Date()
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 })
  }
  try {
    const quote = await prisma.quote.update({
      where: { id },
      data: data as never,
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
