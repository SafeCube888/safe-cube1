import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading } from '@/components/ui/typography';
import { Container, Section, ThreeColumnGrid } from '@/components/ui/layout';
import { PlanCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { PageHero, ImprovementCycle, VisualChecklist } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

export const metadata: Metadata = {
  title: 'CUBE CARE | Ongoing QHSE and Compliance Support',
  description:
    'Maintain workplace improvements through periodic inspections, action tracking, documentation, training, and management support.',
  alternates: {
    canonical: '/solutions/cube-care',
  },
};

const whatItMayInclude: string[] = [
  'Scheduled workplace visits',
  'Periodic inspections',
  'Corrective-action tracking',
  'Documentation development',
  'Procedure updates',
  'Training and toolbox talks',
  'Management meetings',
  'Compliance calendar support',
  'Performance reporting',
  'Follow-up verification',
];

export default function CubeCarePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'CUBE CARE' }]}
        eyebrow="ONGOING SUPPORT"
        title="CUBE CARE"
        description="Improvement Should Continue After the Report."
        primaryCta={{ label: 'REQUEST A PROPOSAL', href: '/contact?service=cube-care' }}
        secondaryCta={{ label: 'BOOK A CONSULTATION', href: '/book-consultation' }}
        image={pageImages.cubeCareHero}
        imageAlt={pageImages.cubeCareHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Section 1 - The Problem After Reports */}
      <Section spacing="lg" background="default">
        <Container width="narrow">
          <Eyebrow>THE CHALLENGE</Eyebrow>
          <SectionHeading className="mt-3">
            The Problem After Reports Are Delivered
          </SectionHeading>
          <div className="mt-6 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              Many workplace assessments produce useful findings, but
              implementation becomes difficult once daily operations take
              priority. Actions remain open, documents become outdated,
              inspections stop, training is delayed, and old problems begin to
              return.
            </p>
            <p className="text-body-lg text-muted-foreground">
              CUBE CARE provides structured follow-up and professional support
              so that improvement becomes a maintained business process rather
              than a one-time activity.
            </p>
          </div>
        </Container>
      </Section>

      {/* Section 2 - What CUBE CARE May Include */}
      <Section spacing="lg" background="soft">
        <Container>
          <div className="mb-8 text-center">
            <Eyebrow>WHAT IT MAY INCLUDE</Eyebrow>
            <SectionHeading className="mt-3">What CUBE CARE May Include</SectionHeading>
          </div>
          <div className="mx-auto max-w-3xl">
            <VisualChecklist items={whatItMayInclude.map((item) => ({ text: item, type: 'green' }))} />
          </div>
          <div className="mt-12">
            <ImprovementCycle />
          </div>
        </Container>
      </Section>

      {/* Section 3 - Three Service Levels */}
      <Section spacing="lg" background="default">
        <Container>
          <Eyebrow>SERVICE LEVELS</Eyebrow>
          <SectionHeading className="mt-3">
            Three Levels of Ongoing Support
          </SectionHeading>
          <ThreeColumnGrid className="mt-10 items-stretch">
            <PlanCard
              name="CUBE CARE ESSENTIAL"
              suitableFor="Small businesses that need basic ongoing support to maintain improvements and track corrective actions."
              features={[
                'Periodic workplace inspections',
                'Corrective-action tracking',
                'Basic documentation support',
                'Telephone and email support',
              ]}
              ctaLabel="REQUEST PROPOSAL"
              ctaHref="/contact?service=cube-care-essential"
            />
            <PlanCard
              name="CUBE CARE PROFESSIONAL"
              suitableFor="Growing businesses that need regular support, documentation updates, and management review assistance."
              features={[
                'Regular scheduled workplace visits',
                'Periodic inspections and reporting',
                'Corrective-action tracking and follow-up',
                'Documentation and procedure updates',
                'Training and toolbox talks',
                'Compliance calendar support',
                'Management meeting participation',
              ]}
              ctaLabel="REQUEST PROPOSAL"
              ctaHref="/contact?service=cube-care-professional"
              highlighted
            />
            <PlanCard
              name="CUBE CARE PARTNER"
              suitableFor="Larger organizations that need comprehensive ongoing support across multiple sites or complex operations."
              features={[
                'Scheduled workplace visits across sites',
                'Comprehensive inspection and reporting',
                'Full corrective-action management',
                'Documentation system development and maintenance',
                'Ongoing training programs',
                'Compliance calendar management',
                'Performance reporting and trend analysis',
                'Management review facilitation',
                'Follow-up verification',
              ]}
              ctaLabel="REQUEST PROPOSAL"
              ctaHref="/contact?service=cube-care-partner"
            />
          </ThreeColumnGrid>
        </Container>
      </Section>

      {/* Section 4 - Pricing Disclaimer */}
      <Section spacing="standard" background="soft">
        <Container width="narrow">
          <div className="rounded-lg border border-cube-soft bg-white p-6 lg:p-8">
            <p className="text-body text-muted-foreground">
              Pricing for CUBE CARE services is determined based on the scope of
              support, number of sites, frequency of visits, and complexity of
              operations. Contact SAFE CUBE for a tailored proposal. SAFE CUBE
              does not publish fixed subscription prices.
            </p>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section spacing="lg" background="default">
        <Container>
          <CTADark
            heading="Improvement Should Be a Process, Not an Event."
            text="CUBE CARE helps you maintain workplace improvements, track actions, update documentation, and strengthen safety culture over time."
            primaryLabel="REQUEST A PROPOSAL"
            primaryHref="/contact?service=cube-care"
            secondaryLabel="BOOK A CONSULTATION"
            secondaryHref="/book-consultation"
          />
        </Container>
      </Section>
    </>
  );
}
