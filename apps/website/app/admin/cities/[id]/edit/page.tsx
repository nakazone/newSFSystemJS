import { prisma } from '@/lib/prisma'
import { CityForm } from '@/components/admin/CityForm'
import { notFound } from 'next/navigation'

export default async function EditCityPage({
  params,
}: {
  params: { id: string }
}) {
  const city = await prisma.city.findUnique({
    where: { id: params.id },
  })

  if (!city) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6">Edit City</h1>
      <CityForm city={city} />
    </div>
  )
}
