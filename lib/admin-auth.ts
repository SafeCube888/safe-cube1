/**
 * SAFE CUBE — Admin Auth Helpers (server-side)
 *
 * Server-side authentication and authorization for admin routes.
 * Checks Supabase session and admin role from the database.
 */

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from './env';
import type { AdminRole } from '@/types/database';

export interface AdminSession {
  userId: string;
  email: string;
  role: AdminRole;
  fullName: string | null;
}

/**
 * Get the current admin session from server-side cookies.
 * Returns null if not authenticated or not an admin.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('sb-access-token')?.value;

  if (!accessToken) return null;

  const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: roleData } = await supabase
    .from('admin_roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!roleData) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email || '',
    role: roleData.role as AdminRole,
    fullName: profile?.full_name || null,
  };
}

/**
 * Require authentication for admin routes. Redirects to /admin/login if not authenticated.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

/**
 * Require super_admin role. Redirects to /admin if not super_admin.
 */
export async function requireSuperAdmin(): Promise<AdminSession> {
  const session = await requireAdmin();
  if (session.role !== 'super_admin') {
    redirect('/admin');
  }
  return session;
}

/**
 * Require content_editor role (or super_admin). Redirects to /admin/login if not authenticated.
 */
export async function requireContentEditor(): Promise<AdminSession> {
  const session = await requireAdmin();
  if (session.role !== 'super_admin' && session.role !== 'content_editor') {
    redirect('/admin');
  }
  return session;
}
