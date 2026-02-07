import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  let body: { lead_id?: number; stage_id?: number }
  try {
    body = await request.json()
  } catch {
    const form = await request.formData()
    const lead_id = form.get('lead_id')
    const stage_id = form.get('stage_id')
    body = {
      lead_id: lead_id != null ? Number(lead_id) : undefined,
      stage_id: stage_id != null ? Number(stage_id) : undefined,
    }
  }
  const lead_id = body.lead_id != null ? Number(body.lead_id) : 0
  const stage_id = body.stage_id != null ? Number(body.stage_id) : 0
  if (!lead_id || !stage_id) {
    return NextResponse.json(
      { success: false, message: 'lead_id and stage_id are required' },
      { status: 400 }
    )
  }
  try {
    await prisma.lead.update({
      where: { id: lead_id },
      data: { pipeline_stage_id: stage_id },
    })
    return NextResponse.json({
      success: true,
      data: { lead_id, pipeline_stage_id: stage_id },
    })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
