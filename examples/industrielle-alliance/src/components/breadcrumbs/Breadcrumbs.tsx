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

function BreadcrumbsList({
  ancestors,
  name,
  linkClassName,
  listClassName,
}: {
  ancestors?: BreadcrumbsPage[];
  name: string;
  linkClassName?: string;
  listClassName?: string;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={listClassName}>
        {ancestors?.map((ancestor: BreadcrumbsPage, index) => {
          const title =
            ancestor.navigationTitle?.jsonValue.value || ancestor.title?.jsonValue.value;

          return (
            <span key={index} className="contents">
              <BreadcrumbItem>
                <BreadcrumbLink href={ancestor.url?.href || ''} className={linkClassName}>
                  {title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </span>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage className={linkClassName}>{truncate(name)}</BreadcrumbPage>
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
  const { ancestors, name } = fields?.data?.datasource ?? {};

  const breadcrumbItems = [
    ...(ancestors?.map((ancestor) => ({
      name: (ancestor.navigationTitle?.jsonValue.value ||
        ancestor.title?.jsonValue.value) as string,
      url: ancestor.url?.href ? `${getBaseUrl()}${ancestor.url.href}` : undefined,
    })) || []),
    { name, url: undefined },
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
          name={name}
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
