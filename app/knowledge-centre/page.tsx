import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, ThreeColumnGrid } from '@/components/ui/layout';
import { ArticleCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from '@/components/ui/newsletter-form';
import { articles } from '@/content/articles';
import { downloads } from '@/content/downloads';

export const metadata: Metadata = {
  title: 'Knowledge Centre | SAFE CUBE',
  description:
    'Explore straightforward guidance, checklists, explanations, and workplace improvement resources created for business owners, managers, supervisors, and employees.',
  alternates: { canonical: '/knowledge-centre' },
};

const contentCategories = [
  { title: 'Articles', description: 'Practical guidance on workplace safety, risk assessment, compliance, and management systems.', href: '/knowledge-centre/articles', count: articles.length },
  { title: 'Guides & Checklists', description: 'Step-by-step guides and practical checklists for workplace safety and compliance.', href: '/knowledge-centre/guides', count: downloads.length },
  { title: 'Downloads', description: 'Downloadable templates, registers, and forms for workplace documentation.', href: '/knowledge-centre/downloads', count: downloads.length },
  { title: 'FAQs', description: 'Answers to common questions about SAFE CUBE services and workplace safety.', href: '/faqs' },
  { title: 'Workplace Safety Glossary', description: 'Clear explanations of common QHSE, safety, compliance, and management-system terms.', href: '/knowledge-centre/glossary' },
];

export default function KnowledgeCentrePage() {
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);

  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Centre' }]}
        title="Practical Knowledge for Safer, Stronger Workplaces"
        description="Explore straightforward guidance, checklists, explanations, and workplace improvement resources created for business owners, managers, supervisors, and employees."
      />

      {/* Content Categories */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">EXPLORE</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Content Categories</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contentCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="block rounded-lg border border-cube-soft bg-cube-soft p-6 transition-colors hover:border-cube-green hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-cube-navy">{cat.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cube-green">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Articles */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">FEATURED ARTICLES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Featured Articles</SectionHeading>
          </div>
          <ThreeColumnGrid>
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                category={article.category}
                title={article.title}
                excerpt={article.excerpt}
                href={`/knowledge-centre/articles/${article.slug}`}
              />
            ))}
          </ThreeColumnGrid>
          <div className="mt-8 text-center">
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/knowledge-centre/articles">
                VIEW ALL ARTICLES <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <div className="rounded-lg border border-cube-soft bg-cube-soft p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cube-green/10">
              <Mail className="h-6 w-6 text-cube-green" aria-hidden="true" />
            </div>
            <h2 className="text-h3">Stay Updated with SAFE CUBE Knowledge</h2>
            <p className="mt-3 text-body-lg text-muted-foreground">
              Subscribe to receive new articles, guides, and workplace improvement resources directly to your inbox.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
