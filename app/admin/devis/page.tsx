'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { supabase } from '@/lib/supabase'

interface Devis {
  id: string
  nom: string
  entreprise: string
  email: string
  telephone: string
  services: string
  lieu: string
  duree: string
  agents: string
  description: string
  statut: string
  created_at: string
}

const fieldStyle: React.CSSProperties = {
  marginBottom: 0,
}

export default function AdminDevisPage() {
  const [items, setItems] = useState<Devis[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Devis | null>(null)
  const [filter, setFilter] = useState<'tous' | 'nouveau' | 'traite'>('tous')

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const { data } = await supabase.from('devis').select('*').order('created_at', { ascending: false })
      setItems(data as Devis[] ?? [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  async function markAsTraited(id: string) {
    await supabase.from('devis').update({ statut: 'traite' }).eq('id', id)
    setItems(p => p.map(d => d.id === id ? { ...d, statut: 'traite' } : d))
    if (selected?.id === id) setSelected(p => p ? { ...p, statut: 'traite' } : null)
  }

  async function deleteItem(id: string) {
    if (!confirm('Confirmer la suppression ?')) return
    await supabase.from('devis').delete().eq('id', id)
    setItems(p => p.filter(d => d.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const filtered = items.filter(d => filter === 'tous' || d.statut === filter)

  return (
    <AdminShell>
      <div style={{ maxWidth: 1100, fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
              Demandes de devis
            </h1>
            <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 6 }}>
              {items.length} demande{items.length !== 1 ? 's' : ''} reçue{items.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['tous', 'nouveau', 'traite'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '7px 14px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  fontFamily: "'Barlow', sans-serif",
                  background: filter === f ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                  color: filter === f ? '#050A14' : '#475569',
                  transition: 'all 0.2s',
                }}
              >
                {f === 'tous' ? 'Tous' : f === 'nouveau' ? 'Nouveaux' : 'Traités'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 12 }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {loading ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>
                Chargement...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>
                Aucune demande.
              </div>
            ) : filtered.map(d => (
              <div
                key={d.id}
                onClick={() => setSelected(d)}
                style={{
                  background: selected?.id === d.id ? '#0D1525' : '#080D1A',
                  border: selected?.id === d.id ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 4, padding: '16px', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#D4AF37', flexShrink: 0 }}>
                      {d.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{d.nom}</div>
                      <div style={{ fontSize: '0.72rem', color: '#475569' }}>{d.email}</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 2, letterSpacing: '0.06em',
                    background: d.statut === 'nouveau' ? 'rgba(212,175,55,0.1)' : 'rgba(52,211,153,0.1)',
                    border: d.statut === 'nouveau' ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(52,211,153,0.3)',
                    color: d.statut === 'nouveau' ? '#D4AF37' : '#34D399',
                  }}>
                    {d.statut === 'nouveau' ? 'Nouveau' : 'Traité'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#334155', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.services}</div>
                <div style={{ fontSize: '0.72rem', color: '#1E293B' }}>
                  {new Date(d.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          <div>
            {!selected ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '60px', textAlign: 'center', color: '#1E293B' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>◈</div>
                <p style={{ fontSize: '0.85rem' }}>Sélectionnez une demande pour voir les détails</p>
              </div>
            ) : (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                      {selected.nom}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: 4 }}>{selected.entreprise || 'Particulier'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {selected.statut === 'nouveau' && (
                      <button
                        onClick={() => markAsTraited(selected.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.1)', color: '#34D399', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif" }}
                      >
                        ✓ Marquer traité
                      </button>
                    )}
                    <button
                      onClick={() => deleteItem(selected.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif" }}
                    >
                      ✕ Supprimer
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { l: 'Email', v: selected.email },
                    { l: 'Téléphone', v: selected.telephone },
                    { l: 'Services', v: selected.services },
                    { l: 'Lieu', v: selected.lieu },
                    { l: 'Durée', v: selected.duree },
                    { l: 'Agents', v: selected.agents },
                    { l: 'Date', v: new Date(selected.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
                    { l: 'Statut', v: selected.statut === 'nouveau' ? 'Nouveau' : 'Traité' },
                  ].map(({ l, v }) => (
                    <div key={l} style={fieldStyle}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#334155', marginBottom: 4 }}>{l}</div>
                      <div style={{ fontSize: '0.875rem', color: v ? '#94A3B8' : '#1E293B' }}>{v || '—'}</div>
                    </div>
                  ))}
                </div>

                {selected.description && (
                  <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#334155', marginBottom: 10 }}>Description</div>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.75 }}>{selected.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
