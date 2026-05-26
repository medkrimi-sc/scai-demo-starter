import { Field, LinkField, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface HeroParams {
  [key: string]: any; // eslint-disable-line
}

/** One tile in the OfferingsGrid hero (e.g. product / insurance card). */
export type HeroOfferingTileProps = {
  heading: { jsonValue: Field<string> };
  description?: { jsonValue: Field<string> };
  image?: { jsonValue: ImageField };
  link?: { jsonValue?: LinkField };
};

export interface HeroFields {
  title: Field<string>;
  image: ImageField;
  description?: Field<string>;
  bannerText?: Field<string>;
  bannerCTA?: LinkField;
  searchLink?: LinkField;
  /** Up to six offering tiles for the `OfferingsGrid` variant. */
  tiles?: { results: HeroOfferingTileProps[] };
  /** Primary pill CTA (e.g. “See all our products”). */
  primaryCta?: LinkField;
  /** Secondary pill CTA (e.g. “Find an advisor”). */
  secondaryCta?: LinkField;
  dictionary: {
    SubmitCTALabel?: string;
    ZipPlaceholder?: string;
  };
}

export interface HeroProps extends ComponentProps {
  params: HeroParams;
  fields: HeroFields;
  isPageEditing?: boolean;
}
