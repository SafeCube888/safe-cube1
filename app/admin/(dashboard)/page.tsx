import type { Metadata } from 'next';
import {
  Mail,
  ClipboardCheck,
  Calendar,
  GraduationCap,
  Wrench,
  Newspaper,
  ShoppingBag,
  FileText,
} from 'lucide-react';
import { getAdminSession } from '@/lib/admin-auth';
import { getAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Admin Dashboard | SAFE CUBE',
};

type CardConfig = {
  label: string;
  count: number | null;
  Icon: typeof Mail;
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();

  const cards: CardConfig[] = [];

  try {
    const supabase = getAdminClient();

    // New enquiries
    const { count: newEnquiries } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // New CUBE SCORE requests
    const { count: newCubeScore } = await supabase
      .from('cube_score_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // Consultations
    const { count: newConsultations } = await supabase
      .from('consultation_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // Training requests
    const { count: newTraining } = await supabase
      .from('training_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    // Open service requests (sum across four tables)
    const [
      { count: safeSnap },
      { count: cubeInsight },
      { count: cubeCare },
      { count: isoSupport },
    ] = await Promise.all([
      supabase
        .from('safe_snap_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabase
        .from('cube_insight_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabase
        .from('cube_care_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabase
        .from('iso_support_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new'),
    ]);

    const openServiceRequests =
      (safeSnap ?? 0) + (cubeInsight ?? 0) + (cubeCare ?? 0) + (isoSupport ?? 0);

    // Newsletter subscribers (total)
    const { count: newsletter } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true });

    // Store-launch subscribers (total)
    const { count: storeLaunch } = await supabase
      .from('store_launch_subscribers')
      .select('*', { count: 'exact', head: true });

    // Published articles
    const { count: publishedArticles } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    cards.push(
      { label: 'New Enquiries', count: newEnquiries, Icon: Mail },
      { label: 'New CUBE SCORE Requests', count: newCubeScore, Icon: ClipboardCheck },
      { label: 'Consultations', count: newConsultations, Icon: Calendar },
      { label: 'Training Requests', count: newTraining, Icon: GraduationCap },
      { label: 'Open Service Requests', count: openServiceRequests, Icon: Wrench },
      { label: 'Newsletter Subscribers', count: newsletter, Icon: Newspaper },
      { label: 'Store-Launch Subscribers', count: storeLaunch, Icon: ShoppingBag },
      { label: 'Published Articles', count: publishedArticles, Icon: FileText },
    );
  } catch {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-cube-navy">Admin Dashboard</h1>
          {session?.fullName ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {session.fullName}
              {session.role ? ` · ${session.role}` : ''}
            </p>
          ) : null}
        </header>
        <div className="rounded-xl border border-cube-soft bg-white p-6">
          <p className="text-sm text-muted-foreground">
            Unable to load data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-cube-navy">Admin Dashboard</h1>
        {session?.fullName ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {session.fullName}
            {session.role ? ` · ${session.role}` : ''}
          </p>
        ) : null}
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, count, Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-cube-soft bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold text-cube-navy">
                  {count && count > 0 ? count : 'No data yet'}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cube-green/10">
                <Icon className="h-6 w-6 text-cube-green" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
