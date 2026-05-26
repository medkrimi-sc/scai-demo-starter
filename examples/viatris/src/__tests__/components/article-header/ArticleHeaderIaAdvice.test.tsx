/// <reference types="jest" />
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleHeaderIaAdvice } from '@/components/article-header/ArticleHeaderIaAdvice.dev';
import type { ArticleHeaderPropsInput } from '@/components/article-header/article-header.utils';

jest.mock('lucide-react', () => ({
  Clock: () => <span data-testid="icon-clock" />,
  Share2: () => <span data-testid="icon-share" />,
  Check: () => <span />,
  Facebook: () => <span />,
  Linkedin: () => <span />,
  Twitter: () => <span />,
  Link: () => <span />,
  Mail: () => <span />,
}));

jest.mock('@/components/image/ImageWrapper.dev', () => ({
  Default: ({ alt }: { alt?: string }) => <img alt={alt} data-testid="hero-image" />,
}));

jest.mock('@/components/floating-dock/floating-dock.dev', () => ({
  FloatingDock: () => <div data-testid="floating-dock" />,
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() }),
}));

jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => null,
}));

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Text: ({ field, tag = 'span' }: { field?: { value?: string }; tag?: string }) =>
    React.createElement(tag, null, field?.value),
}));

const baseProps = {
  page: { mode: { isEditing: false } },
  fields: {
    data: {
      datasource: {
        imageRequired: { jsonValue: { value: { src: '/hero.jpg' } } },
        eyebrowOptional: { jsonValue: { value: 'Home' } },
      },
      externalFields: {
        pageHeaderTitle: {
          jsonValue: { value: 'Monitoring your home remotely' },
        },
        pageReadTime: { jsonValue: { value: '3 min.' } },
      },
    },
  },
} as unknown as ArticleHeaderPropsInput;

describe('ArticleHeaderIaAdvice', () => {
  it('renders category pill, title, and read time', () => {
    render(<ArticleHeaderIaAdvice {...baseProps} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Monitoring your home remotely',
    );
    expect(screen.getByText('3 min.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('falls back to route pageTitle when externalFields title is missing', () => {
    const props = {
      page: {
        mode: { isEditing: false },
        layout: {
          sitecore: {
            route: {
              fields: {
                pageTitle: { value: 'Route article title' },
                pageReadTime: { value: '4 min.' },
              },
            },
          },
        },
      },
      fields: {
        data: {
          datasource: {
            imageRequired: { jsonValue: { value: { src: '/hero.jpg' } } },
            eyebrowOptional: { jsonValue: { value: 'Conseils' } },
          },
        },
      },
    } as unknown as ArticleHeaderPropsInput;

    render(<ArticleHeaderIaAdvice {...props} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Route article title');
    expect(screen.getByText('4 min.')).toBeInTheDocument();
  });

  it('supports flat externalFields shape', () => {
    const flatProps = {
      page: { mode: { isEditing: false } },
      fields: {
        eyebrowOptional: { value: 'Auto' },
        imageRequired: { value: { src: '/hero.jpg' } },
      },
      externalFields: {
        pageHeaderTitle: { value: 'Flat title' },
        pageReadTime: { value: '2 min' },
      },
    } as unknown as ArticleHeaderPropsInput;

    render(<ArticleHeaderIaAdvice {...flatProps} />);

    expect(screen.getByText('Auto')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Flat title');
  });
});
