'use client'

import Link from 'next/link'
import Image from 'next/image'

const TIMELINE = [
  { year: '2014', title: 'Création de SECURITY GUARD', desc: 'Fondation au sein du Groupe Yannick. Premiers contrats de gardiennage à Brazzaville.' },
  { year: '2016', title: 'Expansion des services', desc: 'Lancement des unités maîtres-chiens et de la sécurité événementielle sur tout le territoire.' },
  { year: '2019', title: 'Certification nationale', desc: "Obtention de l'agrément officiel du Ministère de l'Intérieur de la République du Congo." },
  { year: '2021', title: 'Centre de formation interne', desc: 'Ouverture du centre de formation interne à Brazzaville. 200 agents certifiés.' },
  { year: '2024', title: '300+ clients protégés', desc: "Consolidation de notre position de leader de la sécurité privée au Congo-Brazzaville." },
]

const VALUES = [
  { num: '01', title: 'Intégrité', desc: 'Nous agissons avec honnêteté et transparence dans toutes nos relations professionnelles, sans exception.' },
  { num: '02', title: 'Excellence', desc: 'Nous visons la perfection dans chaque mission, avec des standards de qualité irréprochables.' },
  { num: '03', title: 'Engagement', desc: 'Nous nous engageons pleinement auprès de chaque client avec dévouement et professionnalisme.' },
  { num: '04', title: 'Solidarité', desc: "Nous formons une équipe soudée, unie autour d'un objectif commun : votre sécurité." },
]

const TEAM = [
  { name: 'Yannick MALONGA', role: 'Président Directeur Général', init: 'YM' },
  { name: 'Patrick ONDONGO', role: 'Directeur des Opérations', init: 'PO' },
  { name: 'Léonie BOUKAKA', role: 'Directrice Commerciale', init: 'LB' },
  { name: 'Serge MOUKALA', role: 'Chef des Agents de Sécurité', init: 'SM' },
]

const CERTS = [
  "Agrément du Ministère de l'Intérieur – République du Congo",
  "Registre du Commerce et du Crédit Mobilier (RCCM)",
  "Numéro d'Identification Fiscale (NIF) actif",
  'Affiliation à la CNSS – Protection sociale des agents',
  'Police d\'assurance Responsabilité Civile Professionnelle',
  'Formation Continue certifiée – Agents de sécurité',
]

export default function AboutPage() {
  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff' }}>

      {/* HERO with direction.jpg background */}
      <section style={{ position: 'relative', padding: '160px 2rem 80px', borderBottom: '1px solid rgba(212,175,55,0.15)', overflow: 'hidden', minHeight: 480 }}>
        <Image
          src="/images/direction.jpg"
          alt="Direction Security Guard"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.85)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Notre entreprise</span>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 0.95 }}>
            À Propos de <span style={{ color: '#D4AF37' }}>Security Guard</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
            Filiale du Groupe Yannick, nous protégeons les personnes, les biens et les événements en République du Congo avec professionnalisme depuis plus de 10 ans.
          </p>
        </div>
      </section>

      {/* HISTOIRE + TIMELINE */}
      <section style={{ padding: '90px 2rem', background: '#050A14' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

            {/* Text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
                <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Notre histoire</span>
              </div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 24 }}>
                Une décennie d&apos;excellence<br />en <span style={{ color: '#D4AF37' }}>sécurité privée</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#64748B', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 32 }}>
                <p>Fondée dans le cadre du Groupe Yannick, SECURITY GUARD est née d&apos;une vision : offrir à la République du Congo des services de sécurité privée à la hauteur des standards internationaux.</p>
                <p>Dès ses débuts, l&apos;entreprise s&apos;est imposée comme un acteur incontournable du secteur sécuritaire congolais, en investissant massivement dans la formation de ses agents et en dotant ses équipes des meilleurs équipements disponibles.</p>
                <p>Aujourd&apos;hui, SECURITY GUARD protège plus de 300 clients — des PME aux grandes entreprises pétrolières, en passant par les organisateurs d&apos;événements, les ambassades et les particuliers.</p>
              </div>
              {/* Reunion illustration image */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden', borderRadius: 4 }}>
                <Image
                  src="/images/reunion.jpg"
                  alt="Réunion de l'équipe Security Guard"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.35)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <span style={{ fontSize: '0.75rem', color: '#D4AF37', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Notre équipe en action</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 40 }}>
              <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.1))' }} />
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 36 : 0 }}>
                  <div style={{ position: 'absolute', left: -35, top: 2, width: 20, height: 20, borderRadius: '50%', background: '#080D1A', border: '2px solid #D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }} />
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALEURS */}
      <section style={{ padding: '90px 2rem', background: '#080D1A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase' }}>
              Mission, Vision & <span style={{ color: '#D4AF37' }}>Valeurs</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, marginBottom: 60 }}>
            {[
              { icon: '🎯', title: 'Notre Mission', text: 'Fournir des services de sécurité privée de haute qualité, adaptés aux besoins spécifiques de chaque client, en garantissant la protection des personnes, des biens et des installations.' },
              { icon: '👁️', title: 'Notre Vision', text: "Devenir le leader reconnu de la sécurité privée en République du Congo et en Afrique Centrale, en étant le partenaire de confiance des entreprises et des institutions." },
              { icon: '❤️', title: 'Nos Valeurs', text: 'Intégrité, Excellence, Engagement et Solidarité. Ces quatre piliers guident chacune de nos actions et font de SECURITY GUARD un partenaire fiable et responsable.' },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ background: '#0D1525', border: '1px solid rgba(255,255,255,0.05)', padding: '40px 32px' }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>{title}</h3>
                <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {VALUES.map(({ num, title, desc }) => (
              <div key={num} style={{ background: '#080D1A', border: '1px solid rgba(255,255,255,0.05)', padding: '28px 24px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, color: 'rgba(212,175,55,0.2)', lineHeight: 1, marginBottom: 12 }}>{num}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 8 }}>{title}</div>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉQUIPE with direction.jpg background */}
      <section style={{ padding: '90px 2rem', background: '#050A14', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/direction.jpg"
            alt="Direction Security Guard"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.92)' }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
              <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>L&apos;équipe</span>
              <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, textTransform: 'uppercase' }}>
              Notre <span style={{ color: '#D4AF37' }}>direction</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {TEAM.map(({ name, role, init }) => (
              <div key={name} style={{ background: 'rgba(8,13,26,0.88)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px 24px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                <div style={{ width: 72, height: 72, background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#D4AF37' }}>
                  {init}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{name}</div>
                <div style={{ color: '#475569', fontSize: '0.8rem' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: '90px 2rem', background: '#080D1A', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
              Agréments & <span style={{ color: '#D4AF37' }}>Certifications</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              SECURITY GUARD opère dans le strict respect du cadre légal congolais et des normes internationales.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{ background: '#0D1525', border: '1px solid rgba(255,255,255,0.05)', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: '#D4AF37', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.6 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 2rem', background: '#050A14', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 24 }}>
          Prêt à nous <span style={{ color: '#D4AF37' }}>rejoindre ?</span>
        </h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/devis" style={{ background: '#D4AF37', color: '#050A14', padding: '14px 32px', borderRadius: 4, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Demander un devis
          </Link>
          <Link href="/contact" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', padding: '14px 32px', borderRadius: 4, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Nous contacter
          </Link>
        </div>
      </section>
    </main>
  )
}
