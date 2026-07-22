import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Eyebrow, SectionDivider } from '@/components/ui/typography';
import { Container } from '@/components/ui/layout';
import { FeatureIcon, getIcon, IconHexagon } from '@/components/ui/icon-containers';
import { TwoColumnLayout } from '@/components/ui/layout';

export interface HomepageHeroProps {
  eyebrow?: string;
  heading: string;
  highlight?: string[];
  supportingHeadline?: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  trustStatement?: string;
  className?: string;
}

export function HomepageHero({
  eyebrow,
  heading,
  highlight = [],
  supportingHeadline,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  trustStatement,
  className,
}: HomepageHeroProps) {
  const renderHeading = () => {
    if (!highlight.length) return heading;
    let parts: (string | { word: string; key: string })[] = [heading];
    highlight.forEach((word, idx) => {
      const next: typeof parts = [];
      parts.forEach((part) => {
        if (typeof part !== 'string') {
          next.push(part);
          return;
        }
        const segments = part.split(word);
        segments.forEach((segment, i) => {
          if (segment) next.push(segment);
          if (i < segments.length - 1) {
            next.push({ word, key: `${idx}-${i}` });
          }
        });
      });
      parts = next;
    });
    return parts.map((part) =>
      typeof part === 'string' ? (
        part
      ) : (
        <span key={part.key} className="text-cube-green-bright">
          {part.word}
        </span>
      )
    );
  };

  const cubeCells = [
    'bg-cube-green/20',
    'bg-cube-blue/20',
    'bg-cube-green/20',
    'bg-cube-blue/20',
    'bg-cube-green/20',
    'bg-cube-blue/20',
  ];

  return (
    <section className={cn('relative overflow-hidden bg-cube-navy py-16 lg:py-24', className)}>
      <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: text content */}
          <div>
            {eyebrow && <Eyebrow className="text-cube-green">{eyebrow}</Eyebrow>}
            <h1 className="text-display text-white mt-3">
              {renderHeading()}
            </h1>
            {supportingHeadline && (
              <p className="text-xl text-white/80 mt-2">{supportingHeadline}</p>
            )}
            <p className="text-body-lg text-white/70 mt-4 max-w-narrow">{body}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild variant="green" size="lg">
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
              <Button asChild variant="outlineGreen" size="lg">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
            {trustStatement && (
              <p className="text-sm text-white/60 mt-6">{trustStatement}</p>
            )}
          </div>

          {/* Right: decorative visual */}
          <div className="flex justify-center lg:justify-end" aria-hidden="true">
            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                {cubeCells.map((cell, i) => (
                  <div key={i} className={cn('h-20 w-20 rounded-lg', cell)} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-bold tracking-widest">
                  SAFE CUBE
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface InternalPageHeroProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function InternalPageHero({
  breadcrumbs,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: InternalPageHeroProps) {
  return (
    <section className={cn('bg-cube-soft py-12 lg:py-16', className)}>
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={i} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-cube-green transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'text-cube-navy font-medium' : ''}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && <span className="text-muted-foreground/50">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <h1 className="text-h1">{title}</h1>
        {description && (
          <p className="text-body-lg text-muted-foreground mt-4 max-w-narrow">
            {description}
          </p>
        )}
        {(primaryLabel || secondaryLabel) && (
          <div className="flex flex-wrap gap-3 mt-6">
            {primaryLabel && primaryHref && (
              <Button asChild variant="green" size="lg">
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            )}
            {secondaryLabel && secondaryHref && (
              <Button asChild variant="outlineBlue" size="lg">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export interface IndustryHeroProps {
  icon?: string;
  title: string;
  statement: string;
  primaryLabel: string;
  primaryHref: string;
  className?: string;
}

export function IndustryHero({
  icon,
  title,
  statement,
  primaryLabel,
  primaryHref,
  className,
}: IndustryHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-cube-navy py-12 lg:py-20', className)}>
      <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />
      <Container className="relative">
        {icon && (
          <div className="mb-4">
            <FeatureIcon
              icon={getIcon(icon)}
              color="green"
              size="lg"
            />
          </div>
        )}
        <h2 className="text-h2 text-white">{title}</h2>
        <p className="text-body-lg text-white/80 mt-3 max-w-narrow">{statement}</p>
        <div className="mt-6">
          <Button asChild variant="green" size="lg">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export interface SolutionHeroProps {
  serviceName: string;
  descriptor: string;
  explanation: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
}

export function SolutionHero({
  serviceName,
  descriptor,
  explanation,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: SolutionHeroProps) {
  const leftContent = (
    <div>
      <Eyebrow className="text-cube-green">SAFE CUBE SOLUTION</Eyebrow>
      <h1 className="text-h1 mt-3">{serviceName}</h1>
      <p className="text-lg font-medium text-cube-green mt-2">{descriptor}</p>
      <p className="text-body-lg text-muted-foreground mt-4">{explanation}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <Button asChild variant="green" size="lg">
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        <Button asChild variant="outlineBlue" size="lg">
          <Link href={secondaryHref}>{secondaryLabel}</Link>
        </Button>
      </div>
    </div>
  );

  const rightContent = (
    <div className="flex justify-center lg:justify-end">
      <div className="w-full max-w-sm rounded-lg bg-white border border-cube-soft p-8 shadow-card">
        <div className="flex justify-center">
          <IconHexagon icon={getIcon('shield')} color="green" size="lg" />
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-3 w-full rounded bg-cube-soft" />
          <div className="h-3 w-5/6 rounded bg-cube-soft" />
          <div className="h-3 w-4/6 rounded bg-cube-soft" />
        </div>
      </div>
    </div>
  );

  return (
    <section className={cn('bg-cube-soft py-12 lg:py-20', className)}>
      <Container>
        <TwoColumnLayout left={leftContent} right={rightContent} />
      </Container>
    </section>
  );
}

export interface StoreHeroProps {
  heading: string;
  description: string;
  className?: string;
}

export function StoreHero({ heading, description, className }: StoreHeroProps) {
  const categories = [
    { label: 'PPE', href: '#' },
    { label: 'Fire & Emergency', href: '#' },
    { label: 'First Aid', href: '#' },
    { label: 'Safety Signage', href: '#' },
    { label: 'Spill Control', href: '#' },
  ];

  return (
    <section className={cn('bg-cube-soft py-12 lg:py-16', className)}>
      <Container>
        <h2 className="text-h2">{heading}</h2>
        <p className="text-body-lg text-muted-foreground mt-2 max-w-narrow">
          {description}
        </p>
        <div className="flex gap-2 mt-6 max-w-standard">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 rounded-md border border-cube-soft bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
          />
          <Button variant="green" size="lg">
            Search
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="rounded-full bg-white border border-cube-soft px-3 py-1.5 text-sm text-cube-navy hover:border-cube-green hover:text-cube-green transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
