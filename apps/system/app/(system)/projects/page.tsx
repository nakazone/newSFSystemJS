import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
    select: {
      id: true,
      name: true,
      project_type: true,
      status: true,
      customer_id: true,
      created_at: true,
      customer: { select: { name: true } },
    },
  })

  return (
    <div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Projects</h1>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f8fc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>ID</th>
              <th style={{ padding: '12px 16px' }}>Name</th>
              <th style={{ padding: '12px 16px' }}>Customer</th>
              <th style={{ padding: '12px 16px' }}>Type</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Created</th>
              <th style={{ padding: '12px 16px' }}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 16px' }}>{p.id}</td>
                <td style={{ padding: '12px 16px' }}>{p.name}</td>
                <td style={{ padding: '12px 16px' }}>{p.customer?.name ?? '-'}</td>
                <td style={{ padding: '12px 16px' }}>{p.project_type || '-'}</td>
                <td style={{ padding: '12px 16px' }}>{p.status || '-'}</td>
                <td style={{ padding: '12px 16px' }}>{new Date(p.created_at).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Link href={`/projects/${p.id}`} style={{ color: '#1a2036' }}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <p style={{ padding: 24, color: '#666' }}>No projects yet.</p>
        )}
      </div>
    </div>
  )
}
