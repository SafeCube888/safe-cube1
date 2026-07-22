import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Warehouse Safety Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps warehouses improve storage safety, material handling, traffic management, fire protection, racking, loading areas, and inventory protection.',
  alternates: { canonical: '/industries/warehouses' },
};

export default function WarehousesIndustryPage() {
  const industry = industries.find((i) => i.slug === 'warehouses');
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
