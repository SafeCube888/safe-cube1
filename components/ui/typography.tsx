import React from 'react';
import { cn } from '@/lib/utils';

type CubeColor = 'green' | 'blue' | 'navy';

// 1. Eyebrow - small uppercase label with letter-spacing
export interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  color?: CubeColor;
}

const eyebrowColorClasses: Record<CubeColor, string> = {
  green: 'text-cube-green',
  blue: 'text-cube-blue',
  navy: 'text-cube-navy',
};

export function Eyebrow({ children, className, color = 'green' }: EyebrowProps) {
  return (
    <span className={cn('text-eyebrow', eyebrowColorClasses[color], className)}>
      {children}
    </span>
  );
}

// 2. SectionHeading - configurable heading with optional word highlighting
export interface SectionHeadingProps {
  children: string;
  className?: string;
  as?: React.ElementType;
  highlight?: string[];
}

export function SectionHeading({
  children,
  className,
  as: Component = 'h2',
  highlight,
}: SectionHeadingProps) {
  const renderContent = () => {
    if (!highlight || highlight.length === 0) {
      return children;
    }

    const words = children.split(' ');
    return words.map((word, index) => {
      const isHighlighted = highlight.includes(word);
      return (
        <React.Fragment key={index}>
          {index > 0 ? ' ' : null}
          {isHighlighted ? (
            <span className="text-cube-green">{word}</span>
          ) : (
            word
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Component className={cn('text-h2', className)}>{renderContent()}</Component>
  );
}

// 3. SectionIntro - supporting paragraph text
export interface SectionIntroProps {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left';
  width?: 'narrow' | 'standard';
}

const sectionIntroWidthClasses = {
  narrow: 'max-w-narrow',
  standard: 'max-w-standard',
};

export function SectionIntro({
  children,
  className,
  align = 'center',
  width = 'narrow',
}: SectionIntroProps) {
  return (
    <p
      className={cn(
        'text-body-lg text-muted-foreground',
        sectionIntroWidthClasses[width],
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {children}
    </p>
  );
}

// 4. SectionDivider - small decorative mark
export interface SectionDividerProps {
  color?: 'green' | 'blue';
  className?: string;
}

const dividerBarClasses = {
  green: 'bg-cube-green',
  blue: 'bg-cube-blue',
};

const dividerDotClasses = {
  green: 'bg-cube-green-bright',
  blue: 'bg-cube-blue',
};

export function SectionDivider({ color = 'green', className }: SectionDividerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)} aria-hidden="true">
      <div className={cn('h-1 w-10 rounded-full', dividerBarClasses[color])} />
      <div className={cn('h-1.5 w-1.5 rounded-full', dividerDotClasses[color])} />
    </div>
  );
}

// 5. PageTitleBlock - page header with breadcrumbs and actions
export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageTitleBlockProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageTitleBlock({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageTitleBlockProps) {
  return (
    <div className={cn('max-w-narrow', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-muted-foreground/60">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {eyebrow && <Eyebrow className="mb-3 block">{eyebrow}</Eyebrow>}

      <h1 className="text-h1">{title}</h1>

      {description && (
        <p className="mt-4 text-body-lg text-muted-foreground">{description}</p>
      )}

      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
