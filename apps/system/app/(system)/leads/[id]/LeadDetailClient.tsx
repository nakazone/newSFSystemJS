'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  zipcode: string | null
  message: string | null
  status: string | null
  priority: string | null
  source: string | null
  form_type: string | null
  created_at: string
  updated_at: string
}
type Note = { id: number; note: string; created_by: string | null; created_at: string }
type Tag = { id: number; tag_name: string }
type Owner = { id: number; name: string; email: string } | null

export default function LeadDetailClient({
  lead,
  notes,
  tags,
  owner,
}: {
  lead: Lead
  notes: Note[]
  tags: Tag[]
  owner: Owner
}) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status || '')
  const [newNote, setNewNote] = useState('')
  const [newTag, setNewTag] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleStatusChange() {
    if (status === (lead.status || '')) return
    setSaving(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) router.refresh()
    } finally {
      setSaving(false)
    }
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!newNote.trim()) return
    setSaving(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote.trim() }),
      })
      if (res.ok) {
        setNewNote('')
        router.refresh()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleAddTag(e: React.FormEvent) {
    e.preventDefault()
    if (!newTag.trim()) return
    setSaving(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag_name: newTag.trim() }),
      })
      if (res.ok) {
        setNewTag('')
        router.refresh()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ marginBottom: 16, color: '#1a2036' }}>Contact</h2>
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a></p>
          <p><strong>Phone:</strong> <a href={`tel:${lead.phone}`}>{lead.phone}</a></p>
          <p><strong>Zip:</strong> {lead.zipcode || '-'}</p>
          <p><strong>Source:</strong> {lead.source || '-'} {lead.form_type ? `(${lead.form_type})` : ''}</p>
          <p><strong>Created:</strong> {new Date(lead.created_at).toLocaleString()}</p>
          {owner && <p><strong>Owner:</strong> {owner.name} ({owner.email})</p>}
          {lead.message && <p><strong>Message:</strong><br />{lead.message}</p>}
        </div>
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ marginBottom: 16, color: '#1a2036' }}>Status</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onBlur={handleStatusChange}
              style={{ padding: '8px 12px', borderRadius: 6, border: '2px solid #e2e8f0', minWidth: 140 }}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
            </select>
            {saving && <span style={{ fontSize: 14, color: '#666' }}>Saving...</span>}
          </div>
          <h3 style={{ marginTop: 20, marginBottom: 8 }}>Tags</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {tags.map((t) => (
              <span
                key={t.id}
                style={{
                  background: '#e2e8f0',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 14,
                }}
              >
                {t.tag_name}
              </span>
            ))}
          </div>
          <form onSubmit={handleAddTag} style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              style={{ padding: '8px 12px', borderRadius: 6, border: '2px solid #e2e8f0', flex: 1 }}
            />
            <button type="submit" disabled={saving} style={{ padding: '8px 16px', background: '#1a2036', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
              Add
            </button>
          </form>
        </div>
      </div>
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginBottom: 16, color: '#1a2036' }}>Notes</h2>
        <form onSubmit={handleAddNote} style={{ marginBottom: 20 }}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            rows={3}
            style={{ width: '100%', padding: 12, borderRadius: 6, border: '2px solid #e2e8f0', marginBottom: 8 }}
          />
          <button type="submit" disabled={saving} style={{ padding: '8px 16px', background: '#1a2036', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            Add note
          </button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notes.map((n) => (
            <li
              key={n.id}
              style={{
                borderBottom: '1px solid #e2e8f0',
                padding: '12px 0',
              }}
            >
              <div style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>
                {n.created_by || 'System'} at {new Date(n.created_at).toLocaleString()}
              </div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{n.note}</div>
            </li>
          ))}
        </ul>
        {notes.length === 0 && <p style={{ color: '#666' }}>No notes yet.</p>}
      </div>
    </div>
  )
}
