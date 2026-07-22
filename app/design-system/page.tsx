'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eyebrow, SectionHeading, SectionIntro, SectionDivider, PageTitleBlock } from '@/components/ui/typography';
import { Section, Container, SectionGrid, ThreeColumnGrid, FourColumnGrid, TwoColumnLayout, SplitContent } from '@/components/ui/layout';
import { IconCircleGreen, IconCircleBlue, IconCircleNavy, IconOutlineGreen, IconOutlineBlue, IconHexagon, FeatureIcon, IconInline, RiskStatusIcon, getIcon } from '@/components/ui/icon-containers';
import { FeatureCard, ServiceCard, IndustryCard, ValueCard, ArticleCard, DownloadCard, ProductCard, ProcessStepCard, PlanCard, StatCard } from '@/components/ui/cards';
import { StatusBadge, RiskBadge, ScoreIndicator, ProgressBar, ScoreRing, PriorityLegend } from '@/components/ui/status';
import { CTALight, CTADark, CTASplit, CTACompact } from '@/components/ui/cta';
import { HomepageHero, InternalPageHero, IndustryHero, SolutionHero, StoreHero } from '@/components/ui/heroes';
import { TextInput, EmailInput, PhoneInput, TextAreaField, SelectField, RadioGroupField, CheckboxField, ConsentCheckbox, SearchField, QuantitySelector, FormSectionHeading, FormError, FormSuccess, SubmitButton } from '@/components/ui/forms';
import { SixSides } from '@/components/ui/six-sides';
import { LogoMark, ResponsiveImage, VideoPlaceholder, CubeGridPattern, HexagonPattern } from '@/components/ui/media';
import { Breadcrumb, FooterLinkGroup, UtilityLink, SkipToContentLink } from '@/components/ui/navigation';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

// Color palette data
const colorPalette = [
  { name: 'Deep Navy', hex: '#00163E', dark: true },
  { name: 'Primary Green', hex: '#5E9400', dark: true },
  { name: 'Bright Green Accent', hex: '#7AA800', dark: true },
  { name: 'Dark Green', hex: '#3F7A00', dark: true },
  { name: 'Secondary Blue', hex: '#0B4F96', dark: true },
  { name: 'Soft Background', hex: '#F5F8FA', dark: false },
  { name: 'White', hex: '#FFFFFF', dark: false },
  { name: 'Warning Amber', hex: '#F4A000', dark: true },
  { name: 'Critical Red', hex: '#C62828', dark: true },
  { name: 'Success Green', hex: '#278B3D', dark: true },
];

// Typography scale data
const typeScale = [
  { label: 'Display', className: 'text-5xl md:text-6xl lg:text-7xl font-bold text-navy', sample: 'Strengthening Every Side' },
  { label: 'H1', className: 'text-4xl md:text-5xl font-bold text-navy', sample: 'Main Page Heading' },
  { label: 'H2', className: 'text-3xl md:text-4xl font-bold text-navy', sample: 'Section Heading' },
  { label: 'H3', className: 'text-2xl md:text-3xl font-semibold text-navy', sample: 'Subsection Heading' },
  { label: 'H4', className: 'text-xl md:text-2xl font-semibold text-navy', sample: 'Card Heading' },
  { label: 'Body Large', className: 'text-lg text-slate-700', sample: 'Large body text for introductions and lead paragraphs.' },
  { label: 'Body', className: 'text-base text-slate-700', sample: 'Standard body text used throughout the site for paragraphs and descriptions.' },
  { label: 'Small', className: 'text-sm text-slate-600', sample: 'Small text for secondary information and supporting copy.' },
  { label: 'Caption', className: 'text-xs text-slate-500', sample: 'Caption text for images and supplementary notes.' },
  { label: 'Eyebrow', className: 'text-sm font-semibold uppercase tracking-wider text-brand-green', sample: 'EYEBROW LABEL' },
  { label: 'Label', className: 'text-sm font-medium text-navy', sample: 'Form Label' },
];

// Button variants to display
const buttonVariants = [
  { variant: 'green', label: 'GET FREE CUBE SCORE' },
  { variant: 'blue', label: 'TALK TO SAFE CUBE' },
  { variant: 'navy', label: 'BOOK CUBE INSIGHT' },
  { variant: 'outlineBlue', label: 'LEARN MORE' },
  { variant: 'outlineGreen', label: 'LEARN MORE' },
  { variant: 'whiteOnDark', label: 'REQUEST PROPOSAL' },
  { variant: 'text', label: 'Read more →' },
  { variant: 'destructive', label: 'Delete' },
] as const;

const buttonSizes = ['sm', 'md', 'lg'] as const;

// Icon mapping (all 15 mapped icons)
const iconMap = [
  'workplace-safety',
  'assessment',
  'industries',
  'quality',
  'inspection',
  'training',
  'compliance',
  'documentation',
  'reporting',
  'risk-assessment',
  'auditing',
  'consulting',
  'equipment',
  'support',
  'analytics',
];

// Status badge samples
const statusSamples: { status: 'success' | 'warning' | 'critical' | 'info' | 'in_progress'; label: string }[] = [
  { status: 'success', label: 'Compliant' },
  { status: 'warning', label: 'Action Needed' },
  { status: 'critical', label: 'Non-Compliant' },
  { status: 'info', label: 'In Progress' },
  { status: 'in_progress', label: 'Pending' },
];

// Risk badge samples
const riskSamples: { level: 'low' | 'medium' | 'high' | 'critical'; label: string }[] = [
  { level: 'low', label: 'Low Risk' },
  { level: 'medium', label: 'Moderate Risk' },
  { level: 'high', label: 'High Risk' },
  { level: 'critical', label: 'Critical Risk' },
];

// Sample select options
const sampleOptions = [
  { value: 'option1', label: 'Option One' },
  { value: 'option2', label: 'Option Two' },
  { value: 'option3', label: 'Option Three' },
];

// Sample radio options
const radioOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'maybe', label: 'Maybe' },
];

// Footer link group sample
const footerLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

// Breadcrumb sample
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Design System', href: '/design-system' },
];

export default function DesignSystemPage() {
  return (
    <>
      {/* ============================================
          1. PAGE HEADER
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <PageTitleBlock
            eyebrow="INTERNAL"
            title="SAFE CUBE Design System"
            description="Component library and visual system preview."
          />
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          2. COLOUR PALETTE
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Foundations</Eyebrow>
          <SectionHeading>Colour Palette</SectionHeading>
          <SectionIntro>
            Brand colours used across the SAFE CUBE design system, from deep navy backgrounds to primary green accents.
          </SectionIntro>

          <FourColumnGrid className="mt-10">
            {colorPalette.map((color) => (
              <div key={color.hex} className="space-y-2">
                <div
                  className={`h-20 rounded-md border ${color.dark ? 'border-transparent' : 'border-slate-200'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`${color.name} swatch`}
                />
                <div>
                  <p className="text-sm font-semibold text-navy">{color.name}</p>
                  <p className="text-sm text-slate-500 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </FourColumnGrid>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          3. TYPOGRAPHY
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Foundations</Eyebrow>
          <SectionHeading>Typography</SectionHeading>
          <SectionIntro>
            The type scale from display down to caption, built on a consistent hierarchy.
          </SectionIntro>

          <div className="mt-10 space-y-6 divide-y divide-slate-100">
            {typeScale.map((item) => (
              <div key={item.label} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 first:pt-0">
                <div className="text-sm font-semibold uppercase tracking-wider text-brand-green">
                  {item.label}
                </div>
                <div className="md:col-span-3">
                  <p className={item.className}>{item.sample}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          4. BUTTONS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Buttons</SectionHeading>
          <SectionIntro>
            All button variants, sizes, and interactive states.
          </SectionIntro>

          {/* Variants */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-navy mb-4">Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {buttonVariants.map((btn) => (
                <Button key={btn.variant} variant={btn.variant}>
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-navy mb-4">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {buttonSizes.map((size) => (
                <Button key={size} size={size} variant="green">
                  GET FREE CUBE SCORE
                </Button>
              ))}
            </div>
          </div>

          {/* States */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-navy mb-4">States</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="green" loading>
                Loading
              </Button>
              <Button variant="blue" disabled>
                Disabled
              </Button>
              <Button variant="navy" loading>
                Processing
              </Button>
              <Button variant="outlineBlue" disabled>
                Disabled Outline
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          5. ICONS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Icons</SectionHeading>
          <SectionIntro>
            Icon container variants and the full icon mapping used across the system.
          </SectionIntro>

          {/* Icon containers */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-navy mb-6">Icon Containers</h3>
            <FourColumnGrid>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconCircleGreen icon={getIcon('workplace-safety')} />
                <span className="text-sm font-medium text-navy">IconCircleGreen</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconCircleBlue icon={getIcon('assessment')} />
                <span className="text-sm font-medium text-navy">IconCircleBlue</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconCircleNavy icon={getIcon('industries')} />
                <span className="text-sm font-medium text-navy">IconCircleNavy</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconOutlineGreen icon={getIcon('quality')} />
                <span className="text-sm font-medium text-navy">IconOutlineGreen</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconOutlineBlue icon={getIcon('inspection')} />
                <span className="text-sm font-medium text-navy">IconOutlineBlue</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconHexagon icon={getIcon('training')} />
                <span className="text-sm font-medium text-navy">IconHexagon</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <FeatureIcon icon={getIcon('compliance')} />
                <span className="text-sm font-medium text-navy">FeatureIcon</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <IconInline icon={getIcon('reporting')} />
                <span className="text-sm font-medium text-navy">IconInline</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <RiskStatusIcon icon={AlertTriangle} status="critical" />
                <span className="text-sm font-medium text-navy">RiskStatusIcon</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <RiskStatusIcon icon={AlertTriangle} status="warning" />
                <span className="text-sm font-medium text-navy">RiskStatusIcon (warning)</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <RiskStatusIcon icon={CheckCircle2} status="success" />
                <span className="text-sm font-medium text-navy">RiskStatusIcon (success)</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-slate-50">
                <RiskStatusIcon icon={Info} status="info" />
                <span className="text-sm font-medium text-navy">RiskStatusIcon (info)</span>
              </div>
            </FourColumnGrid>
          </div>

          {/* Full icon mapping */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-navy mb-6">Full Icon Mapping (15 Icons)</h3>
            <FourColumnGrid>
              {iconMap.map((iconName) => {
                const Icon = getIcon(iconName);
                return (
                  <div key={iconName} className="flex flex-col items-center gap-3 p-6 rounded-lg border border-slate-200">
                    <div className="text-brand-green">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono text-slate-600 text-center">{iconName}</span>
                  </div>
                );
              })}
            </FourColumnGrid>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          6. CARDS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Cards</SectionHeading>
          <SectionIntro>
            Card components for features, services, industries, articles, downloads, products, process steps, plans, and stats.
          </SectionIntro>

          <div className="mt-10 space-y-12">
            {/* Feature / Service / Industry / Value */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Feature, Service, Industry & Value Cards</h3>
              <FourColumnGrid>
                <FeatureCard
                  icon="workplace-safety"
                  title="Workplace Safety"
                  description="Comprehensive safety assessments tailored to your operational environment."
                />
                <ServiceCard
                  number={1}
                  icon="assessment"
                  name="CUBE Score Assessment"
                  descriptor="Benchmark your safety maturity"
                  description="Our proprietary scoring system helps you understand your safety culture."
                  features={['On-site evaluation', 'Detailed report', 'Action plan']}
                  ctaLabel="LEARN MORE"
                  ctaHref="/services/cube-score"
                />
                <IndustryCard
                  icon="industries"
                  name="Manufacturing"
                  description="Safety solutions for high-volume production environments."
                  href="/industries/manufacturing"
                />
                <ValueCard
                  icon="quality"
                  title="Quality First"
                  description="We hold ourselves to the highest standard in every engagement."
                />
              </FourColumnGrid>
            </div>

            {/* Article / Download / Product */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Article, Download & Product Cards</h3>
              <ThreeColumnGrid>
                <ArticleCard
                  category="Safety"
                  title="Sample Article"
                  excerpt="A preview of the article content that gives the reader a sense of what to expect."
                  href="/articles/sample"
                />
                <DownloadCard
                  title="Sample Checklist"
                  fileType="PDF"
                  description="A downloadable checklist for workplace safety inspections."
                  href="/downloads/sample"
                />
                <ProductCard
                  title="Sample Product"
                  category="PPE"
                  price="[PRICE]"
                  stockStatus="in_stock"
                  href="/store/sample"
                />
              </ThreeColumnGrid>
            </div>

            {/* Process / Plan / Stat */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Process Step, Plan & Stat Cards</h3>
              <ThreeColumnGrid>
                <ProcessStepCard
                  step={1}
                  icon="inspection"
                  title="Initial Inspection"
                  description="We begin with a thorough on-site safety inspection."
                />
                <PlanCard
                  name="CUBE CARE"
                  suitableFor="Ongoing support"
                  features={['Continuous monitoring', 'Quarterly reviews', 'Priority support']}
                  ctaLabel="GET STARTED"
                  ctaHref="/contact"
                />
                <StatCard
                  label="Workplace Assessments"
                  value="---"
                />
              </ThreeColumnGrid>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          7. STATUS & RISK
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Status & Risk</SectionHeading>
          <SectionIntro>
            Badges, indicators, and progress components for communicating safety status and risk levels.
          </SectionIntro>

          <div className="mt-10 space-y-12">
            {/* Status badges */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Status Badges</h3>
              <div className="flex flex-wrap gap-4">
                {statusSamples.map((s) => (
                  <StatusBadge key={s.status} status={s.status} label={s.label} />
                ))}
              </div>
            </div>

            {/* Risk badges */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Risk Badges</h3>
              <div className="flex flex-wrap gap-4">
                {riskSamples.map((r) => (
                  <RiskBadge key={r.level} level={r.level} label={r.label} />
                ))}
              </div>
            </div>

            {/* Score indicators & progress */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Score Indicators, Progress & Rings</h3>
              <ThreeColumnGrid>
                <div className="p-6 rounded-lg bg-slate-50 flex flex-col items-center gap-4">
                  <h4 className="text-sm font-semibold text-navy">ScoreIndicator</h4>
                  <ScoreIndicator score={75} />
                </div>
                <div className="p-6 rounded-lg bg-slate-50 flex flex-col items-center gap-4">
                  <h4 className="text-sm font-semibold text-navy">ProgressBar</h4>
                  <ProgressBar value={60} />
                </div>
                <div className="p-6 rounded-lg bg-slate-50 flex flex-col items-center gap-4">
                  <h4 className="text-sm font-semibold text-navy">ScoreRing</h4>
                  <ScoreRing score={82} />
                </div>
              </ThreeColumnGrid>
            </div>

            {/* Priority legend */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Priority Legend</h3>
              <div className="p-6 rounded-lg bg-slate-50">
                <PriorityLegend />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          8. CTA VARIANTS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>CTA Variants</SectionHeading>
          <SectionIntro>
            Call-to-action blocks in light, dark, split, and compact formats.
          </SectionIntro>

          <div className="mt-10 space-y-8">
            <CTALight
              heading="Ready to strengthen your safety culture?"
              text="Book a CUBE Insight session and discover how we can help you build a safer, more resilient workplace."
              primaryLabel="BOOK CUBE INSIGHT"
              primaryHref="/contact"
              secondaryLabel="LEARN MORE"
              secondaryHref="/services"
            />

            <CTADark
              heading="Ready to strengthen your safety culture?"
              text="Book a CUBE Insight session and discover how we can help you build a safer, more resilient workplace."
              primaryLabel="BOOK CUBE INSIGHT"
              primaryHref="/contact"
              secondaryLabel="LEARN MORE"
              secondaryHref="/services"
            />

            <CTASplit
              heading="Ready to strengthen your safety culture?"
              text="Book a CUBE Insight session and discover how we can help you build a safer, more resilient workplace."
              primaryLabel="BOOK CUBE INSIGHT"
              primaryHref="/contact"
              secondaryLabel="LEARN MORE"
              secondaryHref="/services"
            />

            <CTACompact
              heading="Talk to SAFE CUBE"
              primaryLabel="TALK TO SAFE CUBE"
              primaryHref="/contact"
            />
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          9. HERO VARIANTS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Hero Variants</SectionHeading>
          <SectionIntro>
            Hero sections for the homepage, internal pages, industries, solutions, and store.
          </SectionIntro>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">HomepageHero</h3>
              <HomepageHero
                heading="Strengthening Every Side of Your Business."
                body="SAFE CUBE delivers comprehensive safety, compliance, and risk management solutions tailored to your industry."
                primaryLabel="GET FREE CUBE SCORE"
                primaryHref="/cube-score"
                secondaryLabel="TALK TO SAFE CUBE"
                secondaryHref="/contact"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">InternalPageHero</h3>
              <InternalPageHero
                title="About SAFE CUBE"
                description="Learn about our mission, values, and the team behind our safety solutions."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">IndustryHero</h3>
              <IndustryHero
                icon="industries"
                title="Manufacturing"
                statement="Safety solutions designed for the unique challenges of manufacturing environments."
                primaryLabel="LEARN MORE"
                primaryHref="/industries/manufacturing"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">SolutionHero</h3>
              <SolutionHero
                serviceName="SAFE SNAP"
                descriptor="Quick safety snapshots for fast-moving teams."
                explanation="A streamlined assessment tool that captures critical safety data in minutes."
                primaryLabel="REQUEST PROPOSAL"
                primaryHref="/contact"
                secondaryLabel="LEARN MORE"
                secondaryHref="/services"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">StoreHero</h3>
              <StoreHero
                heading="SAFE CUBE Store"
                description="Safety equipment, training materials, and compliance resources."
              />
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          10. SIX SIDES
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Six Sides</SectionHeading>
          <SectionIntro>
            The interactive Six Sides component with detail panel.
          </SectionIntro>

          <div className="mt-10">
            <SixSides showDetailPanel />
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          11. FORM ELEMENTS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Form Elements</SectionHeading>
          <SectionIntro>
            Input fields, selectors, and form helpers used across the site.
          </SectionIntro>

          <div className="mt-10 max-w-2xl space-y-8">
            <FormSectionHeading>Contact Information</FormSectionHeading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Full Name"
                placeholder="John Doe"
              />
              <EmailInput
                label="Email Address"
                placeholder="john@company.com"
              />
            </div>

            <PhoneInput
              label="Phone Number"
              placeholder="(555) 123-4567"
            />

            <TextAreaField
              label="Message"
              placeholder="Tell us about your safety needs..."
              rows={4}
            />

            <SelectField
              label="Preferred Contact Method"
              options={sampleOptions}
              placeholder="Select an option"
            />

            <RadioGroupField
              label="Are you currently using a safety management system?"
              options={radioOptions}
            />

            <CheckboxField
              label="Subscribe to our safety newsletter"
            />

            <ConsentCheckbox
              consentText="I agree to be contacted by SAFE CUBE and have read the privacy policy."
            />

            <SearchField placeholder="Search resources..." />

            <div>
              <label className="block text-sm font-medium text-navy mb-2">Quantity</label>
              <QuantitySelector />
            </div>

            <FormError>Please correct the errors above before submitting.</FormError>
            <FormSuccess>Your form has been submitted successfully.</FormSuccess>

            <SubmitButton>SUBMIT REQUEST</SubmitButton>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          12. MEDIA COMPONENTS
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Media Components</SectionHeading>
          <SectionIntro>
            Logo marks, responsive images, and video placeholders.
          </SectionIntro>

          <div className="mt-10 space-y-12">
            {/* Logo marks */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">LogoMark (All Sizes)</h3>
              <div className="flex flex-wrap items-end gap-8 p-8 rounded-lg bg-slate-50">
                <div className="flex flex-col items-center gap-2">
                  <LogoMark size="sm" />
                  <span className="text-xs text-slate-500">sm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoMark size="md" />
                  <span className="text-xs text-slate-500">md</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LogoMark size="lg" />
                  <span className="text-xs text-slate-500">lg</span>
                </div>
              </div>
            </div>

            {/* Responsive image */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">ResponsiveImage</h3>
              <ResponsiveImage
                alt="Sample responsive image"
                aspectRatio="16/9"
              />
            </div>

            {/* Video placeholder */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">VideoPlaceholder</h3>
              <VideoPlaceholder aspectRatio="16/9" />
            </div>

            {/* Patterns */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-6">Background Patterns</h3>
              <TwoColumnLayout
                left={
                  <div>
                    <p className="text-sm font-medium text-navy mb-3">CubeGridPattern</p>
                    <div className="h-40 rounded-lg overflow-hidden border border-slate-200">
                      <CubeGridPattern />
                    </div>
                  </div>
                }
                right={
                  <div>
                    <p className="text-sm font-medium text-navy mb-3">HexagonPattern</p>
                    <div className="h-40 rounded-lg overflow-hidden border border-slate-200">
                      <HexagonPattern />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider />

      {/* ============================================
          13. NAVIGATION
          ============================================ */}
      <Section spacing="standard">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <SectionHeading>Navigation</SectionHeading>
          <SectionIntro>
            Breadcrumbs, footer link groups, and utility links.
          </SectionIntro>

          <div className="mt-10 space-y-12">
            {/* Breadcrumb */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">Breadcrumb</h3>
              <div className="p-6 rounded-lg bg-slate-50">
                <Breadcrumb items={breadcrumbItems} />
              </div>
            </div>

            {/* Footer link group */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">FooterLinkGroup</h3>
              <div className="p-6 rounded-lg bg-navy">
                <FooterLinkGroup
                  title="Company"
                  links={footerLinks}
                />
              </div>
            </div>

            {/* Utility links */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">UtilityLink</h3>
              <div className="flex flex-wrap gap-6 p-6 rounded-lg bg-slate-50">
                <UtilityLink href="/about" label="About Us" />
                <UtilityLink href="tel:+15551234567" label="Call Us" />
                <UtilityLink href="mailto:info@safecube.com" label="Email Us" />
                <UtilityLink href="/location" label="Our Location" />
              </div>
            </div>

            {/* Skip to content */}
            <div>
              <h3 className="text-lg font-semibold text-navy mb-4">SkipToContentLink</h3>
              <div className="p-6 rounded-lg bg-slate-50">
                <SkipToContentLink />
                <p className="text-sm text-slate-500 mt-2">
                  (Visually hidden until focused — tab to this area to see it.)
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* End spacer */}
      <Section spacing="compact">
        <Container>
          <div className="text-center py-8">
            <p className="text-sm text-slate-400">— End of Design System Preview —</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
