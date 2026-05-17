'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const OBJECTS = [
  'Présentation des services SECURITY GUARD',
  'Demande d\'audit de sécurité',
  'Discussion d\'un contrat de gardiennage',
  'Renseignement sur la sécurité événementielle',
  'Information sur la protection rapprochée',
  'Autre sujet',
]

const HOURS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

export default function RendezVousPage() {
  const [form, setForm] = useState({
    nom: '', email: '', telephone: '', objet: '',
    date_souhaitee: '', heure_souhaitee: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nom || !form.email || !form.date_souhaitee) return
    setStatus('loading')
    try {
      const { error } = await supabase.from('rendez_vous').insert([{
        nom: form.nom, email: form.email, telephone: form.telephone,
        objet: form.objet, date_souhaitee: form.date_souhaitee,
        heure_souhaitee: form.heure_souhaitee || null,
        message: form.message, statut: 'en_attente',
      }])
      if (error) throw error
      setStatus('success')
      setForm({ nom: '', email: '', telephone: '', objet: '', date_souhaitee: '', heure_souhaitee: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0D1525',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 4, padding: '14px 16px',
    color: '#fff', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: "'Barlow', sans-serif",
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', color: '#94A3B8', fontSize: '0.75rem',
    fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', marginBottom: 8,
  }

  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff' }}>

      {/* HERO */}
      <section style={{
        padding: '160px 2rem 80px',
        background: 'linear-gradient(180deg, #080D1A 0%, #050A14 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Rencontrons-nous</span>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800,
            textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 0.95,
          }}>
            Prendre un <span style={{ color: '#D4AF37' }}>Rendez-vous</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
            Planifiez une rencontre avec notre équipe commerciale. Nous vous confirmons votre rendez-vous dans les 24h.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{ padding: '80px 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          {status === 'success' ? (
            <div style={{ background: '#080D1A', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>
                Rendez-vous enregistré !
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 28 }}>
                Votre demande a bien été reçue. Notre équipe vous contactera pour confirmer votre rendez-vous.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{ background: '#D4AF37', color: '#050A14', border: 'none', padding: '12px 28px', borderRadius: 4, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
              >
                Nouveau rendez-vous
              </button>
            </div>
          ) : (
            <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '48px' }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px' }}>
                Planifier notre rencontre
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 32 }}>
                Remplissez ce formulaire et notre équipe vous recontacte sous 24h.
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Nom complet *</label>
                    <input style={inputStyle} placeholder="Jean-Pierre Moukala" required
                      value={form.nom} onChange={e => set('nom', e.target.value)}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input style={inputStyle} type="email" placeholder="jean@exemple.com" required
                      value={form.email} onChange={e => set('email', e.target.value)}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Téléphone</label>
                  <input style={inputStyle} placeholder="+242 06 XXX XXXX"
                    value={form.telephone} onChange={e => set('telephone', e.target.value)}
                    onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Objet du rendez-vous *</label>
                  <select style={inputStyle} required
                    value={form.objet} onChange={e => set('objet', e.target.value)}
                    onFocus={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  >
                    <option value="">Sélectionnez un objet...</option>
                    {OBJECTS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Date souhaitée *</label>
                    <input style={inputStyle} type="date" required min={today}
                      value={form.date_souhaitee} onChange={e => set('date_souhaitee', e.target.value)}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Heure souhaitée</label>
                    <select style={inputStyle}
                      value={form.heure_souhaitee} onChange={e => set('heure_souhaitee', e.target.value)}
                      onFocus={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                    >
                      <option value="">Heure...</option>
                      {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Message complémentaire</label>
                  <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                    placeholder="Informations supplémentaires..."
                    value={form.message} onChange={e => set('message', e.target.value)}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 4, padding: '12px 16px', marginBottom: 20, color: '#EF4444', fontSize: '0.875rem' }}>
                    ✕ Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} style={{
                  width: '100%', background: '#D4AF37', color: '#050A14',
                  border: 'none', padding: '16px', borderRadius: 4,
                  fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Barlow', sans-serif",
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'background 0.2s',
                }}>
                  {status === 'loading' ? 'Envoi en cours...' : '→ Confirmer le rendez-vous'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
