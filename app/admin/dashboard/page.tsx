'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/AdminShell'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalDevis: number
  newDevis: number
  totalRdv: number
  pendingRdv: number
  totalMessages: number
  unreadMessages: number
}

const cardStyle = (accent: string): React.CSSProperties => ({
  background: '#080D1A',
  border: `1px solid ${accent}30`,
  borderRadius: 4,
  padding: '28px 24px',
  flex: 1,
})

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalDevis: 0, newDevis: 0, totalRdv: 0, pendingRdv: 0, totalMessages: 0, unreadMessages: 0 })
  const [recentDevis, setRecentDevis] = useState<Record<string, string>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [{ data: devis }, { data: rdv }, { data: contacts }] = await Promise.all([
          supabase.from('devis').select('id, statut, created_at, nom, services'),
          supabase.from('rendez_vous').select('id, statut, created_at'),
          supabase.from('contacts').select('id, lu, created_at'),
        ])
        setStats({
          totalDevis: devis?.length ?? 0,
          newDevis: devis?.filter(d => d.statut === 'nouveau').length ?? 0,
          totalRdv: rdv?.length ?? 0,
          pendingRdv: rdv?.filter(r => r.statut === 'en_attente').length ?? 0,
          totalMessages: contacts?.length ?? 0,
          unreadMessages: contacts?.filter(c => !c.lu).length ?? 0,
        })
        setRecentDevis((devis ?? []).slice(0, 5) as Record<string, string>[])
      } catch {
        setStats({ totalDevis: 0, newDevis: 0, totalRdv: 0, pendingRdv: 0, totalMessages: 0, unreadMessages: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const CARDS = [
    {
      label: 'Demandes de devis',
      total: stats.totalDevis,
      badge: stats.newDevis,
      badgeLabel: 'nouveaux',
      icon: '📋',
      accent: '#D4AF37',
      href: '/admin/devis',
    },
    {
      label: 'Rendez-vous',
      total: stats.totalRdv,
      badge: stats.pendingRdv,
      badgeLabel: 'en attente',
      icon: '📅',
      accent: '#60A5FA',
      href: '/admin/rendez-vous',
    },
    {
      label: 'Messages contact',
      total: stats.totalMessages,
      badge: stats.unreadMessages,
      badgeLabel: 'non lus',
      icon: '✉️',
      accent: '#A78BFA',
      href: '/admin/messages',
    },
    {
      label: 'Taux de traitement',
      total: stats.totalDevis > 0
        ? Math.round(((stats.totalDevis - stats.newDevis) / stats.totalDevis) * 100) + '%'
        : '—',
      badge: null,
      badgeLabel: '',
      icon: '📊',
      accent: '#34D399',
      href: null,
    },
  ]

  return (
    <AdminShell>
      <div style={{ maxWidth: 1100, fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
            Tableau de bord
          </h1>
          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: 6 }}>
            Vue d&apos;ensemble des activités SECURITY GUARD
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, marginBottom: 32 }}>
          {CARDS.map(({ label, total, badge, badgeLabel, icon, accent, href }) => (
            <div key={label} style={cardStyle(accent)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {icon}
                </div>
                {badge !== null && badge > 0 && (
                  <span style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 2, letterSpacing: '0.06em' }}>
                    {badge} {badgeLabel}
                  </span>
                )}
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.4rem', fontWeight: 900, color: loading ? '#1E293B' : accent, lineHeight: 1, marginBottom: 6 }}>
                {loading ? '—' : total}
              </div>
              <div style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em' }}>{label}</div>
              {href && (
                <a href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, color: accent, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  → Voir tout
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Recent devis */}
        <div style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fff', margin: 0 }}>
              Dernières demandes de devis
            </h3>
            <a href="/admin/devis" style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              → Voir tout
            </a>
          </div>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>Chargement...</div>
          ) : recentDevis.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#334155', fontSize: '0.85rem' }}>Aucune demande pour l&apos;instant.</div>
          ) : (
            <div>
              {recentDevis.map((d, i) => (
                <div key={d.id} style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < recentDevis.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#D4AF37', flexShrink: 0 }}>
                      {d.nom?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>{d.nom}</div>
                      <div style={{ fontSize: '0.75rem', color: '#475569' }}>{d.services}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 2, letterSpacing: '0.06em',
                      background: d.statut === 'nouveau' ? 'rgba(212,175,55,0.1)' : 'rgba(52,211,153,0.1)',
                      border: d.statut === 'nouveau' ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(52,211,153,0.3)',
                      color: d.statut === 'nouveau' ? '#D4AF37' : '#34D399',
                    }}>
                      {d.statut === 'nouveau' ? 'Nouveau' : d.statut === 'traite' ? 'Traité' : d.statut}
                    </span>
                    <span style={{ color: '#334155', fontSize: '0.75rem' }}>
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
