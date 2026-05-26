'use client';
import { DEFAULT_PAGE_SIZE } from './constants';
import { SearchParams } from './models';

export const useParams = (params: SearchParams) => {
  const containerStyles = params.styles ?? '';
  const styles = `${params.GridParameters} ${containerStyles}`.trimEnd();
  const id = params.RenderingIdentifier;
  // Sitecore rendering params arrive as strings (e.g. pageSize=12); Search API requires numeric limit.
  const rawPageSize = params.pageSize ?? DEFAULT_PAGE_SIZE;
  const pageSize = Number(rawPageSize) || DEFAULT_PAGE_SIZE;

  return {
    styles,
    id,
    pageSize,
    columns: params.columns,
  };
};
