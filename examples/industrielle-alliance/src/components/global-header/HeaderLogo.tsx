'use client';

import type { ImageField } from '@sitecore-content-sdk/nextjs';
import { Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { IaLogoDesktop, IaLogoMobile } from './IaLogo';
import { IA_HEADER_LOGO_DIMENSIONS } from './ia-header.constants';
import { shouldUseIaInlineLogo } from './ia-header.utils';

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

  if (isEditing) {
    return (
      <div className={wrapperClass} data-field="headerLogo">
        <Image field={logoField ?? EMPTY_LOGO_FIELD} className={imageClass} />
      </div>
    );
  }

  const useCmsLogo =
    !shouldUseIaInlineLogo(false, logoSrc) && Boolean(logoSrc?.trim());

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
              : 'iA Groupe financier'
          }
          page={page}
        />
      </div>
    );
  }

  return variant === 'mobile' ? <IaLogoMobile /> : <IaLogoDesktop />;
}
