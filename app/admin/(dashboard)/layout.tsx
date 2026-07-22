import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import { AdminShell } from '@/components/admin/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // Login page is rendered without the admin shell
  if (!session) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
