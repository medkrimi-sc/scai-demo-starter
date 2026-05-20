import type { LinkField } from '@sitecore-content-sdk/nextjs';
import type { PrimaryNavItemProps, UtilityNavigationItemProps } from './global-header.props';

export const IA_BRAND_BLUE = '#064dd9';

/** Recommended CMS logo asset size (matches ia.ca header proportions). */
export const IA_HEADER_LOGO_DIMENSIONS = {
  desktop: { width: 200, height: 52, sizes: '200px' },
  mobile: { width: 149, height: 36, sizes: '149px' },
} as const;

export const IA_HOME_HREF = 'https://ia.ca/particuliers';

/** Site search results page (Home/Search item). */
export const IA_SEARCH_HREF = '/search';

export const IA_HEADER_PHONE = {
  href: 'tel:1-800-463-6236',
  text: '1-800-463-6236',
} as const;

export const IA_LANGUAGE_LINK = {
  href: 'https://ia.ca/individuals',
  text: 'EN',
  title: 'English',
} as const;

/** Default utility nav when CMS datasource has no items (local dev / empty tenant). */
export const IA_DEFAULT_UTILITY_LINKS: UtilityNavigationItemProps[] = [
  {
    link: {
      jsonValue: {
        value: { href: '/', text: 'Particuliers', linktype: 'internal' },
      } as LinkField,
    },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://ia.ca/entreprise',
          text: 'Entreprises et groupes',
          linktype: 'external',
        },
      } as LinkField,
    },
  },
  {
    link: {
      jsonValue: {
        value: {
          href: 'https://ia.ca/conseillers-courtiers',
          text: 'Conseillers et courtiers',
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
          href: 'https://ia.ca/particuliers/assurance',
          text: 'Assurance',
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
          href: 'https://ia.ca/particuliers/epargne-retraite',
          text: 'Épargne et retraite',
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
          href: 'https://ia.ca/particuliers/gestion-de-patrimoine',
          text: 'Gestion de patrimoine',
          linktype: 'external',
        },
      } as LinkField,
    },
    children: { results: [] },
  },
];

export const IA_DEFAULT_HEADER_CONTACT: LinkField = {
  value: {
    href: '#loginModal',
    text: 'Me connecter',
    linktype: 'external',
  },
};
