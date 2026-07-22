import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Power & Utilities Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps power and utilities businesses improve electrical safety, confined space entry, hazard identification, emergency response, and regulatory compliance.',
  alternates: { canonical: '/industries/power-utilities' },
};

export default function PowerUtilitiesIndustryPage() {
  const industry = industries.find((i) => i.slug === 'power-utilities');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Electrical Safety',
        'Confined Space Awareness',
        'Emergency Response',
        'Fire Safety Awareness',
        'Working at Height',
      ]}
    />
  );
}
