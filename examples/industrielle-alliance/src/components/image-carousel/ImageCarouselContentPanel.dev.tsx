'use client';

import { Text } from '@sitecore-content-sdk/nextjs';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { cn } from '@/lib/utils';
import type { Field } from '@sitecore-content-sdk/nextjs';
import type { imageCarouselItem } from './image-carousel.props';
import { ImageCarouselPagination } from './ImageCarouselPagination';
import {
  IMAGE_CAROUSEL_CTA_BLUE,
  IMAGE_CAROUSEL_CTA_CLASSES,
  IMAGE_CAROUSEL_NAVY,
} from './image-carousel.constants';

type ImageCarouselContentPanelProps = {
  slide: imageCarouselItem;
  sectionTitle?: { jsonValue?: Field<string> };
  slideCount: number;
  activeIndex: number;
  onSelectSlide: (index: number) => void;
  isPageEditing?: boolean;
  className?: string;
};

const bodyTextClasses =
  'mt-4 max-w-[38ch] text-pretty text-base font-normal leading-snug antialiased sm:text-lg';

export function ImageCarouselContentPanel({
  slide,
  sectionTitle,
  slideCount,
  activeIndex,
  onSelectSlide,
  isPageEditing,
  className,
}: ImageCarouselContentPanelProps) {
  const heading = slide?.backgroundText?.jsonValue;
  const cta = slide?.link?.jsonValue;
  const slideDescription = cta?.value?.title?.trim();
  const sectionDescription = sectionTitle?.jsonValue;

  const showHeading = Boolean(heading?.value || isPageEditing);
  const showSlideDescription = Boolean(slideDescription || isPageEditing);
  const showSectionDescription =
    Boolean(sectionDescription?.value || isPageEditing) && !slideDescription;
  const showDescription = showSlideDescription || showSectionDescription;
  const showCta =
    isPageEditing || Boolean(cta?.value?.href && cta?.value?.href !== '#' && cta?.value?.text);

  return (
    <div
      className={cn(
        'flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-14 xl:py-16',
        className,
      )}
    >
      <ImageCarouselPagination
        count={slideCount}
        activeIndex={activeIndex}
        onSelect={onSelectSlide}
      />

      {showHeading && (
        <Text
          tag="h2"
          field={heading}
          className="max-w-[22ch] text-pretty text-[1.875rem] font-bold leading-[1.12] tracking-tight antialiased sm:text-[2rem] lg:text-[2.375rem]"
          style={{ color: IMAGE_CAROUSEL_NAVY }}
        />
      )}

      {showDescription && slideDescription && (
        <p className={bodyTextClasses} style={{ color: IMAGE_CAROUSEL_NAVY }}>
          {slideDescription}
        </p>
      )}

      {showDescription && showSectionDescription && sectionDescription && (
        <Text
          tag="p"
          field={sectionDescription}
          className={bodyTextClasses}
          style={{ color: IMAGE_CAROUSEL_NAVY }}
        />
      )}

      {showCta && cta && (
        <div className="mt-8 sm:mt-10">
          <EditableButton
            buttonLink={cta}
            variant="default"
            isPageEditing={isPageEditing}
            className={IMAGE_CAROUSEL_CTA_CLASSES}
            style={{ backgroundColor: IMAGE_CAROUSEL_CTA_BLUE }}
          />
        </div>
      )}
    </div>
  );
}
