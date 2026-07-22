/**
 * SAFE CUBE — Email Notification Helper (Server-only)
 *
 * Uses the Resend HTTP API directly via server-side fetch.
 * No npm dependency required.
 * Email failures never block database storage.
 */

'use server';

import { env } from './env';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_APIKEY;
  const fromEmail = env.resendFromEmail;

  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY not configured — skipping email notification');
    return false;
  }
  if (!fromEmail || fromEmail === 'noreply@safecube.example') {
    console.warn('[Email] RESEND_FROM_EMAIL not configured — skipping email notification');
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''),
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      console.error('[Email] Resend API error:', res.status, errBody.slice(0, 200));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Email] Failed to send:', err);
    return false;
  }
}

interface NotificationData {
  formType: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  extraFields?: Record<string, string | string[] | null>;
}

export async function notifyAdmin(data: NotificationData): Promise<void> {
  const adminEmail = env.adminNotificationEmail;
  if (!adminEmail) {
    console.warn('[Email] ADMIN_NOTIFICATION_EMAIL not configured — skipping admin notification');
    return;
  }

  const rows: string[] = [];
  rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Form Type</td><td style="padding:4px 12px;">${escapeHtml(data.formType)}</td></tr>`);
  rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Name</td><td style="padding:4px 12px;">${escapeHtml(data.name)}</td></tr>`);
  rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Email</td><td style="padding:4px 12px;">${escapeHtml(data.email)}</td></tr>`);
  if (data.phone) rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Phone</td><td style="padding:4px 12px;">${escapeHtml(data.phone)}</td></tr>`);
  if (data.company) rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Company</td><td style="padding:4px 12px;">${escapeHtml(data.company)}</td></tr>`);
  if (data.message) rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">Message</td><td style="padding:4px 12px;">${escapeHtml(data.message)}</td></tr>`);
  if (data.extraFields) {
    for (const [key, value] of Object.entries(data.extraFields)) {
      if (value) {
        const display = Array.isArray(value) ? value.join(', ') : String(value);
        rows.push(`<tr><td style="padding:4px 12px;font-weight:600;color:#1a2238;">${escapeHtml(key.replace(/_/g, ' '))}</td><td style="padding:4px 12px;">${escapeHtml(display)}</td></tr>`);
      }
    }
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a2238;margin-bottom:16px;">New SAFE CUBE Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${rows.join('\n')}
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:12px;">This is an automated notification. Review and follow up in the admin dashboard.</p>
    </div>`;

  await sendEmail({ to: adminEmail, subject: `[SAFE CUBE] New ${data.formType} submission`, html });
}

export async function sendUserConfirmation(email: string, formType: string): Promise<void> {
  const fromEmail = env.resendFromEmail;
  if (!fromEmail || fromEmail === 'noreply@safecube.example') return;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a2238;">Thank you for contacting SAFE CUBE</h2>
      <p>We have received your ${escapeHtml(formType)} submission and will respond within one business day.</p>
      <p>If you need urgent assistance, please contact us directly.</p>
      <p style="margin-top:24px;color:#6b7280;font-size:12px;">This is an automated confirmation. Please do not reply to this email.</p>
    </div>`;

  await sendEmail({ to: email, subject: 'SAFE CUBE — Submission Received', html });
}
