/**
 * SAFE CUBE — Structured Data (JSON-LD) Schemas
 *
 * Generates schema.org JSON-LD for SEO: LocalBusiness, Service, FAQ,
 * Article, and Breadcrumb schemas.
 */

import { env } from './env';
import { siteConfig } from '@/config/site';
import { faqs } from '@/content/faqs';
import { services } from '@/content/services';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.seo.defaultDescription,
    url: env.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.office,
      addressLocality: 'Rawalpindi/Islamabad',
      addressCountry: 'PK',
    },
    areaServed: siteConfig.primaryMarket,
  };
}

export function serviceSchema(serviceSlug: string) {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: env.siteUrl,
    },
    areaServed: siteConfig.primaryMarket,
    url: `${env.siteUrl}/solutions/${service.slug}`,
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(article: {
  slug: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
  coverImageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Organization',
      name: article.author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: env.siteUrl,
    },
    datePublished: article.publishedAt,
    url: `${env.siteUrl}/knowledge-centre/articles/${article.slug}`,
    ...(article.coverImageUrl ? { image: article.coverImageUrl } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${env.siteUrl}${item.url}`,
    })),
  };
}

export function jsonLdScript(schema: Record<string, unknown>) {
  return {
    __html: JSON.stringify(schema),
  };
}
