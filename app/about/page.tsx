import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, SectionDivider, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, ThreeColumnGrid } from '@/components/ui/layout';
import { ValueCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About SAFE CUBE | Practical Workplace Improvement Partner',
  description:
    'Learn how SAFE CUBE helps businesses protect people, manage risks, strengthen compliance, and improve workplace systems through practical QHSE support.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About SAFE CUBE',
    description:
      'Learn how SAFE CUBE helps businesses protect people, manage risks, strengthen compliance, and improve workplace systems through practical QHSE support.',
  },
};

const values = [
  { icon: 'users', title: 'People First', description: 'We prioritize the health, safety, dignity, and wellbeing of people at work.' },
  { icon: 'shield', title: 'Risk Focused', description: 'We identify significant risks early and help prevent incidents, losses, and repeated failures.' },
  { icon: 'clipboard', title: 'Practical Approach', description: 'Our recommendations are designed to be realistic, proportionate, understandable, and actionable.' },
  { icon: 'refresh', title: 'Continuous Support', description: 'We remain available beyond the report to support implementation and continual improvement.' },
  { icon: 'badge', title: 'Built on Standards', description: 'Our approach aligns with recognized QHSE principles, ISO management-system concepts, and relevant good practices.' },
  { icon: 'settings', title: 'Local Understanding', description: 'We consider local workplace realities, business constraints, regulatory expectations, and operating conditions.' },
];

const differences = [
  'We do not just hand over a report. We help you understand it, act on it, and sustain the improvement.',
  'We do not assume every workplace is the same. We adapt our assessments, checklists, and recommendations to your actual operations.',
  'We do not create unnecessary paperwork. We focus on practical systems that people can understand and use.',
  'We do not disappear after the assessment. We remain available for ongoing support, training, and follow-up.',
  'We do not claim guaranteed compliance or certification. We help you build readiness and improve performance.',
];

export default function AboutPage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        title="About SAFE CUBE"
        description="SAFE CUBE is a workplace improvement and QHSE support company that helps businesses protect people, identify risks, improve operational systems, strengthen compliance, and build sustainable workplace practices."
      />

      {/* Who We Are */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">WHO WE ARE</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Who We Are</SectionHeading>
          <div className="mt-4 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              SAFE CUBE is a workplace improvement and QHSE support company. We help businesses protect people, identify risks, improve operational systems, strengthen compliance, and build sustainable workplace practices.
            </p>
            <p className="text-body-lg text-muted-foreground">
              We work with businesses across multiple industries, from small operations to larger organizations, providing practical assessment, advisory, training, documentation, and implementation support. Our approach is built around real workplace conditions, not theoretical frameworks that look good on paper but fail in practice.
            </p>
            <p className="text-body-lg text-muted-foreground">
              We believe that safety, quality, and compliance are not separate activities. They are connected parts of a well-run business. When a workplace is safe, organized, and documented, it performs better, serves customers better, and is better prepared for inspections, audits, and growth.
            </p>
          </div>
        </Container>
      </section>

      {/* Why SAFE CUBE Exists */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">WHY WE EXIST</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Why SAFE CUBE Exists</SectionHeading>
          <div className="mt-4 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              Many businesses understand the importance of safety, quality, and compliance, but struggle to turn that understanding into structured action. Workplaces are busy, resources are limited, and the gap between knowing what should be done and actually doing it can be wide.
            </p>
            <p className="text-body-lg text-muted-foreground">
              SAFE CUBE exists to bridge that gap. We help businesses move from awareness to action through practical, proportionate, and structured support. We do not impose unnecessary complexity. We help organizations identify what matters most, address it in a realistic way, and build systems that can be maintained over time.
            </p>
            <p className="text-body-lg text-muted-foreground">
              In Pakistan and across the wider region, businesses face increasing expectations from clients, regulators, and international standards. SAFE CUBE helps organizations meet those expectations without losing sight of operational realities.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission, Vision, Promise */}
      <section className="section-standard bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-cube-soft bg-cube-soft p-6">
              <SectionDivider color="green" />
              <h3 className="mt-3 text-lg font-semibold text-cube-navy">Our Mission</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                To help businesses protect people, reduce risks, improve systems, and strengthen compliance through practical, proportionate, and sustainable QHSE solutions designed around real workplace conditions.
              </p>
            </div>
            <div className="rounded-lg border border-cube-soft bg-cube-soft p-6">
              <SectionDivider color="blue" />
              <h3 className="mt-3 text-lg font-semibold text-cube-navy">Our Vision</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A business environment where every workplace, regardless of size or sector, has access to practical safety, quality, and compliance support that protects people and strengthens operations.
              </p>
            </div>
            <div className="rounded-lg border border-cube-soft bg-cube-soft p-6">
              <SectionDivider color="green" />
              <h3 className="mt-3 text-lg font-semibold text-cube-navy">Our Promise</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We will not just inspect and leave. We will help you understand your risks, prioritise your actions, and build improvement that lasts beyond the report.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">OUR VALUES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">What We Stand For</SectionHeading>
          </div>
          <ThreeColumnGrid>
            {values.map((value) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color="green"
              />
            ))}
          </ThreeColumnGrid>
        </Container>
      </section>

      {/* What Makes SAFE CUBE Different */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">WHAT MAKES US DIFFERENT</Eyebrow>
          <SectionHeading className="mt-3" as="h2">What Makes SAFE CUBE Different</SectionHeading>
          <ul className="mt-6 space-y-4">
            {differences.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cube-green text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <p className="text-body-lg text-muted-foreground">{item}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Let's Build a Safer Workplace Together."
            text="Whether you are starting from zero, responding to an immediate concern, or improving an existing management system, SAFE CUBE is ready to support your next practical step."
            primaryLabel="START WITH FREE CUBE SCORE"
            primaryHref="/cube-score"
            secondaryLabel="BOOK A CONSULTATION"
            secondaryHref="/book-consultation"
          />
        </Container>
      </section>
    </>
  );
}
