import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Educational Institution Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps educational institutions improve campus safety, fire readiness, emergency preparedness, laboratory safety, student wellbeing, and compliance.',
  alternates: { canonical: '/industries/education' },
};

export default function EducationIndustryPage() {
  const industry = industries.find((i) => i.slug === 'education');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Fire Safety Awareness',
        'Emergency Response',
        'First Aid Awareness',
        'Chemical Safety',
        'Hazard Identification',
      ]}
    />
  );
}
