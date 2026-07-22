import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Engineering Workshop Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps engineering workshops improve machinery guarding, welding safety, electrical safety, chemical handling, housekeeping, and PPE control.',
  alternates: { canonical: '/industries/engineering-workshops' },
};

export default function EngineeringWorkshopsIndustryPage() {
  const industry = industries.find((i) => i.slug === 'engineering-workshops');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Machinery Safety',
        'Electrical Safety',
        'Chemical Safety',
        'Fire Safety Awareness',
        'PPE Awareness',
      ]}
    />
  );
}
