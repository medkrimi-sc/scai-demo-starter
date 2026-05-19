'use client';

import type React from 'react';
import { cn } from '@/lib/utils';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';
import { IaLogoDesktop } from './IaLogo';
import { IaNavIcon } from './IaNavIcons';
import { IaHeaderLink } from './IaHeaderLink';
import type { IaHeaderSectionProps } from './ia-header.types';
import { IA_HOME_HREF } from './ia-header.constants';
import {
  getPrimaryNavIcon,
  hasDropdownChildren,
  resolvePrimaryLinks,
  shouldUseIaInlineLogo,
} from './ia-header.utils';
import { IA_BRAND_BLUE } from './ia-header.constants';
import type { PrimaryNavItemProps } from './global-header.props';

function PrimaryNavItem({
  item,
  index,
  isPageEditing,
}: {
  item: PrimaryNavItemProps;
  index: number;
  isPageEditing?: boolean;
}) {
  const field = item.link?.jsonValue;
  const iconName = getPrimaryNavIcon(item, index);
  const hasChildren = hasDropdownChildren(item);
  const label = field?.value?.text ?? '';

  const iconEl = (
    <IaNavIcon
      name={iconName ?? 'lifeInsurance'}
      size={42}
      className="shrink-0"
      color={IA_BRAND_BLUE}
    />
  );

  const linkContent = (
    <>
      {iconEl}
      <span className="text-primary text-base font-medium">{label}</span>
      {hasChildren && (
        <IaNavIcon name="keyboardArrowDown" size={24} className="shrink-0" color={IA_BRAND_BLUE} />
      )}
    </>
  );

  const triggerClassName = cn(
    'text-primary inline-flex h-auto items-center gap-2 rounded-none bg-transparent px-3 py-2',
    'hover:bg-muted focus:bg-muted data-[state=open]:bg-muted',
  );

  if (hasChildren) {
    return (
      <NavigationMenuItem key={`${label}-${index}`}>
        <NavigationMenuPrimitive.Trigger className={triggerClassName}>
          {linkContent}
        </NavigationMenuPrimitive.Trigger>
        <NavigationMenuContent>
          <ul className="grid min-w-[220px] gap-1 p-4">
            {item.children?.results?.map((child, childIndex) => {
              const childField = child.link?.jsonValue;
              return (
                <li key={`${childField?.value?.text ?? childIndex}-${childIndex}`}>
                  <NavigationMenuLink asChild>
                    <IaHeaderLink
                      field={childField}
                      isPageEditing={isPageEditing}
                      className="hover:bg-muted block rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {childField?.value?.text}
                    </IaHeaderLink>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`${label}-${index}`}>
      <NavigationMenuLink asChild>
        <IaHeaderLink
          field={field}
          isPageEditing={isPageEditing}
          className={triggerClassName}
        >
          {linkContent}
        </IaHeaderLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export const PrimaryNavBar: React.FC<IaHeaderSectionProps> = ({
  isPageEditing,
  primaryNavigationLinks,
  logo,
  page,
}) => {
  const primaryLinks = resolvePrimaryLinks(primaryNavigationLinks);
  const logoSrc = logo?.jsonValue?.value?.src;
  const useCmsLogo =
    !shouldUseIaInlineLogo(isPageEditing, logoSrc) && Boolean(logoSrc?.trim());

  return (
    <nav
      aria-label="Navigation principale"
      className="border-border bg-background hidden border-b lg:block"
    >
      <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center gap-6 px-4 lg:px-8">
        <IaHeaderLink
          href={IA_HOME_HREF}
          title="Accueil"
          className="inline-flex shrink-0 items-center"
          isPageEditing={isPageEditing}
        >
          {useCmsLogo && logo?.jsonValue ? (
            <div className="flex w-[200px] [&_.image-container]:w-full">
              <ImageWrapper
                image={logo.jsonValue}
                className="h-[52px] w-full object-contain object-left"
                sizes="200px"
                alt="iA Groupe financier"
                page={page}
              />
            </div>
          ) : (
            <IaLogoDesktop />
          )}
        </IaHeaderLink>

        <div className="flex flex-1 justify-end">
          <NavigationMenu className="max-w-none flex-none">
            <NavigationMenuList className="flex list-none items-center gap-2 space-x-0">
              {primaryLinks.map((item, index) => (
                <PrimaryNavItem
                  key={`${item.link?.jsonValue?.value?.text ?? index}-${index}`}
                  item={item}
                  index={index}
                  isPageEditing={isPageEditing}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};
