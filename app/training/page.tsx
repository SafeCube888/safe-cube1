'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { TextInput, EmailInput, PhoneInput, TextAreaField, SelectField, ConsentCheckbox, FormSectionHeading } from '@/components/ui/forms';
import { InternalPageHero } from '@/components/ui/heroes';
import { CTADark } from '@/components/ui/cta';
import { trainingPrograms } from '@/content/training';
import { useFormAction, FormErrorSummary, FormSuccessMessage } from '@/components/ui/form-action';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { submitTrainingRequestForm } from '@/lib/actions';

const trainingGroups = [
  'General Safety',
  'Emergency and Fire',
  'Operational Safety',
  'Occupational Health',
  'Environment',
  'Quality and Compliance',
  'ISO and Management Systems',
  'Leadership and Custom Programs',
];

const deliveryFormats = [
  { format: 'On-site', description: 'Training delivered at your workplace or a designated location.' },
  { format: 'Online', description: 'Training delivered through online sessions accessible from any location.' },
];

const consultationMethods = [
  { value: 'on-site', label: 'On-site at our workplace' },
  { value: 'online', label: 'Online session' },
  { value: 'both', label: 'Both on-site and online' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export default function TrainingPage() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedGroupSize, setSelectedGroupSize] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const { state, isPending, turnstileToken, setTurnstileToken, formRef, successRef, formAction } =
    useFormAction({ action: submitTrainingRequestForm });

  const showErrors = !!state.errors || (!state.success && !!state.message);

  return (
    <>
      <InternalPageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Training' }]}
        title="SAFE CUBE Training"
        description="Practical Training for Safer Everyday Decisions."
        primaryLabel="REQUEST TRAINING"
        primaryHref="#training-form"
        secondaryLabel="TALK TO SAFE CUBE"
        secondaryHref="/contact"
      />

      {/* Intro */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">PRACTICAL WORKPLACE TRAINING</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Practical Training for Safer Everyday Decisions.</SectionHeading>
          <div className="mt-4 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              SAFE CUBE delivers clear, role-relevant workplace training designed to help employees understand risks, follow controls, respond correctly, and contribute to a stronger workplace culture.
            </p>
            <p className="text-body-lg text-muted-foreground">
              Our training programs cover general safety, emergency response, operational safety, occupational health, environmental management, quality and compliance, ISO and management systems, and leadership and custom programs. Training is available through on-site and online delivery formats.
            </p>
          </div>
        </Container>
      </section>

      {/* Training Categories */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">TRAINING PROGRAMS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Training Categories</SectionHeading>
            <SectionIntro className="mt-4">
              We offer 28 training programs across eight categories. Each program is designed to be practical, understandable, and relevant to real workplace conditions.
            </SectionIntro>
          </div>

          {trainingGroups.map((group) => {
            const programs = trainingPrograms.filter((p) => p.category === group);
            if (programs.length === 0) return null;
            return (
              <div key={group} className="mb-8">
                <h3 className="text-eyebrow text-cube-green mb-4">{group}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {programs.map((program) => (
                    <div key={program.id} className="rounded-lg border border-cube-soft bg-white p-5">
                      <h4 className="text-base font-semibold text-cube-navy">{program.title}</h4>
                      {program.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{program.description}</p>
                      )}
                      {program.deliveryFormats && program.deliveryFormats.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {program.deliveryFormats.map((fmt) => (
                            <span key={fmt} className="rounded-full bg-cube-soft px-2 py-1 text-xs font-medium text-cube-navy">
                              {fmt}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Delivery Formats */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">DELIVERY FORMATS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Delivery Formats</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {deliveryFormats.map((item) => (
              <div key={item.format} className="rounded-lg border border-cube-soft bg-cube-soft p-6">
                <h3 className="text-lg font-semibold text-cube-navy">{item.format}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Training Request Form */}
      <section id="training-form" className="section-standard bg-cube-soft scroll-mt-20">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">REQUEST TRAINING</Eyebrow>
          <SectionHeading className="mt-3" as="h2">Request a Training Program</SectionHeading>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Complete the form below to request a training program for your workplace. We will contact you to discuss your needs and arrange delivery.
          </p>

          {state.success ? (
            <div className="mt-8">
              <FormSuccessMessage
                ref={successRef}
                message={state.message || 'Thank you for your training request. We have received your enquiry and will contact you within two business days to discuss your training needs.'}
              />
            </div>
          ) : (
            <form ref={formRef} action={formAction} className="mt-8 space-y-6">
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

              <FormSectionHeading>Training Requirements</FormSectionHeading>
              <SelectField
                id="trainingCategory"
                label="Training Category of Interest"
                placeholder="Select a category"
                options={trainingGroups.map((g) => ({ value: g.toLowerCase().replace(/\s+/g, '-'), label: g }))}
                value={selectedProgram}
                onChange={setSelectedProgram}
              />
              <input type="hidden" name="training_program" value={selectedProgram} />
              <SelectField
                id="deliveryFormat"
                label="Preferred Delivery Format"
                placeholder="Select a format"
                options={[
                  { value: 'on-site', label: 'On-site' },
                  { value: 'online', label: 'Online' },
                  { value: 'both', label: 'Both on-site and online' },
                  { value: 'not-sure', label: 'Not sure yet' },
                ]}
                value={selectedGroupSize}
                onChange={setSelectedGroupSize}
              />
              <input type="hidden" name="group_size" value={selectedGroupSize} />
              <TextInput id="preferredLocation" name="preferred_location" label="Preferred Training Location" placeholder="On-site, online, or both" />
              <TextAreaField
                id="trainingNeeds"
                name="message"
                label="Specific Training Needs or Topics"
                rows={4}
                placeholder="Briefly describe the training topics, roles, or specific needs you want addressed."
              />

              <ConsentCheckbox
                id="consent"
                consentText="I agree to be contacted by SAFE CUBE regarding my training request."
                required
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked === true)}
              />
              <input type="hidden" name="consent" value={consentChecked ? 'true' : 'false'} />

              <input type="hidden" name="turnstile-token" value={turnstileToken} />
              <TurnstileWidget onVerify={setTurnstileToken} className="mt-4" />

              <Button type="submit" variant="green" size="lg" className="w-full" loading={isPending} disabled={isPending}>
                REQUEST TRAINING
              </Button>
            </form>
          )}
        </Container>
      </section>

      {/* Final CTA */}
      <section className="section-standard bg-white">
        <Container>
          <CTADark
            heading="Build Capability Across Your Workforce."
            text="Practical, role-based training helps employees understand risks, follow controls, and contribute to a stronger workplace culture."
            primaryLabel="REQUEST TRAINING"
            primaryHref="#training-form"
            secondaryLabel="TALK TO SAFE CUBE"
            secondaryHref="/contact"
          />
        </Container>
      </section>
    </>
  );
}
