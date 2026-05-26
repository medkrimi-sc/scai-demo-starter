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
  locale: 'en',
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
              alt: 'Viatris',
              width: '150',
              height: '40',
            },
          },
        },
        utilityNavigationLinks: {
          targetItems: [
            {
              link: {
                jsonValue: {
                  value: {
                    href: 'https://www.viatris.com/about-us',
                    text: 'About',
                    linktype: 'external',
                  },
                },
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
                },
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
                    href: 'https://www.viatris.com/products',
                    text: 'Products',
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
                    href: 'https://www.viatris.com/impact',
                    text: 'Impact',
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
                    href: 'https://www.viatris.com/about-us',
                    text: 'About us',
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
              href: 'https://www.viatris.com/contact',
              text: 'Contact',
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
