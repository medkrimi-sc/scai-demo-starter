'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useToggleWithClickOutside } from '@/hooks/useToggleWithClickOutside';
import { IaNavIcon } from './IaNavIcons';
import { IA_SEARCH_HREF } from './ia-header.constants';

const DICTIONARY_KEYS = {
  SEARCH_GO_LABEL: 'Go',
  SEARCH_GO_DESCRIPTIVE: 'Go_To_Search_Results',
  SEARCH_LABEL: 'Search',
  SEARCH_INPUT_PLACEHOLDER: 'Search_Input_Placeholder',
} as const;

function buildSearchUrl(baseHref: string, searchTerm: string): string {
  const [pathWithQuery = '', hash = ''] = baseHref.split('#');
  const [pathname = '', initialQuery = ''] = pathWithQuery.split('?');
  const params = new URLSearchParams(initialQuery);

  if (searchTerm.trim()) {
    params.set('q', searchTerm.trim());
  } else {
    params.delete('q');
  }

  const query = params.toString();
  const hashPart = hash ? `#${hash}` : '';
  return `${pathname}${query ? `?${query}` : ''}${hashPart}`;
}

type IaSearchBoxProps = {
  variant?: 'desktop' | 'mobile';
  className?: string;
};

export const IaSearchBox: React.FC<IaSearchBoxProps> = ({ variant = 'desktop', className }) => {
  const t = useTranslations();
  const { isVisible, setIsVisible, ref } = useToggleWithClickOutside<HTMLDivElement>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchUrl = buildSearchUrl(IA_SEARCH_HREF, searchTerm);
  const isDesktop = variant === 'desktop';

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        title={t(DICTIONARY_KEYS.SEARCH_LABEL) || 'Rechercher'}
        aria-label={t(DICTIONARY_KEYS.SEARCH_LABEL) || 'Rechercher'}
        aria-expanded={isVisible}
        onClick={() => setIsVisible(!isVisible)}
        className={cn(
          'inline-flex items-center justify-center rounded-sm p-2 transition-colors',
          isDesktop
            ? 'text-secondary-foreground hover:bg-white/10'
            : 'text-primary',
        )}
      >
        <IaNavIcon name="search" size={24} color={isDesktop ? 'currentColor' : undefined} />
      </button>

      <div
        className={cn(
          'bg-background border-border absolute z-50 border shadow-lg transition-all duration-200',
          isDesktop ? 'top-full right-0 mt-2 w-80' : 'top-full right-0 left-0 mt-1',
          isVisible
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="p-4">
          <p className="mb-3 text-sm font-medium text-[#064dd9]">
            {t(DICTIONARY_KEYS.SEARCH_LABEL) || 'Search'}
          </p>
          <div className="flex gap-2">
            <input
              type="search"
              placeholder={t(DICTIONARY_KEYS.SEARCH_INPUT_PLACEHOLDER) || 'Search articles...'}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#064dd9] focus-visible:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = searchUrl;
                }
              }}
            />
            <Link
              href={searchUrl}
              prefetch={false}
              className="bg-primary text-primary-foreground inline-flex shrink-0 items-center rounded-md px-4 py-2 text-sm font-medium"
              aria-label={
                t(DICTIONARY_KEYS.SEARCH_GO_DESCRIPTIVE) ||
                t(DICTIONARY_KEYS.SEARCH_GO_LABEL) ||
                'Go to search results'
              }
            >
              {t(DICTIONARY_KEYS.SEARCH_GO_LABEL) || 'Go'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
