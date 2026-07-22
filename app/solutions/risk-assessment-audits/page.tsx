import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';

export const metadata: Metadata = {
  title: 'Risk Assessment & Workplace Audits | SAFE CUBE',
  description:
    'Structured reviews to identify hazards, evaluate risks, assess controls, and prioritize improvement actions.',
  alternates: { canonical: '/solutions/risk-assessment-audits' },
};

const serviceTypes = [
  'General workplace risk assessment',
  'Fire risk assessment',
  'Chemical risk assessment',
  'Machinery and equipment risk assessment',
  'Ergonomic risk assessment',
  'Environmental risk assessment',
  'Compliance gap assessment',
  'Management system audit',
  'Internal audit programs',
  'Pre-certification readiness audit',
];

const methodologySteps = [
  { step: 1, title: 'Define Scope', text: 'We agree the scope of the assessment, including areas, activities, equipment, and personnel to be covered.' },
  { step: 2, title: 'Gather Information', text: 'We collect relevant information including existing documentation, previous assessments, incident records, and operational data.' },
  { step: 3, title: 'Identify Hazards', text: 'We systematically identify hazards associated with each activity, area, and piece of equipment within the agreed scope.' },
  { step: 4, title: 'Evaluate Risk', text: 'We evaluate the level of risk for each hazard, considering likelihood and potential severity of harm.' },
  { step: 5, title: 'Assess Controls', text: 'We review existing controls to determine whether they are adequate, effective, and properly maintained.' },
  { step: 6, title: 'Identify Gaps', text: 'We identify gaps where controls are missing, inadequate, or not properly implemented.' },
  { step: 7, title: 'Prioritize Findings', text: 'We prioritize findings based on risk level, using a clear risk-priority rating system.' },
  { step: 8, title: 'Recommend Actions', text: 'We provide practical recommendations for corrective and preventive actions, proportionate to the level of risk.' },
  { step: 9, title: 'Document Results', text: 'We document the assessment in a structured report with findings, risk ratings, and recommendations.' },
  { step: 10, title: 'Review and Follow Up', text: 'We support follow-up to ensure that recommended actions are implemented and risks are reduced.' },
];

export default function RiskAssessmentAuditsPage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Risk Assessment & Workplace Audits' }]}
        title="Risk Assessment & Workplace Audits"
        description="Understand Risk Before It Becomes Loss."
        primaryLabel="GET FREE CUBE SCORE"
        primaryHref="/cube-score"
        secondaryLabel="TALK TO SAFE CUBE"
        secondaryHref="/contact"
      />

      {/* Service Types */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">SERVICE TYPES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Types of Assessments and Audits</SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE offers a range of structured assessments and audits designed to identify hazards, evaluate risks, assess controls, and prioritize improvement actions.
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {serviceTypes.map((service) => (
              <div key={service} className="flex items-start gap-3 rounded-lg border border-cube-soft bg-cube-soft p-4">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{service}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">METHODOLOGY</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Our Ten-Step Methodology</SectionHeading>
            <SectionIntro className="mt-4">
              We follow a structured ten-step methodology to ensure that every assessment is thorough, consistent, and actionable.
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {methodologySteps.map((step) => (
              <div key={step.step} className="rounded-lg border border-cube-soft bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cube-navy text-sm font-bold text-white">{step.step}</span>
                <h3 className="mt-4 text-base font-semibold text-cube-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-white">
        <Container>
          <CTADark
            heading="Understand Your Risks Before They Become Losses."
            text="Structured risk assessment and workplace audits help you identify hazards, evaluate risks, and prioritize actions. Start with a free CUBE SCORE or contact us for a detailed assessment."
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
