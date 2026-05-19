import type { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';
import type { AuthorReferenceField } from '@/types/AuthorTaxonomy.props';

export interface ArticleHeaderDatasource {
  imageRequired?: { jsonValue?: ImageField } | ImageField;
  eyebrowOptional?: { jsonValue?: Field<string> } | Field<string>;
}

export interface ArticleHeaderExternalFields {
  pageHeaderTitle?: { jsonValue?: Field<string> } | Field<string>;
  pageReadTime?: { jsonValue?: Field<string> } | Field<string>;
  pageDisplayDate?: { jsonValue?: Field<string> } | Field<string>;
  pageAuthor?: { jsonValue?: AuthorReferenceField } | { value?: AuthorReferenceField };
}

export type ArticleHeaderPropsInput = ComponentProps & {
  params?: { [key: string]: string | undefined };
  fields?: ArticleHeaderDatasource & {
    data?: {
      datasource?: ArticleHeaderDatasource;
      externalFields?: ArticleHeaderExternalFields;
    };
  };
  externalFields?: ArticleHeaderExternalFields;
};

function unwrapField<T>(field?: { jsonValue?: T } | T): T | undefined {
  if (!field) return undefined;
  if (typeof field === 'object' && field !== null && 'jsonValue' in field) {
    return (field as { jsonValue?: T }).jsonValue;
  }
  return field as T;
}

export function resolveArticleHeaderFields(props: ArticleHeaderPropsInput) {
  const nested = props.fields?.data;
  const datasource = nested?.datasource ?? props.fields;
  const external = nested?.externalFields ?? props.externalFields;

  return {
    imageRequired: unwrapField<ImageField>(datasource?.imageRequired),
    eyebrowOptional: unwrapField<Field<string>>(datasource?.eyebrowOptional),
    pageHeaderTitle: unwrapField<Field<string>>(external?.pageHeaderTitle),
    pageReadTime: unwrapField<Field<string>>(external?.pageReadTime),
    pageDisplayDate: unwrapField<Field<string>>(external?.pageDisplayDate),
    pageAuthor: unwrapField<AuthorReferenceField>(
      external?.pageAuthor as { jsonValue?: AuthorReferenceField } | AuthorReferenceField | undefined,
    ),
  };
}
