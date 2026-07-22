import type { Metadata } from 'next';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { InternalPageHero } from '@/components/ui/heroes';
import { CTADark } from '@/components/ui/cta';
import { faqs } from '@/content/faqs';
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | SAFE CUBE',
  description:
    'Answers to common questions about SAFE CUBE services, CUBE SCORE, CUBE INSIGHT, CUBE CARE, training, ISO, and workplace safety.',
  alternates: { canonical: '/faqs' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]}
        title="Frequently Asked Questions"
        description="Answers to common questions about SAFE CUBE services, workplace safety, and compliance support."
      />

      <section className="section-standard bg-white">
        <Container width="narrow">
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">QUESTIONS & ANSWERS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Common Questions</SectionHeading>
            <SectionIntro className="mt-4">
              Find answers to the questions we hear most often from businesses considering SAFE CUBE support.
            </SectionIntro>
          </div>

          <FaqAccordion faqs={faqs} />
        </Container>
      </section>

      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Still Have Questions?"
            text="Contact SAFE CUBE to discuss your workplace needs, or start with a free CUBE SCORE to understand where your business stands."
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
