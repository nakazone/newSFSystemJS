'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SystemShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/login'

  if (isLogin) {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          background: '#1a2036',
          color: '#fff',
          padding: '1rem 0',
          flexShrink: 0,
        }}
      >
        <div style={{ padding: '0 1rem', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
            Senior Floors
          </Link>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: 4 }}>Sistema</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link href="/" style={{ padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/leads" style={{ padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Leads</Link>
          <Link href="/customers" style={{ padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Customers</Link>
          <Link href="/projects" style={{ padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Projects</Link>
          <Link href="/users" style={{ padding: '0.5rem 1rem', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Users</Link>
        </nav>
        <div style={{ marginTop: 'auto', padding: '1rem' }}>
          <form action="/api/auth/logout" method="POST" style={{ marginTop: 8 }}>
            <button
              type="submit"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'rgba(255,255,255,0.9)',
                padding: '6px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '1.5rem', background: '#f7f8fc' }}>{children}</main>
    </div>
  )
}
