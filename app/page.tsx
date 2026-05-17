'use client'

import Link from 'next/link'
import Image from 'next/image'

const STATS = [
  { value: '10+', label: "Années d'expérience" },
  { value: '500+', label: 'Agents formés' },
  { value: '300+', label: 'Clients protégés' },
  { value: '1 000+', label: 'Missions réalisées' },
]

const SERVICES = [
  { icon: '🏢', title: 'Gardiennage Statique', desc: 'Agents en poste fixe pour la surveillance permanente et le contrôle des accès de vos locaux.', id: 'gardiennage' },
  { icon: '🐕', title: 'Maîtres-Chiens', desc: 'Équipes cynophiles hautement formées pour une dissuasion maximale sur vos sites sensibles.', id: 'maitres-chiens' },
  { icon: '🎯', title: 'Sécurité Événementielle', desc: 'Protection complète et discrète pour vos événements privés et professionnels de toute envergure.', id: 'evenementiel' },
  { icon: '🚔', title: 'Rondes & Patrouilles', desc: "Surveillance mobile à intervalles variables pour dissuader toute tentative d'intrusion.", id: 'rondes' },
  { icon: '🛡️', title: 'Escorte & Protection', desc: 'Protection rapprochée pour personnalités, dirigeants et escorte sécurisée de convois de valeurs.', id: 'escorte' },
  { icon: '📷', title: 'Vidéosurveillance', desc: 'Installation et supervision de systèmes de vidéosurveillance modernes et connectés.', id: 'video' },
]

const WHY = [
  { num: '01', title: 'Agréés & Certifiés', desc: "Notre entreprise détient tous les agréments légaux du Ministère de l'Intérieur et les certifications requises." },
  { num: '02', title: 'Agents Hautement Formés', desc: 'Formation rigoureuse initiale et recyclages réguliers pour garantir un niveau d\'expertise de premier ordre.' },
  { num: '03', title: 'Disponibles 24h/24 — 7j/7', desc: 'Notre centre opérationnel est actif en permanence pour assurer la continuité totale de vos missions.' },
]

const TESTIMONIALS = [
  { name: 'Jean-Pierre Moukala', role: 'Directeur Général, Société Pétrolière', text: 'SECURITY GUARD nous accompagne depuis 3 ans. Un professionnalisme exemplaire et des agents toujours au rendez-vous. Je recommande sans hésitation.' },
  { name: 'Marie-Claire Ndoumbe', role: 'PDG, Groupe Immobilier Congo', text: 'La sécurité de nos chantiers et bureaux est assurée avec une rigueur remarquable. L\'équipe est réactive et très bien formée.' },
  { name: 'Henri Sassou', role: 'Organisateur Événementiel', text: 'Pour tous nos grands événements à Brazzaville, SECURITY GUARD est notre partenaire incontournable. Efficacité et discrétion au top !' },
]

const S = {
  section: (bg: string): React.CSSProperties => ({ background: bg, padding: '90px 0', fontFamily: "'Barlow', sans-serif" }),
  inner: (): React.CSSProperties => ({ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }),
  overline: (): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: 12, color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }),
  line: (): React.CSSProperties => ({ width: 40, height: 1, background: '#D4AF37' }),
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff' }}>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '140px 2rem 80px',
      }}>
        {/* Background photo */}
        <Image
          src="/images/hero-team.jpg"
          alt="Équipe Security Guard en mission"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.75)' }} />

        {/* Ambient glows */}
        <div style={{ position: 'absolute', top: '15%', left: '8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ maxWidth: 860, textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(212,175,55,0.25)', borderRadius: 2, padding: '8px 20px', marginBottom: 40 }}>
            <div style={{ width: 6, height: 6, background: '#D4AF37', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Filiale du Groupe Yannick</span>
          </div>

          {/* Logo badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 100, height: 100, position: 'relative' }}>
                <Image
                  src="/images/logo-badge.png"
                  alt="Security Guard"
                  fill
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4))' }}
                  priority
                />
              </div>
              {[0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6].map((deg, i) => (
                <div key={i} style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 8, height: 8, background: '#D4AF37', borderRadius: '50%',
                  transform: `rotate(${deg}deg) translate(58px) rotate(-${deg}deg) translate(-50%, -50%)`,
                }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px', lineHeight: 0.9, letterSpacing: '0.02em' }}>
            Votre Sécurité,
          </h1>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 32px', lineHeight: 0.9, letterSpacing: '0.02em', color: '#D4AF37' }}>
            Notre Priorité !
          </h1>

          <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 48px' }}>
            SECURITY GUARD vous offre des solutions de sécurité professionnelles et sur mesure pour protéger vos biens, vos équipes et vos événements à Brazzaville et dans toute la République du Congo.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
            <Link href="/devis" style={{ background: '#D4AF37', color: '#050A14', padding: '15px 36px', borderRadius: 4, fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#C9A227'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#D4AF37'}
            >
              → Demander un devis
            </Link>
            <Link href="/contact" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '15px 36px', borderRadius: 4, fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D4AF37'; (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF37' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
            >
              Nous contacter
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ background: 'rgba(8,13,26,0.85)', padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.02em', lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: 6, lineHeight: 1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div style={{ width: 20, height: 32, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section style={S.section('#080D1A')}>
        <div style={S.inner()}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...S.overline(), justifyContent: 'center' }}>
              <span style={S.line()} />Nos Services<span style={S.line()} />
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Des solutions <span style={{ color: '#D4AF37' }}>complètes</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {SERVICES.map((s) => (
              <Link href={`/services#${s.id}`} key={s.id} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#0D1525', border: '1px solid rgba(255,255,255,0.06)', padding: '36px 28px', transition: 'border-color 0.25s, background 0.25s', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.3)'; (e.currentTarget as HTMLDivElement).style.background = '#111827' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.background = '#0D1525' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 12, color: '#fff' }}>
                    {s.title}
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.65 }}>{s.desc}</p>
                  <div style={{ marginTop: 20, color: '#D4AF37', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>EN SAVOIR PLUS →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section style={S.section('#050A14')}>
        <div style={S.inner()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {/* Left: text */}
            <div>
              <div style={S.overline()}><span style={S.line()} />Excellence</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '0.03em', marginBottom: 16 }}>
                Pourquoi choisir<br /><span style={{ color: '#D4AF37' }}>Security Guard ?</span>
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 40 }}>
                Depuis 10 ans, SECURITY GUARD s&apos;impose comme le leader de la sécurité privée en République du Congo grâce à son excellence opérationnelle et son engagement indéfectible.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/a-propos" style={{ border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37', padding: '12px 24px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,175,55,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}
                >
                  Notre histoire →
                </Link>
              </div>
            </div>

            {/* Right: agents photo + WHY cards overlay */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 460 }}>
              <Image
                src="/images/agents.jpg"
                alt="Agents Security Guard en poste"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.4)' }} />
              {/* WHY cards overlaid */}
              <div style={{ position: 'relative', zIndex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                {WHY.map(({ num, title, desc }) => (
                  <div key={num} style={{ background: 'rgba(8,13,26,0.82)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start', backdropFilter: 'blur(4px)' }}>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'rgba(212,175,55,0.5)', lineHeight: 1, flexShrink: 0, minWidth: 36 }}>
                      {num}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{title}</div>
                      <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section style={{ background: '#080D1A', borderTop: '1px solid rgba(212,175,55,0.15)', borderBottom: '1px solid rgba(212,175,55,0.15)', padding: '32px 0', fontFamily: "'Barlow', sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Agrément Ministère Intérieur', 'RCCM Congo', 'NIF actif', 'Assurance RC Pro', '100% Agents certifiés'].map(c => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <span style={{ color: '#D4AF37', fontSize: 16 }}>✓</span> {c}
            </div>
          ))}
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─── */}
      <section style={S.section('#050A14')}>
        <div style={S.inner()}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ ...S.overline(), justifyContent: 'center' }}>
              <span style={S.line()} />Témoignages<span style={S.line()} />
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Ils nous font <span style={{ color: '#D4AF37' }}>confiance</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.05)', padding: '36px 28px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: '#D4AF37', fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#D4AF37', flexShrink: 0 }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                    <div style={{ color: '#475569', fontSize: '0.75rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ background: 'linear-gradient(135deg, #080D1A 0%, #0A1020 100%)', borderTop: '1px solid rgba(212,175,55,0.15)', padding: '90px 2rem', textAlign: 'center', fontFamily: "'Barlow', sans-serif", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, fill: '#D4AF37' }}>
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 16 }}>
            Prêt à sécuriser<br /><span style={{ color: '#D4AF37' }}>votre avenir ?</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75, marginBottom: 40 }}>
            Contactez-nous dès aujourd&apos;hui pour un audit de sécurité gratuit et un devis personnalisé sans engagement.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/devis" style={{ background: '#D4AF37', color: '#050A14', padding: '15px 36px', borderRadius: 4, fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              → Devis gratuit
            </Link>
            <a href="tel:+242066797878" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', padding: '15px 36px', borderRadius: 4, fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
              📞 066 797 878
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
