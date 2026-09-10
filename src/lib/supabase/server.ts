import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Valeurs publiques du projet Supabase des deux sites vitrines — InSports et
 * Inpoints écrivent dans la même table `demo_requests`, distinguées par sa
 * colonne `product` : un seul endroit à surveiller pour les demandes.
 *
 * La clé publiable est faite pour être exposée : la sécurité au niveau des
 * lignes ne laisse à `anon` que l'INSERT (aucune relecture), donc l'embarquer
 * ici garde le formulaire fonctionnel en production sans configuration.
 * Toute variable d'environnement prend le dessus sur ces valeurs.
 */
const PUBLIC_SUPABASE_URL = "https://qjztxczlslbkhrwvovlv.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "sb_publishable_GCQtjgBbsGmOaSMsaGzsTw_zVT5vo1m";

/**
 * Server-only Supabase client used by API routes to store demo requests.
 * Returns null only if neither env vars nor the public defaults are available.
 */
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
