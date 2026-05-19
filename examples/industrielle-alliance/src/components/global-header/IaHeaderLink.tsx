'use client';

import type React from 'react';
import Link from 'next/link';
import { Link as ContentSdkLink, type LinkField } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';

type IaHeaderLinkProps = {
  field?: LinkField;
  href?: string;
  children: React.ReactNode;
  className?: string;
  isPageEditing?: boolean;
  prefetch?: boolean;
  title?: string;
  'aria-label'?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export function IaHeaderLink({
  field,
  href,
  children,
  className,
  isPageEditing,
  prefetch,
  title,
  'aria-label': ariaLabel,
  onClick,
  style,
}: IaHeaderLinkProps) {
  const resolvedHref = field?.value?.href ?? href;
  const content = children ?? field?.value?.text;

  if (isPageEditing && field) {
    return (
      <ContentSdkLink
        field={field}
        className={cn(className)}
        style={style}
        title={title}
        aria-label={ariaLabel}
      >
        {content}
      </ContentSdkLink>
    );
  }

  if (!resolvedHref) {
    return (
      <span className={className} style={style}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={resolvedHref}
      className={cn(className)}
      style={style}
      {...(prefetch !== undefined ? { prefetch } : {})}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}
