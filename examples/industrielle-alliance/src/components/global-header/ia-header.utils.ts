import type { LinkField } from '@sitecore-content-sdk/nextjs';
import type { IaNavIconName } from './IaNavIcons';
import type { PrimaryNavItemProps, UtilityNavigationItemProps } from './global-header.props';
import {
  IA_DEFAULT_PRIMARY_LINKS,
  IA_DEFAULT_UTILITY_LINKS,
} from './ia-header.constants';

export function normalizeNavLabel(value?: string): string {
  return (value ?? '').trim().toLowerCase();
}

const PRIMARY_ICON_BY_LABEL: Record<string, IaNavIconName> = {
  assurance: 'lifeInsurance',
  'épargne et retraite': 'savings',
  'epargne et retraite': 'savings',
  'gestion de patrimoine': 'wealth',
};

const PRIMARY_ICON_BY_HREF: Record<string, IaNavIconName> = {
  assurance: 'lifeInsurance',
  epargne: 'savings',
  retraite: 'savings',
  patrimoine: 'wealth',
  wealth: 'wealth',
};

/** Default icon order for iA primary nav (matches ia.ca layout). */
export const PRIMARY_NAV_ICON_SEQUENCE: IaNavIconName[] = [
  'lifeInsurance',
  'savings',
  'wealth',
];

export function getPrimaryNavIcon(
  item: PrimaryNavItemProps,
  index = 0,
): IaNavIconName | undefined {
  const label = normalizeNavLabel(item.link?.jsonValue?.value?.text);
  if (label && PRIMARY_ICON_BY_LABEL[label]) {
    return PRIMARY_ICON_BY_LABEL[label];
  }

  const href = (item.link?.jsonValue?.value?.href ?? '').toLowerCase();
  const hrefMatch = Object.entries(PRIMARY_ICON_BY_HREF).find(([key]) => href.includes(key));
  if (hrefMatch?.[1]) {
    return hrefMatch[1];
  }

  // CMS may still have Alaris product names until datasource is updated — keep visual parity.
  return PRIMARY_NAV_ICON_SEQUENCE[index % PRIMARY_NAV_ICON_SEQUENCE.length];
}

/** True when the URL points at an iA-branded media item (safe to render from CMS). */
export function isIaBrandedLogoSrc(logoSrc?: string): boolean {
  if (!logoSrc?.trim()) {
    return false;
  }
  const normalized = logoSrc.toLowerCase();
  return (
    normalized.includes('ia') ||
    normalized.includes('industrielle') ||
    normalized.includes('groupe-financier')
  );
}

/** Use inline iA SVG in preview/live when CMS logo is empty or a non-iA placeholder asset. */
export function shouldUseIaInlineLogo(
  isPageEditing?: boolean,
  logoSrc?: string,
): boolean {
  if (isPageEditing) {
    return false;
  }
  if (!logoSrc?.trim()) {
    return true;
  }
  return !isIaBrandedLogoSrc(logoSrc);
}

export function resolveUtilityLinks(
  items?: { targetItems?: UtilityNavigationItemProps[] },
): UtilityNavigationItemProps[] {
  const targetItems = items?.targetItems;
  if (targetItems && targetItems.length > 0) {
    return targetItems;
  }
  return IA_DEFAULT_UTILITY_LINKS;
}

export function resolvePrimaryLinks(
  items?: { targetItems?: PrimaryNavItemProps[] },
): PrimaryNavItemProps[] {
  const targetItems = items?.targetItems;
  if (targetItems && targetItems.length > 0) {
    return targetItems;
  }
  return IA_DEFAULT_PRIMARY_LINKS;
}

export function hasDropdownChildren(item: PrimaryNavItemProps): boolean {
  return (item.children?.results?.length ?? 0) > 0;
}

export function isUtilityLinkSelected(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  if (href === '/' || href === '') {
    return pathname === '/' || pathname.startsWith('/particuliers');
  }
  try {
    const url = new URL(href, 'https://ia.ca');
    return pathname.includes(url.pathname.replace(/\/$/, '') || '/');
  } catch {
    return pathname.includes(href);
  }
}

export function getLinkFieldValue(field?: LinkField) {
  return field?.value;
}
