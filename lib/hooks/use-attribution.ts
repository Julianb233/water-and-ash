'use client';

import { useEffect } from 'react';
import { captureAttribution, getAttribution, type AttributionData } from '@/lib/analytics';

/**
 * Hook that captures UTM parameters and referrer on mount.
 * Returns the stored attribution data for use in form submissions.
 */
export function useAttribution(): AttributionData {
  useEffect(() => {
    captureAttribution();
  }, []);

  return getAttribution();
}
