'use client';
import { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import { Container } from '@/components/ui/layout';
import { ArticleCard } from '@/components/ui/cards';
import { InternalPageHero } from '@/components/ui/heroes';
import { articles } from '@/content/articles';

const categoryLabels: Record<string, string> = {
  safety: 'Workplace Safety',
  health: 'Health',
  environment: 'Environment',
  quality: 'Quality',
  compliance: 'Compliance',
  management: 'Practical Guidance',
  training: 'Training',
  industry: 'Industry',
};

const categories = Object.entries(categoryLabels).map(([value, label]) => ({ value, label }));
const resourceTypes = [
  { value: 'article', label: 'Articles' },
];

export default function ArticlesListingPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = !search ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      const matchesType = !selectedType || article.resourceType === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, selectedCategory, selectedType]);

  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Centre', href: '/knowledge-centre' }, { label: 'Articles' }]}
        title="Articles"
        description="Explore practical guidance, explanations, and workplace improvement resources from SAFE CUBE."
      />

      <section className="section-standard bg-white">
        <Container>
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search articles"
                className="w-full rounded-md border border-cube-soft bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${!selectedCategory ? 'bg-cube-green text-white' : 'bg-cube-soft text-cube-navy hover:bg-cube-soft/80'}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${selectedCategory === cat.value ? 'bg-cube-green text-white' : 'bg-cube-soft text-cube-navy hover:bg-cube-soft/80'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard
                  key={article.slug}
                  category={categoryLabels[article.category] ?? article.category}
                  title={article.title}
                  excerpt={article.excerpt}
                  href={`/knowledge-centre/articles/${article.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-cube-soft bg-cube-soft p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
              <p className="mt-4 text-body-lg text-muted-foreground">No articles found matching your search.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory(null); setSelectedType(null); }}
                className="mt-4 text-sm font-medium text-cube-green hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
