# iA-style homepage — SitecoreAI placeholder map

Use this as a guide when assembling pages in **Experience Editor** (placeholders: `headless-header`, `headless-main`, `headless-footer` per [Layout.tsx](src/Layout.tsx)).

| Order | Section | Suggested component / variant | Notes |
|------|---------|--------------------------------|-------|
| 1 | Global header | **GlobalHeader** → `Default` | Utility links + main nav + primary actions; datasource drives links. |
| 2 | Savings & insurance hero | **Hero** → `OfferingsGrid` | Six offering tiles + hero image + two CTAs; requires `tiles` + `primaryCta` / `secondaryCta` on datasource (see [hero.props.ts](src/components/hero/hero.props.ts)). |
| 3 | “Ready to make it happen?” rows | **AccordionBlock** → `SimpleRows` | Full-width rows with expand; optional section title. |
| 4 | “I’m already a client” panel | **CtaBanner** → `PanelWithActions` | Illustration + up to three actions; optional `imageOptional`, `linkTwoOptional`, `linkThreeOptional`. |
| 5 | Wealth transfer (split band) | **PromoSlider** → `Default` | MultiPromo datasource with SimplePromo children (heading, description, image, link). Light blue band, navy image panel, dot pagination. |
| 6 | Advice Zone (3-up cards) | **MultiPromo** → `StaticGrid` | Same child items as carousel; `StaticGrid` renders a responsive grid (no carousel). |
| 7 | Careers (navy + accordion + photo) | **AccordionBlock** (`OneColumnTitleLeft` or `SimpleRows`) + **Container** / image column | Compose two components in main placeholder or a single wide container. |
| 8 | Footer | **GlobalFooter** → `BlackLarge` or `Default` | Token-driven; adjust datasource for columns, social, app store links. |

**Authoring:** wire GraphQL / templates so `Hero` datasource exposes `tiles` (repeatable: icon image, title, short text, optional link) and link fields for primary/secondary CTAs. Until templates exist, FE accepts optional fields and shows fallbacks in edit mode.

---

## Advice Zone — article listing page

Use **Article Page** items (branch: `Add Article Page`) and compose a listing page in `headless-main`:

| Order | Component | Variant | Notes |
|------|-----------|---------|-------|
| 1 | **Breadcrumbs** | `IaAdvice` | Blue breadcrumb trail (e.g. Advice Zone › Home). |
| 2 | **ArticleListing** | `AdviceZone` | Section title + description + **Featured Content** (multilist of Article pages) + view-all link. Cards: image, optional tag from `pageShortTitle`, title, read time. |
| 3 | *(optional)* **RichTextBlock** | `Default` | Intro copy above the grid if needed. |

**Datasource (Article Listing):** `titleOptional`, `descriptionOptional`, `linkOptional` (e.g. “Découvrir nos conseils →”), `featuredContent` → Article pages with `pageTitle`, `pageSummary`, `pageThumbnail`, `pageReadTime`, `pageShortTitle`.

For homepage promo-style 3-up (non-article datasource), keep **MultiPromo** → `StaticGrid` (row 6 above).

---

## Advice Zone — article detail page

Compose in `headless-main` on an **Article Page** item:

| Order | Component | Variant | Notes |
|------|-----------|---------|-------|
| 1 | **Breadcrumbs** | `IaAdvice` | Same as listing page. |
| 2 | **ArticleHeader** | `IaAdvice` | Hero image + overlapping white card: category pill (`eyebrowOptional`), blue H1 (`pageHeaderTitle` from page), read time + share. |
| 3 | **RichTextBlock** | `IaArticle` | Article body: bold lead paragraph, navy headings, blue links, bullet lists. |

**Page fields (Article Page template):** `pageHeaderTitle`, `pageReadTime`, `pageDisplayDate`, `taxAuthor` (via Article Header GraphQL `externalFields`). **Article Header datasource:** `imageRequired`, `eyebrowOptional`.
