import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container py-16 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cube-soft">
          <FileQuestion className="h-8 w-8 text-cube-green" />
        </div>
        <h1 className="text-3xl font-bold text-cube-navy lg:text-4xl">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-cube-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cube-green-dark"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
