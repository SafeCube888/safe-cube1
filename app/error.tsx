'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cube-soft">
          <AlertCircle className="h-8 w-8 text-cube-red" />
        </div>
        <h1 className="text-3xl font-bold text-cube-navy lg:text-4xl">Something Went Wrong</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex rounded-md bg-cube-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex rounded-md border border-cube-blue px-5 py-2.5 text-sm font-semibold text-cube-blue transition-colors hover:bg-cube-blue hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
