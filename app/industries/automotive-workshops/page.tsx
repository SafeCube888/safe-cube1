import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Automotive Workshop Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps automotive workshops improve vehicle lifting safety, chemical handling, fire safety, PPE control, electrical equipment safety, and housekeeping.',
  alternates: { canonical: '/industries/automotive-workshops' },
};

export default function AutomotiveWorkshopsIndustryPage() {
  const industry = industries.find((i) => i.slug === 'automotive-workshops');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Fire Safety Awareness',
        'Chemical Safety',
        'PPE Awareness',
        'Electrical Safety',
        'Toolbox Talks',
      ]}
    />
  );
}
