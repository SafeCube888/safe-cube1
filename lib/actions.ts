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

async function notifyEdgeFunction(type: string, data: Record<string, unknown>) {
  if (!env.supabaseUrl) return;
  try {
    const url = `${env.supabaseUrl}/functions/v1/send-notification`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data }),
    }).catch(() => {});
  } catch {
    // Email failures must not block database insertion
  }
}

// ── Contact Form ──────────────────────────────────────────────────────────────

export async function submitContactForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('contact', parsed.data);
  return { success: true, message: 'Thank you for contacting SAFE CUBE. We will respond within one business day.' };
}

// ── Consultation Form ─────────────────────────────────────────────────────────

export async function submitConsultationForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('consultation', parsed.data);
  return { success: true, message: 'Your consultation request has been received. We will contact you within one business day to confirm your appointment.' };
}

// ── CUBE SCORE Form ───────────────────────────────────────────────────────────

export async function submitCubeScoreForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('cube_score', parsed.data);
  return { success: true, message: 'Your free CUBE SCORE request has been received. We will contact you within one business day to schedule your assessment.' };
}

// ── SAFE SNAP Form ────────────────────────────────────────────────────────────

export async function submitSafeSnapForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('safe_snap', parsed.data);
  return { success: true, message: 'Your SAFE SNAP request has been received. We will contact you within one business day.' };
}

// ── CUBE INSIGHT Form ─────────────────────────────────────────────────────────

export async function submitCubeInsightForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('cube_insight', parsed.data);
  return { success: true, message: 'Your CUBE INSIGHT request has been received. We will contact you within one business day.' };
}

// ── CUBE CARE Form ─────────────────────────────────────────────────────────────

export async function submitCubeCareForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('cube_care', parsed.data);
  return { success: true, message: 'Your CUBE CARE request has been received. We will contact you within one business day.' };
}

// ── Training Request Form ──────────────────────────────────────────────────────

export async function submitTrainingRequestForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('training', parsed.data);
  return { success: true, message: 'Your training enquiry has been received. We will contact you within one business day.' };
}

// ── ISO Support Form ───────────────────────────────────────────────────────────

export async function submitIsoSupportForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('iso_support', parsed.data);
  return { success: true, message: 'Your ISO support request has been received. We will contact you within one business day.' };
}

// ── Product Quote Form ──────────────────────────────────────────────────────────

export async function submitProductQuoteForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  notifyEdgeFunction('product_quote', parsed.data);
  return { success: true, message: 'Your product quotation request has been received. We will contact you within one business day.' };
}

// ── Store Launch Notification ───────────────────────────────────────────────────

export async function submitStoreLaunchForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  return { success: true, message: 'Thank you! We will notify you when the Cube Store launches.' };
}

// ── Newsletter Subscription ─────────────────────────────────────────────────────

export async function submitNewsletterForm(prevState: FormResult, formData: FormData): Promise<FormResult> {
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

  return { success: true, message: 'You have been subscribed to the SAFE CUBE newsletter.' };
}
