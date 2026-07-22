import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, TwoColumnLayout, Section } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { CTADark } from '@/components/ui/cta';
import { PageHero, ReportMockup, RiskMatrix, RoadmapTimeline, VisualChecklist, ContentCallout } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

export const metadata: Metadata = {
  title: 'CUBE INSIGHT | Detailed Workplace Assessment and Improvement Roadmap',
  description:
    'Receive a detailed workplace assessment with documented findings, risk ratings, corrective actions, and a practical improvement roadmap.',
  alternates: { canonical: '/solutions/cube-insight' },
};

const whenNeededItems = [
  'When you need documented findings for planning or compliance',
  'When you are preparing for an inspection, audit, or client review',
  'When your CUBE SCORE reveals priority areas requiring detailed attention',
  'When you need a structured improvement roadmap',
  'When you want evidence-based recommendations with risk ratings',
];

const assessmentAreaItems = [
  'Occupational health conditions and risks',
  'Workplace safety hazards and controls',
  'Environmental management practices',
  'Quality processes and controls',
  'Compliance documentation and evidence',
  'Management system structure and effectiveness',
  'Fire safety and emergency preparedness',
  'Equipment and machinery safety',
  'Chemical storage and handling',
  'Housekeeping and workplace organization',
  'PPE availability and correct use',
  'Employee awareness and training records',
];

const receivedItems = [
  'Detailed workplace inspection',
  'Document and record review',
  'Photographic evidence where permitted',
  'Risk-rated findings',
  'Corrective Action and Preventive Action register',
  '30, 60, and 90-day improvement roadmap',
  'Management summary',
  'Closing discussion or presentation',
];

const reportSections = [
  'Cover Page',
  'Document Control',
  'Executive Summary',
  'Assessment Scope and Methodology',
  'Site and Operations Overview',
  'Findings Summary Table',
  'Detailed Findings by Category',
  'Risk Priority Legend',
  'Photographic Evidence (where permitted)',
  'Corrective Action and Preventive Action Register',
  'Improvement Roadmap (30, 60, 90 Days)',
  'Management Summary',
  'Recommendations',
  'Limitations and Assumptions',
  'Closing Discussion Notes',
  'Appendices',
];

const riskPriorities = [
  {
    label: 'Priority',
    badge: 'Red',
    badgeClass: 'bg-red-500 text-white',
    description:
      'Significant risks that require immediate attention. These findings may present a risk of injury, legal non-compliance, or operational disruption if not addressed.',
  },
  {
    label: 'Important',
    badge: 'Amber',
    badgeClass: 'bg-amber-500 text-white',
    description:
      'Gaps or weaknesses that should be addressed in the short to medium term. These findings are not immediately dangerous but may lead to problems if left unaddressed.',
  },
  {
    label: 'Monitor',
    badge: 'Green',
    badgeClass: 'bg-green-500 text-white',
    description:
      'Areas that are generally well-managed but should be maintained and reviewed periodically to ensure continued performance.',
  },
];

export default function CubeInsightPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'CUBE INSIGHT' }]}
        eyebrow="DETAILED WORKPLACE ASSESSMENT"
        title="CUBE INSIGHT"
        description="See Beyond the Score With CUBE INSIGHT."
        primaryCta={{ label: 'REQUEST CUBE INSIGHT', href: '/contact?service=cube-insight' }}
        secondaryCta={{ label: 'EXPLORE CUBE CARE', href: '/solutions/cube-care' }}
        image={pageImages.cubeInsightHero}
        imageAlt={pageImages.cubeInsightHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Section 1 - When CUBE INSIGHT Is Needed */}
      <section className="section-standard bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="text-cube-green">WHEN IT IS NEEDED</Eyebrow>
              <SectionHeading className="mt-3" as="h2">When CUBE INSIGHT Is Needed</SectionHeading>
              <p className="mt-4 text-body-lg text-muted-foreground">
                CUBE INSIGHT is for businesses that need more than a high-level overview. It is suitable when you need documented findings, risk-rated priorities, corrective actions, and a structured improvement roadmap.
              </p>
            </div>
            <VisualChecklist items={whenNeededItems.map((item) => ({ text: item, type: 'green' }))} />
          </div>
        </Container>
      </section>

      {/* Section 2 - Assessment Areas */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <Eyebrow className="text-cube-green">ASSESSMENT AREAS</Eyebrow>
          <SectionHeading className="mt-3" as="h2">What We Assess</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            CUBE INSIGHT covers the six SAFE CUBE categories in detail, adapted to your workplace and operations.
          </SectionIntro>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {assessmentAreaItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-body text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3 - What The Client Receives */}
      <section className="section-standard bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="text-cube-green">WHAT YOU RECEIVE</Eyebrow>
              <SectionHeading className="mt-3" as="h2">What You Receive</SectionHeading>
              <VisualChecklist items={receivedItems.map((item) => ({ text: item, type: 'green' }))} />
            </div>
            <ReportMockup type="report" title="SAMPLE REPORT VIEW" label="ILLUSTRATIVE" />
          </div>
        </Container>
      </section>

      {/* Section 4 - Full Report Structure */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <Eyebrow className="text-cube-green">REPORT STRUCTURE</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Full Report Structure</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            Your CUBE INSIGHT report follows a structured format designed to be clear, actionable, and suitable for management review.
          </SectionIntro>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {reportSections.map((section, index) => (
              <li key={section} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-cube-navy text-xs font-semibold text-white">{index + 1}</span>
                <span className="text-body text-foreground pt-0.5">{section}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Section 5 - Risk-Priority Definitions */}
      <section className="section-standard bg-white">
        <Container>
          <Eyebrow className="text-cube-green">RISK PRIORITIES</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Risk-Priority Definitions</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            Every finding in your CUBE INSIGHT report is assigned a risk priority so you can act on the most important issues first.
          </SectionIntro>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {riskPriorities.map((priority) => (
              <div key={priority.label} className="rounded-lg border border-cube-soft bg-cube-soft p-6">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${priority.badgeClass}`}>{priority.badge}</span>
                  <h3 className="text-h3 text-cube-navy">{priority.label}</h3>
                </div>
                <p className="mt-3 text-body text-muted-foreground">{priority.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 6 - Risk Matrix */}
      <section className="section-standard bg-cube-soft">
        <Container width="wide">
          <Eyebrow className="text-cube-green">RISK ASSESSMENT MATRIX</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Sample Risk-Priority Matrix</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            Findings are rated using a likelihood-severity matrix to determine the appropriate priority level.
          </SectionIntro>
          <div className="mt-8"><RiskMatrix /></div>
        </Container>
      </section>

      {/* Section 7 - Improvement Roadmap */}
      <section className="section-standard bg-white">
        <Container>
          <Eyebrow className="text-cube-green">IMPROVEMENT ROADMAP</Eyebrow>
          <SectionHeading className="mt-3" as="h2">30 / 60 / 90-Day Roadmap</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            Your CUBE INSIGHT report includes a prioritized improvement roadmap with actions grouped by timeframe.
          </SectionIntro>
          <div className="mt-8"><RoadmapTimeline /></div>
        </Container>
      </section>

      {/* Final CTA */}
      <Section spacing="standard" background="soft">
        <Container>
          <CTADark
            heading="Ready for a Detailed Assessment?"
            text="CUBE INSIGHT provides documented findings, risk-rated priorities, and a structured improvement roadmap. Start with CUBE INSIGHT or contact us to discuss your needs."
            primaryLabel="REQUEST CUBE INSIGHT"
            primaryHref="/contact?service=cube-insight"
            secondaryLabel="BOOK A CONSULTATION"
            secondaryHref="/book-consultation"
          />
        </Container>
      </Section>
    </>
  );
}
