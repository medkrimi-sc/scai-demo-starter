import type React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ComponentProps } from '@/lib/component-props';
import { GqlFieldString } from '@/types/gql.props';
import { LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import { generateBreadcrumbListSchema } from '@/lib/structured-data/schema';
import { getBaseUrl } from '@/lib/utils';
import { StructuredData } from '@/components/structured-data/StructuredData';
import { cn } from '@/lib/utils';

type BreadcrumbsProps = ComponentProps & BreadcrumbsData;

type BreadcrumbsData = {
  fields: {
    data: {
      datasource: {
        ancestors: BreadcrumbsPage[];
        name: string;
        title?: GqlFieldString;
        navigationTitle?: GqlFieldString;
      };
    };
  };
};

type BreadcrumbsPage = {
  name: string;
  title: GqlFieldString;
  navigationTitle: GqlFieldString;
  url?: LinkFieldValue;
};

const truncate = (str: string): string => {
  return str?.length > 25 ? str.replace(/(.{24})..+/, '$1').trim().concat('...') : str;
};

export function getBreadcrumbLabel(
  page: BreadcrumbsPage,
  options?: { includeNameFallback?: boolean },
): string {
  const label =
    page.navigationTitle?.jsonValue?.value?.trim() ||
    page.title?.jsonValue?.value?.trim() ||
    '';

  if (label || !options?.includeNameFallback) {
    return label;
  }

  return page.name?.trim() || '';
}

export function getVisibleAncestors(ancestors?: BreadcrumbsPage[]): BreadcrumbsPage[] {
  if (!ancestors?.length) {
    return [];
  }

  return ancestors.filter((ancestor) => Boolean(getBreadcrumbLabel(ancestor)));
}

function BreadcrumbsList({
  ancestors,
  currentLabel,
  linkClassName,
  listClassName,
}: {
  ancestors?: BreadcrumbsPage[];
  currentLabel: string;
  linkClassName?: string;
  listClassName?: string;
}) {
  const visibleAncestors = getVisibleAncestors(ancestors);

  return (
    <Breadcrumb>
      <BreadcrumbList className={listClassName}>
        {visibleAncestors.map((ancestor, index) => {
          const title = getBreadcrumbLabel(ancestor);

          return (
            <span key={`${ancestor.name}-${index}`} className="contents">
              <BreadcrumbItem>
                <BreadcrumbLink href={ancestor.url?.href || '#'} className={linkClassName}>
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </span>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage className={linkClassName}>{truncate(currentLabel)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbsContent({
  fields,
  className,
  linkClassName,
  listClassName,
}: BreadcrumbsProps & { className?: string; linkClassName?: string; listClassName?: string }) {
  const datasource = fields?.data?.datasource;
  const { ancestors, name, title, navigationTitle } = datasource ?? {};

  const currentLabel = getBreadcrumbLabel(
    {
      name: name ?? '',
      title: title ?? { jsonValue: { value: '' } },
      navigationTitle: navigationTitle ?? { jsonValue: { value: '' } },
    },
    { includeNameFallback: true },
  );

  const visibleAncestors = getVisibleAncestors(ancestors);

  const breadcrumbItems = [
    ...visibleAncestors.map((ancestor) => ({
      name: getBreadcrumbLabel(ancestor),
      url: ancestor.url?.href ? `${getBaseUrl()}${ancestor.url.href}` : undefined,
    })),
    { name: currentLabel, url: undefined },
  ];

  const breadcrumbSchema = generateBreadcrumbListSchema(breadcrumbItems);

  if (!fields) {
    return <NoDataFallback componentName="Breadcrumbs" />;
  }

  if (ancestors) {
    return (
      <div className={className} data-component="Breadcrumbs">
        <StructuredData id="breadcrumb-schema" data={breadcrumbSchema} />
        <BreadcrumbsList
          ancestors={ancestors}
          currentLabel={currentLabel}
          linkClassName={linkClassName}
          listClassName={listClassName}
        />
      </div>
    );
  }

  const homeBreadcrumbSchema = generateBreadcrumbListSchema([
    { name: 'Home', url: getBaseUrl() },
  ]);

  return (
    <div className={className} data-component="Breadcrumbs">
      <StructuredData id="breadcrumb-schema-home" data={homeBreadcrumbSchema} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className={linkClassName}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export const Default: React.FC<BreadcrumbsProps> = (props) => {
  return <BreadcrumbsContent {...props} />;
};

const IA_BREADCRUMB_TEXT = 'text-[#064dd9]';

export const IaAdvice: React.FC<BreadcrumbsProps> = (props) => {
  return (
    <BreadcrumbsContent
      {...props}
      className={cn('mx-auto max-w-3xl px-5 pt-6 sm:px-8', props.params?.styles)}
      listClassName={IA_BREADCRUMB_TEXT}
      linkClassName={cn(
        'text-sm font-medium hover:underline hover:text-[#064dd9]',
        IA_BREADCRUMB_TEXT,
      )}
    />
  );
};
