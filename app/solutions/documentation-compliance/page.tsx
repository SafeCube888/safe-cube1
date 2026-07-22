import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { CTADark } from '@/components/ui/cta';
import { PageHero, VisualChecklist, ContentCallout } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

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
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'Documentation & Compliance Support' }]}
        eyebrow="PRACTICAL DOCUMENTATION"
        title="Documentation & Compliance Support"
        description="Turn Requirements Into Clear Workplace Systems."
        primaryCta={{ label: 'GET FREE CUBE SCORE', href: '/cube-score' }}
        secondaryCta={{ label: 'TALK TO SAFE CUBE', href: '/contact' }}
        image={pageImages.documentationHero}
        imageAlt={pageImages.documentationHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Document Categories */}
      <section className="section-standard bg-white">
        <Container>
          <Eyebrow className="text-cube-green">DOCUMENT CATEGORIES</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Categories of Documents We Support</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            We organize workplace documentation into five practical categories to ensure complete coverage without unnecessary complexity.
          </SectionIntro>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <VisualChecklist title="Policies & Governance" items={['QHSE policies', 'Safety policy', 'Environmental policy', 'Quality policy', 'Roles and responsibilities'].map((t) => ({ text: t, type: 'green' }))} background="white" />
            <VisualChecklist title="Procedures & Controls" items={['Standard operating procedures', 'Safe work procedures', 'Emergency procedures', 'Contractor controls', 'Visitor controls'].map((t) => ({ text: t, type: 'green' }))} background="white" />
            <VisualChecklist title="Assessment & Inspection" items={['Risk assessments', 'Inspection checklists', 'Audit checklists', 'Equipment inspection records'].map((t) => ({ text: t, type: 'green' }))} background="white" />
            <VisualChecklist title="Records & Registers" items={['Incident records', 'CAPA registers', 'Training records', 'PPE registers', 'Chemical registers', 'Waste records'].map((t) => ({ text: t, type: 'green' }))} background="white" />
          </div>
          <div className="mt-6 mx-auto max-w-2xl">
            <VisualChecklist title="Management Systems" items={['Compliance registers', 'Management-review templates', 'Document-control systems'].map((t) => ({ text: t, type: 'green' }))} background="soft" />
          </div>
        </Container>
      </section>

      {/* Full Document List */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <Eyebrow className="text-cube-green">COMPLETE LIST</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Documents and Records We Support</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            SAFE CUBE helps organizations develop practical documents and records that support workplace safety, quality, compliance, and management-system effectiveness.
          </SectionIntro>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <div key={doc} className="flex items-start gap-2 rounded-lg border border-cube-soft bg-white p-3">
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
          <ContentCallout type="disclaimer" title="About Our Practical Documents">
            <p>SAFE CUBE develops documents that are designed to be used in real workplaces, not filed away and forgotten. We focus on clarity, proportionality, and usability.</p>
            <p className="mt-2">We do not provide legal advice. Our documents are practical workplace tools designed to support compliance readiness and operational improvement. Organizations remain responsible for verifying that their documentation meets applicable legal and regulatory requirements.</p>
          </ContentCallout>
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
