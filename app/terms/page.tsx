import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SAFE CUBE',
  description: 'Terms and conditions for using SAFE CUBE services and website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Terms & Conditions"
      description="Terms and conditions for using SAFE CUBE services and website."
      lastUpdated="2024"
      sections={[
        {
          heading: 'Acceptance of Terms',
          paragraphs: [
            'By accessing and using the SAFE CUBE website and any services offered through it, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not access or use our website or services.',
            'These terms apply to all visitors, users, and others who access or use SAFE CUBE in any capacity. Your continued use of the website constitutes acceptance of these terms as they may be updated from time to time.',
          ],
        },
        {
          heading: 'Services',
          paragraphs: [
            'SAFE CUBE provides safety compliance, consulting, and related services to businesses and organisations. The specific scope, deliverables, and terms of any engagement will be governed by a separate agreement between you and SAFE CUBE.',
            'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of our services.',
          ],
        },
        {
          heading: 'User Responsibilities',
          paragraphs: [
            'You agree to use the SAFE CUBE website and services only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use and enjoyment of, the site by any third party.',
            'You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account, where applicable. You agree to notify us immediately of any unauthorised use of your account or any other breach of security.',
          ],
          list: [
            'Providing accurate and complete information when requested',
            'Not attempting to gain unauthorised access to any part of the website',
            'Not using the website to transmit viruses, malware, or harmful code',
            'Not reproducing, duplicating, or reselling any content without authorisation',
          ],
        },
        {
          heading: 'Intellectual Property',
          paragraphs: [
            'All content on the SAFE CUBE website, including text, graphics, logos, images, software, and the selection and arrangement thereof, is the property of SAFE CUBE or its licensors and is protected by intellectual property laws.',
            'You may view and use the content for personal, non-commercial purposes only. Any unauthorised reproduction, distribution, modification, or commercial use of the content is strictly prohibited without prior written consent from SAFE CUBE.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          paragraphs: [
            'SAFE CUBE shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, our website or services. This includes, without limitation, any loss of profits, data, business, or goodwill.',
            'The information and services provided by SAFE CUBE are offered on an "as is" and "as available" basis. We make no warranties or representations about the accuracy, completeness, or reliability of any content on our website.',
          ],
        },
        {
          heading: 'Governing Law',
          paragraphs: [
            'These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which SAFE CUBE is registered, without regard to its conflict of law principles.',
            'Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of that jurisdiction. If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'SAFE CUBE reserves the right to update or modify these Terms & Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website following the posting of any changes constitutes your acceptance of the revised terms.',
            'We encourage you to review these terms periodically. If you do not agree to the updated terms, you should discontinue your use of the website and our services.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions or concerns about these Terms & Conditions, please contact SAFE CUBE using the contact details available on our website. We are committed to addressing your enquiries in a timely and professional manner.',
          ],
        },
      ]}
    />
  );
}
