import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro, SectionDivider } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { ServiceCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'SAFE CUBE Solutions | Assess, Improve and Sustain Workplace Performance',
  description:
    'Explore SAFE CUBE solutions including SAFE SNAP, CUBE SCORE, CUBE INSIGHT, CUBE CARE, workplace training, compliance support, and safety products.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'SAFE CUBE Solutions',
    description:
      'Explore SAFE CUBE solutions including SAFE SNAP, CUBE SCORE, CUBE INSIGHT, CUBE CARE, workplace training, compliance support, and safety products.',
  },
};

const journeyGroups = [
  {
    phase: 'INITIAL ENTRY',
    items: [
      { number: 1, icon: 'inspection', name: 'SAFE SNAP', descriptor: 'Quick Workplace Observation', description: 'A focused workplace visit designed to identify visible hazards, immediate red flags, and priority improvement needs.', features: ['Visual workplace observations', 'Immediate red-flag identification', 'Brief verbal or written recommendations', 'Suggested next steps'], ctaLabel: 'LEARN ABOUT SAFE SNAP', ctaHref: '/solutions/safe-snap', color: 'green' as const },
      { number: 2, icon: 'assessment', name: 'CUBE SCORE', descriptor: 'Your Workplace Readiness Score', description: 'A structured high-level assessment that shows your current safety, health, environmental, quality, compliance, and management readiness.', features: ['Overall readiness score', 'Six-category performance breakdown', 'Priority gaps identified', 'Recommended action level'], ctaLabel: 'GET YOUR CUBE SCORE', ctaHref: '/cube-score', color: 'green' as const },
    ],
  },
  {
    phase: 'DETAILED ASSESSMENT',
    items: [
      { number: 3, icon: 'reports', name: 'CUBE INSIGHT', descriptor: 'Detailed Workplace Assessment', description: 'A comprehensive workplace inspection with documented findings, risk ratings, evidence, corrective actions, and a practical improvement roadmap.', features: ['Detailed inspection and evaluation', 'Findings with risk priorities', 'Corrective Action and Preventive Action plan', '30, 60, and 90-day improvement roadmap'], ctaLabel: 'BOOK CUBE INSIGHT', ctaHref: '/solutions/cube-insight', color: 'blue' as const },
    ],
  },
  {
    phase: 'ONGOING IMPLEMENTATION',
    items: [
      { number: 4, icon: 'corrective-actions', name: 'CUBE CARE', descriptor: 'Ongoing Improvement Support', description: 'Continuous professional support to close gaps, maintain systems, update records, track actions, train employees, and strengthen workplace culture.', features: ['Periodic workplace inspections', 'Documentation and system support', 'Corrective-action tracking', 'Management review assistance'], ctaLabel: 'START CUBE CARE', ctaHref: '/solutions/cube-care', color: 'blue' as const },
    ],
  },
  {
    phase: 'CAPABILITY DEVELOPMENT',
    items: [
      { number: 5, icon: 'training', name: 'SAFE CUBE TRAINING', descriptor: 'Practical Workplace Training', description: 'Relevant awareness and skill-building sessions for employees, supervisors, managers, and workplace leaders.', features: ['Toolbox talks', 'Role-based training', 'Management awareness sessions', 'On-site and online delivery'], ctaLabel: 'VIEW TRAINING PROGRAMS', ctaHref: '/training', color: 'green' as const },
    ],
  },
  {
    phase: 'PRODUCT SUPPORT',
    items: [
      { number: 6, icon: 'store', name: 'CUBE STORE', descriptor: 'Safety Equipment and Workplace Solutions — Coming Soon', description: 'Access practical safety products, PPE, emergency equipment, signage, inspection tools, and workplace improvement kits.', features: ['Personal protective equipment', 'Fire and first-aid products', 'Spill-control and emergency supplies', 'Inspection and monitoring equipment'], ctaLabel: 'VISIT CUBE STORE', ctaHref: '/store', color: 'green' as const },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        title="Choose the Right Level of Support"
        description="From a quick professional observation to continuous workplace improvement, SAFE CUBE allows businesses to begin according to their current needs, risk profile, and readiness."
      />

      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">OUR SOLUTIONS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">The SAFE CUBE Service Journey</SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE follows a progressive service journey. You can start with a quick observation or a readiness score, move to a detailed assessment, and then continue with ongoing support. Training and products are available alongside every stage.
            </SectionIntro>
          </div>

          {journeyGroups.map((group) => (
            <div key={group.phase} className="mb-8">
              <p className="text-eyebrow text-cube-green mb-4">{group.phase}</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <ServiceCard
                    key={item.name}
                    number={item.number}
                    icon={item.icon}
                    name={item.name}
                    descriptor={item.descriptor}
                    description={item.description}
                    features={item.features}
                    ctaLabel={item.ctaLabel}
                    ctaHref={item.ctaHref}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Choose the Right Starting Point */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <SectionDivider color="green" />
          <SectionHeading className="mt-3" as="h2">Choose the Right Starting Point</SectionHeading>
          <div className="mt-6 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you are not sure where you stand:</strong> Start with a free CUBE SCORE. It will give you a high-level overview of your workplace readiness and identify priority areas.
            </p>
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you want a quick professional look:</strong> SAFE SNAP provides a focused workplace observation to identify visible hazards and immediate red flags.
            </p>
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you need documented findings and a plan:</strong> CUBE INSIGHT provides a detailed assessment with risk-rated findings, corrective actions, and a 30, 60, and 90-day improvement roadmap.
            </p>
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you want ongoing support:</strong> CUBE CARE provides continuous professional support to maintain improvements, track actions, update documentation, and strengthen workplace culture.
            </p>
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you need training:</strong> SAFE CUBE TRAINING provides practical, role-based workplace training for employees, supervisors, and managers.
            </p>
            <p className="text-body-lg text-muted-foreground">
              <strong className="text-cube-navy">If you need products:</strong> CUBE STORE will provide workplace safety products, PPE, and equipment. The store is currently being developed.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="green" size="lg">
              <Link href="/cube-score">GET FREE CUBE SCORE</Link>
            </Button>
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/contact">TALK TO SAFE CUBE</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-standard bg-white">
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
