'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowRight,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eyebrow, SectionHeading, SectionIntro } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';

/* ─────────────────────────── PageHero ─────────────────────────── */

type HeroVariant = 'split' | 'banner' | 'navy' | 'editorial' | 'geometric' | 'industry' | 'compact';
type HeroTheme = 'light' | 'navy' | 'industry' | 'solution';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: HeroVariant;
  theme?: HeroTheme;
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt = '',
  breadcrumbs,
  variant = 'split',
  theme = 'light',
}: PageHeroProps) {
  const isDark = theme === 'navy' || theme === 'industry' || theme === 'solution';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        isDark ? 'bg-cube-navy' : 'bg-cube-soft',
        variant === 'compact' ? 'py-10 lg:py-14' : 'py-14 lg:py-20'
      )}
    >
      {isDark && <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />}

      {/* Banner / industry / navy full-width image variants */}
      {(variant === 'banner' || variant === 'industry') && image && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className={cn('absolute inset-0', isDark ? 'bg-cube-navy/80' : 'bg-white/70')} />
        </div>
      )}

      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-xs">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className={cn('hover:underline', isDark ? 'text-white/60' : 'text-muted-foreground')}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={cn(isDark ? 'text-white/90' : 'text-cube-navy', 'font-medium')}>
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <span className={isDark ? 'text-white/30' : 'text-muted-foreground/40'}>/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {(variant === 'banner' || variant === 'navy' || variant === 'industry' || variant === 'geometric' || variant === 'compact') && (
          <div className={cn('mx-auto', variant === 'compact' ? 'max-w-narrow' : 'max-w-3xl')}>
            {eyebrow && <Eyebrow className={isDark ? 'text-cube-green-bright' : 'text-cube-green'}>{eyebrow}</Eyebrow>}
            <h1 className={cn('mt-3', isDark ? 'text-white' : 'text-cube-navy', variant === 'compact' ? 'text-h3' : 'text-h1')}>
              {title}
            </h1>
            {description && (
              <p className={cn('mt-4 text-body-lg', isDark ? 'text-white/80' : 'text-muted-foreground', 'max-w-narrow')}>
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {primaryCta && (
                  <Button asChild variant="green" size="lg">
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button asChild variant={isDark ? 'whiteOnDark' : 'outlineBlue'} size="lg">
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Split / editorial variants with side image */}
        {(variant === 'split' || variant === 'editorial') && (
          <div className={cn('grid gap-10 lg:gap-12', 'lg:grid-cols-2 lg:items-center')}>
            <div>
              {eyebrow && <Eyebrow className={isDark ? 'text-cube-green-bright' : 'text-cube-green'}>{eyebrow}</Eyebrow>}
              <h1 className={cn('mt-3', isDark ? 'text-white' : 'text-cube-navy', 'text-h1')}>{title}</h1>
              {description && (
                <p className={cn('mt-4 text-body-lg', isDark ? 'text-white/80' : 'text-muted-foreground')}>
                  {description}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {primaryCta && (
                    <Button asChild variant="green" size="lg">
                      <Link href={primaryCta.href}>{primaryCta.label}</Link>
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button asChild variant={isDark ? 'whiteOnDark' : 'outlineBlue'} size="lg">
                      <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
            {image && (
              <div className={cn('flex', variant === 'editorial' ? 'justify-start' : 'justify-center lg:justify-end')}>
                <div className={cn('relative overflow-hidden rounded-xl shadow-overlay', isDark ? 'border border-white/10' : 'border border-cube-soft')}>
                  <Image
                    src={image}
                    alt={imageAlt}
                    width={800}
                    height={600}
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  {isDark && <div className="absolute inset-0 bg-gradient-to-t from-cube-navy/40 to-transparent" aria-hidden="true" />}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ─────────────────────────── ImageTextSection ─────────────────────────── */

interface ImageTextSectionProps {
  eyebrow?: string;
  heading: string;
  paragraphs?: string[];
  checklist?: string[];
  cta?: { label: string; href: string };
  image: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  background?: 'white' | 'soft' | 'navy';
  checklistType?: 'green' | 'amber';
}

export function ImageTextSection({
  eyebrow,
  heading,
  paragraphs,
  checklist,
  cta,
  image,
  imageAlt,
  imagePosition = 'right',
  background = 'white',
  checklistType = 'green',
}: ImageTextSectionProps) {
  const bgClass = background === 'soft' ? 'bg-cube-soft' : background === 'navy' ? 'bg-cube-navy' : 'bg-white';
  const isDark = background === 'navy';
  const CheckIcon = checklistType === 'amber' ? AlertTriangle : Check;

  return (
    <section className={cn('section-standard', bgClass)}>
      <Container>
        <div className={cn('grid gap-10 lg:gap-12 lg:grid-cols-2 lg:items-center')}>
          {imagePosition === 'left' && (
            <div className="flex justify-center lg:justify-start">
              <div className={cn('relative overflow-hidden rounded-xl shadow-card', isDark ? 'border border-white/10' : 'border border-cube-soft')}>
                <Image
                  src={image}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          )}
          <div>
            {eyebrow && <Eyebrow className={isDark ? 'text-cube-green-bright' : 'text-cube-green'}>{eyebrow}</Eyebrow>}
            <SectionHeading className={cn('mt-3', isDark && 'text-white')} as="h2">{heading}</SectionHeading>
            {paragraphs && (
              <div className="mt-4 space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className={cn('text-body-lg', isDark ? 'text-white/80' : 'text-muted-foreground')}>
                    {p}
                  </p>
                ))}
              </div>
            )}
            {checklist && checklist.length > 0 && (
              <ul className="mt-5 space-y-2">
                {checklist.map((item) => (
                  <li key={item} className={cn('flex items-start gap-2 text-sm', isDark ? 'text-white/80' : 'text-muted-foreground')}>
                    <CheckIcon className={cn('mt-0.5 h-4 w-4 flex-shrink-0', checklistType === 'amber' ? 'text-cube-amber' : 'text-cube-green')} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <div className="mt-6">
                <Button asChild variant={isDark ? 'whiteOnDark' : 'green'} size="lg">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              </div>
            )}
          </div>
          {imagePosition === 'right' && (
            <div className="flex justify-center lg:justify-end">
              <div className={cn('relative overflow-hidden rounded-xl shadow-card', isDark ? 'border border-white/10' : 'border border-cube-soft')}>
                <Image
                  src={image}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────── VisualFeatureGrid ─────────────────────────── */

type IconName = 'shield' | 'settings' | 'clipboard' | 'refresh' | 'badge' | 'users' | 'documents' | 'inspection' | 'assessment' | 'reports' | 'training' | 'store' | 'leaf' | 'hardhat' | 'heart' | 'wrench' | 'alert' | 'search' | 'calendar' | 'graduation' | 'shopping' | 'check' | 'info' | 'industries' | 'target' | 'list' | 'gear' | 'fire' | 'medical' | 'truck';

const iconMap: Record<IconName, LucideIcon> = {
  shield: require('lucide-react').ShieldCheck,
  settings: require('lucide-react').Settings,
  clipboard: require('lucide-react').ClipboardCheck,
  refresh: require('lucide-react').RefreshCw,
  badge: require('lucide-react').BadgeCheck,
  users: require('lucide-react').Users,
  documents: require('lucide-react').FileText,
  inspection: require('lucide-react').Search,
  assessment: require('lucide-react').ClipboardCheck,
  reports: require('lucide-react').FileText,
  training: require('lucide-react').GraduationCap,
  store: require('lucide-react').ShoppingBag,
  leaf: require('lucide-react').Leaf,
  hardhat: require('lucide-react').HardHat,
  heart: require('lucide-react').HeartPulse,
  wrench: require('lucide-react').Wrench,
  alert: require('lucide-react').AlertTriangle,
  search: require('lucide-react').Search,
  calendar: require('lucide-react').Calendar,
  graduation: require('lucide-react').GraduationCap,
  shopping: require('lucide-react').ShoppingBag,
  check: require('lucide-react').Check,
  info: require('lucide-react').Info,
  industries: require('lucide-react').Building2,
  target: require('lucide-react').Target,
  list: require('lucide-react').ListChecks,
  gear: require('lucide-react').Settings,
  fire: require('lucide-react').Flame,
  medical: require('lucide-react').HeartPulse,
  truck: require('lucide-react').Truck,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] || iconMap.shield;
}

export { type IconName };

interface VisualFeatureGridProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items: { icon: string; title: string; description: string; href?: string }[];
  columns?: 2 | 3 | 4 | 6;
  background?: 'white' | 'soft' | 'navy';
}

export function VisualFeatureGrid({
  eyebrow, heading, intro, items, columns = 3, background = 'white',
}: VisualFeatureGridProps) {
  const bgClass = background === 'soft' ? 'bg-cube-soft' : background === 'navy' ? 'bg-cube-navy' : 'bg-white';
  const isDark = background === 'navy';
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[columns];

  return (
    <section className={cn('section-standard', bgClass)}>
      <Container>
        {(eyebrow || heading || intro) && (
          <div className="mb-10 text-center">
            {eyebrow && <Eyebrow className={isDark ? 'text-cube-green-bright' : 'text-cube-green'}>{eyebrow}</Eyebrow>}
            {heading && <SectionHeading className={cn('mt-3', isDark && 'text-white')} as="h2">{heading}</SectionHeading>}
            {intro && <SectionIntro className={cn('mt-4', isDark && 'text-white/70')}>{intro}</SectionIntro>}
          </div>
        )}
        <div className={cn('grid gap-6', colClass)}>
          {items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const content = (
              <div className={cn(
                'group h-full rounded-lg border p-6 transition-all',
                isDark ? 'border-white/10 bg-white/5 hover:border-cube-green/40' : 'border-cube-soft bg-white shadow-card hover:shadow-hover hover:border-cube-green/30',
                item.href && 'cursor-pointer'
              )}>
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-105',
                  isDark ? 'bg-cube-green/20 text-cube-green-bright' : 'bg-cube-green/10 text-cube-green'
                )}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className={cn('mt-4 text-base font-semibold', isDark ? 'text-white' : 'text-cube-navy')}>{item.title}</h3>
                <p className={cn('mt-2 text-sm', isDark ? 'text-white/70' : 'text-muted-foreground')}>{item.description}</p>
                {item.href && (
                  <span className={cn('mt-3 flex items-center gap-1 text-xs font-medium', isDark ? 'text-cube-green-bright' : 'text-cube-green')}>
                    Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                )}
              </div>
            );
            return item.href ? (
              <Link key={i} href={item.href} className="block">{content}</Link>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────── ProcessTimeline ─────────────────────────── */

interface ProcessTimelineProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  steps: { title: string; description: string; icon?: string }[];
  background?: 'white' | 'soft' | 'navy';
}

export function ProcessTimeline({
  eyebrow, heading, intro, steps, background = 'white',
}: ProcessTimelineProps) {
  const bgClass = background === 'soft' ? 'bg-cube-soft' : background === 'navy' ? 'bg-cube-navy' : 'bg-white';
  const isDark = background === 'navy';

  return (
    <section className={cn('section-standard', bgClass)}>
      <Container>
        {(eyebrow || heading || intro) && (
          <div className="mb-10 text-center">
            {eyebrow && <Eyebrow className={isDark ? 'text-cube-green-bright' : 'text-cube-green'}>{eyebrow}</Eyebrow>}
            {heading && <SectionHeading className={cn('mt-3', isDark && 'text-white')} as="h2">{heading}</SectionHeading>}
            {intro && <SectionIntro className={cn('mt-4', isDark && 'text-white/70')}>{intro}</SectionIntro>}
          </div>
        )}
        {/* Desktop horizontal */}
        <div className="hidden lg:flex lg:items-start lg:justify-between lg:gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon ? getIcon(step.icon) : null;
            return (
              <div key={i} className="flex flex-1 flex-col items-center text-center">
                <div className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full border-2 font-bold',
                  isDark ? 'border-cube-green text-cube-green-bright bg-cube-navy' : 'border-cube-green text-cube-green bg-white'
                )}>
                  {Icon ? <Icon className="h-6 w-6" aria-hidden="true" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={cn('mt-7 h-0.5 w-full', isDark ? 'bg-white/15' : 'bg-cube-soft')} style={{ marginTop: '1.75rem' }} />
                )}
                <h3 className={cn('mt-4 text-base font-semibold', isDark ? 'text-white' : 'text-cube-navy')}>{step.title}</h3>
                <p className={cn('mt-2 text-sm max-w-xs', isDark ? 'text-white/70' : 'text-muted-foreground')}>{step.description}</p>
              </div>
            );
          })}
        </div>
        {/* Mobile vertical */}
        <div className="lg:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon ? getIcon(step.icon) : null;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold',
                    isDark ? 'border-cube-green text-cube-green-bright' : 'border-cube-green text-cube-green'
                  )}>
                    {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className={cn('w-0.5 flex-1', isDark ? 'bg-white/15' : 'bg-cube-soft')} style={{ minHeight: '2rem' }} />}
                </div>
                <div className="pb-6">
                  <h3 className={cn('text-base font-semibold', isDark ? 'text-white' : 'text-cube-navy')}>{step.title}</h3>
                  <p className={cn('mt-1 text-sm', isDark ? 'text-white/70' : 'text-muted-foreground')}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────── ReportMockup ─────────────────────────── */

interface ReportMockupProps {
  title?: string;
  label?: string;
  type?: 'scorecard' | 'report';
  background?: 'white' | 'soft';
}

export function ReportMockup({
  title = 'SAMPLE SCORE VIEW',
  label = 'DEMONSTRATION ONLY',
  type = 'scorecard',
  background = 'soft',
}: ReportMockupProps) {
  const categories = [
    { label: 'Occupational Health', value: 75, color: 'bg-cube-green' },
    { label: 'Workplace Safety', value: 68, color: 'bg-cube-amber' },
    { label: 'Environment', value: 80, color: 'bg-cube-green' },
    { label: 'Quality', value: 65, color: 'bg-cube-amber' },
    { label: 'Compliance', value: 70, color: 'bg-cube-green' },
    { label: 'Management Systems', value: 60, color: 'bg-cube-red' },
  ];

  if (type === 'report') {
    return (
      <div className={cn('rounded-lg border p-6 shadow-card', background === 'soft' ? 'border-cube-soft bg-cube-soft' : 'border-cube-soft bg-white')}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-cube-navy">{title}</h3>
          <span className="rounded-full bg-cube-amber/15 px-2 py-1 text-[0.625rem] font-semibold text-cube-amber">{label}</span>
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
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cube-red" /><div className="h-2 flex-1 rounded bg-cube-soft" /></div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cube-amber" /><div className="h-2 flex-1 rounded bg-cube-soft" /></div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cube-green" /><div className="h-2 flex-1 rounded bg-cube-soft" /></div>
            </div>
          </div>
          <div className="rounded-md border border-cube-soft bg-white p-4">
            <p className="text-xs font-semibold text-cube-navy">Corrective Actions</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2"><Wrench className="h-3 w-3 text-cube-green" aria-hidden="true" /><div className="h-2 flex-1 rounded bg-cube-soft" /></div>
              <div className="flex items-center gap-2"><Wrench className="h-3 w-3 text-cube-green" aria-hidden="true" /><div className="h-2 flex-1 rounded bg-cube-soft" /></div>
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
    );
  }

  return (
    <div className={cn('rounded-lg border p-6 shadow-card', background === 'soft' ? 'border-cube-soft bg-cube-soft' : 'border-cube-soft bg-white')}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cube-navy">{title}</h3>
        <span className="rounded-full bg-cube-amber/15 px-2 py-1 text-[0.625rem] font-semibold text-cube-amber">{label}</span>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-md bg-cube-soft px-4 py-3">
        <span className="text-sm font-medium text-cube-navy">Overall Readiness</span>
        <span className="text-2xl font-bold text-cube-navy">72</span>
      </div>
      <div className="mt-4 space-y-3">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{cat.label}</span>
              <span className="font-medium text-cube-navy">{cat.value}</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-cube-soft">
              <div className={cn('h-2 rounded-full', cat.color)} style={{ width: `${cat.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cube-green" /> Ready</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cube-amber" /> Attention</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cube-red" /> Priority</span>
      </div>
    </div>
  );
}

/* ─────────────────────────── RiskMatrix ─────────────────────────── */

export function RiskMatrix() {
  const levels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  const severities = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Severe'];
  const matrix: Record<string, Record<string, 'green' | 'amber' | 'red'>> = {
    Rare: { Insignificant: 'green', Minor: 'green', Moderate: 'green', Major: 'amber', Severe: 'amber' },
    Unlikely: { Insignificant: 'green', Minor: 'green', Moderate: 'amber', Major: 'amber', Severe: 'red' },
    Possible: { Insignificant: 'green', Minor: 'amber', Moderate: 'amber', Major: 'red', Severe: 'red' },
    Likely: { Insignificant: 'amber', Minor: 'amber', Moderate: 'red', Major: 'red', Severe: 'red' },
    'Almost Certain': { Insignificant: 'amber', Minor: 'red', Moderate: 'red', Major: 'red', Severe: 'red' },
  };
  const colorMap = { green: 'bg-cube-green/20 text-cube-green', amber: 'bg-cube-amber/20 text-cube-amber', red: 'bg-cube-red/20 text-cube-red' };
  const labelMap = { green: 'Low', amber: 'Medium', red: 'High' };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center text-xs">
        <thead>
          <tr>
            <th className="border border-cube-soft bg-cube-soft p-2 text-left font-semibold text-cube-navy">
              Likelihood ↓ / Severity →
            </th>
            {severities.map((s) => (
              <th key={s} className="border border-cube-soft bg-cube-soft p-2 font-semibold text-cube-navy">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level}>
              <th scope="row" className="border border-cube-soft bg-cube-soft p-2 text-left font-semibold text-cube-navy">{level}</th>
              {severities.map((sev) => {
                const risk = matrix[level][sev];
                return (
                  <td key={sev} className={cn('border border-cube-soft p-3 font-medium', colorMap[risk])}>
                    {labelMap[risk]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────── ImprovementCycle ─────────────────────────── */

export function ImprovementCycle() {
  const phases = [
    { label: 'Review', icon: 'search', desc: 'Assess current performance and identify gaps.' },
    { label: 'Act', icon: 'clipboard', desc: 'Implement corrective actions and improvements.' },
    { label: 'Verify', icon: 'shield', desc: 'Confirm actions are effective and sustained.' },
    { label: 'Maintain', icon: 'refresh', desc: 'Monitor, review, and keep improvements active.' },
  ];
  return (
    <div className="mx-auto max-w-md">
      <div className="grid grid-cols-2 gap-4">
        {phases.map((phase, i) => {
          const Icon = getIcon(phase.icon);
          return (
            <div key={phase.label} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-cube-soft bg-white p-6 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-cube-navy">{phase.label}</span>
              <span className="text-xs text-muted-foreground text-center">{phase.desc}</span>
              <span className="text-[0.625rem] font-medium text-muted-foreground/60">Step {i + 1}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">Continual Improvement Cycle</p>
    </div>
  );
}

/* ─────────────────────────── VisualChecklist ─────────────────────────── */

type ChecklistItemType = 'green' | 'amber' | 'red' | 'info';

interface VisualChecklistProps {
  items: { text: string; type?: ChecklistItemType }[];
  title?: string;
  background?: 'white' | 'soft';
}

export function VisualChecklist({ items, title, background = 'soft' }: VisualChecklistProps) {
  const bgClass = background === 'soft' ? 'bg-cube-soft' : 'bg-white';
  const iconForType: Record<ChecklistItemType, { icon: LucideIcon; color: string }> = {
    green: { icon: Check, color: 'text-cube-green' },
    amber: { icon: AlertTriangle, color: 'text-cube-amber' },
    red: { icon: AlertCircle, color: 'text-cube-red' },
    info: { icon: Info, color: 'text-cube-blue' },
  };
  return (
    <div className={cn('rounded-lg border border-cube-soft p-6', bgClass)}>
      {title && <h3 className="text-sm font-semibold text-cube-navy">{title}</h3>}
      <ul className={cn('space-y-3', title && 'mt-4')}>
        {items.map((item, i) => {
          const { icon: Icon, color } = iconForType[item.type || 'green'];
          return (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon className={cn('mt-0.5 h-4 w-4 flex-shrink-0', color)} aria-hidden="true" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─────────────────────────── IndustryImageCard ─────────────────────────── */

interface IndustryImageCardProps {
  name: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export function IndustryImageCard({ name, description, href, image, imageAlt }: IndustryImageCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-cube-soft bg-white shadow-card transition-all hover:shadow-hover hover:border-cube-green/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cube-navy/60 to-transparent" aria-hidden="true" />
        <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white">{name}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <span className="mt-3 flex items-center gap-1 text-xs font-medium text-cube-green">
          View industry details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────────── ContentCallout ─────────────────────────── */

interface ContentCalloutProps {
  type?: 'info' | 'warning' | 'disclaimer';
  title?: string;
  children: React.ReactNode;
}

export function ContentCallout({ type = 'info', title, children }: ContentCalloutProps) {
  const styles = {
    info: { bg: 'bg-cube-blue/5', border: 'border-cube-blue/20', icon: Info, iconColor: 'text-cube-blue' },
    warning: { bg: 'bg-cube-amber/5', border: 'border-cube-amber/30', icon: AlertTriangle, iconColor: 'text-cube-amber' },
    disclaimer: { bg: 'bg-cube-soft', border: 'border-cube-soft', icon: Info, iconColor: 'text-muted-foreground' },
  };
  const { bg, border, icon: Icon, iconColor } = styles[type];
  return (
    <div className={cn('rounded-lg border p-4', bg, border)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0', iconColor)} aria-hidden="true" />
        <div>
          {title && <p className="text-sm font-semibold text-cube-navy">{title}</p>}
          <div className={cn('text-sm text-muted-foreground', title && 'mt-1')}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── RoadmapTimeline ─────────────────────────── */

export function RoadmapTimeline() {
  const phases = [
    { period: '30 Days', color: 'bg-cube-green', text: 'Immediate corrective actions, critical hazard fixes, and priority documentation.' },
    { period: '60 Days', color: 'bg-cube-amber', text: 'Procedure development, training delivery, system improvements, and intermediate actions.' },
    { period: '90 Days', color: 'bg-cube-blue', text: 'Verification, management review, compliance confirmation, and sustained improvement.' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {phases.map((p) => (
        <div key={p.period} className="rounded-lg border border-cube-soft bg-white p-5 shadow-card">
          <span className={cn('inline-block rounded px-3 py-1 text-xs font-semibold text-white', p.color)}>{p.period}</span>
          <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── HierarchyOfControls ─────────────────────────── */

export function HierarchyOfControls() {
  const levels = [
    { label: 'Elimination', desc: 'Remove the hazard entirely.', color: 'bg-cube-green' },
    { label: 'Substitution', desc: 'Replace with a less hazardous alternative.', color: 'bg-cube-green/80' },
    { label: 'Engineering Controls', desc: 'Isolate people from the hazard.', color: 'bg-cube-blue' },
    { label: 'Administrative Controls', desc: 'Change the way people work.', color: 'bg-cube-amber' },
    { label: 'PPE', desc: 'Protect the worker with equipment.', color: 'bg-cube-red' },
  ];
  return (
    <div className="space-y-2">
      {levels.map((level, i) => (
        <div key={level.label} className={cn('flex items-center gap-4 rounded-lg p-4 text-white shadow-card', level.color)} style={{ marginLeft: `${i * 1.5}rem` }}>
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">{i + 1}</span>
          <div>
            <p className="font-semibold">{level.label}</p>
            <p className="text-sm text-white/80">{level.desc}</p>
          </div>
        </div>
      ))}
      <p className="mt-3 text-xs text-muted-foreground">Most effective at top, least effective at bottom.</p>
    </div>
  );
}
