import type { Metadata } from 'next';
import { LegalPageTemplate } from '@/components/legal/LegalPageTemplate';

export const metadata: Metadata = {
  title: 'Disclaimer | SAFE CUBE',
  description: 'Important disclaimers regarding SAFE CUBE services and information.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <LegalPageTemplate
      title="Disclaimer"
      description="Important disclaimers regarding SAFE CUBE services and information."
      lastUpdated="2024"
      sections={[
        {
          heading: 'General Disclaimer',
          paragraphs: [
            'The information provided by SAFE CUBE on our website and through our services is intended for general informational purposes only. While we endeavour to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.',
            'Any reliance you place on such information is strictly at your own risk. SAFE CUBE shall not be liable for any loss or damage of any nature arising from the use of or reliance on information provided on this website or through our services.',
          ],
        },
        {
          heading: 'Professional Advice',
          paragraphs: [
            'The content provided by SAFE CUBE does not constitute professional, legal, regulatory, or safety advice. While our team includes qualified professionals, any information provided through our website or in general communications should not be treated as a substitute for tailored professional advice.',
            'You should always seek the advice of a qualified professional regarding your specific circumstances and requirements before making any decisions based on information obtained from SAFE CUBE.',
          ],
        },
        {
          heading: 'Certification and Compliance',
          paragraphs: [
            'SAFE CUBE may provide guidance, training, and consulting services related to safety certifications and regulatory compliance. However, the achievement of any certification or compliance outcome depends on numerous factors beyond our control, including your organisation\'s implementation and the decisions of certifying bodies.',
            'SAFE CUBE does not guarantee any specific certification outcome or compliance result. Any references to standards, regulations, or certifications are provided for informational purposes and should be verified against the relevant official sources.',
          ],
        },
        {
          heading: 'Accuracy of Information',
          paragraphs: [
            'While SAFE CUBE takes reasonable care to ensure that information published on our website is accurate and current at the time of publication, we do not warrant that the information is free from errors or omissions. Information may be changed or updated without notice.',
            'You should verify any critical information with the relevant official sources or by contacting SAFE CUBE directly. We accept no responsibility for any actions taken or not taken as a result of information presented on this website.',
          ],
        },
        {
          heading: 'Third-Party Links',
          paragraphs: [
            'The SAFE CUBE website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.',
            'The inclusion of any link does not imply endorsement by SAFE CUBE. We are not responsible for the content or practices of any linked site and accept no liability for any loss or damage that may arise from your use of such websites.',
          ],
        },
        {
          heading: 'Limitation of Liability',
          paragraphs: [
            'To the fullest extent permitted by applicable law, SAFE CUBE, its directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or reliance on our website, services, or information provided therein.',
            'This limitation applies regardless of the form of action, whether in contract, tort, negligence, strict liability, or any other theory of liability. You acknowledge that you use our website and services at your own risk.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'If you have any questions or concerns regarding this Disclaimer, please contact SAFE CUBE using the contact details available on our website. We are committed to addressing your enquiries and providing any necessary clarification.',
          ],
        },
      ]}
    />
  );
}
