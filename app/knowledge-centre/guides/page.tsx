import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { InternalPageHero } from '@/components/ui/heroes';
import { CTADark } from '@/components/ui/cta';
import { downloads } from '@/content/downloads';

export const metadata: Metadata = {
  title: 'Guides & Checklists | SAFE CUBE Knowledge Centre',
  description:
    'Download practical workplace safety checklists, inspection templates, registers, and forms for your workplace.',
  alternates: { canonical: '/knowledge-centre/guides' },
};

export default function GuidesPage() {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Knowledge Centre', href: '/knowledge-centre' }, { label: 'Guides & Checklists' }]}
        title="Guides & Checklists"
        description="Download practical workplace safety checklists, inspection templates, registers, and forms designed to support your daily and periodic workplace activities."
      />

      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">RESOURCES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Available Resources</SectionHeading>
            <SectionIntro className="mt-4">
              These resources are provided to help businesses implement practical workplace safety, compliance, and management-system practices. Download links will be activated as files become available.
            </SectionIntro>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {downloads.map((item) => (
              <div key={item.slug} className="flex h-full flex-col rounded-lg border border-cube-soft bg-cube-soft p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-cube-blue/10 text-cube-blue">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-cube-navy">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded bg-white px-2 py-1 font-medium text-cube-navy">{item.fileType}</span>
                  {item.version && <span>Version {item.version}</span>}
                  {item.lastUpdated && <span>Updated {item.lastUpdated}</span>}
                </div>

                <div className="mt-5 pt-2">
                  <Button variant="outlineBlue" size="sm" disabled>
                    Available Soon
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Need Help Implementing These Resources?"
            text="SAFE CUBE can help you implement these checklists, templates, and systems in your workplace. Start with a free CUBE SCORE or contact us for support."
            primaryLabel="GET FREE CUBE SCORE"
            primaryHref="/cube-score"
            secondaryLabel="TALK TO SAFE CUBE"
            secondaryHref="/contact"
          />
        </Container>
      </section>
    </>
  );
}
