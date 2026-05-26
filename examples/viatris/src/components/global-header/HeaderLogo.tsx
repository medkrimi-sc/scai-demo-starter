'use client';

import { useState } from 'react';
import type { ImageField } from '@sitecore-content-sdk/nextjs';
import { Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { ViatrisLogoDesktop, ViatrisLogoMobile } from './ViatrisLogo';
import { IA_HEADER_LOGO_DIMENSIONS } from './ia-header.constants';
import { isIaBrandedLogoSrc, shouldUseIaInlineLogo } from './ia-header.utils';

const EMPTY_LOGO_FIELD = { value: {} } as ImageField;

type HeaderLogoProps = {
  logo?: { jsonValue?: ImageField };
  isPageEditing?: boolean;
  variant?: 'desktop' | 'mobile';
};

export function HeaderLogo({
  logo,
  isPageEditing,
  variant = 'desktop',
}: HeaderLogoProps) {
  const { page } = useSitecore();
  const isEditing = isPageEditing ?? page.mode.isEditing;
  const logoField = logo?.jsonValue;
  const logoSrc = logoField?.value?.src;
  const dims = IA_HEADER_LOGO_DIMENSIONS[variant];
  const wrapperClass =
    variant === 'mobile' ? 'flex max-w-[149px] shrink-0' : 'flex w-[200px] shrink-0';
  const imageClass =
    variant === 'mobile'
      ? 'h-9 w-auto max-w-[149px] object-contain'
      : 'h-[52px] w-full max-w-[200px] object-contain object-left';

  const [cmsImageFailed, setCmsImageFailed] = useState(false);

  const useInlineLogo =
    shouldUseIaInlineLogo(isEditing, logoSrc) || cmsImageFailed;
  const useCmsLogo =
    !useInlineLogo &&
    Boolean(logoSrc?.trim()) &&
    isIaBrandedLogoSrc(logoSrc) &&
    Boolean(logoField);

  if (isEditing) {
    return (
      <div
        className={wrapperClass}
        data-field="headerLogo"
        style={{ minHeight: variant === 'mobile' ? 36 : 52 }}
      >
        <Image field={logoField ?? EMPTY_LOGO_FIELD} className={imageClass} />
      </div>
    );
  }

  if (useCmsLogo && logoField) {
    return (
      <div className={variant === 'mobile' ? undefined : wrapperClass}>
        <ImageWrapper
          image={logoField}
          className={imageClass}
          sizes={dims.sizes}
          alt={
            typeof logoField.value?.alt === 'string'
              ? logoField.value.alt
              : 'Viatris'
          }
          page={page}
          onError={() => setCmsImageFailed(true)}
        />
      </div>
    );
  }

  return variant === 'mobile' ? <ViatrisLogoMobile /> : <ViatrisLogoDesktop />;
}
