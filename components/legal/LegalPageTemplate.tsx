import { AlertTriangle } from 'lucide-react';
import { Container } from '@/components/ui/layout';
import { InternalPageHero } from '@/components/ui/heroes';

export interface LegalPageSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalPageTemplateProps {
  title: string;
  description?: string;
  sections: LegalPageSection[];
  lastUpdated?: string;
}

export function LegalPageTemplate({ title, description, sections, lastUpdated }: LegalPageTemplateProps) {
  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }]}
        title={title}
        description={description}
      />

      {/* Development notice */}
      <div className="bg-cube-amber/10 border-b border-cube-amber/20">
        <Container>
          <div className="flex items-center gap-3 py-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-cube-amber" aria-hidden="true" />
            <p className="text-sm font-medium text-cube-amber">
              REQUIRES LEGAL REVIEW BEFORE PUBLICATION
            </p>
          </div>
        </Container>
      </div>

      <section className="section-standard bg-white">
        <Container width="narrow">
          {lastUpdated && (
            <p className="mb-6 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          )}

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-h4 text-cube-navy">{section.heading}</h2>
                {section.paragraphs && (
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="text-body text-muted-foreground">{para}</p>
                    ))}
                  </div>
                )}
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2 text-body text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cube-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-cube-soft bg-cube-soft p-6">
            <p className="text-sm text-muted-foreground">
              This document is a draft template provided for structural purposes only. It must be reviewed and approved by a qualified legal professional before publication. SAFE CUBE does not accept responsibility for any legal consequences arising from the use of this template without proper legal review.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
