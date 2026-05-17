'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { isAdminAuthenticated, clearAdminSession } from '@/lib/admin-auth'

const NAV = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: '◈' },
  { href: '/admin/devis', label: 'Demandes de devis', icon: '📋' },
  { href: '/admin/rendez-vous', label: 'Rendez-vous', icon: '📅' },
  { href: '/admin/messages', label: 'Messages contact', icon: '✉️' },
  { href: '/admin/contenu', label: 'Éditeur de contenu', icon: '✏️' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace('/admin')
    } else {
      setAuthed(true)
    }
  }, [router])

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#050A14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(212,175,55,0.2)', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const sidebarStyle: React.CSSProperties = {
    width: 240, background: '#030508',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column',
    flexShrink: 0,
    fontFamily: "'Barlow', sans-serif",
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050A14', display: 'flex', fontFamily: "'Barlow', sans-serif" }}>

      {/* Sidebar desktop */}
      <aside style={sidebarStyle} className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #D4AF37, #8B6914)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: '#050A14' }}>
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff' }}>SECURITY GUARD</div>
              <div style={{ fontSize: 9, color: '#D4AF37', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(({ href, label, icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 4,
                fontSize: '0.85rem', fontWeight: 500,
                textDecoration: 'none',
                color: active ? '#D4AF37' : '#475569',
                background: active ? 'rgba(212,175,55,0.08)' : 'transparent',
                border: active ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => { clearAdminSession(); router.replace('/admin') }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 4, background: 'none',
              border: '1px solid transparent', color: '#334155',
              fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
              fontFamily: "'Barlow', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#EF4444'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#334155'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent' }}
          >
            <span>⬡</span> Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{
          background: '#030508', borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 24px', height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: "'Barlow', sans-serif",
        }}>
          <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}>
            {NAV.find(n => n.href === pathname)?.label ?? 'Administration'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" target="_blank" style={{ color: '#334155', fontSize: '0.75rem', textDecoration: 'none', letterSpacing: '0.06em' }}>
              ↗ Voir le site
            </Link>
            <div style={{ width: 32, height: 32, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '0.9rem', color: '#D4AF37' }}>
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '32px 24px', overflow: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  )
}
