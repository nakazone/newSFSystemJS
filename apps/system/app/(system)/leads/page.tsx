import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      source: true,
      created_at: true,
    },
  })

  return (
    <div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Leads</h1>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f8fc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>ID</th>
              <th style={{ padding: '12px 16px' }}>Name</th>
              <th style={{ padding: '12px 16px' }}>Email</th>
              <th style={{ padding: '12px 16px' }}>Phone</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Source</th>
              <th style={{ padding: '12px 16px' }}>Created</th>
              <th style={{ padding: '12px 16px' }}></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 16px' }}>{lead.id}</td>
                <td style={{ padding: '12px 16px' }}>{lead.name}</td>
                <td style={{ padding: '12px 16px' }}>{lead.email}</td>
                <td style={{ padding: '12px 16px' }}>{lead.phone}</td>
                <td style={{ padding: '12px 16px' }}>{lead.status || '-'}</td>
                <td style={{ padding: '12px 16px' }}>{lead.source || '-'}</td>
                <td style={{ padding: '12px 16px' }}>{new Date(lead.created_at).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Link href={`/leads/${lead.id}`} style={{ color: '#1a2036', fontWeight: 500 }}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p style={{ padding: 24, color: '#666' }}>No leads yet.</p>
        )}
      </div>
    </div>
  )
}
