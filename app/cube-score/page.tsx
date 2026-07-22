'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading, SectionDivider } from '@/components/ui/typography';
import { Container, TwoColumnLayout } from '@/components/ui/layout';
import { Button } from '@/components/ui/button';
import { TextInput, EmailInput, PhoneInput, TextAreaField, SelectField, ConsentCheckbox, FormSectionHeading } from '@/components/ui/forms';
import { PageHero, ReportMockup, ProcessTimeline } from '@/components/ui/visual-sections';
import { cubeScoreDisclaimer } from '@/config/site';
import { pageImages } from '@/content/images';
import { useFormAction, FormErrorSummary, FormSuccessMessage } from '@/components/ui/form-action';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { submitCubeScoreForm } from '@/lib/actions';

const scoringCategories = [
  { name: 'Occupational Health', description: 'Workplace conditions that may affect employee health, including exposure, hygiene, ergonomics, and welfare.' },
  { name: 'Workplace Safety', description: 'Unsafe conditions, fire hazards, machinery risks, electrical concerns, and emergency weaknesses.' },
  { name: 'Environment', description: 'Waste, spills, emissions, resource use, pollution risks, and environmental responsibilities.' },
  { name: 'Quality', description: 'Processes, responsibilities, records, controls, complaints, and improvement opportunities.' },
  { name: 'Compliance', description: 'Legal obligations, client expectations, internal policies, and international standards.' },
  { name: 'Management Systems', description: 'Policies, procedures, responsibilities, inspections, records, reviews, and improvement actions.' },
];

const whatYouReceive = [
  'Overall workplace readiness score',
  'Six-category score breakdown',
  'Green, amber, and red indicators',
  'Immediate priority gaps',
  'General recommendations',
  'Suggested next level of support',
];

const scoreLevels = [
  { level: 'Green', label: 'Ready', description: 'The category is generally well-managed with controls in place. Minor improvements may be recommended.' },
  { level: 'Amber', label: 'Attention', description: 'The category has some gaps or weaknesses that deserve attention. Improvements are recommended.' },
  { level: 'Red', label: 'Priority', description: 'The category has significant gaps or risks that require priority action.' },
];

const processSteps = [
  { step: 1, title: 'Submit Your Request', text: 'Complete the CUBE SCORE request form with your business details and areas of interest.' },
  { step: 2, title: 'Initial Discussion', text: 'We contact you to understand your workplace, operations, and current concerns.' },
  { step: 3, title: 'Information Review', text: 'We review available information about your workplace, including operations, processes, and existing documentation.' },
  { step: 4, title: 'High-Level Assessment', text: 'We conduct a high-level assessment across the six SAFE CUBE categories based on the agreed scope.' },
  { step: 5, title: 'Score Generation', text: 'We generate your overall readiness score and category-level breakdown.' },
  { step: 6, title: 'Priority Identification', text: 'We identify immediate priority gaps and areas that deserve attention.' },
  { step: 7, title: 'Recommendations', text: 'We provide general recommendations and suggest the next level of support that may benefit your business.' },
];

const industryOptions = [
  { value: 'restaurants', label: 'Restaurants & Food Service' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'construction', label: 'Construction' },
  { value: 'warehouses', label: 'Warehouses' },
  { value: 'engineering-workshops', label: 'Engineering Workshops' },
  { value: 'power-utilities', label: 'Power & Utilities' },
  { value: 'corporate-offices', label: 'Corporate Offices' },
  { value: 'education', label: 'Educational Institutions' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'automotive-workshops', label: 'Automotive Workshops' },
  { value: 'logistics-transport', label: 'Logistics & Transport' },
  { value: 'other', label: 'Other' },
];

const employeeCountOptions = [
  { value: '1-10', label: '1–10' },
  { value: '11-50', label: '11–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-500', label: '201–500' },
  { value: '500+', label: '500+' },
];

export default function CubeScorePage() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedEmployeeCount, setSelectedEmployeeCount] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const { state, isPending, turnstileToken, setTurnstileToken, formRef, successRef, formAction } =
    useFormAction({ action: submitCubeScoreForm });

  const showErrors = !!state.errors || (!state.success && !!state.message);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'CUBE SCORE' }]}
        eyebrow="FREE WORKPLACE READINESS ASSESSMENT"
        title="Discover Where Your Workplace Stands."
        description="CUBE SCORE is an introductory workplace assessment that helps businesses understand their overall readiness across occupational health, workplace safety, environment, quality, compliance, and management systems."
        primaryCta={{ label: 'GET FREE CUBE SCORE', href: '#request-form' }}
        secondaryCta={{ label: 'HOW THE SCORE WORKS', href: '#how-it-works' }}
        image={pageImages.cubeScoreHero}
        imageAlt={pageImages.cubeScoreHeroAlt}
        variant="split"
        theme="light"
      />

      {/* What CUBE SCORE is */}
      <section className="section-standard bg-white">
        <Container width="narrow">
          <Eyebrow className="text-cube-green">FREE STARTING POINT</Eyebrow>
          <SectionHeading className="mt-3" as="h2">What CUBE SCORE Is</SectionHeading>
          <div className="mt-4 space-y-4">
            <p className="text-body-lg text-muted-foreground">
              CUBE SCORE is an introductory workplace assessment that helps businesses understand their overall readiness across occupational health, workplace safety, environment, quality, compliance, and management systems.
            </p>
            <p className="text-body-lg text-muted-foreground">
              It converts high-level workplace observations into a clear score, category-level indicators, priority flags, and a recommended next action.
            </p>
          </div>
        </Container>
      </section>

      {/* Six scoring categories */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">SCORING CATEGORIES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Six Scoring Categories</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scoringCategories.map((cat) => (
              <div key={cat.name} className="rounded-lg border border-cube-soft bg-white p-6">
                <h3 className="text-base font-semibold text-cube-navy">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What the client receives */}
      <section className="section-standard bg-white">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">WHAT YOU RECEIVE</Eyebrow>
                <SectionHeading className="mt-3" as="h2">What You Receive</SectionHeading>
                <ul className="mt-6 space-y-3">
                  {whatYouReceive.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-lg text-muted-foreground">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-cube-green" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
            right={
              <div>
                <ReportMockup type="scorecard" title="SAMPLE SCORE VIEW" label="DEMONSTRATION ONLY" />
                <p className="mt-3 text-xs text-muted-foreground/70">{cubeScoreDisclaimer}</p>
              </div>
            }
          />
        </Container>
      </section>

      {/* Score levels */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">SCORE LEVELS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">Green, Amber, and Red Score Levels</SectionHeading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {scoreLevels.map((level) => (
              <div key={level.level} className="rounded-lg border border-cube-soft bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className={`h-4 w-4 rounded-full ${level.level === 'Green' ? 'bg-cube-green' : level.level === 'Amber' ? 'bg-cube-amber' : 'bg-cube-red'}`} />
                  <h3 className="text-lg font-semibold text-cube-navy">{level.label}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{level.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-cube-soft bg-white p-6">
            <p className="text-sm text-muted-foreground">{cubeScoreDisclaimer}</p>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <ProcessTimeline
        eyebrow="HOW IT WORKS"
        heading="How the Score Works"
        steps={processSteps.map((s) => ({ title: s.title, description: s.text, icon: s.step === 1 ? 'search' : s.step === 2 ? 'assessment' : s.step === 3 ? 'reports' : 'check' }))}
        background="white"
      />

      {/* Request form */}
      <section id="request-form" className="section-standard bg-cube-soft scroll-mt-20">
        <Container width="narrow">
          <SectionDivider color="green" />
          <SectionHeading className="mt-3" as="h2">Request Your Free CUBE SCORE</SectionHeading>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Complete the form below to request your free CUBE SCORE. We will contact you to discuss your workplace and arrange the assessment.
          </p>

          {state.success ? (
            <div className="mt-8">
              <FormSuccessMessage
                ref={successRef}
                message={state.message || 'Thank you for requesting a CUBE SCORE. We have received your request and will contact you within two business days to discuss your workplace and arrange your assessment.'}
              />
              <div className="mt-6">
                <Button asChild variant="outlineBlue">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
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

              <FormSectionHeading>Workplace Details</FormSectionHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField id="industry" label="Industry" placeholder="Select your industry" options={industryOptions} value={selectedIndustry} onChange={setSelectedIndustry} />
                <SelectField id="employeeCount" label="Number of Employees" placeholder="Select range" options={employeeCountOptions} value={selectedEmployeeCount} onChange={setSelectedEmployeeCount} />
              </div>
              <TextInput id="location" label="Workplace Location" placeholder="City, region" />
              <TextAreaField id="currentConcerns" name="message" label="Current Concerns or Areas of Interest" rows={4} placeholder="Briefly describe any current safety, compliance, or operational concerns you would like the CUBE SCORE to address." />
              <input type="hidden" name="industry" value={selectedIndustry} />
              <input type="hidden" name="employee_count" value={selectedEmployeeCount} />

              <ConsentCheckbox
                id="consent"
                consentText="I agree to be contacted by SAFE CUBE regarding my CUBE SCORE request. I understand that the free CUBE SCORE is a high-level workplace overview and is not a replacement for a detailed inspection, statutory audit, certification audit, or technical assessment."
                required
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked === true)}
              />
              <input type="hidden" name="consent" value={consentChecked ? 'true' : 'false'} />

              <input type="hidden" name="turnstile-token" value={turnstileToken} />
              <TurnstileWidget onVerify={setTurnstileToken} className="mt-4" />

              <Button type="submit" variant="green" size="lg" className="w-full" loading={isPending} disabled={isPending}>
                REQUEST FREE CUBE SCORE
              </Button>
            </form>
          )}
        </Container>
      </section>
    </>
  );
}
