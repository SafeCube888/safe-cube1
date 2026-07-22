import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy | SAFE CUBE',
  description: 'How SAFE CUBE collects, uses, and protects personal information.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      description="How SAFE CUBE collects, uses, and protects personal information."
      lastUpdated="2024"
      sections={[
        {
          heading: 'Information We Collect',
          paragraphs: [
            'SAFE CUBE collects information that you provide directly to us when you use our website, request a consultation, subscribe to our newsletter, or otherwise interact with our services. This may include your name, email address, phone number, company name, job title, and any other details you choose to share.',
            'We also collect information automatically when you visit our website, including your IP address, browser type, device information, pages visited, referring URLs, and the dates and times of your visits. This technical data helps us maintain and improve the security, performance, and functionality of our platform.',
          ],
        },
        {
          heading: 'How We Use Information',
          paragraphs: [
            'We use the information we collect to provide and improve our services, respond to your enquiries, process consultation requests, send you relevant communications where you have consented to receive them, and fulfil our contractual and legal obligations.',
            'Your information may also be used for internal analytics, quality assurance, and service development purposes. We do not sell your personal information to third parties under any circumstances.',
          ],
          list: [
            'Providing and delivering the services you request',
            'Communicating with you about consultations, updates, and support',
            'Analysing and improving website performance and user experience',
            'Complying with applicable legal, regulatory, and accounting obligations',
          ],
        },
        {
          heading: 'Information Sharing',
          paragraphs: [
            'SAFE CUBE may share your personal information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you. These providers are contractually bound to protect your information and may only use it for the purposes for which they were engaged.',
            'We may also disclose your information where required by law, court order, or government regulation, or where we believe in good faith that disclosure is necessary to protect our rights, the safety of any person, or to comply with legal process.',
          ],
        },
        {
          heading: 'Data Security',
          paragraphs: [
            'SAFE CUBE implements reasonable technical, administrative, and physical safeguards designed to protect your personal information against unauthorised access, alteration, disclosure, or destruction.',
            'However, no method of transmission over the internet or method of electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security and acknowledge that you provide your information at your own risk.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'SAFE CUBE uses cookies and similar tracking technologies to enhance your browsing experience, analyse website traffic, and remember your preferences. Cookies are small text files stored on your device that allow us to recognise returning visitors and understand how our website is used.',
            'You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website. For more information, please review our separate Cookie Policy.',
          ],
        },
        {
          heading: 'Your Rights',
          paragraphs: [
            'Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, update, or request deletion of your data. You may also have the right to restrict or object to certain processing of your information.',
            'To exercise any of these rights, please contact us using the details provided in the Contact section below. We will respond to your request in accordance with applicable data protection laws.',
          ],
          list: [
            'The right to access the personal information we hold about you',
            'The right to request correction of inaccurate or incomplete information',
            'The right to request deletion of your personal information',
            'The right to withdraw consent to processing at any time',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact SAFE CUBE using the contact details available on our website. We are committed to addressing your enquiries promptly and in accordance with applicable law.',
          ],
        },
        {
          heading: 'Updates',
          paragraphs: [
            'SAFE CUBE may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on this page and updating the "last updated" date at the top.',
            'We encourage you to review this policy periodically to stay informed about how we collect, use, and protect your information. Your continued use of our website after any changes constitutes acceptance of the updated Privacy Policy.',
          ],
        },
      ]}
    />
  );
}
