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
  const where: { lead_id?: number; customer_id?: number; project_id?: number } = {}
  if (lead_id) where.lead_id = lead_id
  if (customer_id) where.customer_id = customer_id
  if (project_id) where.project_id = project_id
  try {
    const history = await prisma.assignmentHistory.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { created_at: 'desc' },
    })
    return NextResponse.json({ success: true, data: history })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: e instanceof Error ? e.message : 'Error' },
      { status: 500 }
    )
  }
}
