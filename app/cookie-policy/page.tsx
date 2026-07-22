import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Cookie Policy | SAFE CUBE',
  description: 'How SAFE CUBE uses cookies and similar technologies.',
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageTemplate
      title="Cookie Policy"
      description="How SAFE CUBE uses cookies and similar technologies."
      lastUpdated="2024"
      sections={[
        {
          heading: 'What Are Cookies',
          paragraphs: [
            'Cookies are small text files that a website places on your device when you visit it. They allow the website to recognise your device and remember information about your visit, such as your preferences, login details, and browsing behaviour.',
            'Cookies are widely used to make websites work more efficiently and to provide information to site owners. They are not programs and cannot install software or viruses on your device. This Cookie Policy explains how SAFE CUBE uses cookies and similar technologies on our website.',
          ],
        },
        {
          heading: 'Types of Cookies We Use',
          paragraphs: [
            'SAFE CUBE uses several types of cookies to enhance your experience and to help us understand how our website is used. Each type serves a specific purpose and is described below.',
          ],
          list: [
            'Essential cookies: necessary for the website to function and cannot be switched off',
            'Performance cookies: collect anonymous information about how visitors use the website',
            'Functional cookies: allow the website to remember choices you make for a more personalised experience',
            'Targeting cookies: may be set by advertising partners to build a profile of your interests',
          ],
        },
        {
          heading: 'Managing Cookies',
          paragraphs: [
            'You have the ability to control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. You can typically find these settings under "Options" or "Preferences" in your browser menu.',
            'Please note that disabling cookies may affect the functionality of certain features on our website. If you disable cookies, some parts of the site may not work as intended and you may not be able to take full advantage of all our features.',
          ],
        },
        {
          heading: 'Third-Party Cookies',
          paragraphs: [
            'In some cases, SAFE CUBE may use third-party services that set their own cookies on your device. These third-party cookies are governed by the respective privacy and cookie policies of those providers and are not controlled by SAFE CUBE.',
            'We recommend that you review the cookie policies of these third-party providers to understand how they use cookies. SAFE CUBE does not have control over or access to the information collected by third-party cookies.',
          ],
        },
        {
          heading: 'Updates',
          paragraphs: [
            'SAFE CUBE may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. Any changes will be posted on this page with an updated "last updated" date.',
            'We encourage you to review this policy periodically to stay informed about how we use cookies. Your continued use of our website after any changes constitutes acceptance of the updated Cookie Policy.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions about this Cookie Policy or how SAFE CUBE uses cookies, please contact us using the details available on our website. We are happy to provide further clarification regarding our use of cookies and similar technologies.',
          ],
        },
      ]}
    />
  );
}
