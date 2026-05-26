'use client';

import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { cn } from '@/lib/utils';
import type { Page, ImageField } from '@sitecore-content-sdk/nextjs';
import { PROMO_SLIDER_NAVY } from './promo-slider.constants';

type PromoSliderImagePaneProps = {
  image?: ImageField;
  isPageEditing?: boolean;
  page?: Page;
  priority?: boolean;
  className?: string;
};

export function PromoSliderImagePane({
  image,
  isPageEditing,
  page,
  priority = false,
  className,
}: PromoSliderImagePaneProps) {
  const showImage = Boolean(image?.value?.src || isPageEditing);

  return (
    <div
      className={cn(
        'flex h-full w-full shrink-0 items-center justify-center overflow-hidden',
        'rounded-tr-[4.5rem] lg:rounded-tr-[5rem]',
        className,
      )}
      style={{ backgroundColor: PROMO_SLIDER_NAVY }}
    >
      {showImage && image && (
        <div className="flex min-h-[240px] w-full items-center justify-center p-8 sm:p-10 lg:min-h-[26rem] lg:p-12">
          <ImageWrapper
            image={image}
            className="max-h-[280px] w-auto max-w-full object-contain lg:max-h-[320px]"
            wrapperClass="flex h-full w-full items-center justify-center"
            priority={priority}
            page={page}
          />
        </div>
      )}
    </div>
  );
}
