'use client';

import React from 'react';
import { Link, Text } from '@sitecore-content-sdk/nextjs';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { ArticleListingProps } from './article-listing.props';
import { transformFeaturedArticles } from './article-listing.props';
import { ArticleListingCard } from './ArticleListingCard.dev';
import { IA_NAVY, IA_PRIMARY_BLUE } from './article-listing.constants';

export function ArticleListingAdviceZone({
  fields,
  params,
  isPageEditing: propIsEditing,
  page,
}: ArticleListingProps) {
  const { titleOptional, descriptionOptional, linkOptional, featuredContent } = fields || {};
  const isPageEditing = propIsEditing ?? page?.mode?.isEditing ?? false;
  const articles = React.useMemo(
    () => transformFeaturedArticles(featuredContent),
    [featuredContent],
  );

  if (!fields?.featuredContent) {
    return <NoDataFallback componentName="Article Listing" />;
  }

  const sectionId = 'advice-zone-listing';
  const viewAllHref = linkOptional?.value?.href;
  const viewAllText = linkOptional?.value?.text;

  return (
    <section
      data-component="ArticleListing"
      data-variant="AdviceZone"
      className="@container w-full"
      {...(titleOptional?.value ? { 'aria-labelledby': sectionId } : {})}
    >
      <div className={cn('mx-auto max-w-screen-2xl px-5 py-12 sm:px-8 lg:py-16', params?.styles)}>
        {(titleOptional?.value || descriptionOptional?.value || isPageEditing) && (
          <header className="mb-10 max-w-3xl">
            {titleOptional && (
              <Text
                tag="h2"
                id={sectionId}
                field={titleOptional}
                className="text-pretty text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ color: IA_NAVY }}
              />
            )}
            {descriptionOptional && (
              <Text
                tag="p"
                field={descriptionOptional}
                className="mt-4 text-base leading-relaxed sm:text-lg"
                style={{ color: IA_NAVY }}
              />
            )}
          </header>
        )}

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {articles.map((article, index) => (
              <ArticleListingCard
                key={article.link || index}
                article={article}
                isPageEditing={isPageEditing}
              />
            ))}
          </div>
        ) : (
          isPageEditing && (
            <p className="text-muted-foreground text-sm">Add articles to Featured Content.</p>
          )
        )}

        {(viewAllHref || isPageEditing) && linkOptional && (
          <div className="mt-10">
            {isPageEditing ? (
              <Link
                field={linkOptional}
                className="inline-flex items-center gap-2 text-base font-medium"
                style={{ color: IA_PRIMARY_BLUE }}
              />
            ) : (
              viewAllHref &&
              viewAllHref !== '#' && (
                <a
                  href={viewAllHref}
                  className="inline-flex items-center gap-2 text-base font-medium hover:underline"
                  style={{ color: IA_PRIMARY_BLUE }}
                >
                  {viewAllText}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
