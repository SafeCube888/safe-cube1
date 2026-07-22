import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, ThreeColumnGrid } from '@/components/ui/layout';
import { IndustryCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';
import { Button } from '@/components/ui/button';
import { industries } from '@/content/industries';

export const metadata: Metadata = {
  title: 'Industries Supported by SAFE CUBE',
  description:
    'Explore practical QHSE, safety, compliance, training, and workplace improvement support for multiple industries.',
  alternates: { canonical: '/industries' },
};

const whyChoose = [
  { icon: 'users', title: 'People First', description: 'We prioritize the health, safety, dignity, and wellbeing of people at work.' },
  { icon: 'shield', title: 'Risk Focused', description: 'We identify significant risks early and help prevent incidents, losses, and repeated failures.' },
  { icon: 'clipboard', title: 'Practical Approach', description: 'Our recommendations are designed to be realistic, proportionate, understandable, and actionable.' },
  { icon: 'refresh', title: 'Continuous Support', description: 'We remain available beyond the report to support implementation and continual improvement.' },
  { icon: 'badge', title: 'Built on Standards', description: 'Our approach aligns with recognized QHSE principles, ISO management-system concepts, and relevant good practices.' },
  { icon: 'settings', title: 'Local Understanding', description: 'We consider local workplace realities, business constraints, regulatory expectations, and operating conditions.' },
];

export default function IndustriesPage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        title="Supporting Real Workplaces Across Multiple Industries"
        description="Every workplace is different. SAFE CUBE adapts its assessments, checklists, recommendations, documentation, and support to your actual operations."
      />

      {/* All 12 industries */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">INDUSTRIES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Industries We Support</SectionHeading>
          </div>
          <ThreeColumnGrid>
            {industries.map((industry) => (
              <IndustryCard
                key={industry.slug}
                icon={industry.iconName ?? 'industries'}
                name={industry.name}
                description={industry.cardSummary}
                href={`/industries/${industry.slug}`}
                color="green"
              />
            ))}
          </ThreeColumnGrid>
        </Container>
      </section>

      {/* Why Businesses Choose SAFE CUBE */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">WHY SAFE CUBE</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Why Businesses Choose SAFE CUBE</SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE is more than a visit, checklist, or report. We work to understand your people, operations, priorities, and constraints so that our recommendations are relevant, realistic, and capable of being implemented.
            </SectionIntro>
          </div>
          <ThreeColumnGrid>
            {whyChoose.map((benefit) => (
              <div key={benefit.title} className="rounded-lg border border-cube-soft bg-white p-6">
                <h3 className="text-lg font-semibold text-cube-navy">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </ThreeColumnGrid>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-white">
        <Container>
          <CTADark
            heading="Do You Know Where Your Workplace Stands?"
            text="Start with a free CUBE SCORE to gain a structured overview of your workplace readiness, identify priority gaps, and understand which improvements deserve immediate attention."
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
