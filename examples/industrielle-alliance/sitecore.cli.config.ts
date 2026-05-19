import { defineCliConfig } from '@sitecore-content-sdk/nextjs/config-cli';
import {
  generateSites,
  generateMetadata,
  extractFiles,
  writeImportMap,
} from '@sitecore-content-sdk/nextjs/tools';
import scConfig from './sitecore.config';

export default defineCliConfig({
  config: scConfig,
  build: {
    commands: [
      generateMetadata(),
      generateSites(),
      extractFiles(),
      writeImportMap({
        paths: ['src/components'],
        exclude: ['src/components/component-library/*'],
      }),
    ],
  },
  componentMap: {
    paths: ['src/components'],
    exclude: [
      'src/components/content-sdk/*',
      'src/components/ui/*',
      'src/components/lib/*',
      'src/components/component-library/*',
      // Exclude non-component files (props, utils, dictionaries, contexts)
      '**/*.props.ts',
      '**/*.props.tsx',
      '**/*.util.ts',
      '**/*.util.tsx',
      '**/*.dictionary.ts',
      '**/*.dictionary.tsx',
      '**/*.context.ts',
      '**/*.context.tsx',
      '**/utils.ts',
      '**/utils.tsx',
      '**/*.constants.ts',
      'src/components/promo-slider/PromoSliderPagination.tsx',
      'src/components/promo-slider/PromoSliderSlide.dev.tsx',
      'src/components/promo-slider/PromoSliderImagePane.dev.tsx',
      'src/components/promo-slider/PromoSliderDefault.dev.tsx',
      'src/components/promo-slider/promo-slider.props.ts',
      'src/components/global-header/HeaderLogo.tsx',
      'src/components/article-listing/ArticleListingCard.dev.tsx',
      'src/components/article-listing/ArticleListingDefault.dev.tsx',
      'src/components/article-listing/ArticleListingAdviceZone.dev.tsx',
      'src/components/article-listing/article-listing.props.ts',
      'src/components/article-header/ArticleHeaderIaAdvice.dev.tsx',
      'src/components/article-header/article-header.utils.ts',
    ],
  },
});
