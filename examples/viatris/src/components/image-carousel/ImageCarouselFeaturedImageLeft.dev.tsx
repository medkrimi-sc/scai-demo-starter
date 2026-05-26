'use client';

import type { ImageCarouselProps } from './image-carousel.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ImageCarouselEditMode } from './ImageCarouselEditMode.dev';
import { ImageCarouselIaBand } from './ImageCarouselIaBand.dev';

export const ImageCarouselFeaturedImageLeft = (props: ImageCarouselProps) => {
  const { fields, isPageEditing } = props;

  if (!fields?.data?.datasource) {
    return <NoDataFallback componentName="ImageCarouselFeaturedImageLeft" />;
  }

  if (isPageEditing) {
    return (
      <ImageCarouselEditMode
        {...props}
        componentName="ImageCarouselFeaturedImageLeft"
        showBackgroundText
      />
    );
  }

  return <ImageCarouselIaBand {...props} />;
};
