'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { env } from '@/lib/env';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const router = useRouter();

  const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      setError('You do not have admin access. Please contact an administrator.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cube-navy px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cube-green/20 ring-1 ring-cube-green/30">
            <ShieldCheck className="h-8 w-8 text-cube-green" />
          </div>
          <h1 className="text-2xl font-bold text-white">SAFE CUBE Admin</h1>
          <p className="mt-2 text-sm text-white/60">Sign in to access the admin dashboard</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white p-8">
          {resetSent ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Password reset instructions have been sent to your email address.
              </p>
              <button
                onClick={() => setResetSent(false)}
                className="mt-4 text-sm font-medium text-cube-green hover:underline"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-md bg-cube-red/10 p-3 text-sm text-cube-red" role="alert">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cube-navy">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-cube-soft px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
                  placeholder="admin@safecube.example"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-cube-navy">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-cube-soft px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
                  placeholder="Your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-md bg-cube-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cube-green/90 disabled:opacity-60"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                SIGN IN
              </button>

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full text-center text-sm text-muted-foreground hover:text-cube-green hover:underline"
              >
                Forgot your password?
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          SAFE CUBE — Strengthening Every Side of Your Business.
        </p>
      </div>
    </div>
  );
}
