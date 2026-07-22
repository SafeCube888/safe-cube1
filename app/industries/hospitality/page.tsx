import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Hospitality Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps hospitality businesses improve guest safety, fire readiness, food safety, pool and recreation safety, employee wellbeing, and emergency planning.',
  alternates: { canonical: '/industries/hospitality' },
};

export default function HospitalityIndustryPage() {
  const industry = industries.find((i) => i.slug === 'hospitality');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Fire Safety Awareness',
        'First Aid Awareness',
        'Food Safety Awareness',
        'Emergency Response',
        'Hazard Identification',
      ]}
    />
  );
}
