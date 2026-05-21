import { useParams } from '@/components/search-experience/search-components/useParams';
import { DEFAULT_PAGE_SIZE } from '@/components/search-experience/search-components/constants';

describe('search-experience useParams', () => {
  it('coerces string pageSize from Sitecore rendering params to a number', () => {
    const { pageSize } = useParams({ pageSize: '12' });

    expect(pageSize).toBe(12);
    expect(typeof pageSize).toBe('number');
  });

  it('keeps numeric pageSize unchanged', () => {
    const { pageSize } = useParams({ pageSize: 9 });

    expect(pageSize).toBe(9);
  });

  it('falls back to DEFAULT_PAGE_SIZE when pageSize is missing or invalid', () => {
    expect(useParams({}).pageSize).toBe(DEFAULT_PAGE_SIZE);
    expect(useParams({ pageSize: 'not-a-number' }).pageSize).toBe(DEFAULT_PAGE_SIZE);
  });
});
