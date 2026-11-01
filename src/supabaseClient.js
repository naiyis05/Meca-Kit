// MecaKit — Cliente oficial de Supabase (PostgreSQL + Auth + RLS por usuario)
import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || "https://cnjdybtocyrmdiulfzeo.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_GEcouh2LdNNvmjjGN6d-nQ_FN9rXMma";

export const REGISTER_USER_ENDPOINT = `${SUPABASE_URL}/functions/v1/register-user`;

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
