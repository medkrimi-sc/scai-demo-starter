'use client';

import type React from 'react';
import { useState } from 'react';
import { Clock, Share2, Check, Facebook, Linkedin, Twitter, Link as LinkIcon, Mail } from 'lucide-react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { FloatingDock } from '@/components/floating-dock/floating-dock.dev';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import type { ArticleHeaderPropsInput } from './article-header.utils';
import { resolveArticleHeaderFields } from './article-header.utils';
import { IA_NAVY, IA_PRIMARY_BLUE } from '@/components/article-listing/article-listing.constants';

export const ArticleHeaderIaAdvice: React.FC<ArticleHeaderPropsInput> = (props) => {
  const { page, params } = props;
  const isPageEditing = page?.mode?.isEditing ?? false;
  const routeFields = (page?.layout?.sitecore?.route?.fields ?? {}) as Record<string, unknown>;
  const resolved = resolveArticleHeaderFields(props, routeFields);
  const {
    imageRequired,
    eyebrowOptional,
    pageHeaderTitle,
    pageReadTime,
  } = resolved;

  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!props.fields && !props.externalFields) {
    return <NoDataFallback componentName="ArticleHeader" />;
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'email':
        window.location.href = `mailto:?subject=${title}&body=${url}`;
        return;
      case 'copy':
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            setCopySuccess(true);
            toast({ title: 'Link copied!', duration: 3000 });
          })
          .catch(() => {
            toast({ title: 'Copy failed', variant: 'destructive' });
          });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareLinks = [
    {
      title: 'Facebook',
      icon: <Facebook className="h-full w-full text-white" aria-hidden />,
      href: '#',
      onClick: () => handleShare('facebook'),
      ariaLabel: 'Share on Facebook',
    },
    {
      title: 'Twitter',
      icon: <Twitter className="h-full w-full text-white" aria-hidden />,
      href: '#',
      onClick: () => handleShare('twitter'),
      ariaLabel: 'Share on Twitter',
    },
    {
      title: 'LinkedIn',
      icon: <Linkedin className="h-full w-full text-white" aria-hidden />,
      href: '#',
      onClick: () => handleShare('linkedin'),
      ariaLabel: 'Share on LinkedIn',
    },
    {
      title: 'Email',
      icon: <Mail className="h-full w-full text-white" aria-hidden />,
      href: '#',
      onClick: () => handleShare('email'),
      ariaLabel: 'Share via email',
    },
    {
      title: 'Copy',
      icon: copySuccess ? (
        <Check className="h-full w-full text-green-400" aria-hidden />
      ) : (
        <LinkIcon className="h-full w-full text-white" aria-hidden />
      ),
      href: '#',
      onClick: () => handleShare('copy'),
      ariaLabel: copySuccess ? 'Link copied' : 'Copy link',
    },
  ];

  const showHero = Boolean(imageRequired?.value?.src || isPageEditing);
  const showEyebrow = Boolean(eyebrowOptional?.value || isPageEditing);
  const showTitle = Boolean(pageHeaderTitle?.value || isPageEditing);
  const showReadTime = Boolean(pageReadTime?.value || isPageEditing);

  return (
    <>
      <header
        data-component="ArticleHeader"
        data-variant="IaAdvice"
        className={cn('relative w-full', params?.styles)}
      >
        {showHero && (
          <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-[340px]">
            {imageRequired && (
              <ImageWrapper
                image={imageRequired}
                alt={pageHeaderTitle?.value || 'Article hero'}
                className="h-full w-full object-cover"
                wrapperClass="h-full w-full"
                priority
                page={page}
              />
            )}
          </div>
        )}

        <div className="relative z-10 mx-auto -mt-16 max-w-3xl px-5 pb-8 sm:-mt-20 sm:px-8 lg:-mt-24">
          <div className="rounded-sm bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
            {showEyebrow && eyebrowOptional && (
              <span
                className="mb-5 inline-block rounded-full border bg-white px-4 py-1 text-sm font-medium"
                style={{ borderColor: IA_PRIMARY_BLUE, color: IA_PRIMARY_BLUE }}
              >
                <Text field={eyebrowOptional} tag="span" />
              </span>
            )}

            {showTitle && pageHeaderTitle && (
              <Text
                tag="h1"
                field={pageHeaderTitle}
                className="text-pretty text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2rem] lg:text-[2.25rem]"
                style={{ color: IA_PRIMARY_BLUE }}
              />
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              {showReadTime && pageReadTime && (
                <div className="flex items-center gap-1.5 text-sm" style={{ color: IA_NAVY }}>
                  <Clock className="size-4 shrink-0" aria-hidden />
                  <Text tag="span" field={pageReadTime} />
                </div>
              )}

              <div className="relative ml-auto">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  style={{ color: IA_PRIMARY_BLUE }}
                  onClick={() => setShareOpen((open) => !open)}
                  aria-expanded={shareOpen}
                  aria-haspopup="true"
                >
                  <Share2 className="size-4" aria-hidden />
                  Share
                </button>
                {shareOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2">
                    <FloatingDock items={shareLinks} forceCollapse />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  );
};
