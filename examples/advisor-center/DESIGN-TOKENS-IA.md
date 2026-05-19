# iA Financial Group — design token mapping (advisor-center)

This starter uses the same iA brand tokens as **industrielle-alliance**, copied locally (starters stay independent).

Reference: live [ia.ca](https://www.ia.ca/) and `examples/industrielle-alliance/DESIGN-TOKENS-IA.md`.

## Token files

| File | Purpose |
|------|---------|
| `src/assets/base/ia-theme.css` | Semantic `@theme` tokens (`--color-primary`, `--color-foreground`, etc.) |
| `src/assets/base/variables.css` | Legacy SXA names mapped to iA values for existing component CSS |

## Key colors

| Role | Value | Token |
|------|-------|--------|
| Page background | White | `--color-background` / `--color-bg-basic-color` |
| Body / headings | Navy `#001a33` | `--color-foreground` / `--color-text-heading-color` |
| Brand blue (header, links) | `#064dd9` | `--color-brand-blue` |
| CTA / primary actions | `#0056b3` (HSL theme) | `--color-primary` |
| Muted sections | Light blue-grey | `--color-muted` |
| Footer / dark bands | Navy | `--color-secondary` |

## Typography

Inter is loaded in `src/app/layout.tsx` as `--font-heading` and `--font-body` (same as industrielle-alliance).

## Re-verify after deploy

Sample `getComputedStyle(document.body)` and primary buttons against ia.ca and adjust HSL in `ia-theme.css` if needed.
