/**
 * SAFE CUBE — Server Actions for Form Submissions
 *
 * Handles all public form submissions with:
 * - Zod validation (server-side)
 * - Turnstile verification (server-side)
 * - Secure database insertion via anon client (RLS-enforced)
 * - Email notification via edge function (non-blocking)
 * - Safe error handling
 */

'use server';

import { createClient } from '@supabase/supabase-js';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { env } from '@/lib/env';
import { notifyAdmin, sendUserConfirmation } from '@/lib/email';
import {
  contactSchema, consultationSchema, cubeScoreSchema, safeSnapSchema,
  cubeInsightSchema, cubeCareSchema, trainingRequestSchema, isoSupportSchema,
  productQuoteSchema, storeLaunchSchema, newsletterSchema,
} from '@/lib/validations';
import type { LeadStatus } from '@/types/database';

export type FormResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function formatZodErrors(error: import('zod').ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!errors[key]) errors[key] = [];
    errors[key].push(issue.message);
  }
  return errors;
}

function getSupabase() {
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function checkHoneypot(formData: FormData): boolean {
  const hp = formData.get('company_website');
  return typeof hp === 'string' && hp.length > 0;
}

async function sendNotifications(
  formType: string,
  data: { name: string; email: string; phone?: string | null; company?: string | null; message?: string | null; extraFields?: Record<string, string | string[] | null> }
): Promise<void> {
 await notifyAdmin({ formType, ...data });
 await sendUserConfirmation(data.email, formType).catch(() => {});
}

// ── Contact Form ──────────────────────────────────────────────────────────────

export async function submitContactForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your message.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('contact_submissions').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/contact',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Contact Form', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { subject: parsed.data.subject ?? null } });
  return { success: true, message: 'Thank you for contacting SAFE CUBE. We will respond within one business day.' };
}

// ── Consultation Form ─────────────────────────────────────────────────────────

export async function submitConsultationForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you. We will contact you shortly.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    preferred_date: formData.get('preferred_date'),
    preferred_time: formData.get('preferred_time'),
    service_interest: formData.get('service_interest'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = consultationSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('consultation_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/book-consultation',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Consultation Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { preferred_date: parsed.data.preferred_date ?? null, preferred_time: parsed.data.preferred_time ?? null, service_interest: parsed.data.service_interest ?? null } });
  return { success: true, message: 'Your consultation request has been received. We will contact you within one business day to confirm your appointment.' };
}

// ── CUBE SCORE Form ───────────────────────────────────────────────────────────

export async function submitCubeScoreForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    industry: formData.get('industry'),
    employee_count: formData.get('employee_count'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = cubeScoreSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('cube_score_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/cube-score',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Cube Score Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { industry: parsed.data.industry ?? null, employee_count: parsed.data.employee_count ?? null } });
  return { success: true, message: 'Your free CUBE SCORE request has been received. We will contact you within one business day to schedule your assessment.' };
}

// ── SAFE SNAP Form ────────────────────────────────────────────────────────────

export async function submitSafeSnapForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    location: formData.get('location'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = safeSnapSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('safe_snap_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/solutions/safe-snap',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Safe Snap Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { location: parsed.data.location ?? null } });
  return { success: true, message: 'Your SAFE SNAP request has been received. We will contact you within one business day.' };
}

// ── CUBE INSIGHT Form ─────────────────────────────────────────────────────────

export async function submitCubeInsightForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    industry: formData.get('industry'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = cubeInsightSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('cube_insight_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/solutions/cube-insight',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Cube Insight Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { industry: parsed.data.industry ?? null } });
  return { success: true, message: 'Your CUBE INSIGHT request has been received. We will contact you within one business day.' };
}

// ── CUBE CARE Form ─────────────────────────────────────────────────────────────

export async function submitCubeCareForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    service_areas: formData.getAll('service_areas'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = cubeCareSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('cube_care_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/solutions/cube-care',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Cube Care Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { service_areas: parsed.data.service_areas ?? null } });
  return { success: true, message: 'Your CUBE CARE request has been received. We will contact you within one business day.' };
}

// ── Training Request Form ──────────────────────────────────────────────────────

export async function submitTrainingRequestForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    training_program: formData.get('training_program'),
    group_size: formData.get('group_size'),
    preferred_location: formData.get('preferred_location'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = trainingRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('training_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/training',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Training Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { training_program: parsed.data.training_program ?? null, group_size: parsed.data.group_size ?? null, preferred_location: parsed.data.preferred_location ?? null } });
  return { success: true, message: 'Your training enquiry has been received. We will contact you within one business day.' };
}

// ── ISO Support Form ───────────────────────────────────────────────────────────

export async function submitIsoSupportForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    iso_standard: formData.get('iso_standard'),
    current_status: formData.get('current_status'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = isoSupportSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('iso_support_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/solutions/iso-management-systems',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('ISO Support Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { iso_standard: parsed.data.iso_standard ?? null, current_status: parsed.data.current_status ?? null } });
  return { success: true, message: 'Your ISO support request has been received. We will contact you within one business day.' };
}

// ── Product Quote Form ──────────────────────────────────────────────────────────

export async function submitProductQuoteForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for your request.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    product_interests: formData.getAll('product_interests'),
    message: formData.get('message'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = productQuoteSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('product_quote_requests').insert({
    ...parsed.data,
    status: 'new' as LeadStatus,
    source_page: '/store',
  });

  if (error) {
    return { success: false, message: 'Something went wrong. Please try again or contact us directly.' };
  }

  sendNotifications('Product Quote Request', { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone, company: parsed.data.company, message: parsed.data.message, extraFields: { product_interests: parsed.data.product_interests ?? null } });
  return { success: true, message: 'Your product quotation request has been received. We will contact you within one business day.' };
}

// ── Store Launch Notification ───────────────────────────────────────────────────

export async function submitStoreLaunchForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you. We will notify you when the store launches.' };
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    business_name: formData.get('business_name'),
    product_interests: formData.getAll('product_interests'),
  };

  const parsed = storeLaunchSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('store_launch_subscribers').insert({
    ...parsed.data,
    notified: false,
  });

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'You are already subscribed for Cube Store launch notifications.' };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }

  sendNotifications('Store Launch Notification', { name: parsed.data.name, email: parsed.data.email, extraFields: { business_name: parsed.data.business_name ?? null, product_interests: parsed.data.product_interests ?? null } });
  return { success: true, message: 'Thank you! We will notify you when the Cube Store launches.' };
}

// ── Newsletter Subscription ─────────────────────────────────────────────────────

export async function submitNewsletterForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
  if (checkHoneypot(formData)) return { success: true, message: 'Thank you for subscribing.' };
  const rawData = {
    email: formData.get('email'),
    name: formData.get('name'),
    consent: formData.get('consent') === 'true',
  };

  const parsed = newsletterSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: 'Please fix the errors below.', errors: formatZodErrors(parsed.error) };
  }

  const turnstileToken = formData.get('turnstile-token') as string;
  const turnstileOk = await verifyTurnstileToken(turnstileToken);
  if (!turnstileOk) {
    return { success: false, message: 'Spam verification failed. Please try again.', errors: { turnstile: ['Verification failed'] } };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: parsed.data.email,
    name: parsed.data.name || null,
    consent: parsed.data.consent,
    status: 'new' as LeadStatus,
  });

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'You are already subscribed to our newsletter.' };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }

  sendNotifications('Newsletter Subscription', { name: parsed.data.name ?? 'Subscriber', email: parsed.data.email });
  return { success: true, message: 'You have been subscribed to the SAFE CUBE newsletter.' };
}
