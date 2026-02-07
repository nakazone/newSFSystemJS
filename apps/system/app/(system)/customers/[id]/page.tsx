import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10)
  if (!id) notFound()
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: { projects: true, customer_notes: true },
  })
  if (!customer) notFound()

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link href="/customers" style={{ color: '#1a2036' }}>Back to customers</Link>
      </div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Customer: {customer.name}</h1>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Address:</strong> {customer.address || '-'}</p>
        <p><strong>City/State/Zip:</strong> {[customer.city, customer.state, customer.zipcode].filter(Boolean).join(', ') || '-'}</p>
        <p><strong>Status:</strong> {customer.status || '-'}</p>
        <p><strong>Projects:</strong> {customer.projects.length}</p>
      </div>
    </div>
  )
}
