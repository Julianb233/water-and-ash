'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-navy text-white">
        <div className="text-center space-y-6 px-6">
          <h1 className="text-3xl font-serif">Something went wrong</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            We apologize for the inconvenience. Please try again, or call us
            directly at{' '}
            <a href="tel:619-928-9160" className="underline">
              619-928-9160
            </a>
            .
          </p>
          <button
            onClick={reset}
            className="rounded-full bg-gold px-6 py-3 text-navy font-semibold hover:bg-gold/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
