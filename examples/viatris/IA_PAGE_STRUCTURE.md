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

## Sitecore serialization (push to CM)

From the **repository root**, against your **dev** CM environment:

```powershell
dotnet sitecore env set-default -n dev
dotnet sitecore ser push -i "Project.click-click-launch"
dotnet sitecore ser push -i "Project.viatris"
```

This deploys:

- **Branch** `IA Add Advice Zone Listing` (CCL) — new **Advice Zone listing** pages (template `9b575283`) with Breadcrumbs `IaAdvice` + **ArticleListing** `AdviceZone` + `local:/Data/Article Listing`. **Insert only under Home.**
- **Branch** `IA Add Article Page` (CCL) — new article pages with Breadcrumbs `IaAdvice` → Article Header `IaAdvice` → Rich Text `IaArticle` under `local:/Data/`.
- **Page designs** — `Article` for **Article Page** template; **Advice Zone Listing** for the Advice Zone folder template.
- **Headless variants** — `Breadcrumbs/IaAdvice`, `ArticleHeader/IaAdvice`, `RichText/IaArticle`, `ArticleListing/AdviceZone`.
- **Advice Zone** page layout — listing with **ArticleListing** `AdviceZone` and featured articles.
- Sample articles under **Advice Zone** with the IA article layout.

### Insert options — simple IA model

| Location | Create menu | Purpose |
|----------|-------------|---------|
| **Home** | Standard pages only (Landing, Detail, Folder, Product) | No advice articles here |
| **Advice Zone** | **Advice article** | New article with layout pre-wired |

Branches are under **Viatris**, not Solterra. Page template **Advice Zone Page** is serialized at `Site/Advice Zone Page` (required for the listing branch).

See [CONTENT_AUTHORING.md](./CONTENT_AUTHORING.md) for authors.

---

## Advice Zone — article listing page

The **Advice Zone** item is pre-composed in serialization. To build manually in `headless-main`:

| Order | Component | Variant | Notes |
|------|-----------|---------|-------|
| 1 | **Breadcrumbs** | `IaAdvice` | Blue breadcrumb trail (e.g. Advice Zone › Home). |
| 2 | **ArticleListing** | `AdviceZone` | Section title + description + **Featured Content** (multilist of Article pages) + view-all link. Cards: image, optional tag from `pageShortTitle`, title, read time. |
| 3 | *(optional)* **RichTextBlock** | `Default` | Intro copy above the grid if needed. |

**Datasource (Article Listing):** Create or pick items under **`/sitecore/content/.../Data/Article Listing Folder`** (template **Article Listing Folder**), then add **Article Listing** children (template **Article Listing** — same as Solterra). Page-level datasources use **`local:/Data/Article Listing`** on the page (see Advice Zone). Fields: `titleOptional`, `descriptionOptional`, `linkOptional`, `featuredContent` (multilist of Article Page items).

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
