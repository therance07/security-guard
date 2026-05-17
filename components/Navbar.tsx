'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/rendez-vous', label: 'Rendez-vous' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (pathname.startsWith('/admin')) return null

  const navBg = scrolled ? 'rgba(5,10,20,0.97)' : 'rgba(5,10,20,0.75)'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : '1px solid transparent',
        transition: 'all 0.3s',
        fontFamily: "'Barlow', sans-serif",
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', height: 72, gap: 0 }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginRight: 'auto' }}>
            <div style={{ width: 44, height: 44, position: 'relative', flexShrink: 0 }}>
              <Image
                src="/images/logo-badge.png"
                alt="Security Guard logo"
                fill
                style={{ objectFit: 'contain', filter: 'brightness(1.1)' }}
                priority
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: '1.05rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: '#fff', lineHeight: 1.1,
              }}>
                SECURITY GUARD
              </div>
              <div style={{ fontSize: 9, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                Groupe Yannick
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 24 }} className="desktop-nav">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: active ? '#D4AF37' : '#94A3B8',
                    borderBottom: active ? '2px solid #D4AF37' : '2px solid transparent',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/devis"
            className="cta-btn"
            style={{
              background: '#D4AF37', color: '#050A14',
              padding: '10px 20px', borderRadius: 4,
              fontSize: '0.8rem', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#C9A227'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#D4AF37'}
          >
            Devis gratuit
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="hamburger"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginLeft: 12, color: '#fff' }}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(5,10,20,0.99)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 2rem 20px' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '12px 0',
                  fontSize: '0.95rem', fontWeight: 500,
                  textDecoration: 'none',
                  color: pathname === href ? '#D4AF37' : '#94A3B8',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/devis"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', marginTop: 16,
                background: '#D4AF37', color: '#050A14',
                padding: '13px', borderRadius: 4,
                fontSize: '0.85rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                textAlign: 'center', textDecoration: 'none',
              }}
            >
              Demander un devis gratuit
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}
