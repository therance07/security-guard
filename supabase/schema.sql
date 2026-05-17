-- =============================================
-- SECURITY GUARD — Schéma Supabase PostgreSQL
-- Exécuter dans l'éditeur SQL de Supabase
-- =============================================

-- ── Table : devis ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.devis (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom         TEXT NOT NULL,
  entreprise  TEXT,
  email       TEXT NOT NULL,
  telephone   TEXT,
  services    TEXT,
  lieu        TEXT,
  duree       TEXT,
  agents      TEXT,
  description TEXT,
  statut      TEXT NOT NULL DEFAULT 'nouveau',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Table : rendez_vous ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.rendez_vous (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom              TEXT NOT NULL,
  email            TEXT NOT NULL,
  telephone        TEXT,
  objet            TEXT,
  date_souhaitee   DATE,
  heure_souhaitee  TIME,
  message          TEXT,
  statut           TEXT NOT NULL DEFAULT 'en_attente',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Table : contacts ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom        TEXT NOT NULL,
  email      TEXT NOT NULL,
  telephone  TEXT,
  message    TEXT NOT NULL,
  lu         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Table : contenu_site ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contenu_site (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cle        TEXT UNIQUE NOT NULL,
  valeur     TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS (Row Level Security) ──────────────────────────────────────
-- Activer RLS sur toutes les tables
ALTER TABLE public.devis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rendez_vous ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contenu_site ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer (formulaires publics)
CREATE POLICY "allow_public_insert_devis" ON public.devis
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_public_insert_rdv" ON public.rendez_vous
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "allow_public_insert_contacts" ON public.contacts
  FOR INSERT TO anon WITH CHECK (true);

-- Politique : lecture publique du contenu du site
CREATE POLICY "allow_public_read_contenu" ON public.contenu_site
  FOR SELECT TO anon USING (true);

-- Politique : service role peut tout faire
CREATE POLICY "allow_service_all_devis" ON public.devis
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "allow_service_all_rdv" ON public.rendez_vous
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "allow_service_all_contacts" ON public.contacts
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "allow_service_all_contenu" ON public.contenu_site
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ── Données initiales contenu ─────────────────────────────────────
INSERT INTO public.contenu_site (cle, valeur) VALUES
  ('hero_titre', 'Votre Sécurité, Notre Priorité !'),
  ('hero_sous_titre', 'SECURITY GUARD vous offre des solutions de sécurité professionnelles et sur mesure pour protéger vos biens, vos équipes et vos événements à Brazzaville et dans toute la République du Congo.'),
  ('stats_annees', '10+'),
  ('stats_agents', '500+'),
  ('stats_clients', '300+'),
  ('stats_missions', '1000+'),
  ('adresse', '2549, Rue Charles Foucault, Centre-Ville, Brazzaville, République du Congo'),
  ('telephone_1', '066797878'),
  ('telephone_2', '066207878'),
  ('email', 'contact@groupeyannick.com'),
  ('slogan', 'Votre Sécurité, Notre Priorité !')
ON CONFLICT (cle) DO NOTHING;
