import type { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Downloads | SAFE CUBE Admin',
};

type Download = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  file_type: string | null;
  version: string | null;
  status: string;
  updated_at: string;
};

const statusColors: Record<string, string> = {
  published: 'bg-cube-green/10 text-cube-green',
  draft: 'bg-cube-amber/10 text-cube-amber',
  archived: 'bg-gray-100 text-gray-600',
};

export default async function AdminDownloadsPage() {
  let records: Download[] = [];
  let hasError = false;

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('downloads')
      .select('id, title, slug, description, file_type, version, status, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    records = (data || []) as Download[];
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cube-navy">Downloads</h1>
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
      <h1 className="text-2xl font-bold text-cube-navy">Downloads</h1>

      {records.length === 0 ? (
        <div className="rounded-xl border border-cube-soft bg-white p-6">
          <p className="text-sm text-muted-foreground">No records found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-cube-soft bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cube-soft bg-cube-soft/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">File Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Version</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Updated Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((download) => (
                <tr key={download.id} className="border-b border-cube-soft last:border-0 hover:bg-cube-soft/20">
                  <td className="px-4 py-3 text-sm text-cube-navy">{download.title}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{download.file_type || '—'}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{download.version || '—'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[download.status] || ''}`}>
                      {download.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-cube-navy">
                    {download.updated_at ? new Date(download.updated_at).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
