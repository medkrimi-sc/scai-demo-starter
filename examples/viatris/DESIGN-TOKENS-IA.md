# iA Financial Group — design token mapping (viatris)

Reference: live [viatris.com](https://www.viatris.com/) (DevTools computed styles — refine after deploy) and homepage layout brief.

## Measured / reference values → CSS variables (`src/assets/styles/globals.css` `@theme`)

| Visual role | Reference (hex / note) | Token |
|-------------|-------------------------|--------|
| Page background | `#ffffff` | `--color-background` |
| Body text | `#001a33` (navy, ~) | `--color-foreground` |
| Brand blue (CTA, hero band) | `#0056b3` (screenshot ref.) | `--color-primary` |
| On-primary text | `#ffffff` | `--color-primary-foreground` |
| Primary hover | slightly darker blue | `--color-primary-hover` |
| Navy sections (careers, footer band) | `#001a33` | `--color-secondary` (dark band) + `--color-secondary-foreground` |
| Muted section bg | `#f4f7fb` (light blue-grey) | `--color-muted` |
| Muted text / legal | `#5c6b7a` (approx.) | `--color-muted-foreground` |
| Borders / dividers | `#e2e8f0` | `--color-border`, `--color-input` |
| Cards on blue hero | `#ffffff` | `--color-card` |
| Card text | `#001a33` | `--color-card-foreground` |
| Focus ring | align with primary | `--color-ring` |
| Max content width | 1280–1400px (site-dependent) | Tailwind `max-w-screen-2xl` (existing) |

## Typography (live site)

- The starter uses **Inter** (Google) for heading + body via [`src/Layout.tsx`](src/Layout.tsx) — swap to licensed iA webfonts when brand confirms the stack.
- Marketing headings on viatris.com are **smaller** than the previous starter’s display scale; base `h1`–`h4` rules were tightened in `src/app/globals.css`.

## Radii

- **Cards / images:** keep moderate radius (`--border-radius-lg` / `rounded-default` usage unchanged).
- **Primary buttons:** `rounded-full` in `src/components/ui/button.tsx` for pill CTAs.

## Re-verify

After first deploy, re-sample: `getComputedStyle(document.body).backgroundColor`, hero section `backgroundColor`, and `font-family` on `h1` and `p` to nudge HSL tokens.
