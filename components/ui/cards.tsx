import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, ShoppingCart, MessageCircle, Clock, Calendar, Check, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconCircleGreen, IconCircleBlue, IconCircleNavy, IconHexagon, getIcon } from '@/components/ui/icon-containers';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Color3 = 'green' | 'blue' | 'navy';
type Color2 = 'green' | 'blue';

function IconCircle({ color, icon }: { color: Color3; icon: LucideIcon }) {
  if (color === 'blue') return <IconCircleBlue icon={icon} />;
  if (color === 'navy') return <IconCircleNavy icon={icon} />;
  return <IconCircleGreen icon={icon} />;
}

function IconCircle2({ color, icon }: { color: Color2; icon: LucideIcon }) {
  if (color === 'blue') return <IconCircleBlue icon={icon} />;
  return <IconCircleGreen icon={icon} />;
}

// ---------------------------------------------------------------------------
// 1. FeatureCard
// ---------------------------------------------------------------------------

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  color?: Color3;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  color = 'green',
  className,
}: FeatureCardProps) {
  const Icon = getIcon(icon);

  const inner = (
    <Card className={cn('h-full p-6 transition-shadow hover:shadow-hover', className)}>
      <IconCircle color={color} icon={Icon} />
      <h3 className="mt-4 text-lg font-semibold text-cube-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cube-green">
          Learn more <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }

  return inner;
}

// ---------------------------------------------------------------------------
// 2. ServiceCard
// ---------------------------------------------------------------------------

export interface ServiceCardProps {
  number: number;
  icon: string;
  name: string;
  descriptor: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  color?: Color2;
  className?: string;
}

export function ServiceCard({
  number,
  icon,
  name,
  descriptor,
  description,
  features,
  ctaLabel,
  ctaHref,
  color = 'green',
  className,
}: ServiceCardProps) {
  const Icon = getIcon(icon);

  return (
    <Card className={cn('flex h-full flex-col p-6 transition-shadow hover:shadow-hover', className)}>
      <div className="flex items-start justify-between">
        <IconHexagon color={color} icon={Icon} />
        <span className="text-3xl font-bold text-cube-soft">
          {String(number).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-cube-navy">{name}</h3>
      <p className="text-sm font-medium text-cube-green">{descriptor}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <ul className="mt-4 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-2">
        <Button
          variant={color === 'blue' ? 'blue' : 'green'}
          size="sm"
          asChild
        >
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 3. IndustryCard
// ---------------------------------------------------------------------------

export interface IndustryCardProps {
  icon: string;
  name: string;
  description: string;
  href: string;
  color?: Color2;
  className?: string;
}

export function IndustryCard({
  icon,
  name,
  description,
  href,
  color = 'green',
  className,
}: IndustryCardProps) {
  const Icon = getIcon(icon);

  return (
    <Link href={href} className="block h-full">
      <Card className={cn('h-full p-6 transition-shadow hover:shadow-hover', className)}>
        <IconCircle2 color={color} icon={Icon} />
        <h3 className="mt-4 text-lg font-semibold text-cube-navy">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cube-green">
          Learn more <ArrowRight className="h-4 w-4" />
        </span>
      </Card>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// 4. ValueCard
// ---------------------------------------------------------------------------

export interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  color?: Color3;
  className?: string;
}

export function ValueCard({
  icon,
  title,
  description,
  color = 'green',
  className,
}: ValueCardProps) {
  const Icon = getIcon(icon);

  return (
    <Card className={cn('h-full p-6', className)}>
      <IconCircle color={color} icon={Icon} />
      <h3 className="mt-4 text-lg font-semibold text-cube-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 5. ArticleCard
// ---------------------------------------------------------------------------

export interface ArticleCardProps {
  imageUrl?: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime?: string;
  date?: string;
  href: string;
  className?: string;
}

export function ArticleCard({
  imageUrl,
  category,
  title,
  excerpt,
  readingTime,
  date,
  href,
  className,
}: ArticleCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className={cn('flex h-full flex-col overflow-hidden transition-shadow hover:shadow-hover', className)}>
        {imageUrl && (
          <div className="aspect-[16/9] w-full bg-cube-soft" />
        )}

        <div className="flex flex-1 flex-col p-6">
          <p className="text-eyebrow text-cube-green">{category}</p>
          <h3 className="mt-2 text-lg font-semibold text-cube-navy">{title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{excerpt}</p>

          {(readingTime || date) && (
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              {readingTime && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime}
                </span>
              )}
              {date && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {date}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// 6. DownloadCard
// ---------------------------------------------------------------------------

export interface DownloadCardProps {
  title: string;
  description: string;
  fileType: string;
  version?: string;
  lastUpdated?: string;
  href: string;
  className?: string;
}

export function DownloadCard({
  title,
  description,
  fileType,
  version,
  lastUpdated,
  href,
  className,
}: DownloadCardProps) {
  return (
    <Card className={cn('flex h-full flex-col p-5', className)}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-cube-blue/10 text-cube-blue">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-cube-navy">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded bg-cube-soft px-2 py-1 font-medium text-cube-navy">
          {fileType}
        </span>
        {version && <span>Version {version}</span>}
        {lastUpdated && <span>Updated {lastUpdated}</span>}
      </div>

      <div className="mt-5 pt-2">
        <Button variant="outlineBlue" size="sm" asChild>
          <Link href={href}>
            <Download className="mr-1.5 h-4 w-4" />
            Download
          </Link>
        </Button>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 7. ProductCard
// ---------------------------------------------------------------------------

export interface ProductCardProps {
  title: string;
  category: string;
  price: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  href: string;
  className?: string;
}

const stockStatusStyles: Record<ProductCardProps['stockStatus'], string> = {
  in_stock: 'text-cube-green',
  low_stock: 'text-amber-600',
  out_of_stock: 'text-red-600',
};

const stockStatusLabel: Record<ProductCardProps['stockStatus'], string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

export function ProductCard({
  title,
  category,
  price,
  stockStatus,
  href,
  className,
}: ProductCardProps) {
  return (
    <Card className={cn('flex h-full flex-col overflow-hidden transition-shadow hover:shadow-hover', className)}>
      <Link href={href} className="aspect-square w-full bg-cube-soft" />

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted-foreground">{category}</p>
        <Link href={href} className="mt-1 block text-base font-semibold text-cube-navy hover:underline">
          {title}
        </Link>
        <p className={cn('mt-1 text-sm font-medium', stockStatusStyles[stockStatus])}>
          {stockStatusLabel[stockStatus]}
        </p>
        <p className="mt-2 text-lg font-bold text-cube-navy">{price}</p>

        <div className="mt-4 flex gap-2">
          <Button
            variant="green"
            size="sm"
            className="flex-1"
            disabled={stockStatus === 'out_of_stock'}
          >
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Add
          </Button>
          <Button variant="outlineBlue" size="sm" className="flex-1">
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Inquire
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 8. ProcessStepCard
// ---------------------------------------------------------------------------

export interface ProcessStepCardProps {
  step: number;
  icon?: string;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStepCard({
  step,
  icon,
  title,
  description,
  className,
}: ProcessStepCardProps) {
  const Icon = icon ? getIcon(icon) : null;

  return (
    <Card className={cn('h-full p-6', className)}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cube-navy text-sm font-bold text-white">
          {step}
        </span>
        {Icon && <IconCircleGreen icon={Icon} />}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-cube-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 9. PlanCard
// ---------------------------------------------------------------------------

export interface PlanCardProps {
  name: string;
  suitableFor: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  className?: string;
}

export function PlanCard({
  name,
  suitableFor,
  features,
  ctaLabel,
  ctaHref,
  highlighted = false,
  className,
}: PlanCardProps) {
  return (
    <Card
      className={cn(
        'flex h-full flex-col p-6',
        highlighted && 'border-cube-green shadow-hover ring-2 ring-cube-green/20',
        className,
      )}
    >
      {highlighted && (
        <span className="mb-4 inline-block w-fit rounded-full bg-cube-green px-3 py-1 text-xs font-semibold text-white">
          Recommended
        </span>
      )}

      <h3 className="text-xl font-bold text-cube-navy">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{suitableFor}</p>

      <ul className="mt-4 flex-1 space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cube-green" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-2">
        <Button
          variant={highlighted ? 'green' : 'outlineBlue'}
          size="sm"
          asChild
        >
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// 10. StatCard
// ---------------------------------------------------------------------------

export interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  const Icon = icon ? getIcon(icon) : null;

  return (
    <Card className={cn('p-6 text-center', className)}>
      {Icon && (
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cube-green/10 text-cube-green">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <p className="text-3xl font-bold text-cube-navy">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}
