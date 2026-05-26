import type { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';
import type { ReferenceField } from '@/types/ReferenceField.props';
import type { AuthorReferenceField } from '@/types/AuthorTaxonomy.props';

export interface ArticleListingParams {
  [key: string]: string; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type ArticleItemReferenceField = ReferenceField & {
  fields: ArticleItemFields;
};

export interface ArticleItemFields {
  pageTitle: Field<string>;
  pageSummary: Field<string>;
  pageThumbnail: ImageField;
  pageReadTime: Field<string>;
  pageShortTitle?: Field<string>;
  taxAuthor?: AuthorReferenceField;
}

export interface ArticleListingFields {
  titleOptional?: Field<string>;
  descriptionOptional?: Field<string>;
  linkOptional?: LinkField;
  featuredContent: ArticleItemReferenceField[];
}

export interface ArticleListingProps extends ComponentProps {
  params: ArticleListingParams;
  fields: ArticleListingFields;
  isPageEditing?: boolean;
}

export interface TransformedArticleCard {
  link: string;
  image: string;
  title: string;
  summary: string;
  readTime: string;
  tag?: string;
  secondaryTag?: string;
}

export function transformFeaturedArticles(
  featuredContent: ArticleItemReferenceField[] | undefined,
): TransformedArticleCard[] {
  if (!featuredContent?.length) return [];

  return featuredContent.map((article) => ({
    link: article.url || '',
    image: article.fields?.pageThumbnail?.value?.src || '',
    title: article.fields?.pageTitle?.value || '',
    summary: article.fields?.pageSummary?.value || '',
    readTime: article.fields?.pageReadTime?.value || '',
    tag: article.fields?.pageShortTitle?.value?.trim() || undefined,
    secondaryTag: undefined,
  }));
}
