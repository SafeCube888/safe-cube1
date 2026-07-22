import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Construction Site Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps construction businesses improve site safety, work at height, excavation, lifting, electrical risk, permits, and emergency readiness.',
  alternates: { canonical: '/industries/construction' },
};

export default function ConstructionIndustryPage() {
  const industry = industries.find((i) => i.slug === 'construction');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Working at Height',
        'Fire Safety Awareness',
        'Electrical Safety',
        'Manual Handling',
        'Toolbox Talks',
      ]}
    />
  );
}
