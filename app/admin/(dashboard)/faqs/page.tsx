import type { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'FAQs | SAFE CUBE Admin',
};

type Faq = {
  id: string;
  question: string;
  answer: string | null;
  category: string | null;
  sort_order: number | null;
  status: string;
};

const statusColors: Record<string, string> = {
  published: 'bg-cube-green/10 text-cube-green',
  draft: 'bg-cube-amber/10 text-cube-amber',
  archived: 'bg-gray-100 text-gray-600',
};

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export default async function AdminFaqsPage() {
  let records: Faq[] = [];
  let hasError = false;

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('id, question, answer, category, sort_order, status')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    records = (data || []) as Faq[];
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cube-navy">FAQs</h1>
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
      <h1 className="text-2xl font-bold text-cube-navy">FAQs</h1>

      {records.length === 0 ? (
        <div className="rounded-xl border border-cube-soft bg-white p-6">
          <p className="text-sm text-muted-foreground">No records found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-cube-soft bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cube-soft bg-cube-soft/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Question</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((faq) => (
                <tr key={faq.id} className="border-b border-cube-soft last:border-0 hover:bg-cube-soft/20">
                  <td className="px-4 py-3 text-sm text-cube-navy">{truncate(faq.question, 60)}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{faq.category || '—'}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{faq.sort_order ?? '—'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[faq.status] || ''}`}>
                      {faq.status}
                    </span>
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
