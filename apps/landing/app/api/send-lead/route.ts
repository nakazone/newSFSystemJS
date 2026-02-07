import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

function validate(body: Record<string, unknown>) {
  const name = String(body['form-name'] ?? body.formName ?? 'contact-form').trim()
  const n = String(body.name ?? '').trim()
  const p = String(body.phone ?? '').trim()
  const e = String(body.email ?? '').trim()
  const z = String(body.zipcode ?? '').trim()
  const m = String(body.message ?? '').trim()
  const errors: string[] = []
  if (!n || n.length < 2) errors.push('Name is required and must be at least 2 characters')
  if (!p) errors.push('Phone number is required')
  if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) errors.push('Valid email address is required')
  const zipDigits = z.replace(/\D/g, '')
  if (!zipDigits || zipDigits.length < 5) errors.push('Valid 5-digit US zip code is required')
  if (errors.length > 0) return { ok: false as const, errors }
  const zipcode = zipDigits.slice(0, 5)
  const source = name === 'hero-form' ? 'LP-Hero' : 'LP-Contact'
  return { ok: true as const, data: { form_name: name, name: n, email: e, phone: p, zipcode, message: m, source } }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try {
    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      body = await request.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text()
      const params = new URLSearchParams(text)
      body = Object.fromEntries(params.entries())
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 })
  }

  const validated = validate(body)
  if (!validated.ok) {
    return NextResponse.json(
      { success: false, message: validated.errors.join(', ') },
      { status: 400 }
    )
  }

  const { form_name, name, email, phone, zipcode, message, source } = validated.data
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null

  let database_saved = false
  let lead_id: number | null = null
  let db_error: string | null = null

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        zipcode,
        message: message || null,
        source,
        form_type: form_name,
        status: 'new',
        priority: 'medium',
        ip_address: ip,
      },
    })
    lead_id = lead.id
    database_saved = true
  } catch (e) {
    db_error = e instanceof Error ? e.message : 'Database error'
  }

  const response: Record<string, unknown> = {
    success: true,
    message: "Thank you! We'll contact you within 24 hours.",
    database_saved,
    lead_id,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    api_version: 'send-lead-next',
  }
  if (!database_saved && db_error) response.db_error = db_error

  return NextResponse.json(response, { status: 200 })
}
