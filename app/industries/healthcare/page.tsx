import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Healthcare Safety & Compliance Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps healthcare facilities improve patient safety, infection control, waste handling, occupational health, and compliance.',
  alternates: { canonical: '/industries/healthcare' },
};

export default function HealthcareIndustryPage() {
  const industry = industries.find((i) => i.slug === 'healthcare');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Infection Control Awareness',
        'Fire Safety Awareness',
        'First Aid Awareness',
        'Hazard Identification',
        'Waste Management',
      ]}
    />
  );
}
