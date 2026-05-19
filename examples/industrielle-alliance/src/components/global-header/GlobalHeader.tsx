'use client';
import type React from 'react';
import type { GlobalHeaderProps } from './global-header.props';
import { GlobalHeaderDefault } from './GlobalHeaderDefault.dev';

// Data source checks are done in the child components

function IaGlobalHeader(props: GlobalHeaderProps) {
  const { isEditing } = props.page.mode;
  return <GlobalHeaderDefault {...props} isPageEditing={isEditing} />;
}

/** iA two-tier header (secondary + primary nav). */
export const Default: React.FC<GlobalHeaderProps> = IaGlobalHeader;

/**
 * Alaris starter partial designs use the Centered variant in XM Cloud.
 * For industrielle-alliance we render the same iA header for both variants.
 */
export const Centered: React.FC<GlobalHeaderProps> = IaGlobalHeader;
