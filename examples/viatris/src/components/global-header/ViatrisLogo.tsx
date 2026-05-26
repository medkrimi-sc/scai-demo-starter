import type React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ViatrisLogoProps = {
  className?: string;
};

const LOGO_SRC = '/viatris-logo.svg';

/** Viatris wordmark (desktop). */
export function ViatrisLogoDesktop({ className }: ViatrisLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Viatris"
      width={150}
      height={40}
      priority
      className={cn('block h-[40px] w-auto min-w-[120px] max-w-[200px]', className)}
    />
  );
}

/** Viatris wordmark (compact header). */
export function ViatrisLogoMobile({ className }: ViatrisLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Viatris"
      width={120}
      height={32}
      priority
      className={cn('block h-8 w-auto max-w-[149px]', className)}
    />
  );
}

export function ViatrisLogo({
  className,
  variant = 'desktop',
}: ViatrisLogoProps & { variant?: 'desktop' | 'mobile' }) {
  return variant === 'mobile' ? (
    <ViatrisLogoMobile className={className} />
  ) : (
    <ViatrisLogoDesktop className={className} />
  );
}
