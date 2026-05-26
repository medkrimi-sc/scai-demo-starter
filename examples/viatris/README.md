# Viatris demo site

Separate Next.js rendering host cloned from **Industrielle Alliance**, rebranded for [Viatris](https://www.viatris.com/).

## Deploy separately

| Platform | Setting |
|----------|---------|
| **XM Cloud** | Rendering host `viatris` in `xmcloud.build.json` → `./examples/viatris` |
| **Vercel** | Root directory: `examples/viatris` |
| **Sitecore** | Site name: `viatris` (content module `authoring/items/viatris.module.json`) |

## Local development

`npm run dev` runs Sitecore CLI tools first; they need **Edge credentials** (`SITECORE_EDGE_CONTEXT_ID`, etc.). The fastest setup is to reuse the same XM Cloud values as Industrielle Alliance and only change the site name:

```powershell
cd examples/viatris
Copy-Item ..\\industrielle-alliance\\.env.local .env.local -Force
(Get-Content .env.local) -replace '(?m)^NEXT_PUBLIC_DEFAULT_SITE_NAME=.*','NEXT_PUBLIC_DEFAULT_SITE_NAME=viatris' | Set-Content .env.local
npm install
npm run dev
```

Or copy `.env.remote.example` to `.env.local` and fill in all variables from the [XM Cloud deploy portal](https://doc.sitecore.com/xmc/en/developers/xm-cloud/get-the-environment-variables-for-a-site.html).

**Note:** The `viatris` site must exist in CM and be published to Experience Edge (push `authoring/items/viatris.module.json`) before pages resolve under `/viatris/...`.

## Branding

- Logo: `public/viatris-logo.svg` (from viatris.com media library)
- Primary purple: `#703E97`
- Navy: `#2A276E`
- Typography: Source Sans 3 (Google Font)

## Content

Push Sitecore items with the `viatris` module (`ser push` / deployment pipeline), same pattern as `industrielle-alliance`.
