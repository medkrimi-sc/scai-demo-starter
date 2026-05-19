import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalHeaderDefault } from '@/components/global-header/GlobalHeaderDefault.dev';
import { mockGlobalHeaderProps } from './global-header.mock.props';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Link: ({ field }: Record<string, unknown>) => {
    const linkField = field as { value?: { text?: string; href?: string } };
    return <a href={linkField?.value?.href}>{linkField?.value?.text}</a>;
  },
  Image: () => <img data-testid="sitecore-image" alt="editable logo" />,
  useSitecore: () => ({
    page: { mode: { isEditing: false, isPreview: false, isDesignLibrary: false } },
  }),
}));

jest.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="primary-navigation-menu">{children}</nav>
  ),
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>,
  NavigationMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
  NavigationMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  NavigationMenuLink: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => (asChild ? <>{children}</> : <a>{children}</a>),
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mobile-sheet-content">{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
}));

jest.mock('@/components/image/ImageWrapper.dev', () => ({
  Default: ({ alt }: { alt?: string }) => <img alt={alt} data-testid="image-wrapper" />,
}));

jest.mock('@/lib/utils', () => ({
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

describe('GlobalHeaderDefault Component', () => {
  it('renders the iA header shell', () => {
    render(<GlobalHeaderDefault {...mockGlobalHeaderProps} />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Passer au contenu')).toBeInTheDocument();
  });

  it('renders secondary and primary navigation labels', () => {
    render(<GlobalHeaderDefault {...mockGlobalHeaderProps} />);

    expect(screen.getAllByText('Particuliers').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Entreprises et groupes').length).toBeGreaterThan(0);
    expect(screen.getByText('1-800-463-6236')).toBeInTheDocument();
    expect(screen.getAllByText('Assurance').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Épargne et retraite').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Gestion de patrimoine').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Me connecter').length).toBeGreaterThan(0);
  });

  it('renders inline iA logo when CMS logo has no src', () => {
    const { container } = render(<GlobalHeaderDefault {...mockGlobalHeaderProps} />);

    expect(container.querySelector('svg[viewBox="0 0 232.08 124.05"]')).toBeInTheDocument();
    expect(container.querySelector('svg[viewBox="0 0 149 36"]')).toBeInTheDocument();
  });

  it('exposes mobile menu sheet content', () => {
    render(<GlobalHeaderDefault {...mockGlobalHeaderProps} />);
    expect(screen.getByTestId('mobile-sheet-content')).toBeInTheDocument();
  });

  it('renders CMS logo field chrome in Page Builder mode', () => {
    const { container } = render(
      <GlobalHeaderDefault
        {...mockGlobalHeaderProps}
        isPageEditing
        fields={{
          ...mockGlobalHeaderProps.fields,
          data: {
            item: {
              ...mockGlobalHeaderProps.fields.data.item,
              logo: { jsonValue: { value: {} } },
            },
          },
        }}
      />,
    );

    expect(container.querySelectorAll('[data-field="headerLogo"]').length).toBe(2);
    expect(screen.getAllByTestId('image-wrapper').length).toBeGreaterThan(0);
    expect(container.querySelector('svg[viewBox="0 0 232.08 124.05"]')).not.toBeInTheDocument();
  });
});


