'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const services = [
  'Gardiennage Statique',
  'Maîtres-Chiens',
  'Sécurité Événementielle',
  'Rondes & Patrouilles',
  'Escorte & Protection Rapprochée',
  'Installation Vidéosurveillance',
]

const steps = [
  { num: '01', label: 'Informations client' },
  { num: '02', label: 'Services souhaités' },
  { num: '03', label: 'Détails de la mission' },
  { num: '04', label: 'Confirmation' },
]

export default function DevisPage() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    nom: '', entreprise: '', email: '', telephone: '',
    services: [] as string[],
    lieu: '', duree: '', agents: '', description: '',
  })

  const inputStyle = {
    width: '100%', background: '#0D1525',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 4, padding: '14px 16px',
    color: '#fff', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box' as const,
    fontFamily: "'Barlow', sans-serif",
  }

  const labelStyle = {
    display: 'block' as const,
    color: '#94A3B8', fontSize: '0.75rem',
    fontWeight: 600 as const, letterSpacing: '0.08em',
    textTransform: 'uppercase' as const, marginBottom: 8,
  }

  const handleSubmit = async () => {
    setStatus('loading')
    try {
      const { error } = await supabase.from('devis').insert([{
        nom: form.nom, entreprise: form.entreprise,
        email: form.email, telephone: form.telephone,
        services: form.services.join(', '),
        lieu: form.lieu, duree: form.duree,
        agents: form.agents, description: form.description,
        statut: 'nouveau',
      }])
      if (error) throw error
      setStatus('success')
      setStep(3)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        padding: '140px 0 60px',
        background: 'linear-gradient(180deg, #080D1A 0%, #050A14 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800, textTransform: 'uppercase',
            margin: '0 0 12px', lineHeight: 0.95,
          }}>
            Demander un <span style={{ color: '#D4AF37' }}>Devis</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>
            Complétez ce formulaire pour recevoir votre devis personnalisé sous 24h
          </p>
        </div>
      </section>

      {/* STEPPER */}
      <section style={{ padding: '60px 0 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>

          {/* Steps indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 56 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: i < step ? '#D4AF37' : i === step ? 'transparent' : '#0D1525',
                    border: i === step ? '2px solid #D4AF37' : i < step ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: i < step ? '#050A14' : i === step ? '#D4AF37' : '#475569',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800, fontSize: '0.9rem',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : s.num}
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: i === step ? '#D4AF37' : i < step ? '#fff' : '#334155',
                    whiteSpace: 'nowrap',
                  }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{
                    flex: 1, height: 1, margin: '-20px 12px 0',
                    background: i < step ? '#D4AF37' : 'rgba(255,255,255,0.08)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div style={{
            background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 4, padding: '48px',
          }}>

            {/* STEP 1 — Informations client */}
            {step === 0 && (
              <div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase',
                  margin: '0 0 32px', letterSpacing: '0.03em',
                }}>Informations client</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Nom complet *</label>
                    <input style={inputStyle} placeholder="Jean-Pierre Moukala"
                      value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Entreprise</label>
                    <input style={inputStyle} placeholder="Ma Société"
                      value={form.entreprise} onChange={e => setForm({ ...form, entreprise: e.target.value })} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input style={inputStyle} type="email" placeholder="jean@exemple.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone *</label>
                    <input style={inputStyle} placeholder="+242 06 XXX XXXX"
                      value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Services */}
            {step === 1 && (
              <div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase',
                  margin: '0 0 8px', letterSpacing: '0.03em',
                }}>Services souhaités</h2>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 28 }}>Sélectionnez un ou plusieurs services</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {services.map((s) => {
                    const selected = form.services.includes(s)
                    return (
                      <div
                        key={s}
                        onClick={() => {
                          const updated = selected
                            ? form.services.filter(x => x !== s)
                            : [...form.services, s]
                          setForm({ ...form, services: updated })
                        }}
                        style={{
                          padding: '16px 20px', borderRadius: 4, cursor: 'pointer',
                          border: selected ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.08)',
                          background: selected ? 'rgba(212,175,55,0.08)' : '#0D1525',
                          display: 'flex', alignItems: 'center', gap: 12,
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: 3,
                          border: selected ? 'none' : '1px solid rgba(255,255,255,0.2)',
                          background: selected ? '#D4AF37' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {selected && <span style={{ color: '#050A14', fontSize: '0.7rem', fontWeight: 800 }}>✓</span>}
                        </div>
                        <span style={{ color: selected ? '#fff' : '#94A3B8', fontSize: '0.9rem', fontWeight: selected ? 600 : 400 }}>
                          {s}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3 — Détails */}
            {step === 2 && (
              <div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase',
                  margin: '0 0 32px', letterSpacing: '0.03em',
                }}>Détails de la mission</h2>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Lieu d'intervention</label>
                  <input style={inputStyle} placeholder="Adresse, quartier, ville..."
                    value={form.lieu} onChange={e => setForm({ ...form, lieu: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Durée souhaitée</label>
                    <input style={inputStyle} placeholder="Ex: 3 mois, permanent..."
                      value={form.duree} onChange={e => setForm({ ...form, duree: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nombre d'agents souhaités</label>
                    <input style={inputStyle} placeholder="Ex: 2, 5, 10..."
                      value={form.agents} onChange={e => setForm({ ...form, agents: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Description détaillée</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                    placeholder="Décrivez votre besoin, le contexte, les horaires souhaités..."
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 4 — Confirmation ou Succès */}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                {status === 'success' ? (
                  <>
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: 'rgba(16,185,129,0.1)', border: '2px solid #10B981',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px', fontSize: '1.8rem',
                    }}>✓</div>
                    <h2 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase',
                      margin: '0 0 12px', color: '#10B981',
                    }}>Demande envoyée !</h2>
                    <p style={{ color: '#94A3B8', fontSize: '1rem', margin: '0 0 32px' }}>
                      Votre demande de devis a été reçue. Notre équipe vous contactera sous 24h.
                    </p>
                    <a href="/" style={{
                      display: 'inline-block', background: '#D4AF37', color: '#050A14',
                      padding: '14px 32px', borderRadius: 4,
                      fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>← Retour à l'accueil</a>
                  </>
                ) : (
                  <>
                    <h2 style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase',
                      margin: '0 0 24px',
                    }}>Confirmer votre demande</h2>
                    <div style={{ background: '#0D1525', borderRadius: 4, padding: '24px', textAlign: 'left', marginBottom: 28 }}>
                      {[
                        { label: 'Nom', value: form.nom },
                        { label: 'Email', value: form.email },
                        { label: 'Téléphone', value: form.telephone },
                        { label: 'Services', value: form.services.join(', ') || '—' },
                        { label: 'Lieu', value: form.lieu || '—' },
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: 80 }}>{item.label}</span>
                          <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {status === 'error' && (
                      <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 4, padding: '12px 16px', marginBottom: 16, color: '#EF4444', fontSize: '0.9rem' }}>
                        ✕ Une erreur est survenue. Veuillez réessayer.
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            {!(step === 3 && status === 'success') && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
                {step > 0 ? (
                  <button onClick={() => setStep(step - 1)} style={{
                    background: 'transparent', color: '#94A3B8',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '12px 28px', borderRadius: 4, cursor: 'pointer',
                    fontWeight: 600, fontSize: '0.85rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    fontFamily: "'Barlow', sans-serif",
                  }}>← Précédent</button>
                ) : <div />}

                {step < 3 ? (
                  <button onClick={() => setStep(step + 1)} style={{
                    background: '#D4AF37', color: '#050A14',
                    border: 'none', padding: '12px 32px', borderRadius: 4, cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.85rem',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    fontFamily: "'Barlow', sans-serif",
                  }}>Suivant →</button>
                ) : status !== 'success' && (
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    style={{
                      background: '#D4AF37', color: '#050A14',
                      border: 'none', padding: '12px 32px', borderRadius: 4, cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.85rem',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      fontFamily: "'Barlow', sans-serif",
                      opacity: status === 'loading' ? 0.7 : 1,
                    }}
                  >
                    {status === 'loading' ? 'Envoi...' : '✓ Envoyer ma demande'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        input:focus, textarea:focus { border-color: rgba(212,175,55,0.5) !important; }
        input::placeholder, textarea::placeholder { color: #334155; }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
