'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronDown, Menu, X, ChevronRight } from 'lucide-react';

// ---------------------------------------------------------------------------
// 1. NavLink
// ---------------------------------------------------------------------------
export interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function NavLink({
  href,
  label,
  active = false,
  className,
  children,
}: NavLinkProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!children) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [children]);

  if (children) {
    return (
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          onBlur={(event) => {
            // Close if focus leaves the container entirely
            const next = event.relatedTarget as Node | null;
            if (
              containerRef.current &&
              next &&
              !containerRef.current.contains(next)
            ) {
              setOpen(false);
            }
          }}
          aria-expanded={open}
          aria-haspopup="true"
          className={cn(
            'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
            active
              ? 'text-cube-green'
              : 'text-cube-navy hover:text-cube-green',
            className,
          )}
        >
          {label}
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full w-64 rounded-lg border border-cube-soft bg-white py-2 shadow-overlay">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'px-3 py-2 text-sm font-medium rounded-md transition-colors',
        active
          ? 'text-cube-green'
          : 'text-cube-navy hover:text-cube-green',
        className,
      )}
    >
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// 2. DropdownMenu
// ---------------------------------------------------------------------------
export interface DropdownMenuItem {
  label: string;
  href: string;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
  align?: 'left' | 'right';
}

export function DropdownMenu({
  trigger,
  items,
  className,
  align = 'left',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute top-full mt-2 min-w-[200px] rounded-lg border border-cube-soft bg-white py-2 shadow-overlay',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-muted-foreground hover:bg-cube-soft hover:text-cube-green"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. MegaMenuSection
// ---------------------------------------------------------------------------
export interface MegaMenuSectionProps {
  title: string;
  items: DropdownMenuItem[];
  className?: string;
}

export function MegaMenuSection({
  title,
  items,
  className,
}: MegaMenuSectionProps) {
  return (
    <div className={className}>
      <h3 className="text-xs font-semibold text-cube-navy uppercase tracking-wider mb-2">
        {title}
      </h3>
      <ul className="space-y-0">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block py-1.5 text-sm text-muted-foreground hover:text-cube-green"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. MobileAccordionMenu
// ---------------------------------------------------------------------------
export interface MobileAccordionChild {
  label: string;
  href: string;
}

export interface MobileAccordionItem {
  label: string;
  href: string;
  children?: MobileAccordionChild[];
}

export interface MobileAccordionMenuProps {
  items: MobileAccordionItem[];
  className?: string;
}

export function MobileAccordionMenu({
  items,
  className,
}: MobileAccordionMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className={cn('flex flex-col', className)}>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openIndex === index;

        if (hasChildren) {
          return (
            <div key={item.href}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-cube-navy hover:bg-cube-soft"
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="ml-3 border-l border-cube-soft pl-3">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenIndex(null)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-cube-soft hover:text-cube-green"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-cube-navy hover:bg-cube-soft"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// 5. Breadcrumb
// ---------------------------------------------------------------------------
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-cube-green">
                  {item.label}
                </Link>
              ) : (
                <span className="text-cube-navy">{item.label}</span>
              )}

              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-3 w-3 text-cube-soft"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// 6. FooterLinkGroup
// ---------------------------------------------------------------------------
export interface FooterLinkGroupProps {
  title: string;
  links: DropdownMenuItem[];
  className?: string;
}

export function FooterLinkGroup({
  title,
  links,
  className,
}: FooterLinkGroupProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-cube-navy">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-cube-green transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. UtilityLink
// ---------------------------------------------------------------------------
export interface UtilityLinkProps {
  href: string;
  label: string;
  className?: string;
  active?: boolean;
}

export function UtilityLink({
  href,
  label,
  className,
  active = false,
}: UtilityLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm transition-colors',
        active
          ? 'text-cube-green'
          : 'text-muted-foreground hover:text-cube-green',
        className,
      )}
    >
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// 8. SkipToContentLink
// ---------------------------------------------------------------------------
export interface SkipToContentLinkProps {
  href?: string;
  className?: string;
}

export function SkipToContentLink({
  href = '#main-content',
  className,
}: SkipToContentLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cube-navy focus:px-4 focus:py-2 focus:text-white',
        className,
      )}
    >
      Skip to main content
    </a>
  );
}
