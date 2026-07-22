import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Settings,
  ClipboardCheck,
  Users,
  AlertTriangle,
  ArrowRight,
  Check,
  Search,
  FileText,
  Wrench,
  RefreshCw,
  Calendar,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  HardHat,
  Leaf,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Eyebrow, SectionDivider, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container, SectionGrid, ThreeColumnGrid, TwoColumnLayout } from '@/components/ui/layout';
import { FeatureCard, ServiceCard, IndustryCard, ValueCard, ArticleCard, ProcessStepCard } from '@/components/ui/cards';
import { CTADark } from '@/components/ui/cta';
import { SixSides } from '@/components/ui/six-sides';
import { siteConfig, cubeScoreDisclaimer } from '@/config/site';
import { articles } from '@/content/articles';
import { industries } from '@/content/industries';

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'SAFE CUBE — Strengthening Every Side of Your Business',
    description:
      'Practical workplace safety, QHSE, compliance, assessment, training, and continual-improvement solutions for businesses.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
  },
};

const sixSidesData = [
  {
    title: 'Occupational Health',
    paragraph:
      'SAFE CUBE helps organizations identify and control workplace conditions that may affect employee health and wellbeing. This includes occupational exposure, hygiene, ergonomics, heat, noise, fatigue, welfare facilities, manual handling, and other health-related risks. The objective is to create working conditions that protect people while supporting attendance, productivity, dignity, and long-term wellbeing.',
  },
  {
    title: 'Workplace Safety',
    paragraph:
      'Workplace safety is the foundation of responsible operations. SAFE CUBE identifies unsafe conditions, unsafe acts, fire hazards, machinery risks, electrical concerns, emergency weaknesses, and gaps in everyday controls. We then help businesses prioritize realistic actions that prevent injuries, protect assets, and strengthen confidence across the workforce.',
  },
  {
    title: 'Environment',
    paragraph:
      'SAFE CUBE supports businesses in managing waste, spills, emissions, resource use, pollution risks, storage practices, and environmental responsibilities. Our approach helps organizations reduce unnecessary environmental impact, improve workplace cleanliness, manage materials responsibly, and prepare for customer, regulatory, or ISO 14001-related expectations.',
  },
  {
    title: 'Quality',
    paragraph:
      'Quality means consistently delivering products and services that meet requirements and build customer confidence. SAFE CUBE reviews processes, responsibilities, records, controls, complaints, recurring errors, and improvement opportunities. We help organizations reduce inconsistency, prevent repeated failures, and develop practical systems that support reliable performance.',
  },
  {
    title: 'Compliance',
    paragraph:
      'Compliance can become difficult when legal obligations, client expectations, internal policies, and international standards are managed separately. SAFE CUBE helps organizations understand applicable requirements, identify evidence gaps, organize documentation, clarify responsibilities, and create a structured approach to maintaining workplace compliance.',
  },
  {
    title: 'Management Systems',
    paragraph:
      'Strong performance depends on systems that people can understand and use. SAFE CUBE helps businesses turn workplace requirements into clear policies, procedures, responsibilities, inspections, records, reviews, and improvement actions. The goal is not unnecessary paperwork, but a practical and documented management system that supports consistent execution.',
  },
];

const processSteps = [
  { step: 1, title: 'Discover', text: 'We understand your business, people, operations, workplace conditions, and the risks that matter most.' },
  { step: 2, title: 'Assess', text: 'We observe, inspect, evaluate, score, and identify gaps, hazards, weaknesses, and improvement opportunities.' },
  { step: 3, title: 'Improve', text: 'We provide practical recommendations, documentation, training, corrective actions, and implementation support.' },
  { step: 4, title: 'Sustain', text: 'We help you maintain controls, track progress, review performance, and keep improvements active through ongoing support.' },
];

const workplaceIssues = [
  'Blocked emergency exit',
  'Missing inspection record',
  'Unsafe electrical connection',
  'Unlabelled chemical',
  'Open corrective action',
  'Untrained employee',
  'Repeated quality failure',
  'Incomplete emergency procedure',
];

const whyChooseData = [
  { icon: 'users', title: 'People First', text: 'We prioritize the health, safety, dignity, and wellbeing of people at work.' },
  { icon: 'shield', title: 'Risk Focused', text: 'We identify significant risks early and help prevent incidents, losses, and repeated failures.' },
  { icon: 'clipboard', title: 'Practical Approach', text: 'Our recommendations are designed to be realistic, proportionate, understandable, and actionable.' },
  { icon: 'refresh', title: 'Continuous Support', text: 'We remain available beyond the report to support implementation and continual improvement.' },
  { icon: 'badge', title: 'Built on Standards', text: 'Our approach aligns with recognized QHSE principles, ISO management-system concepts, and relevant good practices.' },
  { icon: 'settings', title: 'Local Understanding', text: 'We consider local workplace realities, business constraints, regulatory expectations, and operating conditions.' },
];

const cubeCareList = [
  'Scheduled workplace visits',
  'Periodic inspections',
  'Corrective-action tracking',
  'Documentation development',
  'Procedure updates',
  'Training and toolbox talks',
  'Management meetings',
  'Compliance calendar support',
  'Performance reporting',
  'Follow-up verification',
];

const heroImageAlt =
  'Two workplace safety and quality professionals reviewing operational information on a tablet in a real workplace setting';

export default function HomePage() {
  return (
    <>
      {/* ──────────────────────────── 1. Hero ──────────────────────────── */}
      <section className="relative overflow-hidden bg-cube-navy py-16 lg:py-24">
        <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="text-cube-green">
                PRACTICAL QHSE AND WORKPLACE IMPROVEMENT
              </Eyebrow>
              <h1 className="text-display mt-3 text-white">
                Strengthening Every Side of Your Business.
              </h1>
              <p className="mt-2 text-xl text-white/80">Safe. Compliant. Ready.</p>
              <p className="mt-4 max-w-narrow text-body-lg text-white/70">
                We help businesses protect people, reduce risks, improve systems, and stay ready for tomorrow through practical QHSE solutions designed around real workplace conditions.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="green" size="lg">
                  <Link href="/cube-score">START WITH FREE CUBE SCORE</Link>
                </Button>
                <Button asChild variant="outlineGreen" size="lg">
                  <Link href="/contact">TALK TO SAFE CUBE</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Built around international standards, local compliance requirements, and real workplace conditions.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-overlay">
                  <img
                    src="https://images.pexels.com/photos/8434996/pexels-photo-8434996.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                    alt={heroImageAlt}
                    className="aspect-[4/3] w-full object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cube-navy/60 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {siteConfig.cubeSides.map((side) => (
                        <span
                          key={side}
                          className="rounded-md bg-cube-navy/80 px-2 py-1 text-[0.625rem] font-medium text-white/90 backdrop-blur-sm"
                        >
                          {side}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────── 2. Workplace Problem ──────────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">WHY IT MATTERS</Eyebrow>
                <SectionHeading className="mt-3" as="h2">
                  Every Workplace Has Risks. Good Businesses Don&rsquo;t Ignore Them.
                </SectionHeading>
                <div className="mt-4 space-y-4">
                  <p className="text-body-lg text-muted-foreground">
                    Most businesses are not careless&mdash;they are busy. Work keeps moving, people depend on daily operations, and small safety, health, environmental, quality, documentation, or compliance gaps may remain unnoticed until they become incidents, losses, complaints, repeated failures, or inspection problems.
                  </p>
                  <p className="text-body-lg text-muted-foreground">
                    SAFE CUBE helps businesses identify these gaps early, understand their significance, and address them through clear, practical, and proportionate action.
                  </p>
                </div>
              </div>
            }
            right={
              <div className="rounded-lg border border-cube-soft bg-cube-soft p-6">
                <h3 className="text-sm font-semibold text-cube-navy">
                  Commonly Overlooked Issues
                </h3>
                <ul className="mt-4 space-y-3">
                  {workplaceIssues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-amber" aria-hidden="true" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground/70">
                  These are short operational examples, not a claim that every workplace has all these issues.
                </p>
              </div>
            }
          />
        </Container>
      </section>

      {/* ──────────────────── 3. Three Core Protection Benefits ────────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <SectionDivider color="green" className="justify-center" />
            <SectionHeading className="mt-3" as="h2">
              Three Ways SAFE CUBE Protects Your Business
            </SectionHeading>
          </div>
          <ThreeColumnGrid>
            <FeatureCard
              icon="shield"
              title="Protect People"
              description="Reduce workplace injuries, unsafe acts, occupational health concerns, and emergency risks by identifying hazards before they cause harm."
              color="green"
            />
            <FeatureCard
              icon="settings"
              title="Protect Operations"
              description="Prevent avoidable downtime, breakdowns, complaints, quality failures, equipment damage, and repeated operational disruption."
              color="blue"
            />
            <FeatureCard
              icon="documents"
              title="Protect Compliance"
              description="Build the records, controls, responsibilities, and documented evidence required for inspections, clients, management reviews, and regulatory readiness."
              color="navy"
            />
          </ThreeColumnGrid>
        </Container>
      </section>

      {/* ──────────────────────── 4. Six Sides of SAFE CUBE ──────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">OUR FRAMEWORK</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              The Six Sides of SAFE CUBE
            </SectionHeading>
            <SectionIntro className="mt-4">
              A complete workplace improvement model built around six essential areas that protect people, strengthen operations, and support long-term business resilience.
            </SectionIntro>
          </div>
          <SixSides />
        </Container>
      </section>

      {/* ──────────────────────── 5. How SAFE CUBE Works ─────────────────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">OUR APPROACH</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              How SAFE CUBE Works
            </SectionHeading>
            <SectionIntro className="mt-4">
              A practical journey from understanding your workplace to building a culture of continual improvement.
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <ProcessStepCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.text}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ──────────────── 6. Solutions and Service Journey ──────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">OUR SOLUTIONS</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              Choose the Right Level of Support
            </SectionHeading>
            <SectionIntro className="mt-4">
              From a quick professional observation to continuous workplace improvement, SAFE CUBE allows businesses to begin according to their current needs, risk profile, and readiness.
            </SectionIntro>
          </div>

          {/* Core journey: CUBE SCORE → CUBE INSIGHT → CUBE CARE */}
          <div className="mb-6">
            <p className="text-eyebrow text-cube-green mb-4">START</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ServiceCard
                number={1}
                icon="inspection"
                name="SAFE SNAP"
                descriptor="Quick Workplace Observation"
                description="A focused workplace visit designed to identify visible hazards, immediate red flags, and priority improvement needs."
                features={[
                  'Visual workplace observations',
                  'Immediate red-flag identification',
                  'Brief verbal or written recommendations',
                  'Suggested next steps',
                ]}
                ctaLabel="LEARN ABOUT SAFE SNAP"
                ctaHref="/solutions/safe-snap"
                color="green"
              />
              <ServiceCard
                number={2}
                icon="assessment"
                name="CUBE SCORE"
                descriptor="Your Workplace Readiness Score"
                description="A structured high-level assessment that shows your current safety, health, environmental, quality, compliance, and management readiness."
                features={[
                  'Overall readiness score',
                  'Six-category performance breakdown',
                  'Priority gaps identified',
                  'Recommended action level',
                ]}
                ctaLabel="GET YOUR CUBE SCORE"
                ctaHref="/cube-score"
                color="green"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-eyebrow text-cube-green mb-4">UNDERSTAND</p>
            <div className="grid grid-cols-1 gap-6">
              <div className="md:max-w-2xl">
                <ServiceCard
                  number={3}
                  icon="reports"
                  name="CUBE INSIGHT"
                  descriptor="Detailed Workplace Assessment"
                  description="A comprehensive workplace inspection with documented findings, risk ratings, evidence, corrective actions, and a practical improvement roadmap."
                  features={[
                    'Detailed inspection and evaluation',
                    'Findings with risk priorities',
                    'Corrective Action and Preventive Action plan',
                    '30, 60, and 90-day improvement roadmap',
                  ]}
                  ctaLabel="BOOK CUBE INSIGHT"
                  ctaHref="/solutions/cube-insight"
                  color="blue"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-eyebrow text-cube-green mb-4">IMPROVE AND SUSTAIN</p>
            <div className="grid grid-cols-1 gap-6">
              <div className="md:max-w-2xl">
                <ServiceCard
                  number={4}
                  icon="corrective-actions"
                  name="CUBE CARE"
                  descriptor="Ongoing Improvement Support"
                  description="Continuous professional support to close gaps, maintain systems, update records, track actions, train employees, and strengthen workplace culture."
                  features={[
                    'Periodic workplace inspections',
                    'Documentation and system support',
                    'Corrective-action tracking',
                    'Management review assistance',
                  ]}
                  ctaLabel="START CUBE CARE"
                  ctaHref="/solutions/cube-care"
                  color="blue"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-eyebrow text-cube-green mb-4">SUPPORT</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ServiceCard
                number={5}
                icon="training"
                name="SAFE CUBE TRAINING"
                descriptor="Practical Workplace Training"
                description="Relevant awareness and skill-building sessions for employees, supervisors, managers, and workplace leaders."
                features={[
                  'Toolbox talks',
                  'Role-based training',
                  'Management awareness sessions',
                  'On-site and online delivery',
                ]}
                ctaLabel="VIEW TRAINING PROGRAMS"
                ctaHref="/training"
                color="green"
              />
              <ServiceCard
                number={6}
                icon="store"
                name="CUBE STORE"
                descriptor="Safety Equipment and Workplace Solutions"
                description="Access practical safety products, PPE, emergency equipment, signage, inspection tools, and workplace improvement kits."
                features={[
                  'Personal protective equipment',
                  'Fire and first-aid products',
                  'Spill-control and emergency supplies',
                  'Inspection and monitoring equipment',
                ]}
                ctaLabel="VISIT CUBE STORE"
                ctaHref="/store"
                color="green"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────── 7. CUBE SCORE Feature ──────────────────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">FREE STARTING POINT</Eyebrow>
                <SectionHeading className="mt-3" as="h2">
                  Discover Where Your Workplace Stands.
                </SectionHeading>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  CUBE SCORE is an introductory workplace assessment that helps businesses understand their overall readiness across occupational health, workplace safety, environment, quality, compliance, and management systems.
                </p>
                <p className="mt-3 text-body text-muted-foreground">
                  It converts high-level workplace observations into a clear score, category-level indicators, priority flags, and a recommended next action.
                </p>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-cube-navy">What you receive:</h3>
                  <ul className="mt-3 space-y-2">
                    {[
                      'Overall workplace readiness score',
                      'Six-category score breakdown',
                      'Green, amber, and red indicators',
                      'Immediate priority gaps',
                      'General recommendations',
                      'Suggested next level of support',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="green" size="lg">
                    <Link href="/cube-score">GET FREE CUBE SCORE</Link>
                  </Button>
                  <Button asChild variant="outlineBlue" size="lg">
                    <Link href="/cube-score#how-it-works">HOW THE SCORE WORKS</Link>
                  </Button>
                </div>
              </div>
            }
            right={
              <div className="rounded-lg border border-cube-soft bg-white p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-cube-navy">SAMPLE SCORE VIEW</h3>
                  <span className="rounded-full bg-cube-amber/15 px-2 py-1 text-[0.625rem] font-semibold text-cube-amber">
                    DEMONSTRATION ONLY
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-md bg-cube-soft px-4 py-3">
                  <span className="text-sm font-medium text-cube-navy">Overall Readiness</span>
                  <span className="text-2xl font-bold text-cube-navy">72</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Occupational Health', value: 75, color: 'bg-cube-green' },
                    { label: 'Workplace Safety', value: 68, color: 'bg-cube-amber' },
                    { label: 'Environment', value: 80, color: 'bg-cube-green' },
                    { label: 'Quality', value: 65, color: 'bg-cube-amber' },
                    { label: 'Compliance', value: 70, color: 'bg-cube-green' },
                    { label: 'Management Systems', value: 60, color: 'bg-cube-red' },
                  ].map((cat) => (
                    <div key={cat.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{cat.label}</span>
                        <span className="font-medium text-cube-navy">{cat.value}</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-cube-soft">
                        <div
                          className={`h-2 rounded-full ${cat.color}`}
                          style={{ width: `${cat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-cube-green" /> Ready
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-cube-amber" /> Attention
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-cube-red" /> Priority
                  </span>
                </div>
                <p className="mt-4 text-xs text-muted-foreground/70">
                  {cubeScoreDisclaimer}
                </p>
              </div>
            }
          />
        </Container>
      </section>

      {/* ──────────────────────── 8. CUBE INSIGHT Feature ────────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">DETAILED ASSESSMENT</Eyebrow>
                <SectionHeading className="mt-3" as="h2">
                  See Beyond the Score With CUBE INSIGHT.
                </SectionHeading>
                <p className="mt-4 text-body-lg text-muted-foreground">
                  CUBE INSIGHT is a detailed workplace assessment that turns observations into documented findings, risk priorities, corrective actions, and a structured improvement roadmap.
                </p>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-cube-navy">What it may include:</h3>
                  <ul className="mt-3 space-y-2">
                    {[
                      'Detailed workplace inspection',
                      'Document and record review',
                      'Photographic evidence where permitted',
                      'Risk-rated findings',
                      'Corrective Action and Preventive Action register',
                      '30, 60, and 90-day roadmap',
                      'Management summary',
                      'Closing discussion or presentation',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="green" size="lg">
                    <Link href="/solutions/cube-insight">BOOK CUBE INSIGHT</Link>
                  </Button>
                  <Button asChild variant="outlineBlue" size="lg">
                    <Link href="/solutions/cube-insight">EXPLORE THE ASSESSMENT</Link>
                  </Button>
                </div>
              </div>
            }
            right={
              <div className="rounded-lg border border-cube-soft bg-cube-soft p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-cube-navy">SAMPLE REPORT PREVIEW</h3>
                  <span className="rounded-full bg-cube-amber/15 px-2 py-1 text-[0.625rem] font-semibold text-cube-amber">
                    ILLUSTRATIVE
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="rounded-md border border-cube-soft bg-white p-4">
                    <p className="text-xs font-semibold text-cube-navy">Executive Summary</p>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 w-full rounded bg-cube-soft" />
                      <div className="h-2 w-5/6 rounded bg-cube-soft" />
                      <div className="h-2 w-4/6 rounded bg-cube-soft" />
                    </div>
                  </div>
                  <div className="rounded-md border border-cube-soft bg-white p-4">
                    <p className="text-xs font-semibold text-cube-navy">Risk-Priority Findings</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cube-red" />
                        <div className="h-2 flex-1 rounded bg-cube-soft" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cube-amber" />
                        <div className="h-2 flex-1 rounded bg-cube-soft" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cube-green" />
                        <div className="h-2 flex-1 rounded bg-cube-soft" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-cube-soft bg-white p-4">
                    <p className="text-xs font-semibold text-cube-navy">Corrective Actions</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-3 w-3 text-cube-green" aria-hidden="true" />
                        <div className="h-2 flex-1 rounded bg-cube-soft" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-3 w-3 text-cube-green" aria-hidden="true" />
                        <div className="h-2 flex-1 rounded bg-cube-soft" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-cube-soft bg-white p-4">
                    <p className="text-xs font-semibold text-cube-navy">Improvement Roadmap</p>
                    <div className="mt-2 flex gap-2">
                      <div className="flex-1 rounded bg-cube-green/10 p-2 text-center text-[0.625rem] font-medium text-cube-green">30 Day</div>
                      <div className="flex-1 rounded bg-cube-amber/10 p-2 text-center text-[0.625rem] font-medium text-cube-amber">60 Day</div>
                      <div className="flex-1 rounded bg-cube-blue/10 p-2 text-center text-[0.625rem] font-medium text-cube-blue">90 Day</div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Container>
      </section>

      {/* ──────────────────────── 9. CUBE CARE Feature ───────────────────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <TwoColumnLayout
            left={
              <div>
                <Eyebrow className="text-cube-green">CONTINUAL IMPROVEMENT</Eyebrow>
                <SectionHeading className="mt-3" as="h2">
                  Improvement Should Continue After the Report.
                </SectionHeading>
                <div className="mt-4 space-y-4">
                  <p className="text-body-lg text-muted-foreground">
                    Many workplace assessments produce useful findings, but implementation becomes difficult once daily operations take priority. Actions remain open, documents become outdated, inspections stop, training is delayed, and old problems begin to return.
                  </p>
                  <p className="text-body-lg text-muted-foreground">
                    CUBE CARE provides structured follow-up and professional support so that improvement becomes a maintained business process rather than a one-time activity.
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-cube-navy">CUBE CARE may include:</h3>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {cubeCareList.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="green" size="lg">
                    <Link href="/solutions/cube-care">EXPLORE CUBE CARE</Link>
                  </Button>
                  <Button asChild variant="outlineBlue" size="lg">
                    <Link href="/contact?service=cube-care">REQUEST A PROPOSAL</Link>
                  </Button>
                </div>
              </div>
            }
            right={
              <div className="flex h-full items-center justify-center">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Review', icon: Search },
                      { label: 'Act', icon: ClipboardCheck },
                      { label: 'Verify', icon: ShieldCheck },
                      { label: 'Maintain', icon: RefreshCw },
                    ].map((phase, idx) => {
                      const Icon = phase.icon;
                      return (
                        <div
                          key={phase.label}
                          className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-xl border border-cube-soft bg-white shadow-card"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-semibold text-cube-navy">{phase.label}</span>
                          <span className="text-xs text-muted-foreground">Step {idx + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">Continual Improvement Cycle</p>
                  </div>
                </div>
              </div>
            }
          />
        </Container>
      </section>

      {/* ──────────────────────── 10. Featured Industries ───────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">INDUSTRIES</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              Supporting Real Workplaces Across Multiple Industries
            </SectionHeading>
            <SectionIntro className="mt-4">
              Every workplace is different. SAFE CUBE adapts its assessments, checklists, recommendations, documentation, and support to your actual operations.
            </SectionIntro>
          </div>
          <ThreeColumnGrid>
            {industries
              .filter((ind) => ind.featured)
              .map((ind) => (
                <IndustryCard
                  key={ind.slug}
                  icon={ind.iconName ?? 'industries'}
                  name={ind.name}
                  description={ind.cardSummary}
                  href={`/industries/${ind.slug}`}
                  color="green"
                />
              ))}
          </ThreeColumnGrid>
          <div className="mt-8 text-center">
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/industries">
                EXPLORE ALL INDUSTRIES
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ──────────────────── 11. Why Businesses Choose SAFE CUBE ──────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">WHY SAFE CUBE</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              We Don&rsquo;t Just Inspect. We Help You Improve.
            </SectionHeading>
            <SectionIntro className="mt-4">
              SAFE CUBE is more than a visit, checklist, or report. We work to understand your people, operations, priorities, and constraints so that our recommendations are relevant, realistic, and capable of being implemented.
            </SectionIntro>
          </div>
          <ThreeColumnGrid>
            {whyChooseData.map((benefit) => (
              <ValueCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.text}
                color="green"
              />
            ))}
          </ThreeColumnGrid>
        </Container>
      </section>

      {/* ──────────────── 12. Training and Cube Store Supporting ─────────── */}
      <section className="section-standard bg-white">
        <Container>
          <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-cube-soft lg:grid-cols-2">
            {/* Training */}
            <div className="bg-cube-soft p-8 lg:p-12">
              <Eyebrow className="text-cube-green">BUILD CAPABILITY</Eyebrow>
              <h3 className="text-h3 mt-3">Practical Training for Safer Everyday Decisions.</h3>
              <p className="mt-3 max-w-narrow text-body-lg text-muted-foreground">
                SAFE CUBE delivers clear, role-relevant workplace training designed to help employees understand risks, follow controls, respond correctly, and contribute to a stronger workplace culture.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Workplace safety awareness',
                  'Fire and emergency response',
                  'Hazard identification',
                  'Toolbox talks',
                  'ISO awareness',
                  'Supervisor and management training',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="green" size="lg">
                  <Link href="/training">VIEW TRAINING PROGRAMS</Link>
                </Button>
              </div>
            </div>

            {/* Cube Store */}
            <div className="bg-cube-navy p-8 text-white lg:p-12">
              <Eyebrow className="text-cube-green-bright">EQUIP THE WORKPLACE</Eyebrow>
              <h3 className="text-h3 mt-3 text-white">Practical Products for Safer Workplaces.</h3>
              <p className="mt-3 max-w-narrow text-body-lg text-white/80">
                CUBE STORE provides workplace safety products selected to support hazard control, emergency readiness, employee protection, inspections, and everyday compliance.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'Personal protective equipment',
                  'Fire and emergency equipment',
                  'First-aid products',
                  'Safety signage',
                  'Spill-control products',
                  'Workplace safety kits',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green-bright" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild variant="whiteOnDark" size="lg">
                  <Link href="/store">VISIT CUBE STORE</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────────────────────── 13. Knowledge Centre Preview ──────────── */}
      <section className="section-standard bg-cube-soft">
        <Container>
          <div className="mb-10 text-center">
            <Eyebrow className="text-cube-green">KNOWLEDGE CENTRE</Eyebrow>
            <SectionHeading className="mt-3" as="h2">
              Practical Knowledge for Safer, Stronger Workplaces
            </SectionHeading>
            <SectionIntro className="mt-4">
              Explore straightforward guidance, checklists, explanations, and workplace improvement resources created for business owners, managers, supervisors, and employees.
            </SectionIntro>
          </div>
          <ThreeColumnGrid>
            {articles
              .filter((a) => a.featured)
              .map((article) => (
                <ArticleCard
                  key={article.slug}
                  category={article.category}
                  title={article.title}
                  excerpt={article.excerpt}
                  href={`/knowledge-centre/articles/${article.slug}`}
                />
              ))}
          </ThreeColumnGrid>
          <div className="mt-8 text-center">
            <Button asChild variant="outlineBlue" size="lg">
              <Link href="/knowledge-centre">
                VISIT KNOWLEDGE CENTRE
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ──────────────────────── 14. Free CUBE SCORE CTA ────────────────── */}
      <section className="bg-cube-navy py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-narrow text-center">
            <SectionDivider color="green" className="justify-center" />
            <h2 className="text-h2 mt-3 text-white">
              Do You Know Where Your Workplace Stands?
            </h2>
            <p className="mt-4 text-body-lg text-white/80">
              Start with a free CUBE SCORE to gain a structured overview of your workplace readiness, identify priority gaps, and understand which improvements deserve immediate attention.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="green" size="lg">
                <Link href="/cube-score">GET FREE CUBE SCORE</Link>
              </Button>
              <Button asChild variant="whiteOnDark" size="lg">
                <Link href="/contact">TALK TO SAFE CUBE</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/50">
              {cubeScoreDisclaimer}
            </p>
          </div>
        </Container>
      </section>

      {/* ──────────────────────── 15. Final CTA ─────────────────────────── */}
      <section className="section-standard bg-white">
        <Container>
          <CTADark
            heading="Let&rsquo;s Build a Safer Workplace Together."
            text="Whether you are starting from zero, responding to an immediate concern, or improving an existing management system, SAFE CUBE is ready to support your next practical step."
            primaryLabel="START WITH FREE CUBE SCORE"
            primaryHref="/cube-score"
            secondaryLabel="BOOK A CONSULTATION"
            secondaryHref="/book-consultation"
          />
        </Container>
      </section>
    </>
  );
}
