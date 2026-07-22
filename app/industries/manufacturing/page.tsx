import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries } from '@/content/industries';
import { IndustryPageTemplate } from '@/components/industry/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Manufacturing Safety & Quality Solutions | SAFE CUBE',
  description:
    'SAFE CUBE helps manufacturing businesses improve machinery safety, process risk management, quality control, chemical management, and operational consistency.',
  alternates: { canonical: '/industries/manufacturing' },
};

export default function ManufacturingIndustryPage() {
  const industry = industries.find((i) => i.slug === 'manufacturing');
  if (!industry) notFound();

  return (
    <IndustryPageTemplate
      industry={industry}
      recommendedTraining={[
        'Workplace Safety Awareness',
        'Machinery Safety',
        'Chemical Safety',
        'Electrical Safety',
        'Noise and Vibration',
        'ISO 9001 Awareness',
      ]}
    />
  );
}
