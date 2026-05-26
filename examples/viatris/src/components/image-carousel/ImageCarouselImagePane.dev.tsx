'use client';

import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { cn } from '@/lib/utils';
import type { Page, ImageField } from '@sitecore-content-sdk/nextjs';

type ImageCarouselImagePaneProps = {
  image?: ImageField;
  isPageEditing?: boolean;
  page?: Page;
  priority?: boolean;
  className?: string;
};

export function ImageCarouselImagePane({
  image,
  isPageEditing,
  page,
  priority = false,
  className,
}: ImageCarouselImagePaneProps) {
  const showImage = Boolean(image?.value?.src || isPageEditing);

  return (
    <div
      className={cn(
        'relative h-full w-full shrink-0 overflow-hidden bg-white',
        'rounded-tr-[3.25rem] sm:rounded-tr-[4rem] lg:rounded-tr-[4.5rem] xl:rounded-tr-[5rem]',
        className,
      )}
    >
      {showImage && image && (
        <ImageWrapper
          image={image}
          className="h-full w-full object-cover"
          wrapperClass="h-full w-full"
          priority={priority}
          page={page}
        />
      )}
    </div>
  );
}
