'use client';

import type React from 'react';
import { Text, Link, type Page } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ButtonBase } from '@/components/button-component/ButtonComponent';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import type { HeroProps, HeroOfferingTileProps } from './hero.props';

const OfferingTileCard: React.FC<{
  tile: HeroOfferingTileProps;
  index: number;
  isPageEditing?: boolean;
  page?: Page;
}> = ({ tile, index, isPageEditing, page }) => {
  const { heading, description, image, link } = tile;
  const href = link?.jsonValue?.value?.href;
  const hasLink = Boolean(href && href !== '#' && href !== 'http://#');

  const inner = (
    <div
      className={cn(
        'bg-card text-card-foreground flex h-full flex-col gap-2 rounded-xl p-4 shadow-sm transition-shadow',
        hasLink && 'hover:shadow-md',
      )}
    >
      {image?.jsonValue && (
        <div className="relative h-10 w-10 shrink-0 [&_.image-container]:h-full [&_.image-container]:w-full">
          <ImageWrapper
            image={image.jsonValue}
            className="h-full w-full object-contain"
            sizes="40px"
            alt=""
            page={page}
          />
        </div>
      )}
      {heading?.jsonValue && (
        <Text
          tag="h3"
          field={heading.jsonValue}
          className="font-heading text-sm font-semibold leading-snug tracking-tight @md:text-base"
        />
      )}
      {description?.jsonValue && (
        <Text
          tag="p"
          field={description.jsonValue}
          className="text-muted-foreground font-body text-xs leading-snug @md:text-sm"
        />
      )}
    </div>
  );

  if (link?.jsonValue && (isPageEditing || hasLink)) {
    return (
      <Link
        field={link.jsonValue}
        editable={isPageEditing}
        className="block h-full min-h-[120px] rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {inner}
      </Link>
    );
  }

  return <div className="h-full min-h-[120px]">{inner}</div>;
};

export const HeroOfferingsGrid: React.FC<HeroProps> = (props) => {
  const { fields, isPageEditing, page } = props;

  if (!fields) {
    return <NoDataFallback componentName="Hero" />;
  }

  const { title, description, image, tiles, primaryCta, secondaryCta } = fields;
  const tileResults = (tiles?.results ?? []).slice(0, 6);
  const showTilePlaceholders = isPageEditing && tileResults.length === 0;

  return (
    <section
      data-component="HeroOfferingsGrid"
      className={cn(
        'bg-primary text-primary-foreground @container w-full py-10 md:py-14',
        props?.params?.styles && props.params.styles,
      )}
      data-class-change
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 @lg:px-8">
        <div className="max-w-3xl">
          {title && (
            <Text
              tag="h1"
              field={title}
              className="font-heading text-balance text-3xl font-semibold leading-tight tracking-tight @md:text-4xl @lg:text-5xl"
            />
          )}
          {description && (
            <Text
              tag="p"
              field={description}
              className="font-body mt-4 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/90 @md:text-lg"
            />
          )}
        </div>

        <div className="grid gap-8 @lg:grid-cols-2 @lg:items-start @lg:gap-12">
          <div className="grid grid-cols-2 gap-3 @md:gap-4">
            {tileResults.map((tile: HeroOfferingTileProps, index: number) => (
              <OfferingTileCard key={index} tile={tile} index={index} isPageEditing={isPageEditing} page={page} />
            ))}
            {showTilePlaceholders &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="bg-card/30 text-card-foreground flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-primary-foreground/40 p-4 text-center text-xs"
                >
                  Offering tile {index + 1}
                </div>
              ))}
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl @lg:min-h-[320px]">
            {image && (
              <ImageWrapper
                image={image}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt=""
                page={page}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 @sm:flex-row @sm:flex-wrap @sm:items-center @sm:gap-4">
          {primaryCta && (
            <ButtonBase
              buttonLink={primaryCta}
              variant="rounded-white"
              isPageEditing={isPageEditing}
              className="min-h-11 px-6"
            />
          )}
          {secondaryCta && (
            <ButtonBase
              buttonLink={secondaryCta}
              variant="outline"
              isPageEditing={isPageEditing}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 min-h-11 border-2 bg-transparent px-6"
            />
          )}
        </div>
      </div>
    </section>
  );
};
