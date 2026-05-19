'use client';

import React from 'react';
import Image from 'next/image';
import { Link, Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { EditableButton as Button } from '@/components/button-component/ButtonComponent';
import { NoDataFallback } from '@/utils/NoDataFallback';
import type { ArticleListingProps } from './article-listing.props';
import { transformFeaturedArticles } from './article-listing.props';

export function ArticleListingDefault({
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

  const featuredArticles = articles.slice(0, 2);
  const regularArticles = articles.slice(2);
  const sectionId = 'article-listing-section';

  if (!fields?.featuredContent) {
    return <NoDataFallback componentName="Article Listing" />;
  }

  return (
    <section
      data-component="ArticleListing"
      data-variant="Default"
      className="@container"
      {...(titleOptional?.value ? { 'aria-labelledby': sectionId } : {})}
    >
      <div className={cn('w-full', params?.styles)}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {(titleOptional || linkOptional?.value?.href || isPageEditing) && (
            <div className="@md:flex-row @md:justify-between @md:items-center mb-20 flex flex-col">
              {titleOptional && (
                <div className="@md:mb-0 mb-4">
                  <Text
                    tag="h2"
                    id={sectionId}
                    field={titleOptional}
                    className="font-heading @md:text-6xl text-primary text-4xl font-normal leading-[1.20] tracking-tighter"
                  />
                  {descriptionOptional && (
                    <Text
                      tag="p"
                      field={descriptionOptional}
                      className="text-muted-foreground font-body mt-5 max-w-3xl text-lg font-normal leading-relaxed"
                    />
                  )}
                </div>
              )}
              {(linkOptional?.value?.href || isPageEditing) && (
                <Button
                  buttonLink={
                    linkOptional || {
                      value: {
                        href: '',
                        text: 'Add link',
                        linktype: 'external',
                        url: '',
                        anchor: '',
                        target: '',
                      },
                    }
                  }
                  isPageEditing={isPageEditing}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                />
              )}
            </div>
          )}

          <div className="@md:grid-cols-2 mb-7 grid gap-8">
            {featuredArticles.map((article, index) => (
              <article key={index} className="group/article">
                <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg">
                  {article.image && (
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                  )}
                </div>
                {isPageEditing ? (
                  <h3 className="font-heading text-3xl font-medium">{article.title}</h3>
                ) : (
                  <Link field={{ value: { href: article.link } }} className="block">
                    <h3 className="font-heading text-3xl font-medium group-hover/article:underline">
                      {article.title}
                    </h3>
                  </Link>
                )}
                <p className="text-muted-foreground mt-4 line-clamp-2">{article.summary}</p>
                {article.readTime && (
                  <p className="text-muted-foreground mt-4 text-sm">{article.readTime}</p>
                )}
              </article>
            ))}
          </div>

          <div className="@sm:grid-cols-2 @lg:grid-cols-3 grid gap-8">
            {regularArticles.map((article, index) => (
              <article key={index} className="flex h-full flex-col p-4">
                {isPageEditing ? (
                  <h3 className="font-heading text-2xl font-medium">{article.title}</h3>
                ) : (
                  <Link field={{ value: { href: article.link } }} className="block">
                    <h3 className="font-heading text-2xl font-medium group-hover/article:underline">
                      {article.title}
                    </h3>
                  </Link>
                )}
                {article.readTime && (
                  <p className="text-muted-foreground mt-auto pt-6 text-sm">{article.readTime}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
