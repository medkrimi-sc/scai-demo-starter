import { Text, RichText } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import type { AccordionItemProps } from './accordion-block.props';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface AccordionBlockItemProps {
  child: AccordionItemProps;
  index: number;
  valuePrefix?: string;
  /** Optional class on the root AccordionItem (e.g. lighter dividers). */
  itemClassName?: string;
  /** Optional class on the AccordionTrigger row. */
  triggerClassName?: string;
}

export const AccordionBlockItem = ({
  index,
  child,
  valuePrefix = 'accordion-block-item',
  itemClassName,
  triggerClassName,
}: AccordionBlockItemProps) => (
  <>
    <AccordionItem
      key={index}
      value={`${valuePrefix}-${index + 1}`}
      className={cn('border-foreground border-b p-0', itemClassName)}
    >
      <AccordionTrigger
        className={cn(
          'font-heading flex w-full justify-between py-4 text-left text-base font-medium',
          triggerClassName,
        )}
      >
        {child?.heading?.jsonValue && (
          <Text
            field={child.heading.jsonValue}
            className="font-heading text-left text-base font-medium"
          />
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className="font-body py-4 pt-2 text-base font-medium">
          {child?.description?.jsonValue && (
            <RichText tag="div" field={child.description.jsonValue} />
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  </>
);
