import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Corporate Office Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps corporate offices improve ergonomics, fire readiness, employee wellbeing, electrical safety, emergency planning, and compliance.',
  alternates: { canonical: '/industries/corporate-offices' },
};

export default function CorporateOfficesIndustryPage() {
  const industry = industries.find((i) => i.slug === 'corporate-offices');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Ergonomics',
        'Fire Safety Awareness',
        'Emergency Response',
        'First Aid Awareness',
        'Hazard Identification',
      ]}
    />
  );
}
