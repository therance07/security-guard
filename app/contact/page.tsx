'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.nom || !form.email || !form.message) return
    setStatus('loading')
    try {
      const { error } = await supabase.from('contacts').insert([{
        nom: form.nom, email: form.email,
        telephone: form.telephone, message: form.message,
      }])
      if (error) throw error
      setStatus('success')
      setForm({ nom: '', email: '', telephone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', background: '#0D1525',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 4, padding: '14px 16px',
    color: '#fff', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
    fontFamily: "'Barlow', sans-serif",
  }

  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff' }}>

      {/* HERO */}
      <section style={{
        padding: '160px 0 80px',
        background: 'linear-gradient(180deg, #080D1A 0%, #050A14 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Parlons-nous</span>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 800, textTransform: 'uppercase',
            margin: '0 0 16px', lineHeight: 0.95,
          }}>
            Contactez-<span style={{ color: '#D4AF37' }}>Nous</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* ILLUSTRATION BAND */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <Image
          src="/images/accueil.jpg"
          alt="Accueil Security Guard"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,10,20,0.3) 0%, rgba(5,10,20,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', marginBottom: 8 }}>
              Votre sécurité, notre engagement
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, color: '#D4AF37', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <span>✓ Réponse sous 24h</span>
              <span style={{ color: 'rgba(212,175,55,0.4)' }}>|</span>
              <span>✓ Équipe disponible 24h/24</span>
              <span style={{ color: 'rgba(212,175,55,0.4)' }}>|</span>
              <span>✓ Devis gratuit</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'start' }}>

            {/* FORMULAIRE */}
            <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '48px' }}>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.8rem', fontWeight: 700, textTransform: 'uppercase',
                margin: '0 0 6px',
              }}>Envoyez-nous un message</h2>
              <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 32 }}>Réponse garantie sous 24h ouvrées.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Nom complet *
                  </label>
                  <input
                    style={inputStyle}
                    placeholder="Jean-Pierre Moukala"
                    value={form.nom}
                    onChange={e => setForm({ ...form, nom: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Email *
                  </label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="jean@exemple.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Téléphone
                </label>
                <input
                  style={inputStyle}
                  placeholder="+242 06 XXX XXXX"
                  value={form.telephone}
                  onChange={e => setForm({ ...form, telephone: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Votre message *
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                  placeholder="Décrivez votre besoin..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {status === 'success' && (
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 4, padding: '12px 16px', marginBottom: 16, color: '#10B981', fontSize: '0.9rem' }}>
                  ✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </div>
              )}

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 4, padding: '12px 16px', marginBottom: 16, color: '#EF4444', fontSize: '0.9rem' }}>
                  ✕ Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{
                  width: '100%', background: '#D4AF37', color: '#050A14',
                  border: 'none', padding: '16px', borderRadius: 4,
                  fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Barlow', sans-serif",
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Envoi en cours...' : '→ Envoyer le message'}
              </button>
            </div>

            {/* COORDONNÉES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Coords */}
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '32px' }}>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', margin: '0 0 24px', color: '#D4AF37',
                }}>Nos coordonnées</h3>
                {[
                  { icon: '📍', label: '2549, Rue Charles Foucault\nCentre-Ville, Brazzaville\nRépublique du Congo' },
                  { icon: '📞', label: '066 797 878\n066 207 878' },
                  { icon: '✉️', label: 'contact@groupeyannick.com' },
                  { icon: '🌐', label: 'www.groupeyannick.com' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14,
                    paddingBottom: i < 3 ? 20 : 0,
                    marginBottom: i < 3 ? 20 : 0,
                    borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <span style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Disponibilité */}
              <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '32px' }}>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', margin: '0 0 20px', color: '#D4AF37',
                }}>⏱ Disponibilité</h3>
                {[
                  { label: 'Centre opérationnel', value: '24h/24 — 7j/7', color: '#10B981' },
                  { label: 'Bureau commercial', value: 'Lun–Ven: 8h–17h', color: '#94A3B8' },
                  { label: 'Urgences', value: 'Disponible', color: '#D4AF37' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 12,
                  }}>
                    <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/242066797878" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 16,
                background: '#25D366', padding: '20px 24px', borderRadius: 4,
                textDecoration: 'none',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.112 1.523 5.838L.052 23.143a.75.75 0 00.908.908l5.305-1.471A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.977 0-3.827-.538-5.416-1.477l-.387-.23-4.012 1.113 1.113-4.012-.23-.387A10.443 10.443 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                </svg>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>WhatsApp Direct</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>+242 066 797 878</div>
                </div>
              </a>

              {/* Google Maps */}
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.8!2d15.2847!3d-4.2634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTUnNDguMyJTIDE1wrAxNycwNC45IkU!5e0!3m2!1sfr!2scg!4v1620000000000!5m2!1sfr!2scg"
                  width="100%" height="180"
                  style={{ border: 0, display: 'block', filter: 'grayscale(0.3) invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen loading="lazy"
                  title="Security Guard Brazzaville"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
        input:focus, textarea:focus { border-color: rgba(212,175,55,0.5) !important; }
        input::placeholder, textarea::placeholder { color: #334155; }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 1fr 420px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
