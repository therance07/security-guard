'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAdminCredentials, setAdminSession } from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 400))
    if (checkAdminCredentials(email, password)) {
      setAdminSession()
      router.push('/admin/dashboard')
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.')
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 4, padding: '14px 16px',
    color: '#fff', fontSize: '0.9rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: "'Barlow', sans-serif",
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050A14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Barlow', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, #D4AF37, #8B6914)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 40px rgba(212,175,55,0.2)',
          }}>
            <svg viewBox="0 0 24 24" style={{ width: 36, height: 36, fill: '#050A14' }}>
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', marginBottom: 4 }}>
            SECURITY GUARD
          </h1>
          <p style={{ color: '#334155', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Administration — Accès restreint
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '40px 36px' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 28, color: '#fff' }}>
            🔒 Connexion administrateur
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                Adresse email
              </label>
              <input
                type="email" required autoComplete="username"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@groupeyannick.com"
                style={inputStyle}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'} required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 48 }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.5)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 16 }}
                >
                  {showPwd ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 4, padding: '10px 14px', marginBottom: 20, color: '#EF4444', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', background: '#D4AF37', color: '#050A14',
              border: 'none', padding: '15px', borderRadius: 4,
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              fontFamily: "'Barlow', sans-serif",
              opacity: loading ? 0.7 : 1, transition: 'background 0.2s',
            }}>
              {loading ? 'Vérification...' : '→ Se connecter'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#1E293B', fontSize: '0.75rem', marginTop: 20 }}>
          Accès réservé aux administrateurs autorisés de SECURITY GUARD
        </p>
      </div>
    </div>
  )
}
