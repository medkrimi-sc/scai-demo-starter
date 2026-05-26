'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TransformedArticleCard } from './article-listing.props';
import { IA_CARD_BG, IA_NAVY, IA_PRIMARY_BLUE, IA_TEXT_MUTED } from './article-listing.constants';

type ArticleListingCardProps = {
  article: TransformedArticleCard;
  isPageEditing?: boolean;
};

export function ArticleListingCard({ article, isPageEditing }: ArticleListingCardProps) {
  const { link, image, title, readTime, tag, secondaryTag } = article;

  const cardInner = (
    <>
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {(tag || secondaryTag) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tag && (
              <span
                className="rounded-full border bg-white px-3 py-1 text-xs font-medium"
                style={{ borderColor: IA_PRIMARY_BLUE, color: IA_PRIMARY_BLUE }}
              >
                {tag}
              </span>
            )}
            {secondaryTag && (
              <span
                className="rounded-full border bg-white px-3 py-1 text-xs font-medium"
                style={{ borderColor: IA_PRIMARY_BLUE, color: IA_PRIMARY_BLUE }}
              >
                {secondaryTag}
              </span>
            )}
          </div>
        )}

        <h3
          className="text-pretty text-lg font-bold leading-snug sm:text-xl"
          style={{ color: IA_NAVY }}
        >
          {title}
        </h3>

        {readTime && (
          <div
            className="mt-auto flex items-center gap-1.5 pt-5 text-sm"
            style={{ color: IA_TEXT_MUTED }}
          >
            <Clock className="size-4 shrink-0" aria-hidden />
            <span>{readTime}</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <article
      className={cn('flex h-full flex-col overflow-hidden rounded-sm')}
      style={{ backgroundColor: IA_CARD_BG }}
    >
      {isPageEditing ? (
        cardInner
      ) : (
        <NextLink href={link} className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          {cardInner}
        </NextLink>
      )}
    </article>
  );
}
