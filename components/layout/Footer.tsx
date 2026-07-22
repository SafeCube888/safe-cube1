'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Facebook, Instagram, Youtube, Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import {
  siteConfig,
  footerColumns,
  footerCta,
  footerLegalLinks,
  footerDisclaimer,
} from '@/config/site';

const socialIcons = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
} as const;

const ctaHiddenRoutes = [
  '/checkout',
  '/order-confirmation',
  '/admin',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/disclaimer',
  '/refund-return-policy',
  '/shipping-policy',
  '/admin/login',
  '/cart',
];

function shouldShowCta(pathname: string | null): boolean {
  if (!pathname) return true;
  return !ctaHiddenRoutes.some((route) =>
    route === '/admin' ? pathname.startsWith(route) : pathname === route
  );
}

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const showCta = shouldShowCta(pathname);

  return (
    <footer className="bg-cube-navy text-white">
      {showCta && (
        <section className="bg-cube-navy">
          <div className="container py-12 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-white lg:text-3xl">
                {footerCta.heading}
              </h2>
              <p className="mt-4 text-base text-white/80 lg:text-lg">
                {footerCta.text}
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <Link
                  href={footerCta.primaryHref}
                  className="rounded-md bg-cube-green px-6 py-3 text-sm font-semibold text-white hover:bg-cube-green-dark transition-colors"
                >
                  {footerCta.primaryLabel}
                </Link>
                <Link
                  href={footerCta.secondaryHref}
                  className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {footerCta.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-px rounded-md bg-white p-1.5">
                <div className="h-2 w-2 rounded-[1px] bg-cube-green" />
                <div className="h-2 w-2 rounded-[1px] bg-white/30" />
                <div className="h-2 w-2 rounded-[1px] bg-white/30" />
                <div className="h-2 w-2 rounded-[1px] bg-cube-green" />
              </div>
              <span className="text-lg font-bold text-white">SAFE CUBE</span>
            </div>
            <p className="mt-3 text-sm font-medium text-cube-green-bright">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 text-sm text-white/60">
              SAFE CUBE helps organizations protect people, reduce workplace risks, improve operational systems, strengthen compliance, and build a culture of continual improvement.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white">
                {column.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-cube-green-bright transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cube-green-bright" />
            <div>
              <p className="text-xs font-medium text-white/40">Phone</p>
              <a
                href={siteConfig.contact.phoneHref}
                className="text-sm text-white/80 hover:text-cube-green-bright transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-cube-green-bright" />
            <div>
              <p className="text-xs font-medium text-white/40">WhatsApp</p>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-cube-green-bright transition-colors"
              >
                {siteConfig.contact.whatsapp}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cube-green-bright" />
            <div>
              <p className="text-xs font-medium text-white/40">Email</p>
              <a
                href={siteConfig.contact.emailHref}
                className="text-sm text-white/80 hover:text-cube-green-bright transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cube-green-bright" />
            <div>
              <p className="text-xs font-medium text-white/40">Office</p>
              <p className="text-sm text-white/80">{siteConfig.contact.office}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cube-green-bright" />
          <div>
            <p className="text-xs font-medium text-white/40">Hours</p>
            <p className="text-sm text-white/80">{siteConfig.contact.hours}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {(['linkedin', 'facebook', 'instagram', 'youtube'] as const).map((platform) => {
            const url = siteConfig.social[platform];
            if (!url) return null;
            const Icon = socialIcons[platform];
            return (
              <Link
                key={platform}
                href={url}
                aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 hover:border-cube-green-bright hover:text-cube-green-bright transition-colors"
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 bg-cube-navy">
        <div className="container py-6">
          <p className="text-xs text-white/40">{footerDisclaimer}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {year} SAFE CUBE. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 hover:text-cube-green-bright transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
