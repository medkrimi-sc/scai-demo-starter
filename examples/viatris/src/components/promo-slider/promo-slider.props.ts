import type { ComponentProps } from '@/lib/component-props';
import type { MultiPromoItemProps } from '@/components/multi-promo/multi-promo.props';

export interface PromoSliderParams {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PromoSliderFields {
  data?: {
    datasource?: {
      children?: {
        results?: PromoSliderSlideProps[];
      };
    };
  };
}

/** SimplePromo child: heading (title), description (text), image, link (CTA). */
export type PromoSliderSlideProps = MultiPromoItemProps & {
  id?: string;
  description?: {
    jsonValue?: MultiPromoItemProps['heading']['jsonValue'];
  };
};

export interface PromoSliderProps extends ComponentProps {
  params: PromoSliderParams;
  fields: PromoSliderFields;
  isPageEditing?: boolean;
}
