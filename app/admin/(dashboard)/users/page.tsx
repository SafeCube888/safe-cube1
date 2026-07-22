import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/admin-auth';
import { getAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Users | SAFE CUBE Admin',
};

export default async function AdminUsersPage() {
  const session = await getAdminSession();

  if (session?.role !== 'super_admin') {
    return (
      <div className="rounded-lg border border-cube-red/30 bg-cube-red/5 p-6">
        <h1 className="text-lg font-semibold text-cube-red">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">Only super admins can manage users.</p>
      </div>
    );
  }

  let users: Array<{ id: string; email: string; full_name: string | null; role: string; created_at: string }> = [];

  try {
    const admin = getAdminClient();
    const { data: profiles } = await admin.from('profiles').select('id, email, full_name, created_at');
    const { data: roles } = await admin.from('admin_roles').select('user_id, role');

    if (profiles && roles) {
      users = profiles.map((p) => ({
        ...p,
        role: roles.find((r) => r.user_id === p.id)?.role || 'none',
      }));
    }
  } catch {
    // Error
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-cube-navy">Admin Users</h1>

      <div className="overflow-x-auto rounded-lg border border-cube-soft bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cube-soft bg-cube-soft/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No admin users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-cube-soft last:border-0 hover:bg-cube-soft/20">
                  <td className="px-4 py-3 text-sm text-cube-navy">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{user.full_name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === 'super_admin'
                        ? 'bg-cube-green/10 text-cube-green'
                        : user.role === 'content_editor'
                        ? 'bg-cube-blue/10 text-cube-blue'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-lg border border-cube-soft bg-cube-soft/30 p-6">
        <h2 className="text-sm font-semibold text-cube-navy">Adding Admin Users</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          To add a new admin user, create an account in Supabase Auth, add a row to the <code className="rounded bg-cube-soft px-1.5 py-0.5 text-xs">profiles</code> table,
          and assign a role in the <code className="rounded bg-cube-soft px-1.5 py-0.5 text-xs">admin_roles</code> table.
          Only super admins can manage user roles.
        </p>
      </div>
    </div>
  );
}
