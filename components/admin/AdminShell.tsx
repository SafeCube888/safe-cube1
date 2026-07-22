'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Mail, Calendar, ClipboardCheck, BookOpen, Download, FileText, Settings, Users, LogOut, Menu, X, GraduationCap } from 'lucide-react';
import { env } from '@/lib/env';
import type { AdminRole } from '@/types/database';

interface AdminUser {
  email: string;
  role: AdminRole;
  fullName: string | null;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['super_admin', 'content_editor'] },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Mail, roles: ['super_admin', 'content_editor'] },
  { label: 'CUBE SCORE', href: '/admin/cube-score', icon: ClipboardCheck, roles: ['super_admin', 'content_editor'] },
  { label: 'Consultations', href: '/admin/consultations', icon: Calendar, roles: ['super_admin', 'content_editor'] },
  { label: 'Training', href: '/admin/training', icon: GraduationCap, roles: ['super_admin', 'content_editor'] },
  { label: 'Articles', href: '/admin/articles', icon: BookOpen, roles: ['super_admin', 'content_editor'] },
  { label: 'Downloads', href: '/admin/downloads', icon: Download, roles: ['super_admin', 'content_editor'] },
  { label: 'FAQs', href: '/admin/faqs', icon: FileText, roles: ['super_admin', 'content_editor'] },
  { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin'] },
  { label: 'Users', href: '/admin/users', icon: Users, roles: ['super_admin'] },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data: roleData } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!roleData) {
        router.push('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .maybeSingle();

      setUser({
        email: session.user.email || '',
        role: roleData.role as AdminRole,
        fullName: profile?.full_name || null,
      });
      setLoading(false);
    })();
  }, [router, supabase]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cube-navy">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const filteredNav = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-cube-soft">
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-cube-soft bg-cube-navy px-4 py-3 lg:hidden">
        <Link href="/admin" className="text-lg font-bold text-white">SAFE CUBE Admin</Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-cube-soft bg-cube-navy transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="hidden border-b border-white/10 px-6 py-4 lg:block">
              <Link href="/admin" className="text-lg font-bold text-white">SAFE CUBE Admin</Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive ? 'bg-cube-green text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 px-3 text-xs text-white/50">
                {user.fullName || user.email}
              </div>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
