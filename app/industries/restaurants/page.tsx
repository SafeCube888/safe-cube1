import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Restaurants & Food Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps restaurants and food service businesses improve food safety, kitchen safety, hygiene, fire readiness, and service consistency.',
  alternates: { canonical: '/industries/restaurants' },
};

export default function RestaurantsIndustryPage() {
  const industry = industries.find((i) => i.slug === 'restaurants');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Fire Safety Awareness',
        'First Aid Awareness',
        'Food Safety Awareness',
        'Hazard Identification',
        'Toolbox Talks',
      ]}
    />
  );
}
