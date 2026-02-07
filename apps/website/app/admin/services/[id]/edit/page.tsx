import { prisma } from '@/lib/prisma'
import { ServiceForm } from '@/components/admin/ServiceForm'
import { notFound } from 'next/navigation'

export default async function EditServicePage({
  params,
}: {
  params: { id: string }
}) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  })

  if (!service) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6">Edit Service</h1>
      <ServiceForm service={service} />
    </div>
  )
}
