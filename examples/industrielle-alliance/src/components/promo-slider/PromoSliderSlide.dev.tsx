'use client';

import { Text } from '@sitecore-content-sdk/nextjs';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { cn } from '@/lib/utils';
import type { PromoSliderSlideProps } from './promo-slider.props';
import { PromoSliderPagination } from './PromoSliderPagination';
import { PROMO_SLIDER_CTA_BLUE, PROMO_SLIDER_NAVY } from './promo-slider.constants';

type PromoSliderSlidePanelProps = {
  slide: PromoSliderSlideProps;
  slideCount: number;
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  isPageEditing?: boolean;
  className?: string;
};

export function PromoSliderSlidePanel({
  slide,
  slideCount,
  activeIndex,
  onSelectSlide,
  isPageEditing,
  className,
}: PromoSliderSlidePanelProps) {
  const { heading, description, link } = slide || {};
  const title = heading?.jsonValue;
  const text = description?.jsonValue;
  const cta = link?.jsonValue;
  const showTitle = Boolean(title?.value || isPageEditing);
  const showText = Boolean(text?.value || isPageEditing);
  const showCta =
    isPageEditing || Boolean(cta?.value?.href && cta?.value?.href !== '#' && cta?.value?.text);

  return (
    <div className={cn('flex flex-col justify-center px-6 py-10 lg:px-12 lg:py-14 xl:px-16', className)}>
      <PromoSliderPagination
        count={slideCount}
        activeIndex={activeIndex}
        onSelect={onSelectSlide}
      />

      {showTitle && (
        <Text
          tag="h2"
          field={title}
          className="max-w-[18ch] text-pretty text-[1.75rem] font-bold leading-[1.15] tracking-tight antialiased sm:text-[2rem] lg:text-[2.25rem]"
          style={{ color: PROMO_SLIDER_NAVY }}
        />
      )}

      {showText && (
        <Text
          tag="p"
          field={text}
          className="mt-4 max-w-[36ch] text-base font-normal leading-snug antialiased sm:text-lg"
          style={{ color: PROMO_SLIDER_NAVY }}
        />
      )}

      {showCta && cta && (
        <div className="mt-8">
          <EditableButton
            buttonLink={cta}
            variant="default"
            className="h-11 rounded-full border-0 px-8 text-sm font-medium text-white hover:opacity-90"
            style={{ backgroundColor: PROMO_SLIDER_CTA_BLUE }}
          />
        </div>
      )}
    </div>
  );
}
