'use client';

import { cn } from '@/lib/utils';
import { IMAGE_CAROUSEL_CTA_BLUE, IMAGE_CAROUSEL_NAVY } from './image-carousel.constants';

type ImageCarouselPaginationProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function ImageCarouselPagination({
  count,
  activeIndex,
  onSelect,
  className,
}: ImageCarouselPaginationProps) {
  if (count <= 1) {
    return null;
  }

  return (
    <div
      role="tablist"
      aria-label="Carousel slides"
      className={cn('mb-6 flex items-center gap-2.5', className)}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${index + 1} of ${count}`}
            onClick={() => onSelect(index)}
            className={cn(
              'size-2.5 shrink-0 rounded-full transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              isActive ? 'border-0' : 'border-2 bg-transparent',
            )}
            style={
              isActive
                ? { backgroundColor: IMAGE_CAROUSEL_NAVY }
                : { borderColor: IMAGE_CAROUSEL_CTA_BLUE }
            }
          />
        );
      })}
    </div>
  );
}
