'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { supabase } from '@/lib/supabase'

interface ContentItem {
  id?: string
  cle: string
  valeur: string
  updated_at?: string
}

const DEFAULT_CONTENT: ContentItem[] = [
  { cle: 'hero_titre', valeur: 'Votre Sécurité, Notre Priorité !' },
  { cle: 'hero_sous_titre', valeur: 'SECURITY GUARD vous offre des solutions de sécurité professionnelles et sur mesure pour protéger vos biens, vos équipes et vos événements à Brazzaville.' },
  { cle: 'stats_annees', valeur: '10+' },
  { cle: 'stats_agents', valeur: '500+' },
  { cle: 'stats_clients', valeur: '300+' },
  { cle: 'stats_missions', valeur: '1000+' },
  { cle: 'adresse', valeur: '2549, Rue Charles Foucault, Centre-Ville, Brazzaville, République du Congo' },
  { cle: 'telephone_1', valeur: '066797878' },
  { cle: 'telephone_2', valeur: '066207878' },
  { cle: 'email', valeur: 'contact@groupeyannick.com' },
  { cle: 'slogan', valeur: 'Votre Sécurité, Notre Priorité !' },
]

const LABELS: Record<string, string> = {
  hero_titre: 'Titre principal (Hero)',
  hero_sous_titre: 'Sous-titre (Hero)',
  stats_annees: "Statistique — Années d'expérience",
  stats_agents: 'Statistique — Agents formés',
  stats_clients: 'Statistique — Clients protégés',
  stats_missions: 'Statistique — Missions réalisées',
  adresse: 'Adresse complète',
  telephone_1: 'Téléphone 1',
  telephone_2: 'Téléphone 2',
  email: 'Email de contact',
  slogan: 'Slogan',
}

const isLong = (cle: string) => cle.includes('sous_titre') || cle.includes('adresse')

export default function AdminContenuPage() {
  const [items, setItems] = useState<ContentItem[]>(DEFAULT_CONTENT)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from('contenu_site').select('*')
        if (data && data.length > 0) {
          setItems(DEFAULT_CONTENT.map(d => {
            const found = data.find((r: ContentItem) => r.cle === d.cle)
            return found ? { ...d, id: found.id, valeur: found.valeur } : d
          }))
        }
      } catch { /* use defaults */ }
    }
    load()
  }, [])

  async function saveItem(item: ContentItem) {
    setSaving(item.cle)
    try {
      const { data: existing } = await supabase.from('contenu_site').select('id').eq('cle', item.cle).single()
      if (existing?.id) {
        await supabase.from('contenu_site').update({ valeur: item.valeur, updated_at: new Date().toISOString() }).eq('cle', item.cle)
      } else {
        await supabase.from('contenu_site').insert([{ cle: item.cle, valeur: item.valeur }])
      }
      setSaved(item.cle)
      setTimeout(() => setSaved(null), 2000)
    } catch { /* ignore */ }
    finally { setSaving(null) }
  }

  function updateValue(cle: string, valeur: string) {
    setItems(p => p.map(i => i.cle === cle ? { ...i, valeur } : i))
  }

  const inputBase: React.CSSProperties = {
    flex: 1,
    background: '#0D1525',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 4,
    padding: '12px 16px',
    color: '#fff',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: "'Barlow', sans-serif",
    transition: 'border-color 0.2s',
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: 860, fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
            Éditeur de contenu
          </h1>
          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 6 }}>
            Modifiez les textes et informations affichés sur le site.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map(item => (
            <div key={item.cle} style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ color: '#D4AF37', fontSize: 14 }}>✏️</span>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.04em' }}>
                  {LABELS[item.cle] || item.cle}
                </label>
                <span style={{ fontSize: '0.68rem', color: '#1E293B', fontFamily: 'monospace' }}>({item.cle})</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                {isLong(item.cle) ? (
                  <textarea
                    rows={3}
                    value={item.valeur}
                    onChange={e => updateValue(item.cle, e.target.value)}
                    style={{ ...inputBase, resize: 'vertical', minHeight: 80 }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                ) : (
                  <input
                    type="text"
                    value={item.valeur}
                    onChange={e => updateValue(item.cle, e.target.value)}
                    style={inputBase}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                )}
                <button
                  onClick={() => saveItem(item)}
                  disabled={saving === item.cle}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '12px 18px', borderRadius: 4,
                    border: saved === item.cle ? '1px solid rgba(52,211,153,0.3)' : '1px solid transparent',
                    background: saved === item.cle ? 'rgba(52,211,153,0.1)' : '#D4AF37',
                    color: saved === item.cle ? '#34D399' : '#050A14',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
                    cursor: saving === item.cle ? 'not-allowed' : 'pointer',
                    fontFamily: "'Barlow', sans-serif",
                    opacity: saving === item.cle ? 0.6 : 1,
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {saved === item.cle ? '✓ Sauvé' : saving === item.cle ? '...' : '↑ Sauvegarder'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
