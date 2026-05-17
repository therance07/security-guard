'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { supabase } from '@/lib/supabase'

interface RDV {
  id: string
  nom: string
  email: string
  telephone: string
  objet: string
  date_souhaitee: string
  heure_souhaitee: string
  message: string
  statut: string
  created_at: string
}

const STATUT_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  en_attente: { label: 'En attente', color: '#D4AF37', bg: 'rgba(212,175,55,0.1)', border: 'rgba(212,175,55,0.3)' },
  confirme:   { label: 'Confirmé',   color: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.3)' },
  annule:     { label: 'Annulé',     color: '#EF4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)' },
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

export default function AdminRdvPage() {
  const [items, setItems] = useState<RDV[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<RDV | null>(null)

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const { data } = await supabase.from('rendez_vous').select('*').order('date_souhaitee', { ascending: true })
      setItems(data as RDV[] ?? [])
    } catch { setItems([]) }
    finally { setLoading(false) }
  }

  async function updateStatut(id: string, statut: string) {
    await supabase.from('rendez_vous').update({ statut }).eq('id', id)
    setItems(p => p.map(r => r.id === id ? { ...r, statut } : r))
    if (selected?.id === id) setSelected(p => p ? { ...p, statut } : null)
  }

  async function deleteItem(id: string) {
    if (!confirm('Supprimer ce rendez-vous ?')) return
    await supabase.from('rendez_vous').delete().eq('id', id)
    setItems(p => p.filter(r => r.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: 1100, fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
            Rendez-vous
          </h1>
          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 6 }}>
            {items.length} rendez-vous planifié{items.length !== 1 ? 's' : ''}
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
                Aucun rendez-vous.
              </div>
            ) : items.map(r => {
              const cfg = STATUT_CONFIG[r.statut] ?? STATUT_CONFIG.en_attente
              return (
                <div
                  key={r.id}
                  onClick={() => setSelected(r)}
                  style={{
                    background: selected?.id === r.id ? '#0D1525' : '#080D1A',
                    border: selected?.id === r.id ? '1px solid rgba(212,175,55,0.4)' : '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 4, padding: '16px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{r.nom}</div>
                      <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: 2 }}>{r.objet}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: 2, letterSpacing: '0.06em', background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                  {r.date_souhaitee && (
                    <div style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: 600 }}>
                      📅 {new Date(r.date_souhaitee + 'T00:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      {r.heure_souhaitee && ` à ${r.heure_souhaitee}`}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Detail */}
          <div>
            {!selected ? (
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '60px', textAlign: 'center', color: '#1E293B' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                <p style={{ fontSize: '0.85rem' }}>Sélectionnez un rendez-vous pour voir les détails</p>
              </div>
            ) : (() => {
              const cfg = STATUT_CONFIG[selected.statut] ?? STATUT_CONFIG.en_attente
              return (
                <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                        {selected.nom}
                      </h3>
                      <p style={{ color: '#475569', fontSize: '0.8rem', marginTop: 4 }}>{selected.objet}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {selected.statut === 'en_attente' && (
                        <>
                          <button
                            onClick={() => updateStatut(selected.id, 'confirme')}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.1)', color: '#34D399', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif" }}
                          >
                            ✓ Confirmer
                          </button>
                          <button
                            onClick={() => updateStatut(selected.id, 'annule')}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif" }}
                          >
                            ✕ Annuler
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteItem(selected.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#475569', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', fontFamily: "'Barlow', sans-serif' " }}
                      >
                        ✕ Supprimer
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                    {[
                      { l: 'Email', v: selected.email },
                      { l: 'Téléphone', v: selected.telephone },
                      { l: 'Date souhaitée', v: selected.date_souhaitee ? formatDate(selected.date_souhaitee) : '—' },
                      { l: 'Heure souhaitée', v: selected.heure_souhaitee || '—' },
                      { l: 'Statut', v: cfg.label },
                      { l: 'Reçu le', v: new Date(selected.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#334155', marginBottom: 4 }}>{l}</div>
                        <div style={{ fontSize: '0.875rem', color: '#94A3B8' }}>{v || '—'}</div>
                      </div>
                    ))}
                  </div>

                  {selected.message && (
                    <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#334155', marginBottom: 10 }}>Message</div>
                      <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.75, background: '#0D1525', border: '1px solid rgba(255,255,255,0.06)', padding: '16px', borderRadius: 4, margin: 0 }}>
                        {selected.message}
                      </p>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
