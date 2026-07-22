/**
 * SAFE CUBE — Server Supabase Client
 *
 * Server-side helpers for Next.js App Router server components, route handlers,
 * and server actions. Uses the service role key to bypass RLS for admin
 * operations — NEVER import this in client components.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '../env';

/**
 * Returns a Supabase client using the service role key, bypassing RLS.
 * Use ONLY in server components, route handlers, and server actions for
 * admin operations. NEVER import in client components.
 */
export function getAdminClient(): SupabaseClient {
  if (!env.supabaseServiceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured. Admin operations require the service role key.');
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
