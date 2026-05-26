import type React from 'react';
import { RichText as ContentSdkRichText, Field } from '@sitecore-content-sdk/nextjs';
import { cn } from '@/lib/utils';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ComponentProps } from '@/lib/component-props';

type RichTextBlockProps = ComponentProps & RichTextFields;

interface RichTextFields {
  fields: {
    text: Field<string>;
  };
}

export const Default: React.FC<RichTextBlockProps> = (props) => {
  const { fields } = props;
  const text = props.fields ? (
    <ContentSdkRichText field={props.fields.text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;
  if (fields) {
    return (
      <article
        className={cn('component rich-text', props.params.styles?.trimEnd())}
        id={id ? id : undefined}
      >
        <div className="component-content">{text}</div>
      </article>
    );
  }
  return <NoDataFallback componentName="Rich Text Block" />;
};

export const IaArticle: React.FC<RichTextBlockProps> = (props) => {
  const { fields } = props;
  const text = props.fields ? (
    <ContentSdkRichText field={props.fields.text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  if (fields) {
    return (
      <article
        data-component="RichTextBlock"
        data-variant="IaArticle"
        className={cn('component rich-text w-full', props.params.styles?.trimEnd())}
        id={id ? id : undefined}
      >
        <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-8">
          <div className="ia-article-prose component-content">{text}</div>
        </div>
      </article>
    );
  }
  return <NoDataFallback componentName="Rich Text Block" />;
};
