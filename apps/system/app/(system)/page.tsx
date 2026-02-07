import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function SystemDashboardPage() {
  let leadCount = 0
  let customerCount = 0
  let projectCount = 0
  let recentLeads: { id: number; name: string; email: string; created_at: Date; status: string | null }[] = []
  let dbError = false

  try {
    ;[leadCount, customerCount, projectCount] = await Promise.all([
      prisma.lead.count(),
      prisma.customer.count(),
      prisma.project.count(),
    ])
    recentLeads = await prisma.lead.findMany({
      orderBy: { created_at: 'desc' },
      take: 5,
      select: { id: true, name: true, email: true, created_at: true, status: true },
    })
  } catch {
    dbError = true
  }

  return (
    <div>
      {dbError && (
        <div
          style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
            color: '#92400e',
          }}
        >
          <strong>Banco de dados indisponível.</strong> Inicie o MySQL em <code>localhost:3306</code> e confira o <code>DATABASE_URL</code> no <code>.env</code>. Depois atualize a página.
        </div>
      )}
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Leads</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2036' }}>{leadCount}</div>
          <Link href="/leads" style={{ fontSize: '0.9rem', color: '#1a2036' }}>View all</Link>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Customers</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2036' }}>{customerCount}</div>
          <Link href="/customers" style={{ fontSize: '0.9rem', color: '#1a2036' }}>View all</Link>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Projects</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2036' }}>{projectCount}</div>
          <Link href="/projects" style={{ fontSize: '0.9rem', color: '#1a2036' }}>View all</Link>
        </div>
      </div>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginBottom: 16, color: '#1a2036' }}>Recent leads</h2>
        {recentLeads.length === 0 ? (
          <p style={{ color: '#666' }}>No leads yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Name</th>
                <th style={{ padding: '8px 12px' }}>Email</th>
                <th style={{ padding: '8px 12px' }}>Status</th>
                <th style={{ padding: '8px 12px' }}>Date</th>
                <th style={{ padding: '8px 12px' }}></th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 12px' }}>{lead.name}</td>
                  <td style={{ padding: '8px 12px' }}>{lead.email}</td>
                  <td style={{ padding: '8px 12px' }}>{lead.status || '-'}</td>
                  <td style={{ padding: '8px 12px' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <Link href={`/leads/${lead.id}`} style={{ color: '#1a2036' }}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
