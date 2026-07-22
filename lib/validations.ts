/**
 * SAFE CUBE — Zod Validation Schemas
 *
 * Shared schemas for all public form submissions.
 * Used for both client-side and server-side validation.
 */

import { z } from 'zod';

const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
const emailSchema = z.string().email('Please enter a valid email address');
const phoneOptional = z.string().regex(phoneRegex, 'Please enter a valid phone number').optional().or(z.literal(''));
const phoneRequired = z.string().min(7, 'Phone number is required').max(20);
const consentSchema = z.boolean().refine((v) => v === true, 'You must consent to be contacted');

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneOptional,
  company: z.string().max(200).optional().or(z.literal('')),
  subject: z.string().max(200).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  consent: consentSchema,
});

export const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().max(200).optional().or(z.literal('')),
  preferred_date: z.string().optional().or(z.literal('')),
  preferred_time: z.string().optional().or(z.literal('')),
  service_interest: z.string().max(200).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const cubeScoreSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  industry: z.string().max(200).optional().or(z.literal('')),
  employee_count: z.string().max(50).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const safeSnapSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  location: z.string().max(200).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const cubeInsightSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  industry: z.string().max(200).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const cubeCareSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  service_areas: z.array(z.string()).optional(),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const trainingRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  training_program: z.string().max(200).optional().or(z.literal('')),
  group_size: z.string().max(50).optional().or(z.literal('')),
  preferred_location: z.string().max(200).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const isoSupportSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneRequired,
  company: z.string().min(2, 'Company name is required').max(200),
  iso_standard: z.string().max(200).optional().or(z.literal('')),
  current_status: z.string().max(500).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const productQuoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  phone: phoneOptional,
  company: z.string().max(200).optional().or(z.literal('')),
  product_interests: z.array(z.string()).optional(),
  message: z.string().max(5000).optional().or(z.literal('')),
  consent: consentSchema,
});

export const storeLaunchSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  business_name: z.string().max(200).optional().or(z.literal('')),
  product_interests: z.array(z.string()).optional(),
});

export const newsletterSchema = z.object({
  email: emailSchema,
  name: z.string().max(100).optional().or(z.literal('')),
  consent: consentSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type CubeScoreInput = z.infer<typeof cubeScoreSchema>;
export type SafeSnapInput = z.infer<typeof safeSnapSchema>;
export type CubeInsightInput = z.infer<typeof cubeInsightSchema>;
export type CubeCareInput = z.infer<typeof cubeCareSchema>;
export type TrainingRequestInput = z.infer<typeof trainingRequestSchema>;
export type IsoSupportInput = z.infer<typeof isoSupportSchema>;
export type ProductQuoteInput = z.infer<typeof productQuoteSchema>;
export type StoreLaunchInput = z.infer<typeof storeLaunchSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
