'use client';

import type React from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import type { PromoSliderProps } from './promo-slider.props';
import { PromoSliderDefault } from './PromoSliderDefault.dev';

export const Default: React.FC<PromoSliderProps> = (props) => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  return <PromoSliderDefault {...props} isPageEditing={isEditing} />;
};
