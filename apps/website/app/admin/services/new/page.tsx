import { ServiceForm } from '@/components/admin/ServiceForm'

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6">Create New Service</h1>
      <ServiceForm />
    </div>
  )
}
