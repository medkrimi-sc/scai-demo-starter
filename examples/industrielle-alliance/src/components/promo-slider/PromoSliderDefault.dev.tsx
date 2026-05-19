'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { PromoSliderProps } from './promo-slider.props';
import { PromoSliderImagePane } from './PromoSliderImagePane.dev';
import { PromoSliderSlidePanel } from './PromoSliderSlide.dev';
import { PROMO_SLIDER_BG } from './promo-slider.constants';

export function PromoSliderDefault(props: PromoSliderProps) {
  const { fields, isPageEditing, page } = props;
  const { children } = fields?.data?.datasource || {};
  const slides = children?.results ?? [];

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
    return <NoDataFallback componentName="Promo Slider" />;
  }

  if (slides.length === 0) {
    return <NoDataFallback componentName="Promo Slider" />;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <div
      data-component="PromoSlider"
      className="w-full"
      style={{ backgroundColor: PROMO_SLIDER_BG }}
      aria-roledescription="carousel"
      aria-labelledby={regionId}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col lg:min-h-[26rem] lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 lg:w-[42%] lg:max-w-[520px]">
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
                <CarouselItem key={slide.id ?? index} className="basis-full pl-0">
                  <PromoSliderImagePane
                    image={slide?.image?.jsonValue}
                    isPageEditing={isPageEditing}
                    page={page}
                    priority={index === 0}
                    className="min-h-[240px] lg:min-h-[26rem]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <PromoSliderSlidePanel
          slide={activeSlide}
          slideCount={slides.length}
          activeIndex={activeIndex}
          onSelectSlide={handleSelectSlide}
          isPageEditing={isPageEditing}
          className="flex-1"
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
