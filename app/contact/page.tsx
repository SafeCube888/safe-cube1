'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Eyebrow, SectionHeading } from '@/components/ui/typography';
import { Container, TwoColumnLayout } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import {
  TextInput,
  EmailInput,
  PhoneInput,
  TextAreaField,
  SelectField,
  ConsentCheckbox,
  FormSectionHeading,
} from '@/components/ui/forms';
import {
  useFormAction,
  FormErrorSummary,
  FormSuccessMessage,
} from '@/components/ui/form-action';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { HoneypotField } from '@/components/ui/honeypot';
import { submitContactForm } from '@/lib/actions';
import { PageHero } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';
import { siteConfig } from '@/config/site';

const serviceOptions = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'safe-snap', label: 'SAFE SNAP' },
  { value: 'cube-score', label: 'CUBE SCORE' },
  { value: 'cube-insight', label: 'CUBE INSIGHT' },
  { value: 'cube-care', label: 'CUBE CARE' },
  { value: 'training', label: 'SAFE CUBE Training' },
  { value: 'iso-management-systems', label: 'ISO & Management Systems' },
  { value: 'risk-assessment-audits', label: 'Risk Assessment & Workplace Audits' },
  { value: 'documentation-compliance', label: 'Documentation & Compliance Support' },
  { value: 'cube-store', label: 'Cube Store Product Enquiry' },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') ?? '';

  const [selectedService, setSelectedService] = useState(initialService);
  const [consentChecked, setConsentChecked] = useState(false);

  const { state, isPending, turnstileToken, setTurnstileToken, formRef, successRef, formAction } =
    useFormAction({ action: submitContactForm });

  const showErrors = !!state.errors || (!state.success && !!state.message);

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-6">
      <HoneypotField />
      {showErrors && (
        <FormErrorSummary errors={state.errors} message={state.message} />
      )}

      <FormSectionHeading>Your Details</FormSectionHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          id="fullName"
          name="name"
          label="Full Name"
          required
          placeholder="Your full name"
        />
        <TextInput id="jobTitle" label="Job Title" placeholder="Your job title" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EmailInput
          id="email"
          name="email"
          label="Email Address"
          required
          placeholder="you@business.com"
        />
        <PhoneInput id="phone" name="phone" label="Phone Number" placeholder="+92 3XX XXXXXXX" />
      </div>
      <TextInput id="businessName" name="company" label="Business Name" placeholder="Your business name" />

      <FormSectionHeading>Your Enquiry</FormSectionHeading>
      <SelectField
        id="service"
        label="Service of Interest"
        placeholder="Select a service"
        options={serviceOptions}
        value={selectedService}
        onChange={setSelectedService}
      />
      <input type="hidden" name="subject" value={selectedService} />

      <TextAreaField
        id="message"
        name="message"
        label="Message"
        required
        rows={5}
        placeholder="Tell us about your workplace needs or questions."
      />

      <ConsentCheckbox
        id="consent"
        consentText="I agree to be contacted by SAFE CUBE regarding my enquiry."
        required
        checked={consentChecked}
        onCheckedChange={(checked) => setConsentChecked(checked === true)}
      />
      <input type="hidden" name="consent" value={consentChecked ? 'true' : 'false'} />

      <input type="hidden" name="turnstile-token" value={turnstileToken} />

      <TurnstileWidget onVerify={setTurnstileToken} className="mt-4" />

      <Button type="submit" variant="green" size="lg" className="w-full" loading={isPending} disabled={isPending}>
        SEND MESSAGE
      </Button>

      {state.success && (
        <FormSuccessMessage
          ref={successRef}
          message={state.message || 'Thank you for contacting SAFE CUBE. We have received your message and will respond within two business days.'}
        />
      )}
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="CONTACT"
        title="Contact SAFE CUBE"
        description="Get in touch to discuss your workplace needs, request an assessment, or ask about any of our services."
        primaryCta={{ label: 'SEND MESSAGE', href: '#contact-form' }}
        image={pageImages.contactHero}
        imageAlt={pageImages.contactHeroAlt}
        variant="split"
        theme="light"
      />

      <section className="section-standard bg-white">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">CONTACT METHODS</Eyebrow>
                <SectionHeading className="mt-3" as="h2">Get in Touch</SectionHeading>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10">
                      <Phone className="h-5 w-5 text-cube-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cube-navy">Phone</p>
                      <a href={siteConfig.contact.phoneHref} className="text-sm text-muted-foreground hover:text-cube-green transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10">
                      <MessageCircle className="h-5 w-5 text-cube-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cube-navy">WhatsApp</p>
                      <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-cube-green transition-colors">
                        {siteConfig.contact.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10">
                      <Mail className="h-5 w-5 text-cube-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cube-navy">Email</p>
                      <a href={siteConfig.contact.emailHref} className="text-sm text-muted-foreground hover:text-cube-green transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10">
                      <MapPin className="h-5 w-5 text-cube-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cube-navy">Office</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.office}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cube-green/10">
                      <Clock className="h-5 w-5 text-cube-green" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-cube-navy">Hours</p>
                      <p className="text-sm text-muted-foreground">{siteConfig.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            }
            right={
              <div>
                <Eyebrow className="text-cube-green">CONTACT FORM</Eyebrow>
                <SectionHeading className="mt-3" as="h2">Send a Message</SectionHeading>

                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            }
          />
        </Container>
      </section>
    </>
  );
}
