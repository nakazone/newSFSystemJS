'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(from)
        router.refresh()
      } else {
        setError(data.message || 'Login failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a2036 0%, #252b47 100%)',
        padding: 20,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: 40,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <h1 style={{ color: '#1a2036', marginBottom: 8 }}>Senior Floors</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>Sistema - Login</p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: '#f8d7da', color: '#721c24', padding: 12, borderRadius: 8, marginBottom: 16 }}>
              {error}
            </div>
          )}
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, color: '#333' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 12, border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 16, marginBottom: 16 }}
          />
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, color: '#333' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 12, border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 16, marginBottom: 24 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 12,
              background: '#1a2036',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
          Use ADMIN_PASSWORD do .env e qualquer email (ex: admin@senior-floors.com).
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a2036' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
