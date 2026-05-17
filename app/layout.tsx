import type { Metadata } from 'next'
import './globals.css'
import { LocaleProvider } from '@/lib/locale-context'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL?.replace(/^﻿/, '') ?? 'http://localhost:3000'
  ),
  title: 'SECURITY GUARD | Votre Sécurité, Notre Priorité !',
  description: 'SECURITY GUARD, filiale du Groupe Yannick, offre des solutions de sécurité professionnelles à Brazzaville, Congo : gardiennage, maîtres-chiens, sécurité événementielle, rondes, escorte et protection rapprochée.',
  keywords: 'sécurité privée, gardiennage, Brazzaville, Congo, SECURITY GUARD, Groupe Yannick, agents de sécurité, protection rapprochée',
  authors: [{ name: 'SECURITY GUARD - Groupe Yannick' }],
  openGraph: {
    title: 'SECURITY GUARD | Votre Sécurité, Notre Priorité !',
    description: 'Solutions de sécurité professionnelles à Brazzaville, République du Congo.',
    url: 'https://securityguard.groupeyannick.com',
    siteName: 'SECURITY GUARD',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SECURITY GUARD' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SECURITY GUARD | Votre Sécurité, Notre Priorité !',
    description: 'Solutions de sécurité professionnelles à Brazzaville, République du Congo.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ background: '#050A14', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LocaleProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <WhatsAppButton />
        </LocaleProvider>
      </body>
    </html>
  )
}
