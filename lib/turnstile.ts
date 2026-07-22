/**
 * SAFE CUBE — Server-side Turnstile Token Verification
 *
 * Verifies Cloudflare Turnstile tokens server-side.
 * Falls back to passing when TURNSTILE_SECRET_KEY is not configured (development).
 * In production, verification is enforced.
 */

import { env, turnstileServerEnabled } from './env';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export async function verifyTurnstileToken(token: string, remoteip?: string): Promise<boolean> {
  if (!turnstileServerEnabled) {
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY not configured — skipping verification (development mode)');
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const body = new URLSearchParams({
      secret: env.turnstileSecretKey,
      response: token,
    });

    if (remoteip) body.set('remoteip', remoteip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });

    if (!res.ok) return false;

    const data: TurnstileVerifyResponse = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('[Turnstile] Verification failed:', err);
    return false;
  }
}
