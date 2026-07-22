'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { TurnstileWidget } from '@/components/ui/turnstile';
import { turnstileEnabled } from '@/lib/env';
import type { FormResult } from '@/lib/actions';

interface UseFormActionOptions {
  action: (prevState: FormResult, formData: FormData) => Promise<FormResult>;
  onSuccess?: () => void;
}

export function useFormAction({ action, onSuccess }: UseFormActionOptions) {
  const [state, setState] = useState<FormResult>({ success: false, message: '' });
  const [isPending, startTransition] = useTransition();
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
      formRef.current?.reset();
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [state, onSuccess]);

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await action(state, formData);
      setState(result);
    });
  };

  return {
    state,
    isPending,
    turnstileToken,
    setTurnstileToken,
    formRef,
    successRef,
    formAction,
  };
}

export function FormErrorSummary({ errors, message }: { errors?: Record<string, string[]>; message?: string }) {
  if (!errors && !message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-md border border-cube-red/30 bg-cube-red/5 p-4"
    >
      {message && (
        <div className="flex items-center gap-2 text-sm font-medium text-cube-red">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {message}
        </div>
      )}
      {errors && Object.keys(errors).length > 0 && (
        <ul className="mt-2 space-y-1">
          {Object.entries(errors).map(([field, messages]) => (
            <li key={field} className="text-sm text-cube-red">
              {messages.map((msg, i) => (
                <span key={i}>
                  {field !== 'form' && field !== 'turnstile' && (
                    <span className="font-medium capitalize">{field.replace(/_/g, ' ')}: </span>
                  )}
                  {msg}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FormSuccessMessage({ message, ref }: { message: string; ref?: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={ref} className="rounded-md bg-cube-success/10 p-4" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-sm font-medium text-cube-success">
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
        {message}
      </div>
    </div>
  );
}

export function LoadingButton({ loading, children, ...props }: {
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center rounded-md bg-cube-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cube-green/90 disabled:opacity-60 disabled:cursor-not-allowed"
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
