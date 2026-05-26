import type { LinkField } from '@sitecore-content-sdk/nextjs';
import type { PrimaryNavItemProps, UtilityNavigationItemProps } from './global-header.props';

/** Viatris brand purple (logo accent). */
export const IA_BRAND_BLUE = '#703E97';

/** Viatris navy (logo wordmark). */
export const VIATRIS_NAVY = '#2A276E';

/** Recommended CMS logo asset size (matches viatris.com header proportions). */
export const IA_HEADER_LOGO_DIMENSIONS = {
  desktop: { width: 150, height: 40, sizes: '150px' },
  mobile: { width: 120, height: 32, sizes: '120px' },
} as const;

export const IA_HOME_HREF = 'https://www.viatris.com/';

/** Site search results page (Home/Search item). */
export const IA_SEARCH_HREF = '/search';

export const IA_HEADER_PHONE = {
  href: 'tel:+1-800-000-0000',
  text: 'Contact us',
} as const;

export const IA_LANGUAGE_LINK = {
  href: 'https://www.viatris.com/',
  text: 'EN',
  title: 'English',
} as const;

/** Default utility nav when CMS datasource has no items (local dev / empty tenant). */
export const IA_DEFAULT_UTILITY_LINKS: UtilityNavigationItemProps[] = [
  {
    link: {
      jsonValue: {
        value: { href: 'https://www.viatris.com/about-us', text: 'About', linktype: 'external' },
      } as LinkField,
    },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://www.viatris.com/impact',
          text: 'Impact',
          linktype: 'external',
        },
      } as LinkField,
    },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://www.viatris.com/newsroom',
          text: 'Newsroom',
          linktype: 'external',
        },
      } as LinkField,
    },
  },
];

/** Default primary nav when CMS datasource has no items. */
export const IA_DEFAULT_PRIMARY_LINKS: PrimaryNavItemProps[] = [
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://www.viatris.com/products',
          text: 'Products',
          linktype: 'external',
        },
      } as LinkField,
    },
    children: { results: [] },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://www.viatris.com/impact',
          text: 'Impact',
          linktype: 'external',
        },
      } as LinkField,
    },
    children: { results: [] },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://www.viatris.com/about-us',
          text: 'About us',
          linktype: 'external',
        },
      } as LinkField,
    },
    children: { results: [] },
  },
];

export const IA_DEFAULT_HEADER_CONTACT: LinkField = {
  value: {
    href: 'https://www.viatris.com/contact',
    text: 'Contact',
    linktype: 'external',
  },
};
