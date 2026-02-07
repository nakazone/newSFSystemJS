import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { created_at: 'desc' },
    take: 100,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      created_at: true,
    },
  })

  return (
    <div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Customers</h1>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f8fc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px' }}>ID</th>
              <th style={{ padding: '12px 16px' }}>Name</th>
              <th style={{ padding: '12px 16px' }}>Email</th>
              <th style={{ padding: '12px 16px' }}>Phone</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Created</th>
              <th style={{ padding: '12px 16px' }}></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px 16px' }}>{c.id}</td>
                <td style={{ padding: '12px 16px' }}>{c.name}</td>
                <td style={{ padding: '12px 16px' }}>{c.email}</td>
                <td style={{ padding: '12px 16px' }}>{c.phone}</td>
                <td style={{ padding: '12px 16px' }}>{c.status || '-'}</td>
                <td style={{ padding: '12px 16px' }}>{new Date(c.created_at).toLocaleString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Link href={`/customers/${c.id}`} style={{ color: '#1a2036' }}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p style={{ padding: 24, color: '#666' }}>No customers yet.</p>
        )}
      </div>
    </div>
  )
}
