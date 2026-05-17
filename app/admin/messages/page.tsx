'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { supabase } from '@/lib/supabase'

interface Contact {
  id: string
  nom: string
  email: string
  telephone: string
  message: string
  lu: boolean
  created_at: string
}

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
      setItems(data as Contact[] ?? [])
    } catch { setItems([]) }
    finally { setLoading(false) }
  }

  async function markRead(id: string) {
    await supabase.from('contacts').update({ lu: true }).eq('id', id)
    setItems(p => p.map(c => c.id === id ? { ...c, lu: true } : c))
    if (selected?.id === id) setSelected(p => p ? { ...p, lu: true } : null)
  }

  async function deleteItem(id: string) {
    if (!confirm('Supprimer ce message ?')) return
    await supabase.from('contacts').delete().eq('id', id)
    setItems(p => p.filter(c => c.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function selectItem(c: Contact) {
    setSelected(c)
    if (!c.lu) markRead(c.id)
  }

  const unread = items.filter(c => !c.lu).length

  return (
    <AdminShell>
      <div style={{ maxWidth: 1100, fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
            Messages Contact
          </h1>
          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 6 }}>
            {items.length} message{items.length !== 1 ? 's' : ''} —{' '}
            <span style={{ color: unread > 0 ? '#D4AF37' : '#475569' }}>{unread} non lu{unread !== 1 ? 's' : ''}</span>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 12 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>
                Chargement...
              </div>
            ) : items.length === 0 ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>
                Aucun message.
              </div>
            ) : items.map(c => (
              <div
                key={c.id}
                onClick={() => selectItem(c)}
                style={{
                  background: selected?.id === c.id ? '#0D1525' : '#080D1A',
                  border: selected?.id === c.id ? '1px solid rgba(212,175,55,0.4)' : c.lu ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 4, padding: '14px 16px', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>
                    {c.lu ? '✉️' : '📩'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: c.lu ? 500 : 700, color: c.lu ? '#64748B' : '#fff', marginBottom: 2 }}>
                      {c.nom}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.message}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#1E293B', marginTop: 4 }}>
                      {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  {!c.lu && (
                    <div style={{ width: 8, height: 8, background: '#D4AF37', borderRadius: '50%', flexShrink: 0, marginTop: 4 }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div>
            {!selected ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '60px', textAlign: 'center', color: '#1E293B' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
                <p style={{ fontSize: '0.85rem' }}>Sélectionnez un message</p>
              </div>
            ) : (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                      {selected.nom}
                    </h3>
                    <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
                      <a href={`mailto:${selected.email}`} style={{ color: '#D4AF37', fontSize: '0.8rem', textDecoration: 'none' }}>
                        {selected.email}
                      </a>
                      {selected.telephone && (
                        <span style={{ color: '#475569', fontSize: '0.8rem' }}>{selected.telephone}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(selected.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif" }}
                  >
                    ✕ Supprimer
                  </button>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#334155', marginBottom: 16, letterSpacing: '0.04em' }}>
                  Reçu le {new Date(selected.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>

                <div style={{ background: '#0D1525', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '20px 24px', marginBottom: 20 }}>
                  <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.75, margin: 0, whiteSpace: 'pre-wrap' }}>
                    {selected.message}
                  </p>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Réponse à votre message — SECURITY GUARD`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D4AF37', color: '#050A14', padding: '12px 24px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  ✉ Répondre par email
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
