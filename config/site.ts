/**
 * SAFE CUBE — Centralized Brand & Site Configuration
 *
 * Single source of truth for company identity, contact details, navigation,
 * SEO defaults, and brand colours. Imported across the app.
 *
 * Placeholder values ([PHONE NUMBER] etc.) are intentional per the master
 * brief and must be replaced with real values before production launch.
 */

import type { NavItem } from '@/types/content';

export const siteConfig = {
  name: 'SAFE CUBE',
  tagline: 'Strengthening Every Side of Your Business.',
  positioning:
    'SAFE CUBE is a workplace improvement and QHSE support company that helps businesses protect people, identify risks, improve operational systems, strengthen compliance, and build sustainable workplace practices.',
  primaryMarket: 'Pakistan — Islamabad, Rawalpindi, and surrounding regions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://safecube.example',

  contact: {
    phone: '[PHONE NUMBER]',
    phoneHref: 'tel:+920000000000',
    whatsapp: '[WHATSAPP NUMBER]',
    whatsappHref: 'https://wa.me/920000000000',
    email: '[EMAIL ADDRESS]',
    emailHref: 'mailto:info@safecube.example',
    office: '[OFFICE ADDRESS, RAWALPINDI/ISLAMABAD, PAKISTAN]',
    hours: '[OFFICE HOURS]',
    companyRegistration: '[COMPANY REGISTRATION NUMBER]',
  },

  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  seo: {
    defaultTitle: 'SAFE CUBE | Workplace Safety, QHSE and Compliance Solutions',
    defaultDescription:
      'SAFE CUBE helps businesses protect people, reduce workplace risks, improve systems, strengthen compliance, and build safer, more resilient operations through practical QHSE solutions.',
    ogImage: '/og-image.png',
  },

  colors: {
    deepNavy: '#00163E',
    primaryGreen: '#5E9400',
    brightGreenAccent: '#7AA800',
    darkGreen: '#3F7A00',
    secondaryBlue: '#0B4F96',
    softBackground: '#F5F8FA',
    white: '#FFFFFF',
    darkText: '#111827',
    mutedText: '#4B5563',
    lightBorder: '#E1E7ED',
    warningAmber: '#F4A000',
    criticalRed: '#C62828',
    successGreen: '#278B3D',
  },

  cubeSides: [
    'Occupational Health',
    'Workplace Safety',
    'Environment',
    'Quality',
    'Compliance',
    'Management Systems',
  ] as const,

  serviceJourney: [
    'SAFE SNAP',
    'CUBE SCORE',
    'CUBE INSIGHT',
    'CUBE CARE',
    'SAFE CUBE TRAINING',
    'CUBE STORE',
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;

export type NavChildWithDescription = {
  label: string;
  href: string;
  description?: string;
  children?: readonly NavChildWithDescription[];
};

export const headerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Solutions Overview', href: '/solutions', description: "Explore SAFE CUBE\u2019s complete workplace-improvement journey." },
      { label: 'SAFE SNAP', href: '/solutions/safe-snap', description: 'A quick professional workplace observation.' },
      { label: 'CUBE SCORE', href: '/cube-score', description: 'A high-level workplace-readiness assessment.' },
      { label: 'CUBE INSIGHT', href: '/solutions/cube-insight', description: 'A detailed workplace assessment and improvement roadmap.' },
      { label: 'CUBE CARE', href: '/solutions/cube-care', description: 'Ongoing support for implementation and continual improvement.' },
      { label: 'SAFE CUBE TRAINING', href: '/training', description: 'Practical workplace training for employees and management.' },
      { label: 'ISO & Management Systems', href: '/solutions/iso-management-systems', description: 'Support for ISO-aligned systems and certification readiness.' },
      { label: 'Risk Assessment & Workplace Audits', href: '/solutions/risk-assessment-audits', description: 'Structured reviews to identify hazards, gaps, and priorities.' },
      { label: 'Documentation & Compliance Support', href: '/solutions/documentation-compliance', description: 'Practical policies, procedures, registers, and compliance systems.' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'View All Industries', href: '/industries', description: 'Explore industry-specific risks, assessments, training, and improvement support.' },
      { label: 'Restaurants & Food Service', href: '/industries/restaurants' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Construction', href: '/industries/construction' },
      { label: 'Warehouses', href: '/industries/warehouses' },
      { label: 'Engineering Workshops', href: '/industries/engineering-workshops' },
      { label: 'Power & Utilities', href: '/industries/power-utilities' },
      { label: 'Corporate Offices', href: '/industries/corporate-offices' },
      { label: 'Educational Institutions', href: '/industries/education' },
      { label: 'Hospitality', href: '/industries/hospitality' },
      { label: 'Automotive Workshops', href: '/industries/automotive-workshops' },
      { label: 'Logistics & Transport', href: '/industries/logistics-transport' },
    ],
  },
  {
    label: 'Knowledge Centre',
    href: '/knowledge-centre',
    children: [
      { label: 'Knowledge Centre Overview', href: '/knowledge-centre' },
      { label: 'Articles', href: '/knowledge-centre/articles' },
      { label: 'Guides & Checklists', href: '/knowledge-centre/guides' },
      { label: 'Downloads', href: '/knowledge-centre/downloads' },
      { label: 'Frequently Asked Questions', href: '/faqs' },
      { label: 'Workplace Safety Glossary', href: '/knowledge-centre/glossary', description: 'Clear explanations of common QHSE, safety, compliance, and management-system terms.' },
    ],
  },
  {
    label: 'Cube Store',
    href: '/store',
    children: [
      { label: 'Store Overview', href: '/store' },
      { label: 'Personal Protective Equipment', href: '/store/category/ppe' },
      { label: 'Fire & Emergency Equipment', href: '/store/category/fire-emergency' },
      { label: 'First Aid Products', href: '/store/category/first-aid' },
      { label: 'Safety Signage', href: '/store/category/signage' },
      { label: 'Spill Control', href: '/store/category/spill-control' },
      { label: 'Inspection & Monitoring Equipment', href: '/store/category/inspection-monitoring' },
      { label: 'Workplace Safety Kits', href: '/store/category/safety-kits' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const headerCta = {
  label: 'GET FREE CUBE SCORE',
  href: '/cube-score',
};

export const solutionsMenuFooterCta = {
  text: 'Not sure where to begin?',
  buttonLabel: 'GET FREE CUBE SCORE',
  buttonHref: '/cube-score',
};

export const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About SAFE CUBE', href: '/about' },
      { label: 'How We Work', href: '/solutions' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a Consultation', href: '/book-consultation' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'SAFE SNAP', href: '/solutions/safe-snap' },
      { label: 'CUBE SCORE', href: '/cube-score' },
      { label: 'CUBE INSIGHT', href: '/solutions/cube-insight' },
      { label: 'CUBE CARE', href: '/solutions/cube-care' },
      { label: 'SAFE CUBE TRAINING', href: '/training' },
      { label: 'ISO & Management Systems', href: '/solutions/iso-management-systems' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Restaurants', href: '/industries/restaurants' },
      { label: 'Healthcare', href: '/industries/healthcare' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Construction', href: '/industries/construction' },
      { label: 'Warehouses', href: '/industries/warehouses' },
      { label: 'View All Industries', href: '/industries' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Knowledge Centre', href: '/knowledge-centre' },
      { label: 'Articles', href: '/knowledge-centre/articles' },
      { label: 'Guides & Checklists', href: '/knowledge-centre/guides' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Downloads', href: '/knowledge-centre/downloads' },
      { label: 'Cube Store', href: '/store' },
    ],
  },
] as const;

export const footerCta = {
  heading: 'Not Sure Where to Begin?',
  text: 'Start with a free CUBE SCORE and gain a clearer understanding of your workplace\u2019s current safety, compliance, and management readiness.',
  primaryLabel: 'GET FREE CUBE SCORE',
  primaryHref: '/cube-score',
  secondaryLabel: 'BOOK A CONSULTATION',
  secondaryHref: '/book-consultation',
};

export const footerLegalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Refund & Return Policy', href: '/refund-return-policy' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
] as const;

export const footerDisclaimer =
  'SAFE CUBE provides workplace assessment, advisory, training, documentation, implementation, and improvement support. Certification decisions and statutory approvals remain subject to the relevant accredited certification bodies and government authorities.';

export const isoDisclaimer =
  'SAFE CUBE provides advisory, implementation, training, internal-audit, and certification-readiness support. ISO certificates are issued only by appropriately accredited independent certification bodies.';

export const cubeScoreDisclaimer =
  'A CUBE SCORE is an indicative readiness overview based on the agreed assessment scope. It does not certify legal compliance and does not replace a detailed audit, technical inspection, risk assessment, or certification audit.';
