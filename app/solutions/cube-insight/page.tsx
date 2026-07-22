import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { InternalPageHero } from '@/components/ui/heroes';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, TwoColumnLayout, Section } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { CTADark } from '@/components/ui/cta';
import { Card, CardContent } from '@/components/ui/card';

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
      <InternalPageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'CUBE INSIGHT' },
        ]}
        title="CUBE INSIGHT"
        description="See Beyond the Score With CUBE INSIGHT."
      />

      {/* Section 1 - When CUBE INSIGHT Is Needed */}
      <Section spacing="standard" background="default">
        <Container>
          <div className="max-w-narrow">
            <Eyebrow>WHEN IT IS NEEDED</Eyebrow>
            <SectionHeading className="mt-3">
              When CUBE INSIGHT Is Needed
            </SectionHeading>
            <SectionIntro align="left" className="mt-4">
              CUBE INSIGHT is for businesses that need more than a high-level
              overview. It is suitable when you need documented findings,
              risk-rated priorities, corrective actions, and a structured
              improvement roadmap. It is also appropriate when preparing for
              inspections, client audits, or management reviews.
            </SectionIntro>
            <ul className="mt-8 space-y-3">
              {whenNeededItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-body text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Section 2 - Assessment Areas */}
      <Section spacing="standard" background="soft">
        <Container>
          <Eyebrow>ASSESSMENT AREAS</Eyebrow>
          <SectionHeading className="mt-3">What We Assess</SectionHeading>
          <SectionIntro align="left" className="mt-4">
            CUBE INSIGHT covers the six SAFE CUBE categories in detail, adapted
            to your workplace and operations.
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
      </Section>

      {/* Section 3 - What The Client Receives */}
      <Section spacing="standard" background="default">
        <Container>
          <div className="max-w-narrow">
            <Eyebrow>WHAT YOU RECEIVE</Eyebrow>
            <SectionHeading className="mt-3">What You Receive</SectionHeading>
            <ul className="mt-8 space-y-3">
              {receivedItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-body text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Section 4 - Full Report Structure */}
      <Section spacing="standard" background="soft">
        <Container>
          <Eyebrow>REPORT STRUCTURE</Eyebrow>
          <SectionHeading className="mt-3">
            Full Report Structure
          </SectionHeading>
          <SectionIntro align="left" className="mt-4">
            Your CUBE INSIGHT report follows a structured format designed to be
            clear, actionable, and suitable for management review.
          </SectionIntro>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {reportSections.map((section, index) => (
              <li
                key={section}
                className="flex items-start gap-3"
              >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-cube-navy text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-body text-foreground pt-0.5">
                  {section}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Section 5 - Risk-Priority Definitions */}
      <Section spacing="standard" background="default">
        <Container>
          <Eyebrow>RISK PRIORITIES</Eyebrow>
          <SectionHeading className="mt-3">
            Risk-Priority Definitions
          </SectionHeading>
          <SectionIntro align="left" className="mt-4">
            Every finding in your CUBE INSIGHT report is assigned a risk
            priority so you can act on the most important issues first.
          </SectionIntro>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {riskPriorities.map((priority) => (
              <Card key={priority.label} className="flex flex-col">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${priority.badgeClass}`}
                    >
                      {priority.badge}
                    </span>
                    <h3 className="text-h3 text-cube-navy">{priority.label}</h3>
                  </div>
                  <p className="text-body text-muted-foreground">
                    {priority.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 6 - Sample Report Visual */}
      <Section spacing="standard" background="soft">
        <Container>
          <Eyebrow>SAMPLE REPORT</Eyebrow>
          <SectionHeading className="mt-3">
            A Look Inside the Report
          </SectionHeading>
          <SectionIntro align="left" className="mt-4">
            Below is an illustrative view of how your CUBE INSIGHT report is
            structured and presented.
          </SectionIntro>
          <div className="mt-8 overflow-hidden rounded-lg border border-cube-soft bg-white shadow-card">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-cube-soft bg-cube-soft/60 px-6 py-4">
              <span className="text-sm font-semibold tracking-widest text-cube-navy">
                SAMPLE REPORT VIEW
              </span>
              <span className="inline-flex items-center rounded-full bg-cube-navy px-3 py-1 text-xs font-semibold tracking-wider text-white">
                ILLUSTRATIVE
              </span>
            </div>
            {/* Mock body */}
            <div className="p-6 lg:p-8">
              <TwoColumnLayout
                left={
                  <div className="space-y-4">
                    <div className="h-4 w-1/3 rounded bg-cube-soft" />
                    <div className="h-3 w-full rounded bg-cube-soft/80" />
                    <div className="h-3 w-5/6 rounded bg-cube-soft/80" />
                    <div className="h-3 w-4/6 rounded bg-cube-soft/80" />
                    <div className="mt-6 h-4 w-1/2 rounded bg-cube-soft" />
                    <div className="h-3 w-full rounded bg-cube-soft/80" />
                    <div className="h-3 w-3/4 rounded bg-cube-soft/80" />
                  </div>
                }
                right={
                  <div className="space-y-4">
                    <div className="rounded-md border border-cube-soft p-4">
                      <div className="mb-3 h-3 w-1/2 rounded bg-cube-soft" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                          <div className="h-2.5 w-3/4 rounded bg-cube-soft" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                          <div className="h-2.5 w-2/3 rounded bg-cube-soft" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          <div className="h-2.5 w-4/5 rounded bg-cube-soft" />
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border border-cube-soft p-4">
                      <div className="mb-3 h-3 w-1/3 rounded bg-cube-soft" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded bg-cube-soft/70" />
                        <div className="h-8 rounded bg-cube-soft/70" />
                        <div className="h-8 rounded bg-cube-soft/70" />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="standard" background="default">
        <Container>
          <CTADark
            heading="Ready to See Beyond the Score?"
            text="CUBE INSIGHT provides documented findings, risk priorities, and a structured improvement roadmap. Book your assessment today."
            primaryLabel="BOOK CUBE INSIGHT"
            primaryHref="/contact?service=cube-insight"
            secondaryLabel="EXPLORE CUBE CARE"
            secondaryHref="/solutions/cube-care"
          />
        </Container>
      </Section>
    </>
  );
}
