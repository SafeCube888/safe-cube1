import type { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';
import { LeadPageClient } from '@/components/admin/LeadPageClient';
import type { LeadRecord } from '@/components/admin/LeadTable';

export const metadata: Metadata = {
  title: 'Consultations | SAFE CUBE Admin',
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'company', label: 'Company' },
  { key: 'service_interest', label: 'Service Interest' },
  {
    key: 'status',
    label: 'Status',
    render: (value: unknown) => {
      const status = value as string;
      const colors: Record<string, string> = {
        new: 'bg-cube-blue/10 text-cube-blue',
        contacted: 'bg-cube-amber/10 text-cube-amber',
        qualified: 'bg-cube-green/10 text-cube-green',
        in_progress: 'bg-cube-purple/10 text-cube-purple',
        closed: 'bg-cube-navy/10 text-cube-navy',
        archived: 'bg-gray-100 text-gray-600',
      };
      return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || ''}`}>
          {status.replace(/_/g, ' ')}
        </span>
      );
    },
  },
  {
    key: 'created_at',
    label: 'Created',
    render: (value: unknown) => new Date(value as string).toLocaleDateString(),
  },
];

export default async function AdminConsultationsPage() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (
      <LeadPageClient
        title="Consultations"
        records={(data || []) as LeadRecord[]}
        columns={columns}
        tableName="consultation_requests"
      />
    );
  } catch {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cube-navy">Consultations</h1>
        <div className="rounded-xl border border-cube-soft bg-white p-6">
          <p className="text-sm text-muted-foreground">
            Unable to load data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
