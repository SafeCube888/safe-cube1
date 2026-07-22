import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Shipping Policy | SAFE CUBE',
  description: 'Shipping policy for SAFE CUBE products.',
  alternates: { canonical: '/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageTemplate
      title="Shipping Policy"
      description="Shipping policy for SAFE CUBE products."
      lastUpdated="2024"
      sections={[
        {
          heading: 'Store Status',
          paragraphs: [
            'Please note that the SAFE CUBE Cube Store is currently not active. As no physical products are being sold or distributed through our platform at this time, shipping is not yet applicable.',
            'This Shipping Policy is provided as a draft template for future reference and is subject to comprehensive legal review before the Cube Store becomes operational. No orders requiring shipment are currently being processed or fulfilled.',
          ],
        },
        {
          heading: 'Future Shipping Arrangements',
          paragraphs: [
            'When the Cube Store becomes operational, a detailed Shipping Policy will be published outlining the shipping methods, delivery timeframes, associated costs, geographic coverage, and tracking information available to customers.',
            'Until then, this policy serves as a placeholder and does not constitute a binding commitment regarding shipping practices. All future shipping-related policies will be subject to legal review and will be made available on this page prior to the store\'s launch.',
          ],
          list: [
            'Supported shipping destinations and any restrictions',
            'Estimated processing and delivery timeframes',
            'Shipping costs and any applicable duties or taxes',
            'Order tracking and delivery confirmation procedures',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions about this Shipping Policy, please contact SAFE CUBE using the contact details available on our website. We are happy to provide further information regarding any future shipping arrangements as they become available.',
          ],
        },
      ]}
    />
  );
}
