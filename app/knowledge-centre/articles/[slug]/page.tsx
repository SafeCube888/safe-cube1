import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/content/articles';
import { PageHero } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/typography';
import { CTADark } from '@/components/ui/cta';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    alternates: { canonical: `/knowledge-centre/articles/${article.slug}` },
  };
}

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

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const categoryLabel = categoryLabels[article.category] ?? article.category;
  const hasFullContent = article.bodyMarkdown && article.bodyMarkdown.length > 0;

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge Centre', href: '/knowledge-centre' },
          { label: 'Articles', href: '/knowledge-centre/articles' },
          { label: article.title },
        ]}
        eyebrow={categoryLabel}
        title={article.title}
        description={article.excerpt}
        image={pageImages.knowledgeCentreHero}
        imageAlt={pageImages.knowledgeCentreHeroAlt}
        variant="banner"
        theme="navy"
      />

      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">{categoryLabel}</Eyebrow>

          {hasFullContent ? (
            <div className="mt-6 space-y-4">
              {article.bodyMarkdown.split('\n').map((line, idx) => {
                if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-h3 mt-8 text-cube-navy">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-h4 mt-6 text-cube-navy">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-6 list-disc text-body-lg text-muted-foreground">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.match(/^\d+\.\s/)) {
                  return (
                    <li key={idx} className="ml-6 list-decimal text-body-lg text-muted-foreground">
                      {line.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <div key={idx} className="h-4" />;
                }
                return <p key={idx} className="text-body-lg text-muted-foreground">{line}</p>;
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-cube-soft bg-cube-soft p-6">
              <p className="text-sm text-muted-foreground">
                Full article content will be available soon. This page has been created as a safe placeholder using the approved title and excerpt from the SAFE CUBE master brief.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="green" size="lg">
              <Link href="/cube-score">GET FREE CUBE SCORE</Link>
            </Button>
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/knowledge-centre/articles">BACK TO ARTICLES</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Not Sure Where to Begin?"
            text="Start with a free CUBE SCORE and gain a clearer understanding of your workplace's current safety, compliance, and management readiness."
            primaryLabel="GET FREE CUBE SCORE"
            primaryHref="/cube-score"
            secondaryLabel="BOOK A CONSULTATION"
            secondaryHref="/book-consultation"
          />
        </Container>
      </section>
    </>
  );
}
