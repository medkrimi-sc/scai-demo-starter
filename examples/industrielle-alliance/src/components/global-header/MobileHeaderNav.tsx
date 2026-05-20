'use client';

import type React from 'react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { HeaderLogo } from './HeaderLogo';
import { IaNavIcon } from './IaNavIcons';
import { IaHeaderLink } from './IaHeaderLink';
import type { IaHeaderSectionProps } from './ia-header.types';
import {
  IA_BRAND_BLUE,
  IA_DEFAULT_HEADER_CONTACT,
  IA_HOME_HREF,
  IA_LANGUAGE_LINK,
} from './ia-header.constants';
import { IaSearchBox } from './IaSearchBox';
import {
  getPrimaryNavIcon,
  isUtilityLinkSelected,
  resolvePrimaryLinks,
  resolveUtilityLinks
} from './ia-header.utils';

export const MobileHeaderNav: React.FC<IaHeaderSectionProps> = ({
  isPageEditing,
  utilityNavigationLinks,
  primaryNavigationLinks,
  headerContact,
  logo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const utilityLinks = resolveUtilityLinks(utilityNavigationLinks);
  const primaryLinks = resolvePrimaryLinks(primaryNavigationLinks);
  const loginField = headerContact?.jsonValue ?? IA_DEFAULT_HEADER_CONTACT;

  return (
    <nav aria-label="Navigation mobile" className="border-border bg-background border-b lg:hidden">
      <div className="flex h-14 items-center justify-between gap-2 px-4">
        {isPageEditing ? (
          <span className="inline-flex shrink-0">
            <HeaderLogo logo={logo} isPageEditing={isPageEditing} variant="mobile" />
          </span>
        ) : (
          <IaHeaderLink href={IA_HOME_HREF} title="Accueil" className="inline-flex shrink-0">
            <HeaderLogo logo={logo} isPageEditing={isPageEditing} variant="mobile" />
          </IaHeaderLink>
        )}

        <div className="flex items-center gap-1">
          <IaSearchBox variant="mobile" />

          <IaHeaderLink
            field={loginField}
            isPageEditing={isPageEditing}
            title="Me connecter"
            aria-label="Me connecter"
            className="text-primary inline-flex p-2"
          >
            <IaNavIcon name="accountCircle" size={24} />
          </IaHeaderLink>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                title="Menu"
                aria-label="Menu"
                className="text-primary inline-flex p-2"
              >
                <IaNavIcon name="menu" size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md overflow-y-auto p-0 sm:max-w-md">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 p-6 pt-12">
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {utilityLinks.map((item, index) => {
                    const field = item.link?.jsonValue;
                    const href = field?.value?.href;
                    const isActive = isUtilityLinkSelected(href, pathname);

                    return (
                      <li key={`utility-mobile-${index}`}>
                        <IaHeaderLink
                          field={field}
                          isPageEditing={isPageEditing}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'block rounded-md px-3 py-3 text-base font-medium',
                            isActive ? 'bg-muted text-foreground' : 'text-foreground',
                          )}
                        >
                          {field?.value?.text}
                        </IaHeaderLink>
                      </li>
                    );
                  })}
                </ul>

                <ul className="m-0 flex list-none flex-col gap-1 border-t pt-4 p-0">
                  {primaryLinks.map((item, index) => {
                    const field = item.link?.jsonValue;
                    const iconName = getPrimaryNavIcon(item, index);

                    return (
                      <li key={`primary-mobile-${index}`}>
                        <IaHeaderLink
                          field={field}
                          isPageEditing={isPageEditing}
                          onClick={() => setIsOpen(false)}
                          className="text-primary flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium"
                        >
                          <IaNavIcon
                            name={iconName ?? 'lifeInsurance'}
                            size={30}
                            className="shrink-0"
                            color={IA_BRAND_BLUE}
                          />
                          <span>{field?.value?.text}</span>
                          {(item.children?.results?.length ?? 0) > 0 && (
                            <IaNavIcon
                              name="keyboardArrowDown"
                              size={20}
                              className="ml-auto shrink-0"
                              color={IA_BRAND_BLUE}
                            />
                          )}
                        </IaHeaderLink>
                        {(item.children?.results?.length ?? 0) > 0 && (
                          <ul className="m-0 list-none pl-12">
                            {item.children?.results?.map((child, childIndex) => {
                              const childField = child.link?.jsonValue;
                              return (
                                <li key={`child-mobile-${childIndex}`}>
                                  <IaHeaderLink
                                    field={childField}
                                    isPageEditing={isPageEditing}
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground block py-2 text-sm"
                                  >
                                    {childField?.value?.text}
                                  </IaHeaderLink>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t pt-4">
                  <IaHeaderLink
                    href={IA_LANGUAGE_LINK.href}
                    title={IA_LANGUAGE_LINK.title}
                    onClick={() => setIsOpen(false)}
                    className="text-primary inline-flex px-3 py-2 font-medium"
                  >
                    {IA_LANGUAGE_LINK.text}
                  </IaHeaderLink>
                </div>

                <IaHeaderLink
                  field={loginField}
                  isPageEditing={isPageEditing}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: IA_BRAND_BLUE }}
                >
                  <span>{loginField.value?.text ?? 'Me connecter'}</span>
                  <IaNavIcon name="accountCircle" size={22} className="text-white" />
                </IaHeaderLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
