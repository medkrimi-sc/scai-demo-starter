import type { ImageField, LinkField } from '@sitecore-content-sdk/nextjs';
import type { Page } from '@sitecore-content-sdk/nextjs';
import type { PrimaryNavItemProps, UtilityNavigationItemProps } from './global-header.props';

export type IaHeaderSectionProps = {
  isPageEditing?: boolean;
  utilityNavigationLinks?: {
    targetItems?: UtilityNavigationItemProps[];
  };
  primaryNavigationLinks?: {
    targetItems?: PrimaryNavItemProps[];
  };
  headerContact?: { jsonValue?: LinkField };
  logo?: { jsonValue?: ImageField };
  page?: Page;
};
