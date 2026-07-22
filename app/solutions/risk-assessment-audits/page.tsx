import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { CTADark } from '@/components/ui/cta';
import { PageHero, VisualFeatureGrid, ProcessTimeline, RiskMatrix, HierarchyOfControls, VisualChecklist } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

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
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Risk Assessment & Workplace Audits' }]}
        eyebrow="STRUCTURED RISK REVIEWS"
        title="Risk Assessment & Workplace Audits"
        description="Understand Risk Before It Becomes Loss."
        primaryCta={{ label: 'GET FREE CUBE SCORE', href: '/cube-score' }}
        secondaryCta={{ label: 'TALK TO SAFE CUBE', href: '/contact' }}
        image={pageImages.riskAssessmentHero}
        imageAlt={pageImages.riskAssessmentHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Service Types */}
      <VisualFeatureGrid
        eyebrow="SERVICE TYPES"
        heading="Types of Assessments and Audits"
        intro="SAFE CUBE offers a range of structured assessments and audits designed to identify hazards, evaluate risks, assess controls, and prioritize improvement actions."
        items={serviceTypes.map((service) => ({ icon: 'inspection', title: service, description: '' }))}
        columns={2}
        background="white"
      />

      {/* Hierarchy of Controls */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">HIERARCHY OF CONTROLS</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Hierarchy of Controls</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            We apply the hierarchy of controls to evaluate and recommend risk-reduction measures, from most effective to least effective.
          </SectionIntro>
          <div className="mt-8"><HierarchyOfControls /></div>
        </Container>
      </section>

      {/* Methodology */}
      <ProcessTimeline
        eyebrow="METHODOLOGY"
        heading="Our Ten-Step Methodology"
        intro="We follow a structured ten-step methodology to ensure that every assessment is thorough, consistent, and actionable."
        steps={methodologySteps.map((s) => ({ title: s.title, description: s.text }))}
        background="soft"
      />

      {/* Risk Matrix */}
      <section className="section-standard bg-white">
        <Container width="wide">
          <Eyebrow className="text-cube-green">SAMPLE RISK MATRIX</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Sample Risk-Priority Matrix</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            Findings are rated using a likelihood-severity matrix to determine the appropriate priority level.
          </SectionIntro>
          <div className="mt-8"><RiskMatrix /></div>
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
