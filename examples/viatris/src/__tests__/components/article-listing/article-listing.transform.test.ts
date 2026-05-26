import { transformFeaturedArticles } from '@/components/article-listing/article-listing.props';
import type { ArticleItemReferenceField } from '@/components/article-listing/article-listing.props';

describe('transformFeaturedArticles', () => {
  it('maps article page references to card data', () => {
    const featuredContent: ArticleItemReferenceField[] = [
      {
        id: '1',
        name: 'article-1',
        url: '/advice/article-1',
        fields: {
          pageTitle: { value: 'Monitoring your home remotely' },
          pageSummary: { value: 'Summary text' },
          pageThumbnail: { value: { src: '/thumb.jpg', alt: 'thumb' } },
          pageReadTime: { value: '3 min.' },
          pageShortTitle: { value: 'Home' },
        },
      },
    ];

    const result = transformFeaturedArticles(featuredContent);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      link: '/advice/article-1',
      image: '/thumb.jpg',
      title: 'Monitoring your home remotely',
      summary: 'Summary text',
      readTime: '3 min.',
      tag: 'Home',
      secondaryTag: undefined,
    });
  });

  it('returns empty array when no content', () => {
    expect(transformFeaturedArticles(undefined)).toEqual([]);
    expect(transformFeaturedArticles([])).toEqual([]);
  });
});
