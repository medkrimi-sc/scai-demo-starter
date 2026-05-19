'use client';

import type React from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import type { ArticleListingProps } from './article-listing.props';
import { ArticleListingDefault } from './ArticleListingDefault.dev';
import { ArticleListingAdviceZone } from './ArticleListingAdviceZone.dev';

export const Default: React.FC<ArticleListingProps> = (props) => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing ?? false;
  return <ArticleListingDefault {...props} isPageEditing={isEditing} page={page} />;
};

export const AdviceZone: React.FC<ArticleListingProps> = (props) => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing ?? false;
  return <ArticleListingAdviceZone {...props} isPageEditing={isEditing} page={page} />;
};
