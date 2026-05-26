'use client';

import type React from 'react';
import Link from 'next/link';
import type { LinkField } from '@sitecore-content-sdk/nextjs';
import { CompatibleLink } from '@/components/content-sdk/CompatibleLink';
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

  if (field) {
    return (
      <CompatibleLink
        field={field}
        editable={!!isPageEditing}
        className={cn(className)}
        style={style}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(prefetch !== undefined ? { prefetch } : {})}
      >
        {content}
      </CompatibleLink>
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
