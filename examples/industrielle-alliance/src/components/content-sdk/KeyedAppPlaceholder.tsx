import React from 'react';
import {
  AppPlaceholder,
  type AppPlaceholderProps,
  type ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

function getStablePlaceholderKey(
  name: string,
  rendering: ComponentRendering | undefined,
  index: number,
): string {
  const uid = rendering?.uid;
  if (uid != null && String(uid).length > 0) {
    return `ph-${name}-${uid}`;
  }
  return `ph-${name}-${index}`;
}

/**
 * Wraps AppPlaceholder and assigns stable React keys to each placeholder child.
 * Uses a `display: contents` wrapper so keys apply reliably across RSC/client boundaries
 * (cloneElement alone is not always effective on SDK ErrorBoundary wrappers).
 */
export function KeyedAppPlaceholder(props: AppPlaceholderProps) {
  const { name, ...rest } = props;

  return (
    <AppPlaceholder
      {...rest}
      name={name}
      render={(components, renderings) => {
        if (!components || (Array.isArray(components) && components.length === 0)) {
          return null;
        }

        const items = Array.isArray(components) ? components : [components];

        return (
          <>
            {items.map((component, index) => {
              if (component == null) {
                return null;
              }

              const stableKey = getStablePlaceholderKey(
                name,
                renderings[index] as ComponentRendering | undefined,
                index,
              );

              return (
                <div key={stableKey} className="contents">
                  {component}
                </div>
              );
            })}
          </>
        );
      }}
    />
  );
}
