# SECURITY GUARD — Site Web Officiel

Site web professionnel pour **SECURITY GUARD**, filiale du **Groupe Yannick**, entreprise de sécurité privée basée à Brazzaville, République du Congo.

---

## Stack Technique

| Technologie    | Version   | Rôle                        |
|----------------|-----------|-----------------------------|
| Next.js        | 16.x      | Framework React (App Router) |
| React          | 19.x      | UI                          |
| Tailwind CSS   | 4.x       | Styling                     |
| Supabase       | 2.x       | Base de données PostgreSQL  |
| Lucide React   | Latest    | Icônes                      |
| TypeScript     | 5.x       | Typage statique             |

---

## Structure du Projet

```
security-guard/
├── app/
│   ├── layout.tsx              # Layout racine (Navbar, Footer, WhatsApp)
│   ├── page.tsx                # Page Accueil (/)
│   ├── a-propos/page.tsx       # Page À Propos (/a-propos)
│   ├── services/page.tsx       # Page Services (/services)
│   ├── contact/page.tsx        # Page Contact (/contact)
│   ├── devis/page.tsx          # Page Devis multi-étapes (/devis)
│   ├── rendez-vous/page.tsx    # Page RDV (/rendez-vous)
│   ├── sitemap.ts              # Sitemap XML auto-généré
│   ├── robots.ts               # Robots.txt
│   └── admin/
│       ├── page.tsx            # Login admin (/admin)
│       ├── layout.tsx          # Layout admin (pas de Navbar/Footer)
│       ├── dashboard/page.tsx  # Tableau de bord
│       ├── devis/page.tsx      # Gestion des demandes de devis
│       ├── rendez-vous/page.tsx# Gestion des rendez-vous
│       ├── messages/page.tsx   # Gestion des messages contact
│       └── contenu/page.tsx    # Éditeur de contenu
├── components/
│   ├── Navbar.tsx              # Barre de navigation (avec switch FR/EN)
│   ├── Footer.tsx              # Pied de page
│   ├── WhatsAppButton.tsx      # Bouton flottant WhatsApp
│   └── AdminShell.tsx          # Coque du back-office admin
├── lib/
│   ├── supabase.ts             # Client Supabase
│   ├── utils.ts                # Fonctions utilitaires
│   ├── translations.ts         # Traductions FR/EN
│   └── locale-context.tsx      # Context React pour la langue
├── supabase/
│   └── schema.sql              # Schéma SQL à exécuter dans Supabase
└── .env.local                  # Variables d'environnement (ne pas committer)
```

---

## Installation & Lancement

### 1. Cloner et installer

```bash
git clone <votre-repo>
cd security-guard
npm install
```

### 2. Variables d'environnement

Copier `.env.example` en `.env.local` :

```bash
cp .env.example .env.local
```

Remplir avec vos vraies valeurs Supabase :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Aller dans **SQL Editor**
3. Copier-coller le contenu de `supabase/schema.sql`
4. Exécuter

### 4. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Pages du Site

| Route          | Description                              |
|----------------|------------------------------------------|
| `/`            | Accueil — Hero, services, témoignages    |
| `/a-propos`    | Histoire, mission, vision, équipe        |
| `/services`    | Présentation détaillée de 5 services     |
| `/contact`     | Formulaire + carte + coordonnées         |
| `/devis`       | Formulaire devis en 4 étapes             |
| `/rendez-vous` | Formulaire prise de rendez-vous          |

### Back-office Admin

| Route                  | Description                    |
|------------------------|--------------------------------|
| `/admin`               | Page de connexion              |
| `/admin/dashboard`     | Statistiques & aperçu          |
| `/admin/devis`         | Gestion des demandes de devis  |
| `/admin/rendez-vous`   | Gestion des rendez-vous        |
| `/admin/messages`      | Messages de contact            |
| `/admin/contenu`       | Éditeur de contenu du site     |

**Identifiants admin par défaut :**
- Email : `admin@groupeyannick.com`
- Mot de passe : `Admin2024!`

> ⚠️ **Changer ces identifiants en production** dans `lib/admin-auth.ts`

---

## Déploiement sur Vercel

### 1. Préparer le dépôt Git

```bash
git init
git add .
git commit -m "Initial commit — SECURITY GUARD website"
git remote add origin https://github.com/votre-compte/security-guard.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer **New Project** → Importer le dépôt GitHub
3. Dans **Environment Variables**, ajouter :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (votre domaine Vercel ou custom)
4. Cliquer **Deploy**

### 3. Domaine personnalisé (optionnel)

Dans Vercel → Settings → Domains, ajouter votre domaine (ex: `securityguard.groupeyannick.com`)

---

## Fonctionnalités

- ✅ Site multilingue FR/EN (switch dans la navbar)
- ✅ Bouton WhatsApp flottant (toutes les pages)
- ✅ Formulaire de contact avec sauvegarde Supabase
- ✅ Formulaire devis multi-étapes (4 étapes)
- ✅ Prise de rendez-vous en ligne
- ✅ SEO optimisé (meta tags, Open Graph, sitemap, robots.txt)
- ✅ 100% Responsive (mobile, tablette, desktop)
- ✅ Back-office admin avec authentification
- ✅ Gestion complète des demandes (devis, RDV, messages)
- ✅ Éditeur de contenu en ligne
- ✅ Design professionnel et moderne

---

## Identité Visuelle

| Couleur        | Code Hex  | Usage                       |
|----------------|-----------|-----------------------------|
| Bleu ciel      | `#3B9ED4` | Couleur principale          |
| Jaune/Or       | `#F5C518` | Accent, CTA, logo           |
| Bleu marine    | `#1B3A6B` | Boutons secondaires         |
| Bleu très foncé| `#0D1B2A` | Fond hero, navbar, footer   |

**Contact entreprise :**
- 📍 2549, Rue Charles Foucault, Centre-Ville, Brazzaville, Congo
- 📞 066 797 878 / 066 207 878
- 📧 contact@groupeyannick.com
- 🌐 www.groupeyannick.com

---

*© 2024 SECURITY GUARD — Filiale du Groupe Yannick*
