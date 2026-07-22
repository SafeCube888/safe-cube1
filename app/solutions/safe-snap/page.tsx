import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { CTADark } from '@/components/ui/cta';
import { PageHero, VisualChecklist, ProcessTimeline, ContentCallout } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';

export const metadata: Metadata = {
  title: 'SAFE SNAP | Quick Workplace Observation by SAFE CUBE',
  description:
    'Identify visible hazards, immediate red flags, and priority workplace improvements through a focused SAFE SNAP observation visit.',
  alternates: { canonical: '/solutions/safe-snap' },
};

const whoItIsFor = [
  'Businesses new to workplace safety',
  'Organizations preparing for a client visit or inspection',
  'Workplaces that want a quick perspective on visible hazards',
  'Businesses considering a more detailed assessment',
  'Organizations that want a professional opinion before investing in improvements',
];

const whatWeLookAt = [
  'General workplace conditions and housekeeping',
  'Visible fire and emergency readiness',
  'Obvious hazards and unsafe conditions',
  'PPE availability and use',
  'Basic compliance indicators',
  'General workplace organization',
];

const whatYouReceive = [
  'A brief verbal or written summary of observations',
  'Identification of immediate red flags',
  'General recommendations for priority attention',
  'Suggested next steps and options for more detailed support',
];

const whatItIsNot = [
  'It is not a detailed workplace assessment',
  'It does not include documented findings or risk ratings',
  'It does not include a corrective action plan',
  'It does not replace statutory or certification audits',
  'It does not certify legal compliance',
];

const processSteps = [
  {
    step: 1,
    icon: 'contact',
    title: 'Request',
    description: 'You request a SAFE SNAP visit through the contact form or by phone.',
  },
  {
    step: 2,
    icon: 'inspection',
    title: 'Schedule',
    description: 'We schedule a convenient time for the workplace visit.',
  },
  {
    step: 3,
    icon: 'assessment',
    title: 'Observe',
    description: 'We conduct a focused visual observation of your workplace.',
  },
  {
    step: 4,
    icon: 'reports',
    title: 'Summarize',
    description:
      'We provide a brief verbal or written summary of observations and immediate red flags.',
  },
  {
    step: 5,
    icon: 'corrective-actions',
    title: 'Recommend',
    description: 'We suggest next steps and options for more detailed support if needed.',
  },
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
          <span className="text-body-lg text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SafeSnapPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: 'SAFE SNAP' }]}
        eyebrow="QUICK WORKPLACE OBSERVATION"
        title="SAFE SNAP"
        description="A Quick Professional Look at Your Workplace."
        primaryCta={{ label: 'REQUEST SAFE SNAP', href: '/contact?service=safe-snap' }}
        secondaryCta={{ label: 'EXPLORE CUBE INSIGHT', href: '/solutions/cube-insight' }}
        image={pageImages.safeSnapHero}
        imageAlt={pageImages.safeSnapHeroAlt}
        variant="split"
        theme="light"
      />

      {/* Section 1 - Who It Is For */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">WHO IT IS FOR</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Who SAFE SNAP Is For</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            SAFE SNAP is designed for businesses that want a quick, professional observation of their workplace without committing to a full detailed assessment.
          </SectionIntro>
          <VisualChecklist items={whoItIsFor.map((item) => ({ text: item, type: 'green' }))} title="Suitable For" />
        </Container>
      </section>

      {/* Section 2 - What We Look At */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">WHAT WE LOOK AT</Eyebrow>
          <SectionHeading className="mt-3" as="h2">What We Look At</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            During a SAFE SNAP visit, we focus on visible conditions, immediate hazards, and priority areas.
          </SectionIntro>
          <VisualChecklist items={whatWeLookAt.map((item) => ({ text: item, type: 'amber' }))} title="Observation Areas" />
        </Container>
      </section>

      {/* Section 3 - What The Client Receives */}
      <section className="section-standard bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow className="text-cube-green">WHAT YOU RECEIVE</Eyebrow>
              <SectionHeading className="mt-3" as="h2">
                What You Receive
              </SectionHeading>
              <p className="mt-4 text-body-lg text-muted-foreground">
                After the visit, you receive a clear, practical summary that highlights what was
                observed and where to focus next. The output is designed to be quick to understand
                and easy to act on.
              </p>
            </div>
            <div>
              <CheckList items={whatYouReceive} />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4 - What SAFE SNAP Is Not */}
      <section className="section-standard bg-cube-soft">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">IMPORTANT TO KNOW</Eyebrow>
          <SectionHeading className="mt-3" as="h2">What SAFE SNAP Is Not</SectionHeading>
          <SectionIntro className="mt-4" align="left">
            SAFE SNAP is a quick observation, not a detailed assessment. For a comprehensive evaluation, consider <a href="/solutions/cube-insight" className="font-medium text-cube-green underline-offset-4 hover:underline">CUBE INSIGHT</a>.
          </SectionIntro>
          <ContentCallout type="warning" title="Limitations">
            <ul className="mt-2 space-y-1">
              {whatItIsNot.map((item) => (
                <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-amber" aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </ContentCallout>
        </Container>
      </section>

      {/* Section 5 - Five-Step Process */}
      <ProcessTimeline
        eyebrow="THE PROCESS"
        heading="How SAFE SNAP Works"
        intro="A simple five-step process from request to recommendation, designed to keep things quick, focused, and practical."
        steps={processSteps.map((s) => ({ title: s.title, description: s.description, icon: s.step === 1 ? 'search' : s.step === 2 ? 'calendar' : s.step === 3 ? 'inspection' : s.step === 4 ? 'reports' : 'check' }))}
        background="white"
      />

      {/* Final CTA */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Ready for a Quick Professional Look at Your Workplace?"
            text="SAFE SNAP is a fast, practical way to identify visible hazards and immediate priorities. If you need a deeper assessment, CUBE INSIGHT provides documented findings and a structured improvement roadmap."
            primaryLabel="REQUEST SAFE SNAP"
            primaryHref="/contact?service=safe-snap"
            secondaryLabel="EXPLORE CUBE INSIGHT"
            secondaryHref="/solutions/cube-insight"
          />
        </Container>
      </section>
    </>
  );
}
