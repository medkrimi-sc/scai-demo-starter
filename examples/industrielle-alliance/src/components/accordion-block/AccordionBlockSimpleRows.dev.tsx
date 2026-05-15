'use client';

import type React from 'react';

import { Text } from '@sitecore-content-sdk/nextjs';
import { Accordion } from '@/components/ui/accordion';
import type { AccordionProps, AccordionItemProps } from './accordion-block.props';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { AccordionBlockItem } from './AccordionBlockItem.dev';
import { cn } from '@/lib/utils';

/** Full-width accordion rows (iA-style “Ready to make it happen?”); lighter dividers than OneColumnTitleLeft. */
export const AccordionBlockSimpleRows: React.FC<AccordionProps> = (props) => {
  const { fields, isPageEditing } = props;

  const { heading, children } = fields?.data?.datasource ?? {};
  const accordionItems = children?.results ?? [];
  const acordionItemValues = [
    ...accordionItems.map((_, index) => `accordion-simple-rows-item-${index + 1}`),
  ];

  if (fields) {
    return (
      <section
        data-component="AccordionBlock"
        className={cn(
          '@container bg-background text-foreground py-10 @md:py-14',
          props?.params?.styles && {
            [props.params.styles]: true,
          },
        )}
        data-class-change
        aria-labelledby={heading?.jsonValue?.value ? 'accordion-simple-rows-heading' : undefined}
      >
        <div className="mx-auto max-w-screen-xl px-4 @lg:px-8">
          {heading?.jsonValue && (
            <Text
              tag="h2"
              id="accordion-simple-rows-heading"
              field={heading.jsonValue}
              className="font-heading mb-8 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight @md:text-4xl"
            />
          )}
          <Accordion
            type="multiple"
            className="w-full gap-0 p-0"
            value={isPageEditing ? acordionItemValues : undefined}
            onValueChange={isPageEditing ? () => {} : undefined}
          >
            {accordionItems.map((child: AccordionItemProps, index: number) => (
              <AccordionBlockItem
                key={index}
                index={index}
                child={child}
                valuePrefix="accordion-simple-rows-item"
                itemClassName="border-0 border-b border-border"
                triggerClassName="py-5 text-lg font-normal text-foreground"
              />
            ))}
          </Accordion>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="Accordion Block" />;
};
