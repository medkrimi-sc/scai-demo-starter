import type { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import type { ComponentProps } from '@/lib/component-props';
import type { AuthorReferenceField } from '@/types/AuthorTaxonomy.props';

export interface ArticleHeaderDatasource {
  imageRequired?: { jsonValue?: ImageField } | ImageField;
  eyebrowOptional?: { jsonValue?: Field<string> } | Field<string>;
}

export interface ArticleHeaderExternalFields {
  pageHeaderTitle?: { jsonValue?: Field<string> } | Field<string>;
  pageTitle?: { jsonValue?: Field<string> } | Field<string>;
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

function getRouteTextField(
  routeFields: Record<string, unknown> | undefined,
  fieldName: string,
): Field<string> | undefined {
  const raw = routeFields?.[fieldName];
  if (!raw || typeof raw !== 'object') {
    return undefined;
  }

  if ('jsonValue' in raw) {
    return unwrapField<Field<string>>(raw as { jsonValue?: Field<string> });
  }

  if ('value' in raw) {
    return raw as Field<string>;
  }

  return undefined;
}

export function resolveArticleHeaderFields(
  props: ArticleHeaderPropsInput,
  routeFields?: Record<string, unknown>,
) {
  const nested = props.fields?.data;
  const datasource =
    nested?.datasource ??
    (props.fields && ('imageRequired' in props.fields || 'eyebrowOptional' in props.fields)
      ? props.fields
      : undefined);

  const external =
    nested?.externalFields ??
    props.externalFields ??
    (props.fields && 'pageHeaderTitle' in props.fields ? (props.fields as ArticleHeaderExternalFields) : undefined);

  const pageHeaderTitle =
    unwrapField<Field<string>>(external?.pageHeaderTitle) ??
    getRouteTextField(routeFields, 'pageHeaderTitle') ??
    getRouteTextField(routeFields, 'pageTitle');

  const pageReadTime =
    unwrapField<Field<string>>(external?.pageReadTime) ??
    getRouteTextField(routeFields, 'pageReadTime');

  const pageDisplayDate =
    unwrapField<Field<string>>(external?.pageDisplayDate) ??
    getRouteTextField(routeFields, 'pageDisplayDate');

  return {
    imageRequired: unwrapField<ImageField>(datasource?.imageRequired),
    eyebrowOptional: unwrapField<Field<string>>(datasource?.eyebrowOptional),
    pageHeaderTitle,
    pageReadTime,
    pageDisplayDate,
    pageAuthor: unwrapField<AuthorReferenceField>(
      external?.pageAuthor as { jsonValue?: AuthorReferenceField } | AuthorReferenceField | undefined,
    ),
  };
}
