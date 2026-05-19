'use client';

import type React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { IaNavIcon } from './IaNavIcons';
import { IaHeaderLink } from './IaHeaderLink';
import type { IaHeaderSectionProps } from './ia-header.types';
import {
  IA_BRAND_BLUE,
  IA_DEFAULT_HEADER_CONTACT,
  IA_HEADER_PHONE,
  IA_LANGUAGE_LINK,
} from './ia-header.constants';
import { isUtilityLinkSelected, resolveUtilityLinks } from './ia-header.utils';

export const SecondaryNavBar: React.FC<IaHeaderSectionProps> = ({
  isPageEditing,
  utilityNavigationLinks,
  headerContact,
}) => {
  const pathname = usePathname() ?? '/';
  const utilityLinks = resolveUtilityLinks(utilityNavigationLinks);
  const loginField = headerContact?.jsonValue ?? IA_DEFAULT_HEADER_CONTACT;

  return (
    <nav
      aria-label="Navigation secondaire"
      className="bg-secondary text-secondary-foreground hidden lg:block"
    >
      <div className="mx-auto flex h-11 max-w-screen-2xl items-center justify-between px-4 lg:px-8">
        <ul className="m-0 flex list-none items-center gap-1 p-0">
          {utilityLinks.map((item, index) => {
            const field = item.link?.jsonValue;
            const href = field?.value?.href;
            const isSelected = isUtilityLinkSelected(href, pathname);

            return (
              <li key={`${field?.value?.text ?? index}-${index}`}>
                <IaHeaderLink
                  field={field}
                  isPageEditing={isPageEditing}
                  className={cn(
                    'inline-flex items-center rounded-sm px-3 py-2 text-sm font-medium transition-colors',
                    isSelected
                      ? 'bg-background text-foreground'
                      : 'text-secondary-foreground hover:bg-white/10',
                  )}
                >
                  {field?.value?.text}
                </IaHeaderLink>
              </li>
            );
          })}
          <li>
            <IaHeaderLink
              href={IA_HEADER_PHONE.href}
              className="text-secondary-foreground inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium hover:bg-white/10"
            >
              <IaNavIcon name="call" size={20} color="currentColor" />
              <span>{IA_HEADER_PHONE.text}</span>
            </IaHeaderLink>
          </li>
        </ul>

        <ul className="m-0 flex list-none items-center gap-1 p-0">
          <li>
            <button
              type="button"
              title="Rechercher"
              aria-label="Rechercher"
              aria-expanded={false}
              className="text-secondary-foreground inline-flex items-center justify-center rounded-sm p-2 hover:bg-white/10"
            >
              <IaNavIcon name="search" size={24} color="currentColor" />
            </button>
          </li>
          <li>
            <IaHeaderLink
              href={IA_LANGUAGE_LINK.href}
              title={IA_LANGUAGE_LINK.title}
              aria-label={IA_LANGUAGE_LINK.title}
              className="text-secondary-foreground inline-flex px-3 py-2 text-sm font-medium hover:bg-white/10"
            >
              {IA_LANGUAGE_LINK.text}
            </IaHeaderLink>
          </li>
          <li>
            <IaHeaderLink
              field={loginField}
              isPageEditing={isPageEditing}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: IA_BRAND_BLUE }}
            >
              <span>{loginField.value?.text ?? 'Me connecter'}</span>
              <IaNavIcon name="accountCircle" size={22} color="#ffffff" />
            </IaHeaderLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
