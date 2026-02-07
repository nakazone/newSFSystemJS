import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import LeadDetailClient from './LeadDetailClient'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10)
  if (!id) notFound()
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { created_at: 'desc' } },
      lead_tags: true,
      owner: { select: { id: true, name: true, email: true } },
    },
  })
  if (!lead) notFound()

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link href="/leads" style={{ color: '#1a2036' }}>Back to leads</Link>
      </div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Lead #{lead.id}</h1>
      <LeadDetailClient
        lead={{
          id: lead.id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          zipcode: lead.zipcode,
          message: lead.message,
          status: lead.status,
          priority: lead.priority,
          source: lead.source,
          form_type: lead.form_type,
          created_at: lead.created_at.toISOString(),
          updated_at: lead.updated_at.toISOString(),
        }}
        notes={lead.notes.map((n) => ({
          id: n.id,
          note: n.note,
          created_by: n.created_by,
          created_at: n.created_at.toISOString(),
        }))}
        tags={lead.lead_tags.map((t) => ({ id: t.id, tag_name: t.tag_name }))}
        owner={lead.owner ? { id: lead.owner.id, name: lead.owner.name, email: lead.owner.email } : null}
      />
    </div>
  )
}
