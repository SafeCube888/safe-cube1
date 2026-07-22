import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/admin-auth';
import { getAdminClient } from '@/lib/supabase/server';
import { SettingsForm } from '@/components/admin/SettingsForm';

export const metadata: Metadata = {
  title: 'Settings | SAFE CUBE Admin',
};

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  if (session?.role !== 'super_admin') {
    return (
      <div className="rounded-lg border border-cube-red/30 bg-cube-red/5 p-6">
        <h1 className="text-lg font-semibold text-cube-red">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">Only super admins can access settings.</p>
      </div>
    );
  }

  let settings = null;
  try {
    const admin = getAdminClient();
    const { data } = await admin.from('site_settings').select('*').maybeSingle();
    settings = data;
  } catch {
    // Settings will use fallback values
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-cube-navy">Site Settings</h1>
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
