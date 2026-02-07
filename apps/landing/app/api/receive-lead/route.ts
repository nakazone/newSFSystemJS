import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try {
    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      body = await request.json()
    } else {
      const text = await request.text()
      body = Object.fromEntries(new URLSearchParams(text).entries())
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 })
  }

  const form_name = String(body['form-name'] ?? body.formName ?? 'contact-form').trim()
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const zipcode = String(body.zipcode ?? '').replace(/\D/g, '').slice(0, 5)
  const message = String(body.message ?? '').trim()

  const errors: string[] = []
  if (!name || name.length < 2) errors.push('Name is required')
  if (!phone) errors.push('Phone is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!zipcode || zipcode.length < 5) errors.push('Valid 5-digit US zip code is required')
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors, api_version: 'receive-lead-next' }, { status: 400 })
  }

  const source = form_name === 'hero-form' ? 'LP-Hero' : 'LP-Contact'
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null

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

  const resp: Record<string, unknown> = {
    success: true,
    message: "Thank you! We'll contact you within 24 hours.",
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    lead_id,
    database_saved,
    inserted_new: database_saved,
    email_sent: false,
    api_version: 'receive-lead-next',
  }
  if (!database_saved) resp.db_error = db_error || 'Unknown'
  return NextResponse.json(resp)
}
