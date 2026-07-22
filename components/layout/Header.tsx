'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Menu, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig, headerNav, headerCta, solutionsMenuFooterCta } from '@/config/site';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type DropdownChild = {
  label: string;
  href: string;
  description?: string;
};

type DropdownNavItem = {
  label: string;
  href: string;
  children?: readonly DropdownChild[];
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* -------------------------------------------------------------------------- */
/*  UtilityBar                                                                 */
/* -------------------------------------------------------------------------- */

function UtilityBar() {
  return (
    <div className="hidden lg:flex bg-cube-navy text-white/80">
      <div className="container flex h-9 items-center justify-between text-xs">
        <span className="truncate">
          Practical QHSE and Workplace Improvement
        </span>
        <div className="flex items-center gap-5">
          <Link href={siteConfig.contact.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone className="h-3 w-3" aria-hidden="true" />
            <span>{siteConfig.contact.phone}</span>
          </Link>
          <Link href={siteConfig.contact.emailHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Mail className="h-3 w-3" aria-hidden="true" />
            <span>{siteConfig.contact.email}</span>
          </Link>
          <Link href={siteConfig.contact.whatsappHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            <span>WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  LogoMark                                                                   */
/* -------------------------------------------------------------------------- */

function LogoMark() {
  return (
    <Link href="/" aria-label="SAFE CUBE - Home" className="flex items-center gap-2">
      <span className="rounded-md bg-cube-navy p-1.5">
        <span className="grid grid-cols-2 gap-px">
          <span className="h-2 w-2 rounded-[1px] bg-cube-green lg:h-2.5 lg:w-2.5" />
          <span className="h-2 w-2 rounded-[1px] bg-white/30 lg:h-2.5 lg:w-2.5" />
          <span className="h-2 w-2 rounded-[1px] bg-white/30 lg:h-2.5 lg:w-2.5" />
          <span className="h-2 w-2 rounded-[1px] bg-cube-green lg:h-2.5 lg:w-2.5" />
        </span>
      </span>
      <span className="font-bold tracking-tight text-cube-navy text-base lg:text-lg">
        SAFE CUBE
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  PortalDropdown — portal-based dropdown that escapes all parent clipping  */
/* -------------------------------------------------------------------------- */

function PortalDropdown({
  isOpen,
  triggerRef,
  children,
  align = 'start',
  widthClass,
}: {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  align?: 'start' | 'end';
  widthClass: string;
}) {
  const [coords, setCoords] = useState<{ top: number; left: number; right: number } | null>(null);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 4,
      left: rect.left,
      right: window.innerWidth - rect.right,
    });
  }, [isOpen, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;
    const update = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 4, left: rect.left, right: window.innerWidth - rect.right });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isOpen, triggerRef]);

  if (!isOpen || typeof document === 'undefined') return null;

  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    top: `${coords?.top ?? 0}px`,
    zIndex: 9999,
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto',
  };

  if (align === 'end') {
    positionStyle.right = `${coords?.right ?? 0}px`;
  } else {
    positionStyle.left = `${coords?.left ?? 0}px`;
  }

  return createPortal(
    <div
      className={cn(
        'rounded-lg border border-cube-soft bg-white py-2 shadow-overlay',
        widthClass
      )}
      style={positionStyle}
      role="menu"
    >
      {children}
    </div>,
    document.body
  );
}

/* -------------------------------------------------------------------------- */
/*  DropdownLink                                                               */
/* -------------------------------------------------------------------------- */

function DropdownLink({
  child,
  onNavigate,
  active,
}: {
  child: DropdownChild;
  onNavigate: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={child.href}
      onClick={onNavigate}
      role="menuitem"
      className={cn(
        'block rounded-md px-4 py-2 hover:bg-cube-soft transition-colors',
        active && 'bg-cube-soft'
      )}
    >
      <span className={cn('block text-sm font-medium text-cube-navy', active && 'text-cube-green')}>
        {child.label}
      </span>
      {child.description && (
        <span className="block text-xs text-muted-foreground mt-0.5">
          {child.description}
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header (default export)                                                    */
/* -------------------------------------------------------------------------- */

export function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverOpenedRef = useRef<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const dropdownTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* Focus trap (mobile) */
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const handle = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener('keydown', handle);
    return () => drawer.removeEventListener('keydown', handle);
  }, [mobileOpen]);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Body scroll lock (mobile) */
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
    return;
  }, [mobileOpen]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (mobileOpen) {
        setMobileOpen(false);
      } else if (openDropdown) {
        setOpenDropdown(null);
        hoverOpenedRef.current = null;
        const trigger = dropdownTriggerRefs.current[openDropdown];
        if (trigger) trigger.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, openDropdown]);

  /* Click-outside (desktop) */
  useEffect(() => {
    if (!openDropdown) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const trigger = dropdownTriggerRefs.current[openDropdown];
      if (trigger && trigger.contains(target)) return;
      if (navRef.current && navRef.current.contains(target)) return;
      const portal = document.querySelector('[role="menu"]');
      if (portal && portal.contains(target)) return;
      setOpenDropdown(null);
      hoverOpenedRef.current = null;
    };
    const id = window.setTimeout(() => {
      document.addEventListener('mousedown', onClick);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('mousedown', onClick);
    };
  }, [openDropdown]);

  /* Focus return on mobile close */
  useEffect(() => {
    if (!mobileOpen && menuButtonRef.current) {
      if (document.activeElement !== menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }
  }, [mobileOpen]);

  /* Close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    hoverOpenedRef.current = null;
    setMobileAccordion(null);
  }, [pathname]);

  /* Dropdown helpers */
  const clearHoverTimeout = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  const openDropdownByHover = useCallback((label: string) => {
    clearHoverTimeout();
    hoverOpenedRef.current = label;
    setOpenDropdown(label);
  }, [clearHoverTimeout]);

  const scheduleHoverClose = useCallback(() => {
    clearHoverTimeout();
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      hoverOpenedRef.current = null;
    }, 120);
  }, [clearHoverTimeout]);

  const handleTriggerClick = useCallback((label: string) => {
    clearHoverTimeout();
    if (hoverOpenedRef.current === label) {
      hoverOpenedRef.current = null;
      return;
    }
    setOpenDropdown((current) => (current === label ? null : label));
  }, [clearHoverTimeout]);

  const closeDropdown = useCallback(() => {
    clearHoverTimeout();
    setOpenDropdown(null);
    hoverOpenedRef.current = null;
  }, [clearHoverTimeout]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobileAccordion = useCallback((label: string) => {
    setMobileAccordion((current) => (current === label ? null : label));
  }, []);

  const navItems = headerNav as unknown as DropdownNavItem[];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow">
      <UtilityBar />

      <div
        className={cn(
          'container flex items-center justify-between gap-4 transition-all',
          scrolled ? 'h-14' : 'h-16'
        )}
      >
        <LogoMark />

        {/* Desktop nav */}
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-0.5"
          onMouseLeave={scheduleHoverClose}
        >
          {navItems.map((item) => {
            if (!item.children || item.children.length === 0) {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'text-cube-green font-semibold'
                      : 'text-cube-navy hover:text-cube-green'
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const dropdownId = `dropdown-${slugify(item.label)}`;
            const isOpen = openDropdown === item.label;
            const parentActive = item.href !== '/' && isActive(pathname, item.href);
            const children = item.children;

            const isIndustries = item.label === 'Industries';
            const isSolutions = item.label === 'Solutions';
            const isRightAligned = item.label === 'Cube Store';

            const widthClass = isSolutions
              ? 'w-[800px] max-w-[calc(100vw-2rem)]'
              : isIndustries
                ? 'w-[720px] max-w-[calc(100vw-2rem)]'
                : 'w-[420px] max-w-[calc(100vw-2rem)]';

            const industriesChildren = isIndustries ? [...children] : [];
            const viewAllIndustries = isIndustries ? industriesChildren[0] : null;
            const industriesGridItems = isIndustries ? industriesChildren.slice(1) : [];

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => openDropdownByHover(item.label)}
                onMouseLeave={scheduleHoverClose}
              >
                <button
                  ref={(el) => { dropdownTriggerRefs.current[item.label] = el; }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={dropdownId}
                  onClick={() => handleTriggerClick(item.label)}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isOpen || parentActive
                      ? 'text-cube-green font-semibold'
                      : 'text-cube-navy hover:text-cube-green'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>

                <PortalDropdown
                  isOpen={isOpen}
                  triggerRef={{ current: dropdownTriggerRefs.current[item.label] }}
                  align={isRightAligned ? 'end' : 'start'}
                  widthClass={widthClass}
                >
                  {isIndustries ? (
                    <>
                      <div className="grid grid-cols-2 gap-1 px-2 xl:grid-cols-3">
                        {industriesGridItems.map((child) => (
                          <DropdownLink
                            key={child.href}
                            child={child}
                            onNavigate={closeDropdown}
                            active={isActive(pathname, child.href)}
                          />
                        ))}
                      </div>
                      {viewAllIndustries && (
                        <div className="border-t border-cube-soft mt-2 px-4 pt-2">
                          <Link
                            href={viewAllIndustries.href}
                            onClick={closeDropdown}
                            className="block rounded-md px-2 py-1.5 text-sm font-semibold text-cube-green hover:bg-cube-soft"
                          >
                            {viewAllIndustries.label}
                          </Link>
                        </div>
                      )}
                    </>
                  ) : isSolutions ? (
                    <>
                      <div className="grid grid-flow-col grid-rows-5 gap-x-4 gap-y-1 px-2">
                        {children.map((child) => (
                          <DropdownLink
                            key={child.href}
                            child={child}
                            onNavigate={closeDropdown}
                            active={isActive(pathname, child.href)}
                          />
                        ))}
                      </div>
                      <div className="border-t border-cube-soft mt-2 px-4 pt-3">
                        <p className="text-xs text-muted-foreground">
                          {solutionsMenuFooterCta.text}
                        </p>
                        <Link
                          href={solutionsMenuFooterCta.buttonHref}
                          onClick={closeDropdown}
                          className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-cube-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
                        >
                          {solutionsMenuFooterCta.buttonLabel}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {children.map((child) => (
                        <DropdownLink
                          key={child.href}
                          child={child}
                          onNavigate={closeDropdown}
                          active={isActive(pathname, child.href)}
                        />
                      ))}
                    </>
                  )}
                </PortalDropdown>
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href={headerCta.href}
            className="hidden lg:inline-flex items-center justify-center rounded-md bg-cube-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
          >
            {headerCta.label}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-cube-navy transition-colors hover:bg-cube-soft"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-cube-navy/40" onClick={closeMobile} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            ref={drawerRef}
            className="fixed right-0 top-0 flex h-full w-[320px] max-w-[85vw] flex-col bg-white shadow-overlay"
          >
            <div className="flex items-center justify-between border-b border-cube-soft p-4">
              <LogoMark />
              <button
                type="button"
                aria-label="Close menu"
                aria-expanded={false}
                onClick={closeMobile}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-cube-navy transition-colors hover:bg-cube-soft"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <Link
                href="/cube-score"
                onClick={closeMobile}
                className="mb-4 inline-flex w-full items-center justify-center rounded-md bg-cube-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
              >
                {headerCta.label}
              </Link>

              <nav aria-label="Mobile navigation" className="space-y-1">
                {navItems.map((item) => {
                  if (!item.children || item.children.length === 0) {
                    const active = isActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                          active
                            ? 'bg-cube-soft text-cube-green font-semibold'
                            : 'text-cube-navy hover:bg-cube-soft'
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  const expanded = mobileAccordion === item.label;
                  const parentActive = item.href !== '/' && isActive(pathname, item.href);

                  return (
                    <div key={item.href}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => toggleMobileAccordion(item.label)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                          expanded || parentActive
                            ? 'text-cube-green font-semibold'
                            : 'text-cube-navy hover:bg-cube-soft'
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')}
                          aria-hidden="true"
                        />
                      </button>

                      {expanded && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l border-cube-soft pl-4">
                          {item.children.map((child) => {
                            const active = isActive(pathname, child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeMobile}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                  'block rounded-md px-3 py-2 text-sm transition-colors',
                                  active
                                    ? 'text-cube-green font-semibold'
                                    : 'text-cube-navy hover:text-cube-green'
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-cube-soft p-4 space-y-3">
              <Link href={siteConfig.contact.phoneHref} className="flex items-center gap-2 text-sm text-cube-navy transition-colors hover:text-cube-green">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </Link>
              <Link href={siteConfig.contact.emailHref} className="flex items-center gap-2 text-sm text-cube-navy transition-colors hover:text-cube-green">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{siteConfig.contact.email}</span>
              </Link>
              <Link href={siteConfig.contact.whatsappHref} className="flex items-center gap-2 text-sm text-cube-navy transition-colors hover:text-cube-green">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
