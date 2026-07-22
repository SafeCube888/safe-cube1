import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | SAFE CUBE',
  description: 'Refund and return policy for SAFE CUBE services and products.',
  alternates: { canonical: '/refund-return-policy' },
};

export default function RefundReturnPolicyPage() {
  return (
    <LegalPageTemplate
      title="Refund & Return Policy"
      description="Refund and return policy for SAFE CUBE services and products."
      lastUpdated="2024"
      sections={[
        {
          heading: 'Store Status',
          paragraphs: [
            'Please note that the SAFE CUBE Cube Store is currently not active. Store functionality, including the ability to purchase products, process refunds, or handle returns, is not yet available on our platform.',
            'This Refund & Return Policy is provided as a draft template for future reference and is subject to comprehensive legal review before the Cube Store becomes operational. No transactions involving physical or digital products are currently being processed.',
          ],
        },
        {
          heading: 'Service Fees',
          paragraphs: [
            'Fees for consulting, training, and other professional services provided by SAFE CUBE are governed by the terms set out in the individual service agreement or engagement letter between SAFE CUBE and the client.',
            'Refund eligibility for service fees, if any, will be determined in accordance with the specific terms of the applicable service agreement. Any cancellation or refund requests should be directed to SAFE CUBE using the contact details provided in the Contact section below.',
          ],
        },
        {
          heading: 'Future Store Policies',
          paragraphs: [
            'When the Cube Store becomes operational, a comprehensive Refund & Return Policy will be published detailing the conditions under which refunds and returns may be requested, the applicable timeframes, and the process for submitting such requests.',
            'Until then, this policy serves as a placeholder and does not constitute a binding commitment regarding refund or return practices. All future store-related policies will be subject to legal review and will be made available on this page prior to the store\'s launch.',
          ],
          list: [
            'Refund eligibility criteria for physical and digital products',
            'Return and exchange procedures and timeframes',
            'Shipping cost responsibilities for returned items',
            'Conditions for receiving replacements or store credit',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions about this Refund & Return Policy or any service-related fee enquiries, please contact SAFE CUBE using the contact details available on our website. We are committed to responding to your enquiries in a timely and transparent manner.',
          ],
        },
      ]}
    />
  );
}
