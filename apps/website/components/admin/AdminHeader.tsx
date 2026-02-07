import { User } from 'next-auth'

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text-dark">Content Management</h1>
          <p className="text-sm text-text-light">Manage your website content</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-text-dark">{user.name || user.email}</p>
            <p className="text-xs text-text-light capitalize">{user.role || 'Editor'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
