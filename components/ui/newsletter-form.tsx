'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { turnstileEnabled } from '@/lib/env';
import { submitNewsletterForm } from '@/lib/actions';
import type { FormResult } from '@/lib/actions';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [state, setState] = useState<FormResult>({ success: false, message: '' });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (turnstileEnabled && !turnstileToken) return;

    setIsPending(true);
    const formData = new FormData();
    formData.set('email', email);
    formData.set('consent', consentChecked ? 'true' : 'false');
    formData.set('turnstile-token', turnstileToken);

    const result = await submitNewsletterForm({ success: false, message: '' }, formData);
    setState(result);
    setIsPending(false);
    if (result.success) {
      setEmail('');
      setConsentChecked(false);
    }
  };

  if (state.success) {
    return (
      <div className="rounded-md bg-cube-success/10 p-4" role="status" aria-live="polite">
        <div className="flex items-center gap-2 text-sm font-medium text-cube-success">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          {state.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!state.success && state.message && (
        <div className="rounded-md border border-cube-red/30 bg-cube-red/5 p-3 text-sm text-cube-red" role="alert">
          {state.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-cube-soft bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cube-green focus:border-cube-green"
        />
        <Button type="submit" variant="green" size="md" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          SUBSCRIBE
        </Button>
      </form>
      <label className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          required
          className="h-4 w-4 rounded border-cube-soft"
        />
        I agree to receive emails from SAFE CUBE
      </label>
      {turnstileEnabled && (
        <div className="flex justify-center">
          <TurnstileWidget onVerify={setTurnstileToken} />
        </div>
      )}
    </div>
  );
}
