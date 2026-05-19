'use client';

import type { ImageField, Page } from '@sitecore-content-sdk/nextjs';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { IaLogoDesktop, IaLogoMobile } from './IaLogo';
import { shouldUseIaInlineLogo } from './ia-header.utils';

const EMPTY_LOGO_FIELD = { value: {} } as ImageField;

type HeaderLogoProps = {
  logo?: { jsonValue?: ImageField };
  isPageEditing?: boolean;
  page?: Page;
  variant?: 'desktop' | 'mobile';
};

export function HeaderLogo({
  logo,
  isPageEditing,
  page,
  variant = 'desktop',
}: HeaderLogoProps) {
  const logoField = logo?.jsonValue;
  const logoSrc = logoField?.value?.src;

  if (isPageEditing) {
    return (
      <div
        className={
          variant === 'mobile'
            ? 'flex [&_.image-container]:w-full'
            : 'flex w-[200px] [&_.image-container]:w-full'
        }
        data-field="headerLogo"
      >
        <ImageWrapper
          image={logoField ?? EMPTY_LOGO_FIELD}
          className={
            variant === 'mobile'
              ? 'h-9 w-auto object-contain'
              : 'h-[52px] w-full object-contain object-left'
          }
          sizes={variant === 'mobile' ? '149px' : '200px'}
          alt="iA Groupe financier"
          page={page}
        />
      </div>
    );
  }

  const useCmsLogo =
    !shouldUseIaInlineLogo(false, logoSrc) && Boolean(logoSrc?.trim());

  if (useCmsLogo && logoField) {
    return (
      <div
        className={
          variant === 'mobile' ? undefined : 'flex w-[200px] [&_.image-container]:w-full'
        }
      >
        <ImageWrapper
          image={logoField}
          className={
            variant === 'mobile'
              ? 'h-9 w-auto object-contain'
              : 'h-[52px] w-full object-contain object-left'
          }
          sizes={variant === 'mobile' ? '149px' : '200px'}
          alt="iA Groupe financier"
          page={page}
        />
      </div>
    );
  }

  return variant === 'mobile' ? <IaLogoMobile /> : <IaLogoDesktop />;
}
