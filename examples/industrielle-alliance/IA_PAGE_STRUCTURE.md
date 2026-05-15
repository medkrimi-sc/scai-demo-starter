# iA-style homepage — SitecoreAI placeholder map

Use this as a guide when assembling pages in **Experience Editor** (placeholders: `headless-header`, `headless-main`, `headless-footer` per [Layout.tsx](src/Layout.tsx)).

| Order | Section | Suggested component / variant | Notes |
|------|---------|--------------------------------|-------|
| 1 | Global header | **GlobalHeader** → `Default` | Utility links + main nav + primary actions; datasource drives links. |
| 2 | Savings & insurance hero | **Hero** → `OfferingsGrid` | Six offering tiles + hero image + two CTAs; requires `tiles` + `primaryCta` / `secondaryCta` on datasource (see [hero.props.ts](src/components/hero/hero.props.ts)). |
| 3 | “Ready to make it happen?” rows | **AccordionBlock** → `SimpleRows` | Full-width rows with expand; optional section title. |
| 4 | “I’m already a client” panel | **CtaBanner** → `PanelWithActions` | Illustration + up to three actions; optional `imageOptional`, `linkTwoOptional`, `linkThreeOptional`. |
| 5 | Wealth transfer (split band) | **PromoImage** (pick closest variant) **or** **Container5050** + image + text | Prefer existing variant with image + copy; use `params` / styles for navy or light band. |
| 6 | Advice Zone (3-up cards) | **MultiPromo** → `StaticGrid` | Same child items as carousel; `StaticGrid` renders a responsive grid (no carousel). |
| 7 | Careers (navy + accordion + photo) | **AccordionBlock** (`OneColumnTitleLeft` or `SimpleRows`) + **Container** / image column | Compose two components in main placeholder or a single wide container. |
| 8 | Footer | **GlobalFooter** → `BlackLarge` or `Default` | Token-driven; adjust datasource for columns, social, app store links. |

**Authoring:** wire GraphQL / templates so `Hero` datasource exposes `tiles` (repeatable: icon image, title, short text, optional link) and link fields for primary/secondary CTAs. Until templates exist, FE accepts optional fields and shows fallbacks in edit mode.
