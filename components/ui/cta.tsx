import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SectionDivider } from '@/components/ui/typography';

interface CTAProps {
  heading: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  className?: string;
}

interface CTACompactProps {
  heading: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTALight({
  heading,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTAProps) {
  return (
    <section className={cn('rounded-lg border border-cube-soft bg-white p-8 lg:p-12', className)}>
      <SectionDivider color="green" />
      <h2 className="text-h3 max-w-narrow">{heading}</h2>
      <p className="mt-3 max-w-narrow text-body-lg text-muted-foreground">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="green" size="lg" asChild>
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        <Button variant="outlineBlue" size="lg" asChild>
          <Link href={secondaryHref}>{secondaryLabel}</Link>
        </Button>
      </div>
    </section>
  );
}

export function CTADark({
  heading,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTAProps) {
  return (
    <section className={cn('relative overflow-hidden rounded-lg bg-cube-navy p-8 lg:p-12', className)}>
      <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative">
        <SectionDivider color="green" />
        <h2 className="text-h3 max-w-narrow text-white">{heading}</h2>
        <p className="mt-3 max-w-narrow text-body-lg text-white/80">{text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="green" size="lg" asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button variant="whiteOnDark" size="lg" asChild>
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CTASplit({
  heading,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTAProps) {
  return (
    <section className={cn('grid grid-cols-1 overflow-hidden rounded-lg border border-cube-soft lg:grid-cols-2', className)}>
      <div className="bg-cube-soft p-8 lg:p-12">
        <SectionDivider color="blue" />
        <h2 className="text-h3 max-w-narrow">{heading}</h2>
        <p className="mt-3 max-w-narrow text-body-lg text-muted-foreground">{text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="blue" size="lg" asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button variant="outlineGreen" size="lg" asChild>
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </div>
      <div className="relative min-h-[200px] bg-cube-navy">
        <div className="cube-grid-bg cube-grid-fade absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="grid grid-cols-3 grid-rows-2 gap-3">
            <div className="h-12 w-12 rounded-md bg-cube-green/30" />
            <div className="h-12 w-12 rounded-md bg-cube-blue/30" />
            <div className="h-12 w-12 rounded-md bg-cube-green/30" />
            <div className="h-12 w-12 rounded-md bg-cube-blue/30" />
            <div className="h-12 w-12 rounded-md bg-cube-green/30" />
            <div className="h-12 w-12 rounded-md bg-cube-blue/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTACompact({
  heading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTACompactProps) {
  return (
    <section className={cn('flex flex-col items-center justify-between gap-4 rounded-lg bg-cube-soft p-6 sm:flex-row lg:p-8', className)}>
      <h2 className="text-lg font-semibold text-cube-navy lg:text-xl">{heading}</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="green" size="md" asChild>
          <Link href={primaryHref}>{primaryLabel}</Link>
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button variant="text" size="md" asChild>
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
