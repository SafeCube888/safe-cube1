/**
 * SAFE CUBE — Core Content Type Definitions
 *
 * Typed models for services, industries, articles, FAQs, downloads,
 * training programs, products, product categories, and global CTAs.
 * Structured data files in /content will conform to these interfaces.
 */

import type { LucideIcon } from 'lucide-react';

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  children?: readonly NavChild[];
};

export type NavItem = NavChild;

export type ServiceSlug =
  | 'safe-snap'
  | 'cube-score'
  | 'cube-insight'
  | 'cube-care'
  | 'training'
  | 'iso-management-systems'
  | 'risk-assessment-audits'
  | 'documentation-compliance';

export type Service = {
  slug: ServiceSlug;
  name: string;
  descriptor: string;
  summary: string;
  keyPoints: string[];
  ctaLabel: string;
  ctaHref: string;
  seoTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroText: string;
  sections?: ServiceSection[];
  iconName?: string;
};

export type ServiceSection = {
  heading: string;
  body?: string;
  listItems?: string[];
  cards?: Array<{ title: string; text: string }>;
  steps?: Array<{ title: string; text: string }>;
  cta?: { label: string; href: string };
};

export type IndustrySlug =
  | 'restaurants'
  | 'healthcare'
  | 'manufacturing'
  | 'construction'
  | 'warehouses'
  | 'engineering-workshops'
  | 'power-utilities'
  | 'corporate-offices'
  | 'education'
  | 'hospitality'
  | 'automotive-workshops'
  | 'logistics-transport';

export type Industry = {
  slug: IndustrySlug;
  name: string;
  shortName: string;
  cardSummary: string;
  seoTitle: string;
  metaDescription: string;
  heroHeading: string;
  introduction: string;
  commonRisks: string[];
  safeCubeSupport: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  iconName?: string;
  recommendedTraining?: string[];
};

export type ArticleCategory =
  | 'safety'
  | 'health'
  | 'environment'
  | 'quality'
  | 'compliance'
  | 'management'
  | 'training'
  | 'industry';

export type ArticleResourceType = 'article' | 'guide' | 'checklist' | 'faq';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  bodyMarkdown: string;
  category: ArticleCategory;
  industryTags?: IndustrySlug[];
  resourceType: ArticleResourceType;
  published: boolean;
  featured?: boolean;
  author?: string;
  coverImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
};

export type Faq = {
  question: string;
  answer: string;
  category?: string;
};

export type Download = {
  slug: string;
  title: string;
  description: string;
  fileUrl?: string;
  fileType: 'PDF' | 'XLSX' | 'DOCX' | 'ZIP';
  version?: string;
  lastUpdated?: string;
  category: string;
  requireEmail: boolean;
  published: boolean;
};

export type TrainingProgram = {
  id: string;
  title: string;
  category: string;
  description?: string;
  deliveryFormats?: string[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  description?: string;
  parentSlug?: string;
  sortOrder: number;
  imageUrl?: string;
  published: boolean;
};

export type Product = {
  slug: string;
  name: string;
  sku?: string;
  categorySlug: string;
  brand?: string;
  description: string;
  intendedUse?: string;
  keyFeatures: string[];
  specifications?: Record<string, string>;
  images: string[];
  availableSizes?: string[];
  availableColours?: string[];
  includedItems?: string[];
  usageLimitations?: string;
  careInstructions?: string;
  price: number | null;
  comparePrice?: number | null;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockQty?: number;
  published: boolean;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type CTA = {
  heading: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  note?: string;
  variant?: 'green' | 'navy' | 'soft';
};

export type CubeSide = {
  index: number;
  title: string;
  paragraph: string;
  iconName?: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  text: string;
};

export type Benefit = {
  title: string;
  text: string;
  iconName?: string;
};

export type IconMap = Record<string, LucideIcon>;
