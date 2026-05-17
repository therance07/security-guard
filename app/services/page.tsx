'use client'

import Link from 'next/link'
import Image from 'next/image'

const SERVICES = [
  {
    id: 'gardiennage',
    image: '/images/agent-phone.jpg',
    tag: 'Service phare',
    title: 'Gardiennage Statique',
    desc: "Nos agents de gardiennage statique sont déployés en poste fixe pour assurer la surveillance permanente de vos locaux, contrôler les accès et garantir la sécurité de vos installations.",
    advantages: [
      'Présence dissuasive permanente 24h/24 et 7j/7',
      'Contrôle rigoureux des entrées et sorties',
      'Filtrage des visiteurs et gestion des badges',
      "Rédaction de rapports d'incident détaillés",
      'Communication radio en temps réel',
      'Gestion des rondes internes selon planning',
    ],
  },
  {
    id: 'maitres-chiens',
    image: '/images/k9.jpg',
    tag: 'Sécurité renforcée',
    title: 'Maîtres-Chiens',
    desc: "Nos équipes cynophiles associent la vigilance d'un agent qualifié à l'instinct naturel d'un chien spécialement dressé. Ce binôme puissant dissuade toute tentative d'intrusion et renforce considérablement la sécurité de vos sites.",
    advantages: [
      'Dissuasion maximale sur les sites sensibles',
      "Détection d'intrus invisible à l'œil humain",
      'Patrouilles périmètriques nocturnes renforcées',
      'Chiens spécialisés : détection, garde, pistage',
      'Équipes certifiées et régulièrement évaluées',
      'Adaptés aux entrepôts, chantiers et propriétés privées',
    ],
  },
  {
    id: 'evenementiel',
    image: '/images/reunion.jpg',
    tag: 'Tous événements',
    title: 'Sécurité Événementielle',
    desc: "Concerts, conférences, galas, cérémonies d'État, salons professionnels… SECURITY GUARD déploie des dispositifs de sécurité complets et discrets pour que vos événements se déroulent dans les meilleures conditions.",
    advantages: [
      'Planification sécuritaire pré-événement',
      'Contrôle des accès et gestion des flux',
      'Agents en tenue civile ou uniforme selon besoin',
      'Coordination avec les forces de l\'ordre',
      "Dispositif anti-intrusion et périmètre de sécurité",
      'Gestion des situations de crise et évacuation',
    ],
  },
  {
    id: 'rondes',
    image: '/images/hero-team.jpg',
    tag: 'Surveillance mobile',
    title: 'Rondes & Patrouilles',
    desc: "Nos agents mobiles effectuent des rondes régulières et imprévisibles sur vos sites, garantissant une surveillance dynamique et dissuasive. Service idéal pour les entreprises souhaitant une sécurité optimale sans présence permanente.",
    advantages: [
      'Rondes à intervalles variables et imprévisibles',
      'Vérification des portes, fenêtres et issues',
      'Rapport de ronde transmis en temps réel',
      "Intervention rapide en cas d'anomalie détectée",
      'Patrouilles de nuit et jours fériés',
      'Couverture multi-sites possible',
    ],
  },
  {
    id: 'escorte',
    image: '/images/bureau.jpg',
    tag: 'VIP & Convois',
    title: 'Escorte & Protection Rapprochée',
    desc: "Nos agents spécialisés garantissent la sécurité physique de personnalités, dirigeants d'entreprise, expatriés et convois de valeurs. Une protection discrète, efficace et professionnelle.",
    advantages: [
      'Analyse préalable des menaces et risques',
      'Protection rapprochée VIP et hauts responsables',
      'Escorte de convois de fonds et de valeurs',
      'Sécurisation des déplacements privés',
      'Agents discrets en tenue civile',
      'Véhicules banalisés disponibles',
    ],
  },
  {
    id: 'video',
    image: '/images/cctv.jpg',
    extraImages: ['/images/operateur.jpg', '/images/cctv-pole.png'],
    tag: 'Technologies',
    title: 'Vidéosurveillance',
    desc: "Installation, paramétrage et supervision de systèmes de vidéosurveillance IP modernes. Accès à distance, enregistrement 24h/24 et alertes en temps réel pour une sécurité totale de vos sites.",
    advantages: [
      'Caméras HD intérieures et extérieures',
      'Accès à distance via smartphone ou PC',
      'Enregistrement continu ou sur détection',
      "Intégration avec les systèmes d'alarme",
      'Maintenance préventive incluse',
      'Archivage sécurisé des enregistrements',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main style={{ fontFamily: "'Barlow', sans-serif", background: '#050A14', color: '#fff' }}>

      {/* HERO */}
      <section style={{ padding: '160px 2rem 80px', background: 'linear-gradient(180deg, #080D1A 0%, #050A14 100%)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
            <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Ce que nous faisons</span>
            <div style={{ width: 40, height: 1, background: '#D4AF37' }} />
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 16px', lineHeight: 0.95 }}>
            Nos <span style={{ color: '#D4AF37' }}>Services</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75 }}>
            Des solutions de sécurité professionnelles et sur mesure pour chaque besoin, chaque secteur d&apos;activité et chaque contexte opérationnel.
          </p>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section style={{ padding: '80px 2rem', background: '#050A14' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              style={{
                background: '#080D1A',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '48px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 48,
                alignItems: 'start',
                scrollMarginTop: 90,
              }}
            >
              {/* Left: Info */}
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <span style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 2 }}>
                    {s.tag}
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 16 }}>
                  {s.title}
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 28 }}>{s.desc}</p>
                <Link href="/devis" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D4AF37', color: '#050A14', padding: '12px 24px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  → Devis pour ce service
                </Link>
              </div>

              {/* Right: Image + Advantages */}
              <div style={{ order: i % 2 === 1 ? 1 : 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Main image */}
                <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.6)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#D4AF37' }}>
                      {s.title}
                    </span>
                  </div>
                </div>

                {/* Extra images for CCTV */}
                {s.extraImages && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    {s.extraImages.map((img, ei) => (
                      <div key={ei} style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
                        <Image src={img} alt={`Vidéosurveillance ${ei + 2}`} fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,20,0.5)' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Advantages */}
                <div style={{ background: '#0D1525', border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: 16 }}>
                    Nos avantages
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.advantages.map(a => (
                      <li key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.85rem', color: '#64748B' }}>
                        <span style={{ color: '#D4AF37', flexShrink: 0, marginTop: 1 }}>✓</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 2rem', background: 'linear-gradient(135deg, #080D1A 0%, #0A1020 100%)', borderTop: '1px solid rgba(212,175,55,0.15)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 16 }}>
            Besoin d&apos;une solution <span style={{ color: '#D4AF37' }}>sur mesure ?</span>
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 36 }}>
            Nos experts évaluent gratuitement vos besoins et vous proposent le dispositif le plus adapté.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/devis" style={{ background: '#D4AF37', color: '#050A14', padding: '14px 32px', borderRadius: 4, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              → Devis gratuit
            </Link>
            <Link href="/rendez-vous" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#94A3B8', padding: '14px 32px', borderRadius: 4, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Prendre un rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
