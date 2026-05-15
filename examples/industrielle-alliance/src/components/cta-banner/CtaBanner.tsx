import { cva } from 'class-variance-authority';
import { Text, Link, Field, LinkField, ImageField } from '@sitecore-content-sdk/nextjs';
import { Button } from '@/components/ui/button';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { ColorSchemeLimited as ColorScheme } from '@/enumerations/ColorSchemeLimited.enum';
import { EnumValues } from '@/enumerations/generic.enum';
import { ComponentProps } from '@/lib/component-props';
import { cn } from '@/lib/utils';

const ctaBannerVariants = cva('w-full mx-auto px-6 py-16 md:py-24 text-center', {
  variants: {
    colorScheme: {
      default: '',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
});

const ctaTitleVariants = cva(
  'mb-6 text-pretty text-4xl font-normal leading-[1.1333] tracking-tighter antialiased md:text-7xl',
  {
    variants: {
      colorScheme: {
        default: '',
        primary: 'text-primary-foreground',
        secondary: 'text-primary',
      },
    },
  }
);

const ctaButtonVariants = cva('text-sm font-heading font-medium', {
  variants: {
    colorScheme: {
      default: '',
      primary: 'bg-accent text-accent-foreground hover:bg-accent/90',
      secondary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
  },
});

import { Default as ImageWrapper } from '@/components/image/ImageWrapper.dev';

type CtaBannerParams = {
  params?: {
    colorScheme?: EnumValues<typeof ColorScheme>;
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};

type CtaBannerFields = {
  fields?: {
    titleRequired?: Field<string>;
    descriptionOptional?: Field<string>;
    linkOptional?: LinkField;
  };
};

type CtaBannerProps = ComponentProps & CtaBannerFields & CtaBannerParams;

export const Default: React.FC<CtaBannerProps> = (props) => {
  const { isEditing } = props.page.mode;
  const { fields, params } = props;

  if (fields) {
    const { titleRequired, descriptionOptional, linkOptional } = fields || {};
    const colorScheme = params.colorScheme ?? undefined;

    return (
      <section className={ctaBannerVariants({ colorScheme })}>
        <div className="mx-auto w-full max-w-4xl">
          {/* Use Text component with fallback for heading */}
          <AnimatedSection direction="up" isPageEditing={isEditing}>
            <Text tag="h2" className={ctaTitleVariants({ colorScheme })} field={titleRequired} />
            <Text
              tag="p"
              className="mx-auto mb-16 max-w-xl text-lg antialiased"
              field={descriptionOptional}
            />

            {/* Render button with link */}
            {linkOptional && (
              <Button className={ctaButtonVariants({ colorScheme })} asChild>
                <Link field={linkOptional} editable={isEditing} />
              </Button>
            )}
          </AnimatedSection>
          {/* Use Text component with fallback for subheading */}
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="CTA Banner" />;
};

/** Rounded panel with optional illustration and up to three actions (iA “already a client” style). */
type PanelWithActionsFields = {
  titleRequired?: Field<string>;
  descriptionOptional?: Field<string>;
  linkOptional?: LinkField;
  linkTwoOptional?: LinkField;
  linkThreeOptional?: LinkField;
  imageOptional?: ImageField;
};

type PanelWithActionsProps = ComponentProps & {
  params?: CtaBannerParams['params'];
  fields?: PanelWithActionsFields;
};

export const PanelWithActions: React.FC<PanelWithActionsProps> = (props) => {
  const { isEditing } = props.page.mode;
  const { fields, params } = props;

  if (fields?.titleRequired) {
    const {
      titleRequired,
      descriptionOptional,
      linkOptional,
      linkTwoOptional,
      linkThreeOptional,
      imageOptional,
    } = fields;
    const colorScheme = params?.colorScheme ?? undefined;

    return (
      <section
        className={cn(
          'mx-auto w-full max-w-screen-xl px-4 py-10 md:px-8 md:py-14',
          colorScheme === 'primary' && 'text-primary-foreground',
        )}
      >
        <div
          className={cn(
            'bg-muted text-foreground flex flex-col gap-8 rounded-2xl p-6 shadow-sm md:flex-row md:items-center md:gap-10 md:p-10',
            colorScheme === 'primary' && 'bg-primary text-primary-foreground',
            colorScheme === 'secondary' && 'bg-secondary text-secondary-foreground',
          )}
        >
          {(isEditing || imageOptional?.value?.src) && (
            <div className="mx-auto w-full max-w-[220px] shrink-0 md:mx-0">
              {imageOptional?.value?.src ? (
                <ImageWrapper
                  image={imageOptional}
                  className="h-auto w-full object-contain"
                  sizes="220px"
                  alt=""
                  page={props.page}
                />
              ) : (
                <div className="text-muted-foreground flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-border p-4 text-center text-sm">
                  Illustration image
                </div>
              )}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <Text
              tag="h2"
              field={titleRequired}
              className="font-heading mb-3 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
            />
            <Text
              tag="p"
              className={cn(
                'mb-6 max-w-prose text-pretty text-base leading-relaxed md:text-lg',
                colorScheme === 'primary' || colorScheme === 'secondary'
                  ? 'text-primary-foreground/90'
                  : 'text-muted-foreground',
              )}
              field={descriptionOptional}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {linkOptional && (
                <Button className="rounded-full px-6" asChild variant="default">
                  <Link field={linkOptional} editable={isEditing} />
                </Button>
              )}
              {linkTwoOptional && (
                <Button className="rounded-full px-6" asChild variant="outline">
                  <Link field={linkTwoOptional} editable={isEditing} />
                </Button>
              )}
              {linkThreeOptional && (
                <Button className="rounded-full px-6" asChild variant="outline">
                  <Link field={linkThreeOptional} editable={isEditing} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <NoDataFallback componentName="CTA Banner" />;
};
