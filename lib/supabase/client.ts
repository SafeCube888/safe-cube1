/**
 * SAFE CUBE — Browser Supabase Client
 *
 * Singleton instance for client-side operations using the anon key.
 * All RLS policies apply to this client.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '../env';

let browserClient: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  browserClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}
