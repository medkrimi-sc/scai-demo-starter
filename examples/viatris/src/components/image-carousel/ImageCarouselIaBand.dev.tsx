'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { ImageCarouselProps } from './image-carousel.props';
import { ImageCarouselImagePane } from './ImageCarouselImagePane.dev';
import { ImageCarouselContentPanel } from './ImageCarouselContentPanel.dev';
import { IMAGE_CAROUSEL_BG } from './image-carousel.constants';

export function ImageCarouselIaBand(props: ImageCarouselProps) {
  const { fields, isPageEditing, page } = props;
  const { title: sectionTitle, imageItems } = fields?.data?.datasource || {};
  const slides = imageItems?.results ?? [];

  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const regionId = useId();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (liveRegionRef.current && slides.length > 0) {
      liveRegionRef.current.textContent = `Slide ${activeIndex + 1} of ${slides.length}`;
    }
  }, [activeIndex, slides.length]);

  const handleSelectSlide = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (!fields?.data?.datasource) {
    return <NoDataFallback componentName="Image Carousel" />;
  }

  if (slides.length === 0) {
    return <NoDataFallback componentName="Image Carousel" />;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <div
      data-component="ImageCarouselIaBand"
      className="w-full"
      style={{ backgroundColor: IMAGE_CAROUSEL_BG }}
      aria-roledescription="carousel"
      aria-labelledby={regionId}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col lg:min-h-[28rem] lg:flex-row lg:items-stretch">
        <div className="flex w-full shrink-0 flex-col justify-center px-5 pt-8 pb-5 sm:px-6 sm:pt-10 sm:pb-6 lg:w-1/2 lg:px-10 lg:pt-12 lg:pb-10 lg:pr-6">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: slides.length > 1,
              watchDrag: slides.length > 1,
            }}
            className="h-full w-full"
          >
            <CarouselContent className="ml-0 h-full">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="basis-full pl-0">
                  <ImageCarouselImagePane
                    image={slide?.image?.jsonValue}
                    isPageEditing={isPageEditing}
                    page={page}
                    priority={index === 0}
                    className="min-h-[220px] sm:min-h-[260px] lg:min-h-[22rem] xl:min-h-[24rem]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <ImageCarouselContentPanel
          slide={activeSlide}
          sectionTitle={sectionTitle}
          slideCount={slides.length}
          activeIndex={activeIndex}
          onSelectSlide={handleSelectSlide}
          isPageEditing={isPageEditing}
          className="w-full lg:w-1/2"
        />
      </div>

      <div
        ref={liveRegionRef}
        id={regionId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
}
