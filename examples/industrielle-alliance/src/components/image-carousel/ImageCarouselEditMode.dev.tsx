'use client';

import { Text } from '@sitecore-content-sdk/nextjs';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import type { ImageCarouselProps } from './image-carousel.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { EditableButton } from '@/components/button-component/ButtonComponent';
import { cn } from '@/lib/utils';
import { IMAGE_CAROUSEL_BG, IMAGE_CAROUSEL_NAVY } from './image-carousel.constants';

export const ImageCarouselEditMode = (
  props: ImageCarouselProps & { componentName: string; showBackgroundText?: boolean },
) => {
  const { fields, isPageEditing, componentName, showBackgroundText = true } = props;
  const { title, imageItems } = fields?.data?.datasource || {};
  const { results: slides = [] } = imageItems || {};
  const isIaBand = showBackgroundText;
  const containerClasses = isIaBand
    ? '@container relative flex w-full flex-col items-center justify-center py-12'
    : '@container bg-primary group text-primary-foreground relative flex w-full flex-col items-center justify-center py-[99px]';

  if (fields) {
    return (
      <div
        className={cn(containerClasses, { [props?.params?.styles]: props?.params?.styles })}
        style={isIaBand ? { backgroundColor: IMAGE_CAROUSEL_BG } : undefined}
        data-component="ImageCarouselEditMode"
        data-class-change
      >
        {isIaBand ? (
          <div className="mb-8 w-full max-w-screen-xl px-6">
            <p className="mb-2 text-sm font-medium" style={{ color: IMAGE_CAROUSEL_NAVY }}>
              Description (under slide heading):
            </p>
            <Text
              tag="p"
              field={title?.jsonValue}
              className="max-w-2xl text-lg leading-snug"
              style={{ color: IMAGE_CAROUSEL_NAVY }}
            />
          </div>
        ) : (
          <div className="mb-8 w-full space-y-4 text-center">
            <Text
              tag="h2"
              field={title?.jsonValue}
              className="font-heading @md:text-5xl mx-auto max-w-[760px] text-pretty text-3xl font-light leading-none tracking-normal antialiased group-[.position-center]:text-center group-[.position-right]:text-right"
            />
          </div>
        )}
        <div className="mx-auto max-w-screen-xl space-y-6">
          <h3
            className={cn(
              'border-b pb-2 text-xl font-medium',
              isIaBand ? 'border-foreground/20' : 'border-primary-foreground/20',
            )}
          >
            Carousel Items:
          </h3>

          {slides.map((slide, index) => (
            <div key={index} className="overflow-hidden border-0 bg-transparent">
              <div className="p-0">
                <div className="flex flex-col items-stretch gap-4 p-4 md:flex-row">
                  <div className="shrink-0 md:w-1/3">
                    <ImageWrapper
                      image={slide.image?.jsonValue}
                      className="relative z-0 h-auto w-full overflow-hidden rounded-md"
                      page={props.page}
                    />
                  </div>

                  {showBackgroundText && (
                    <div className="flex flex-col items-center justify-center md:w-1/3">
                      <div className="text-center">
                        <p
                          className={cn(
                            'mb-2 text-sm',
                            isIaBand ? 'text-foreground/70' : 'text-primary-foreground/60',
                          )}
                        >
                          Heading:
                        </p>
                        <Text
                          tag="h3"
                          field={slide?.backgroundText?.jsonValue}
                          className="text-xl font-bold leading-snug"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center md:w-1/3">
                    <div className="text-center">
                      <p
                        className={cn(
                          'mb-2 text-sm',
                          isIaBand ? 'text-foreground/70' : 'text-primary-foreground/60',
                        )}
                      >
                        Link (button text + optional Title for body copy):
                      </p>
                      {slide?.link?.jsonValue && (
                        <EditableButton
                          variant="secondary"
                          buttonLink={slide.link?.jsonValue}
                          isPageEditing={isPageEditing}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <NoDataFallback componentName={componentName} />;
};
