import React, { JSX } from 'react';
import { KeyedAppPlaceholder } from '@/components/content-sdk/KeyedAppPlaceholder';
import { ComponentProps } from 'lib/component-props';

const PartialDesignDynamicPlaceholder = (props: ComponentProps): JSX.Element => (
  <KeyedAppPlaceholder
    page={props.page}
    componentMap={props.componentMap}
    name={props.rendering?.params?.sig || ''}
    rendering={props.rendering}
  />
);

export default PartialDesignDynamicPlaceholder;
