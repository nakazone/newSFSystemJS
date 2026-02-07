import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  const owner_id = request.nextUrl.searchParams.get('owner_id')
  const ownerFilter = owner_id ? parseInt(owner_id, 10) : null
  try {
    let stages: { id: number; name: string; slug: string; order_num: number | null }[] = []
    try {
      stages = await prisma.pipelineStage.findMany({
        orderBy: { order_num: 'asc' },
        select: { id: true, name: true, slug: true, order_num: true },
      })
    } catch {
      stages = []
    }

    const leadWhere: { owner_id?: number } = {}
    if (ownerFilter && Number.isInteger(ownerFilter)) leadWhere.owner_id = ownerFilter

    const leads = await prisma.lead.findMany({
      where: Object.keys(leadWhere).length ? leadWhere : undefined,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        source: true,
        status: true,
        priority: true,
        created_at: true,
        pipeline_stage_id: true,
        owner_id: true,
      },
    })

    const leadsByStage: Record<string | number, typeof leads> = {}
    for (const s of stages) {
      leadsByStage[s.id] = []
    }
    leadsByStage['_none'] = []

    for (const lead of leads) {
      const sid = lead.pipeline_stage_id ?? '_none'
      if (!(sid in leadsByStage)) leadsByStage[sid] = []
      leadsByStage[sid].push(lead)
    }

    return NextResponse.json({
      success: true,
      data: { stages, leadsByStage },
    })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
