'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/analytics';

/**
 * Captures UTM parameters and referrer on first page load.
 * Place in the root layout so attribution is captured regardless of landing page.
 */
export function AttributionProvider() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
