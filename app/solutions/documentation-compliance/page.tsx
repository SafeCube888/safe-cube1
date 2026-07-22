import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { CTADark } from '@/components/ui/cta';
import { InternalPageHero } from '@/components/ui/heroes';

export const metadata: Metadata = {
  title: 'Documentation & Compliance Support | SAFE CUBE',
  description:
    'Practical policies, procedures, registers, forms, and compliance systems designed to be understood and used by real workplaces.',
  alternates: { canonical: '/solutions/documentation-compliance' },
};

const documentTypes = [
  'Health and safety policies',
  'Environmental policies',
  'Quality policies',
  'Compliance policies',
  'Safe work procedures',
  'Standard operating procedures',
  'Emergency response procedures',
  'Risk assessment records',
  'Inspection checklists and records',
  'Incident report forms',
  'Near-miss report forms',
  'Corrective action registers',
  'Training records and matrices',
  'PPE issue registers',
  'Chemical registers and SDS files',
  'Equipment inspection records',
  'Contractor induction records',
  'Visitor safety records',
  'Waste management records',
  'Environmental monitoring records',
  'Audit reports and findings',
  'Management review minutes and records',
  'Compliance calendars and tracking sheets',
  'Permit-to-work systems',
  'Calibration records',
  'Document control procedures',
  'Record retention schedules',
  'Management system manuals',
];

export default function DocumentationCompliancePage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Documentation & Compliance Support' }]}
        title="Documentation & Compliance Support"
        description="Turn Requirements Into Clear Workplace Systems."
        primaryLabel="GET FREE CUBE SCORE"
        primaryHref="/cube-score"
        secondaryLabel="TALK TO SAFE CUBE"
        secondaryHref="/contact"
      />

      {/* Document and Record Types */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">DOCUMENT AND RECORD TYPES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Documents and Records We Support</SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE helps organizations develop practical documents and records that support workplace safety, quality, compliance, and management-system effectiveness. The goal is not unnecessary paperwork, but clear, usable systems that people can understand and follow.
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <div key={doc} className="flex items-start gap-2 rounded-lg border border-cube-soft bg-cube-soft p-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{doc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Important Message */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <div className="rounded-lg border border-cube-soft bg-white p-6">
            <h3 className="text-base font-semibold text-cube-navy">About Our Practical Documents</h3>
            <p className="mt-2 text-body-lg text-muted-foreground">
              SAFE CUBE develops documents that are designed to be used in real workplaces, not filed away and forgotten. We focus on clarity, proportionality, and usability. Our documents are structured to support daily operations, inspections, audits, and management reviews without creating unnecessary administrative burden.
            </p>
            <p className="mt-3 text-body text-muted-foreground">
              We do not provide legal advice. Our documents are practical workplace tools designed to support compliance readiness and operational improvement. Organizations remain responsible for verifying that their documentation meets applicable legal and regulatory requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-white">
        <Container>
          <CTADark
            heading="Turn Requirements Into Clear Workplace Systems."
            text="SAFE CUBE helps you build practical policies, procedures, registers, and compliance systems that people can understand and use."
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
