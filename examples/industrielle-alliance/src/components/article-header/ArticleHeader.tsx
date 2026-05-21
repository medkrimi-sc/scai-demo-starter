'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Facebook, Linkedin, Twitter, Link, Check, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text } from '@sitecore-content-sdk/nextjs';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Badge } from '@/components/ui/badge';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { ButtonBase } from '../button-component/ButtonComponent';
import { FloatingDock } from '@/components/floating-dock/floating-dock.dev';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import type { ArticleHeaderPropsInput } from './article-header.utils';
import { resolveArticleHeaderFields } from './article-header.utils';
import { ArticleHeaderIaAdvice } from './ArticleHeaderIaAdvice.dev';

export const IaAdvice: React.FC<ArticleHeaderPropsInput> = (props) => {
  return <ArticleHeaderIaAdvice {...props} />;
};

export const Default: React.FC<ArticleHeaderPropsInput> = (props) => {
  const { page, params } = props;
  const routeFields = (page?.layout?.sitecore?.route?.fields ?? {}) as Record<string, unknown>;
  const resolved = resolveArticleHeaderFields(props, routeFields);
  const {
    imageRequired,
    eyebrowOptional,
    pageHeaderTitle,
    pageReadTime,
    pageDisplayDate,
    pageAuthor,
  } = resolved;

  const authorFields = pageAuthor?.fields;
  const authorValue = authorFields
    ? {
        personProfileImage: authorFields.personProfileImage,
        personFirstName: authorFields.personFirstName,
        personLastName: authorFields.personLastName,
        personJobTitle: authorFields.personJobTitle,
      }
    : undefined;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { toast } = useToast();
  const [copySuccess, setCopySuccess] = useState(false);
  const [forceCollapse] = useState(true);
  const copyNotificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const rect = headerRef.current!.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!props.fields && !props.externalFields) {
    return <NoDataFallback componentName="ArticleHeader" />;
  }

  const parallaxStyle = imageRequired?.value?.src
    ? {
        transform: prefersReducedMotion
          ? 'none'
          : `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        transition: prefersReducedMotion ? 'none' : 'transform 200ms ease-out',
      }
    : {};

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
            toast({ title: 'Link copied!', duration: 3000 });
            setCopySuccess(true);
            if (copyNotificationRef.current) {
              copyNotificationRef.current.textContent = 'Link copied to clipboard';
            }
          })
          .catch(() => {
            toast({ title: 'Copy failed', variant: 'destructive' });
          });
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const links = [
    {
      title: 'Share on Facebook',
      icon: <Facebook className="h-full w-full text-white" aria-hidden="true" />,
      href: '#',
      onClick: () => handleShare('facebook'),
      ariaLabel: 'Share on Facebook',
    },
    {
      title: 'Share on Twitter',
      icon: <Twitter className="h-full w-full text-white" aria-hidden="true" />,
      href: '#',
      onClick: () => handleShare('twitter'),
      ariaLabel: 'Share on Twitter',
    },
    {
      title: 'Share on LinkedIn',
      icon: <Linkedin className="h-full w-full text-white" aria-hidden="true" />,
      href: '#',
      onClick: () => handleShare('linkedin'),
      ariaLabel: 'Share on LinkedIn',
    },
    {
      title: 'Share via Email',
      icon: <Mail className="h-full w-full text-white" aria-hidden="true" />,
      href: '#',
      onClick: () => handleShare('email'),
      ariaLabel: 'Share via Email',
    },
    {
      title: 'Copy Link',
      icon: copySuccess ? (
        <Check className="h-full w-full text-green-500" aria-hidden="true" />
      ) : (
        <Link className="h-full w-full text-white" aria-hidden="true" />
      ),
      href: '#',
      onClick: () => handleShare('copy'),
      ariaLabel: copySuccess ? 'Link copied' : 'Copy link',
    },
  ];

  return (
    <>
      <header
        className={cn('@container article-header relative mb-[86px] overflow-hidden', params?.styles)}
        ref={headerRef}
      >
        <div className="relative z-0 h-auto overflow-hidden bg-black">
          <div
            className="absolute inset-0 h-[120%] w-[120%] bg-cover bg-center opacity-70"
            style={parallaxStyle}
          >
            <ImageWrapper
              image={imageRequired}
              alt={pageHeaderTitle?.value || 'Article header image'}
              className="h-full w-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              ref={imageRef}
              page={page}
            />
          </div>
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="@xs:h-[125px] @sm:h-[150px] @md:h-[140px] @lg:h-[140px] absolute bottom-0 h-[90px] w-full bg-white" />

          <div className="relative z-10 mx-auto flex h-full flex-col justify-between pb-6 pt-[220px]">
            <div className="flex flex-col">
              <ButtonBase
                buttonLink={{ value: { href: '/news', text: 'Back to news' } }}
                className="absolute left-0 top-[41px] mb-8 inline-flex items-center text-white/90 hover:text-white"
                icon={{ value: 'arrow-left' }}
                variant="link"
                iconPosition="leading"
              />
              {eyebrowOptional && (
                <Badge className="bg-accent text-accent-foreground font-body mx-auto mb-4 inline-block text-sm font-medium">
                  <Text field={eyebrowOptional} />
                </Badge>
              )}
              {pageHeaderTitle && (
                <Text
                  tag="h1"
                  className="font-heading mx-auto max-w-4xl px-6 text-center text-4xl font-normal tracking-tighter text-white antialiased @md:text-[62px]"
                  field={pageHeaderTitle}
                />
              )}
              {(pageReadTime || pageDisplayDate) && (
                <div className="mb-8 flex flex-col items-center justify-center space-x-2 text-center text-white/70 @md:flex-row">
                  {pageReadTime && <Text tag="span" field={pageReadTime} />}
                  {pageReadTime && pageDisplayDate && (
                    <span className="hidden @md:inline-block">•</span>
                  )}
                  {pageDisplayDate && <Text tag="span" field={pageDisplayDate} />}
                </div>
              )}
            </div>

            <div className="mx-6 mb-auto grid grid-cols-2 items-start @md:mx-auto @md:grid @md:w-full @md:max-w-screen-2xl @md:grid-cols-12 @md:gap-8">
              {authorValue && (
                <div className="col-span-1 flex h-auto items-center justify-center gap-4 p-6 @md:col-span-3 @md:h-[250px] @md:items-start @md:justify-end @md:pt-4">
                  <Avatar>
                    <AvatarImage
                      src={authorValue.personProfileImage?.value?.src}
                      alt={`${authorValue.personFirstName?.value} ${authorValue.personLastName?.value}`}
                    />
                    <AvatarFallback>
                      {`${authorValue.personFirstName?.value} ${authorValue.personLastName?.value}`}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">
                      {authorValue.personFirstName?.value} {authorValue.personLastName?.value}
                    </p>
                    {authorValue.personJobTitle && (
                      <Text tag="p" field={authorValue.personJobTitle} className="text-sm text-white/70" />
                    )}
                  </div>
                </div>
              )}

              <div className="col-span-2 mx-auto flex aspect-[16/9] w-full max-w-[800px] justify-center overflow-hidden rounded-3xl @md:col-span-6">
                <ImageWrapper
                  image={imageRequired}
                  alt={pageHeaderTitle?.value || 'Article header image'}
                  className="object-cover"
                  priority
                  page={page}
                />
              </div>

              <div className="hidden h-auto items-center justify-center gap-4 p-6 @md:col-span-3 @md:flex @md:h-[250px] @md:items-start @md:justify-start @md:pt-4">
                <p className="m-0 mb-2 font-medium text-white">Share</p>
                <FloatingDock items={links} forceCollapse={forceCollapse} />
              </div>
            </div>
          </div>
        </div>
        <div ref={copyNotificationRef} className="sr-only" aria-live="polite" />
      </header>
      <Toaster />
    </>
  );
};
