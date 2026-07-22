/**
 * SAFE CUBE — Environment Variable Validation
 *
 * Validates that all required environment variables are present at build/runtime.
 * Public (NEXT_PUBLIC_) vars are checked on the client; server vars are checked
 * only in server contexts.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, value: string | undefined, fallback = ''): string {
  return value?.trim() || fallback;
}

export const env = {
  siteUrl: optional('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL, 'https://safecube.example'),
  supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: required('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  turnstileSiteKey: optional('NEXT_PUBLIC_TURNSTILE_SITE_KEY', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),

  supabaseServiceRoleKey: optional('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY),
  resendApiKey: optional('RESEND_API_KEY', process.env.RESEND_API_KEY),
  resendFromEmail: optional('RESEND_FROM_EMAIL', process.env.RESEND_FROM_EMAIL, 'noreply@safecube.example'),
  turnstileSecretKey: optional('TURNSTILE_SECRET_KEY', process.env.TURNSTILE_SECRET_KEY),
  adminNotificationEmail: optional('ADMIN_NOTIFICATION_EMAIL', process.env.ADMIN_NOTIFICATION_EMAIL),
} as const;

export const turnstileEnabled = Boolean(env.turnstileSiteKey);
export const turnstileServerEnabled = Boolean(env.turnstileSecretKey);
