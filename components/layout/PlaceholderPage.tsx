import Link from 'next/link';
import { Construction } from 'lucide-react';
import type { Metadata } from 'next';

type PlaceholderPageProps = {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
};

export function generatePlaceholderMetadata({
  title,
  description,
}: {
  title: string;
  description?: string;
}): Metadata {
  return {
    title,
    description: description || title,
  };
}

export function PlaceholderPage({ title, description, breadcrumbs }: PlaceholderPageProps) {
  return (
    <div className="container py-16 lg:py-24">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-cube-green">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-cube-navy">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-cube-soft">/</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cube-soft">
          <Construction className="h-8 w-8 text-cube-green" />
        </div>
        <h1 className="text-3xl font-bold text-cube-navy lg:text-4xl">{title}</h1>
        {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
        <p className="mt-8 text-sm text-muted-foreground">
          This page is part of the SAFE CUBE website foundation. Content will be added in the next implementation phase.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-cube-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
