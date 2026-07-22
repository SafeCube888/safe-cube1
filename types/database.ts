/**
 * SAFE CUBE — Database TypeScript Types
 *
 * Manually maintained types matching the Supabase schema.
 */

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'in_progress' | 'closed' | 'archived';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type AdminRole = 'super_admin' | 'content_editor';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminRoleRecord {
  id: string;
  user_id: string;
  role: AdminRole;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  phone: string | null;
  phone_href: string | null;
  whatsapp: string | null;
  whatsapp_href: string | null;
  email: string | null;
  email_href: string | null;
  office: string | null;
  hours: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  default_seo_title: string | null;
  default_seo_description: string | null;
  admin_notification_email: string | null;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface BaseLead {
  id: string;
  created_at: string;
  updated_at: string;
  status: LeadStatus;
  source_page: string | null;
  internal_notes: string | null;
}

export interface ContactSubmission extends BaseLead {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  consent: boolean;
}

export interface ConsultationRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  service_interest: string | null;
  message: string | null;
  consent: boolean;
}

export interface CubeScoreRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  employee_count: string | null;
  message: string | null;
  consent: boolean;
}

export interface SafeSnapRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string | null;
  message: string | null;
  consent: boolean;
}

export interface CubeInsightRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string | null;
  message: string | null;
  consent: boolean;
}

export interface CubeCareRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  service_areas: string[] | null;
  message: string | null;
  consent: boolean;
}

export interface TrainingRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  training_program: string | null;
  group_size: string | null;
  preferred_location: string | null;
  message: string | null;
  consent: boolean;
}

export interface IsoSupportRequest extends BaseLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  iso_standard: string | null;
  current_status: string | null;
  message: string | null;
  consent: boolean;
}

export interface ProductQuoteRequest extends BaseLead {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product_interests: string[] | null;
  message: string | null;
  consent: boolean;
}

export interface StoreLaunchSubscriber {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  business_name: string | null;
  product_interests: string[] | null;
  notified: boolean;
}

export interface NewsletterSubscriber {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  name: string | null;
  consent: boolean;
  status: LeadStatus;
}

export interface ArticleRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: ContentStatus;
  title: string;
  slug: string;
  excerpt: string | null;
  body_markdown: string | null;
  category_id: string | null;
  author: string | null;
  cover_image_url: string | null;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_by: string | null;
}

export interface ArticleCategoryRecord {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface DownloadRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: ContentStatus;
  title: string;
  slug: string;
  description: string | null;
  file_url: string | null;
  file_type: string | null;
  version: string | null;
  category: string | null;
  require_email: boolean;
  created_by: string | null;
}

export interface FaqRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: ContentStatus;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
}

export interface TrainingProgramRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: ContentStatus;
  title: string;
  category: string;
  description: string | null;
  delivery_formats: string[] | null;
  created_by: string | null;
}
