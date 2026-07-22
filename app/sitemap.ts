import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { articles } from '@/content/articles';
import { industries } from '@/content/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.siteUrl;
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/cube-score`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/solutions/safe-snap`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/cube-insight`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/cube-care`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/iso-management-systems`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/risk-assessment-audits`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/documentation-compliance`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/training`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/knowledge-centre`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/knowledge-centre/articles`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/knowledge-centre/guides`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/knowledge-centre/downloads`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/knowledge-centre/glossary`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faqs`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/book-consultation`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/store`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund-return-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/shipping-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.published)
    .map((a) => ({
      url: `${baseUrl}/knowledge-centre/articles/${a.slug}`,
      lastModified: a.updatedAt ? new Date(a.updatedAt) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...industryPages, ...articlePages];
}
