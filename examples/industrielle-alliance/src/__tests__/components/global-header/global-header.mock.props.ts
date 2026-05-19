import { GlobalHeaderProps } from '@/components/global-header/global-header.props';
import { Page } from '@sitecore-content-sdk/nextjs';

const mockPageBase = {
  mode: {
    isEditing: false,
    isPreview: false,
    isNormal: true,
    name: 'normal' as const,
    designLibrary: { isVariantGeneration: false },
    isDesignLibrary: false,
  },
  layout: {
    sitecore: {
      context: {},
      route: null,
    },
  },
  locale: 'fr-CA',
} as Page;

export const mockGlobalHeaderProps: GlobalHeaderProps = {
  isPageEditing: false,
  fields: {
    data: {
      item: {
        logo: {
          jsonValue: {
            value: {
              src: '',
              alt: 'iA Groupe financier',
              width: '232',
              height: '124',
            },
          },
        },
        utilityNavigationLinks: {
          targetItems: [
            {
              link: {
                jsonValue: {
                  value: {
                    href: '/',
                    text: 'Particuliers',
                    linktype: 'internal',
                  },
                },
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
                },
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
                },
              },
            },
          ],
        },
        primaryNavigationLinks: {
          targetItems: [
            {
              link: {
                jsonValue: {
                  value: {
                    href: 'https://ia.ca/particuliers/assurance',
                    text: 'Assurance',
                    linktype: 'external',
                  },
                },
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
                },
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
                },
              },
              children: { results: [] },
            },
          ],
        },
        headerContact: {
          jsonValue: {
            value: {
              href: '#loginModal',
              text: 'Me connecter',
              linktype: 'external',
            },
          },
        },
      },
    },
  },
  params: {},
  rendering: {
    dataSource: '',
    componentName: 'GlobalHeader',
  },
  page: mockPageBase,
  componentMap: new Map(),
};
