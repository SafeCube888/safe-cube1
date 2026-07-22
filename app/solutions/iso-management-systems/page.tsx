import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro, SectionDivider } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { CTADark } from '@/components/ui/cta';
import { PageHero, VisualFeatureGrid, ProcessTimeline, ContentCallout } from '@/components/ui/visual-sections';
import { isoDisclaimer } from '@/config/site';
import { pageImages } from '@/content/images';

export const metadata: Metadata = {
  title: 'ISO Management-System Support | SAFE CUBE',
  description:
    'Get support for ISO 9001, ISO 14001, ISO 45001, documentation, gap assessment, implementation, internal audits, and certification readiness.',
  alternates: { canonical: '/solutions/iso-management-systems' },
};

const coreServices = [
  'Gap assessment against ISO standards',
  'Implementation planning and support',
  'Policy and procedure development',
  'Documentation system design',
  'Internal audit programs',
  'Management review support',
  'Certification readiness assessment',
  'Ongoing system maintenance',
];

const iso9001Points = [
  'Quality policy and objectives',
  'Process mapping and documentation',
  'Customer focus and complaint handling',
  'Corrective and preventive action systems',
  'Internal audit and management review',
  'Continual improvement framework',
];

const iso14001Points = [
  'Environmental aspects and impacts identification',
  'Environmental policy and objectives',
  'Waste, emissions, and resource management',
  'Environmental operational controls',
  'Emergency preparedness for environmental incidents',
  'Compliance obligations evaluation',
];

const iso45001Points = [
  'Hazard identification and risk assessment',
  'OH&S policy and worker participation',
  'Operational controls and hierarchy of controls',
  'Incident investigation and corrective actions',
  'Worker health surveillance and welfare',
  'OH&S management system documentation',
];

export default function IsoManagementSystemsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'ISO & Management Systems' }]}
        eyebrow="ISO-ALIGNED MANAGEMENT SYSTEMS"
        title="ISO & Management Systems"
        description="Build Management Systems People Can Actually Use."
        primaryCta={{ label: 'GET FREE CUBE SCORE', href: '/cube-score' }}
        secondaryCta={{ label: 'TALK TO SAFE CUBE', href: '/contact' }}
        image={pageImages.isoHero}
        imageAlt={pageImages.isoHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Core Services */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">CORE SERVICES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Core Services</SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE provides advisory, implementation, training, internal-audit, and certification-readiness support for ISO-aligned management systems. We help organizations build practical systems that people can understand and use.
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {coreServices.map((service) => (
              <div key={service} className="flex items-start gap-3 rounded-lg border border-cube-soft bg-cube-soft p-4">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{service}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ISO 9001 */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <SectionDivider color="green" />
          <Eyebrow className="mt-3 block text-cube-green">QUALITY MANAGEMENT</Eyebrow>
          <SectionHeading className="mt-2" as="h2">ISO 9001 — Quality Management Systems</SectionHeading>
          <p className="mt-4 text-body-lg text-muted-foreground">
            SAFE CUBE provides ISO-aligned support for organizations seeking to implement or improve a quality management system based on ISO 9001 principles. We help you build a practical system that supports consistent performance, customer satisfaction, and continual improvement.
          </p>
          <ul className="mt-6 space-y-3">
            {iso9001Points.map((item) => (
              <li key={item} className="flex items-start gap-2 text-body-lg text-muted-foreground">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ISO 14001 */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <SectionDivider color="blue" />
          <Eyebrow className="mt-3 block text-cube-green">ENVIRONMENTAL MANAGEMENT</Eyebrow>
          <SectionHeading className="mt-2" as="h2">ISO 14001 — Environmental Management Systems</SectionHeading>
          <p className="mt-4 text-body-lg text-muted-foreground">
            SAFE CUBE provides ISO-aligned support for organizations seeking to implement or improve an environmental management system based on ISO 14001 principles. We help you identify environmental aspects, manage impacts, and build a structured approach to environmental responsibility.
          </p>
          <ul className="mt-6 space-y-3">
            {iso14001Points.map((item) => (
              <li key={item} className="flex items-start gap-2 text-body-lg text-muted-foreground">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ISO 45001 */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <SectionDivider color="green" />
          <Eyebrow className="mt-3 block text-cube-green">OCCUPATIONAL HEALTH & SAFETY</Eyebrow>
          <SectionHeading className="mt-2" as="h2">ISO 45001 — OH&S Management Systems</SectionHeading>
          <p className="mt-4 text-body-lg text-muted-foreground">
            SAFE CUBE provides ISO-aligned support for organizations seeking to implement or improve an occupational health and safety management system based on ISO 45001 principles. We help you identify hazards, assess risks, and build a system that protects workers and supports continual improvement.
          </p>
          <ul className="mt-6 space-y-3">
            {iso45001Points.map((item) => (
              <li key={item} className="flex items-start gap-2 text-body-lg text-muted-foreground">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Certification Disclaimer */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <ContentCallout type="disclaimer" title="Certification Disclaimer">
            {isoDisclaimer}
          </ContentCallout>
        </Container>
      </section>

      {/* Implementation Timeline */}
      <ProcessTimeline
        eyebrow="IMPLEMENTATION JOURNEY"
        heading="Management-System Implementation Timeline"
        intro="A structured path from initial gap assessment to certification readiness."
        steps={[
          { title: 'Gap Assessment', description: 'Identify current state against ISO requirements.', icon: 'search' },
          { title: 'Scope & Context', description: 'Define system scope, context, and stakeholder needs.', icon: 'target' },
          { title: 'Documentation', description: 'Develop policies, procedures, and documented information.', icon: 'documents' },
          { title: 'Implementation', description: 'Put the system into practice across the organization.', icon: 'gear' },
          { title: 'Training', description: 'Train staff on system requirements and responsibilities.', icon: 'graduation' },
          { title: 'Internal Audit', description: 'Verify system effectiveness through internal audits.', icon: 'inspection' },
          { title: 'Management Review', description: 'Review system performance and improvement opportunities.', icon: 'assessment' },
          { title: 'Certification Readiness', description: 'Prepare for external certification audit.', icon: 'badge' },
        ]}
        background="white"
      />

      {/* Final CTA */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Ready to Build a System People Can Use?"
            text="SAFE CUBE provides ISO-aligned implementation support, documentation, internal audits, and certification readiness. We help you prepare for certification without creating unnecessary paperwork."
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
