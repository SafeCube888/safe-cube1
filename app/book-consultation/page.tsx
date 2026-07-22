'use client';
import { useState } from 'react';
import { Eyebrow, SectionHeading } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { TextInput, EmailInput, PhoneInput, TextAreaField, SelectField, RadioGroupField, ConsentCheckbox, FormSectionHeading } from '@/components/ui/forms';
import { PageHero } from '@/components/ui/visual-sections';
import { pageImages } from '@/content/images';
import { CTADark } from '@/components/ui/cta';
import { useFormAction, FormErrorSummary, FormSuccessMessage } from '@/components/ui/form-action';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { HoneypotField } from '@/components/ui/honeypot';
import { submitConsultationForm } from '@/lib/actions';

const consultationTypes = [
  { value: 'safe-snap', label: 'SAFE SNAP — Quick Workplace Observation' },
  { value: 'cube-score', label: 'CUBE SCORE — Workplace Readiness Score' },
  { value: 'cube-insight', label: 'CUBE INSIGHT — Detailed Workplace Assessment' },
  { value: 'cube-care', label: 'CUBE CARE — Ongoing Improvement Support' },
  { value: 'training', label: 'SAFE CUBE Training' },
  { value: 'iso', label: 'ISO & Management Systems' },
  { value: 'general', label: 'General Consultation' },
];

const consultationMethods = [
  { value: 'on-site', label: 'On-site at our workplace' },
  { value: 'phone', label: 'Phone call' },
  { value: 'video', label: 'Video call' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export default function BookConsultationPage() {
  const [selectedService, setSelectedService] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const { state, isPending, turnstileToken, setTurnstileToken, formRef, successRef, formAction } =
    useFormAction({ action: submitConsultationForm });

  const showErrors = !!state.errors || (!state.success && !!state.message);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Book a Consultation' }]}
        eyebrow="CONSULTATION"
        title="Book a Consultation"
        description="Schedule a consultation with SAFE CUBE to discuss your workplace needs, assessment options, or improvement goals."
        primaryCta={{ label: 'BOOK NOW', href: '#consultation-form' }}
        image={pageImages.bookConsultationHero}
        imageAlt={pageImages.bookConsultationHeroAlt}
        variant="split"
        theme="light"
      />

      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">BOOK A CONSULTATION</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Schedule Your Consultation</SectionHeading>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Complete the form below to request a consultation. We will contact you within two business days to confirm the date, time, and format.
          </p>

          <form ref={formRef} action={formAction} className="mt-8 space-y-6">
            <HoneypotField />
            {showErrors && (
              <FormErrorSummary errors={state.errors} message={state.message} />
            )}

            <FormSectionHeading>Your Details</FormSectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput id="fullName" name="name" label="Full Name" required placeholder="Your full name" />
              <TextInput id="jobTitle" label="Job Title" placeholder="Your job title" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <EmailInput id="email" name="email" label="Email Address" required placeholder="you@business.com" />
              <PhoneInput id="phone" name="phone" label="Phone Number" required placeholder="+92 3XX XXXXXXX" />
            </div>
            <TextInput id="businessName" name="company" label="Business Name" required placeholder="Your business name" />

            <FormSectionHeading>Consultation Details</FormSectionHeading>
            <SelectField
              id="consultationType"
              label="Consultation Type"
              placeholder="Select a consultation type"
              options={consultationTypes}
              value={selectedService}
              onChange={setSelectedService}
            />
            <input type="hidden" name="service_interest" value={selectedService} />
            <RadioGroupField
              label="Preferred Consultation Method"
              name="consultation_method"
              options={consultationMethods}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInput id="preferredDate" name="preferred_date" label="Preferred Date" type="date" />
              <TextInput id="preferredTime" name="preferred_time" label="Preferred Time" placeholder="e.g., Morning, Afternoon" />
            </div>
            <TextInput id="industry" label="Industry" placeholder="Your industry" />
            <TextInput id="employeeCount" label="Number of Employees" placeholder="Approximate number" type="number" />
            <TextAreaField
              id="notes"
              name="message"
              label="Additional Notes or Concerns"
              rows={4}
              placeholder="Briefly describe any specific concerns, goals, or areas you would like the consultation to address."
            />

            <ConsentCheckbox
              id="consent"
              consentText="I agree to be contacted by SAFE CUBE to arrange my consultation."
              required
              checked={consentChecked}
              onCheckedChange={(checked) => setConsentChecked(checked === true)}
            />
            <input type="hidden" name="consent" value={consentChecked ? 'true' : 'false'} />

            <input type="hidden" name="turnstile-token" value={turnstileToken} />

            <TurnstileWidget onVerify={setTurnstileToken} className="mt-4" />

            <Button type="submit" variant="green" size="lg" className="w-full" loading={isPending} disabled={isPending}>
              REQUEST CONSULTATION
            </Button>

            {state.success && (
              <FormSuccessMessage
                ref={successRef}
                message={state.message || 'Thank you for booking a consultation. We have received your request and will contact you within two business days to confirm the details.'}
              />
            )}
          </form>
        </Container>
      </section>

      <section className="section-standard bg-cube-soft">
        <Container>
          <CTADark
            heading="Prefer to Start with a Free Assessment?"
            text="If you are not sure which consultation type you need, start with a free CUBE SCORE to understand your workplace readiness."
            primaryLabel="GET FREE CUBE SCORE"
            primaryHref="/cube-score"
            secondaryLabel="TALK TO SAFE CUBE"
            secondaryHref="/contact"
          />
        </Container>
      </section>
    </>
  );
}
