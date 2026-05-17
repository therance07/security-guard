import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://securityguard.groupeyannick.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/devis`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rendez-vous`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
