'use client';

import { useEffect, useState } from 'react';
import { captureUtmParams, type UtmParams } from '@/lib/utm';

/**
 * React hook that captures UTM parameters from the URL on mount
 * and returns them for inclusion in form submissions.
 */
export function useUtmParams(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    setUtm(captureUtmParams());
  }, []);

  return utm;
}
