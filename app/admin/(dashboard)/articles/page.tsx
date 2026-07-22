import type { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Articles | SAFE CUBE Admin',
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  featured: boolean;
  published_at: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  published: 'bg-cube-green/10 text-cube-green',
  draft: 'bg-cube-amber/10 text-cube-amber',
  archived: 'bg-gray-100 text-gray-600',
};

export default async function AdminArticlesPage() {
  let records: Article[] = [];
  let hasError = false;

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, status, featured, published_at, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    records = (data || []) as Article[];
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cube-navy">Articles</h1>
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
      <h1 className="text-2xl font-bold text-cube-navy">Articles</h1>

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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Published Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((article) => (
                <tr key={article.id} className="border-b border-cube-soft last:border-0 hover:bg-cube-soft/20">
                  <td className="px-4 py-3 text-sm text-cube-navy">{article.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{article.slug}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[article.status] || ''}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-cube-navy">{article.featured ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-sm text-cube-navy">
                    {article.published_at ? new Date(article.published_at).toLocaleDateString() : '—'}
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
