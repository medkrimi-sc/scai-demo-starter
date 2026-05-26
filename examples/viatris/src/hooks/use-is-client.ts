'use client';

import { useEffect, useState } from 'react';

/** True after mount — use to avoid SSR/client mismatch for pathname-dependent UI. */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
