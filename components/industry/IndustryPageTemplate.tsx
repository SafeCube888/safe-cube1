import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading } from '@/components/ui/typography';
import { Container, TwoColumnLayout } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { CTADark } from '@/components/ui/cta';
import { PageHero, VisualChecklist, ProcessTimeline, VisualFeatureGrid } from '@/components/ui/visual-sections';
import { industryImages, pageImages } from '@/content/images';
import type { Industry } from '@/types/content';

const relevantSolutions = [
  { label: 'SAFE SNAP', href: '/solutions/safe-snap' },
  { label: 'CUBE SCORE', href: '/cube-score' },
  { label: 'CUBE INSIGHT', href: '/solutions/cube-insight' },
  { label: 'CUBE CARE', href: '/solutions/cube-care' },
  { label: 'Training', href: '/training' },
  { label: 'ISO & Management Systems', href: '/solutions/iso-management-systems' },
  { label: 'Risk Assessment & Workplace Audits', href: '/solutions/risk-assessment-audits' },
  { label: 'Documentation & Compliance Support', href: '/solutions/documentation-compliance' },
];

const engagementSteps = [
  { step: 1, title: 'Initial Discussion', text: 'We discuss your operations, concerns, and objectives to understand your workplace context.' },
  { step: 2, title: 'Assessment', text: 'We conduct an assessment appropriate to your needs, from a quick observation to a detailed evaluation.' },
  { step: 3, title: 'Recommendations', text: 'We provide practical recommendations, documentation, and a prioritised action plan.' },
  { step: 4, title: 'Ongoing Support', text: 'We support implementation, training, and continual improvement through CUBE CARE if needed.' },
];

export interface IndustryPageTemplateProps {
  industry: Industry;
  recommendedTraining: string[];
}

export function IndustryPageTemplate({ industry, recommendedTraining }: IndustryPageTemplateProps) {
  const img = industryImages[industry.slug];
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries', href: '/industries' }, { label: industry.shortName }]}
        eyebrow={industry.name.toUpperCase()}
        title={industry.heroHeading}
        description={industry.introduction}
        primaryCta={{ label: industry.ctaLabel, href: industry.ctaHref }}
        secondaryCta={{ label: 'TALK TO SAFE CUBE', href: '/contact' }}
        image={img?.hero || pageImages.industriesHero}
        imageAlt={img?.heroAlt || industry.name}
        variant="industry"
        theme="industry"
      />

      {/* Common Risks */}
      <section className="section-standard bg-white">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">COMMON RISKS</Eyebrow>
                <SectionHeading className="mt-3" as="h2">{`Common Risks in ${industry.name}`}</SectionHeading>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  Every workplace has risks. Understanding the risks specific to {industry.name.toLowerCase()} is the first step toward managing them effectively.
                </p>
              </div>
            }
            right={
              <VisualChecklist items={industry.commonRisks.map((risk) => ({ text: risk, type: 'amber' }))} />
            }
          />
        </Container>
      </section>

      {/* SAFE CUBE Support */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">SAFE CUBE SUPPORT</Eyebrow>
                <SectionHeading className="mt-3" as="h2">{`How SAFE CUBE Supports ${industry.name}`}</SectionHeading>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  We adapt our assessments, checklists, recommendations, and documentation to the realities of {industry.name.toLowerCase()} operations.
                </p>
              </div>
            }
            right={
              <VisualChecklist items={industry.safeCubeSupport.map((support) => ({ text: support, type: 'green' }))} />
            }
          />
        </Container>
      </section>

      {/* Relevant Solutions */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">RELEVANT SOLUTIONS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Relevant SAFE CUBE Solutions</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relevantSolutions.map((solution) => (
              <Link
                key={solution.href}
                href={solution.href}
                className="flex items-center justify-between rounded-lg border border-cube-soft bg-cube-soft p-4 transition-colors hover:border-cube-green hover:bg-white"
              >
                <span className="text-sm font-medium text-cube-navy">{solution.label}</span>
                <ArrowRight className="h-4 w-4 text-cube-green" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Training */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">RECOMMENDED TRAINING</Eyebrow>
            <SectionHeading className="mt-3" as="h2">{`Recommended Training for ${industry.name}`}</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedTraining.map((training) => (
              <div key={training} className="rounded-lg border border-cube-soft bg-white p-5">
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                  <span className="text-sm font-medium text-cube-navy">{training}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/training">VIEW ALL TRAINING PROGRAMS</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* How Engagement Works */}
      <ProcessTimeline
        eyebrow="HOW IT WORKS"
        heading="How Engagement Works"
        steps={engagementSteps.map((s) => ({ title: s.title, description: s.text, icon: s.step === 1 ? 'search' : s.step === 2 ? 'assessment' : s.step === 3 ? 'reports' : 'refresh' }))}
        background="white"
      />

      {/* Industry CTA */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading={`Ready to Improve Safety in Your ${industry.shortName}?`}
            text="Start with a free CUBE SCORE to understand your workplace readiness, or contact us to discuss a detailed assessment."
            primaryLabel={industry.ctaLabel}
            primaryHref={industry.ctaHref}
            secondaryLabel="TALK TO SAFE CUBE"
            secondaryHref="/contact"
          />
        </Container>
      </section>
    </>
  );
}
