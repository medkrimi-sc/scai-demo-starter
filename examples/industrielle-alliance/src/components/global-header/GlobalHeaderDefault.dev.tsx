'use client';

import type React from 'react';
import { cn } from '@/lib/utils';
import { resolveGlobalHeaderItem, type GlobalHeaderProps } from './global-header.props';
import { SecondaryNavBar } from './SecondaryNavBar';
import { PrimaryNavBar } from './PrimaryNavBar';
import { MobileHeaderNav } from './MobileHeaderNav';

export const GlobalHeaderDefault: React.FC<GlobalHeaderProps> = (props) => {
  const { fields, isPageEditing } = props ?? {};
  const {
    logo,
    primaryNavigationLinks,
    headerContact,
    utilityNavigationLinks,
  } = resolveGlobalHeaderItem(fields) ?? {};

  const sectionProps = {
    isPageEditing,
    utilityNavigationLinks,
    primaryNavigationLinks,
    headerContact,
    logo,
    page: props.page,
  };

  return (
    <header
      data-component="GlobalHeader"
      className={cn('sticky top-0 z-50 w-full')}
    >
      <a
        href="#content"
        className="bg-primary text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:px-4 focus:py-2 focus:outline-none focus:ring-2"
      >
        Passer au contenu
      </a>

      <SecondaryNavBar key="ia-header-secondary" {...sectionProps} />
      <PrimaryNavBar key="ia-header-primary" {...sectionProps} />
      <MobileHeaderNav key="ia-header-mobile" {...sectionProps} />
    </header>
  );
};
