import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Logistics & Transport Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps logistics and transport businesses improve vehicle safety, loading and unloading, driver fatigue management, traffic management, and compliance.',
  alternates: { canonical: '/industries/logistics-transport' },
};

export default function LogisticsTransportIndustryPage() {
  const industry = industries.find((i) => i.slug === 'logistics-transport');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Manual Handling',
        'Fire Safety Awareness',
        'Hazard Identification',
        'PPE Awareness',
        'Toolbox Talks',
      ]}
    />
  );
}
