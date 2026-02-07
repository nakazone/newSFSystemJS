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
    return NextResponse.json({ success: false, message: 'Invalid lead ID' }, { status: 400 })
  }
  let body: { tag_name?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }
  const tag_name = (body.tag_name || '').trim().slice(0, 50)
  if (!tag_name) {
    return NextResponse.json({ success: false, message: 'tag_name is required' }, { status: 400 })
  }
  try {
    const existing = await prisma.leadTag.findFirst({
      where: { lead_id: id, tag_name },
    })
    if (existing) {
      return NextResponse.json({ success: true, data: existing })
    }
    const created = await prisma.leadTag.create({
      data: { lead_id: id, tag_name },
    })
    return NextResponse.json({ success: true, data: created })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
