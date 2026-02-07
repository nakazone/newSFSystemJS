import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = parseInt((await params).id, 10)
  if (!id) notFound()
  const project = await prisma.project.findUnique({
    where: { id },
    include: { customer: true },
  })
  if (!project) notFound()

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Link href="/projects" style={{ color: '#1a2036' }}>Back to projects</Link>
      </div>
      <h1 style={{ marginBottom: 24, color: '#1a2036' }}>Project: {project.name}</h1>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <p><strong>Customer:</strong> {project.customer?.name ?? '-'}</p>
        <p><strong>Type:</strong> {project.project_type || '-'}</p>
        <p><strong>Status:</strong> {project.status || '-'}</p>
        <p><strong>Address:</strong> {project.address || '-'}</p>
        <p><strong>Notes:</strong> {project.notes || '-'}</p>
      </div>
    </div>
  )
}
