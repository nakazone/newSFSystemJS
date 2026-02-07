import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'

const FALLBACK_STAGES: { id: number; name: string; slug: string; order_num: number; sla_hours: number | null; is_closed: number }[] = [
  { id: 1, name: 'Lead Recebido', slug: 'lead_received', order_num: 1, sla_hours: null, is_closed: 0 },
  { id: 2, name: 'Contato Realizado', slug: 'contact_made', order_num: 2, sla_hours: null, is_closed: 0 },
  { id: 3, name: 'Qualificado', slug: 'qualified', order_num: 3, sla_hours: null, is_closed: 0 },
  { id: 4, name: 'Visita Agendada', slug: 'visit_scheduled', order_num: 4, sla_hours: null, is_closed: 0 },
  { id: 5, name: 'Medicao Realizada', slug: 'measurement_done', order_num: 5, sla_hours: null, is_closed: 0 },
  { id: 6, name: 'Proposta Criada', slug: 'proposal_created', order_num: 6, sla_hours: null, is_closed: 0 },
  { id: 7, name: 'Proposta Enviada', slug: 'proposal_sent', order_num: 7, sla_hours: null, is_closed: 0 },
  { id: 8, name: 'Orcamento enviado', slug: 'quote_sent', order_num: 8, sla_hours: null, is_closed: 0 },
  { id: 9, name: 'Em Negociacao', slug: 'negotiation', order_num: 9, sla_hours: null, is_closed: 0 },
  { id: 10, name: 'Fechado - Ganhou', slug: 'closed_won', order_num: 10, sla_hours: null, is_closed: 1 },
  { id: 11, name: 'Fechado - Perdido', slug: 'closed_lost', order_num: 11, sla_hours: null, is_closed: 1 },
]

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  try {
    const stages = await prisma.pipelineStage.findMany({
      orderBy: { order_num: 'asc' },
      select: { id: true, name: true, slug: true, order_num: true, sla_hours: true, is_closed: true },
    })
    return NextResponse.json({
      success: true,
      data: stages.length ? stages : FALLBACK_STAGES,
    })
  } catch {
    return NextResponse.json({ success: true, data: FALLBACK_STAGES })
  }
}
