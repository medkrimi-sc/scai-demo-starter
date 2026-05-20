# Content authoring — Advice Zone (IA)

## Quick answers

**Is the Advice Zone branch under Solterra?**  
No. IA branches live under **Templates → Branches → click-click-launch → Industrielle Alliance**:

- **Advice article** — creates one article (Breadcrumbs + Article Header + body)
- **Advice Zone page (listing)** — creates a listing hub (only if you need a second Zone conseils folder)

Solterra’s **Add Article Page** branch is for the Solterra demo site only. Do not use it on Industrielle Alliance.

**Why did “Advice Zone” create fail?**  
The branch pointed at a page template that was not deployed. The repo now includes **Advice Zone Page** under **Templates → Project → click-click-launch → Site**.

## What authors do (simple)

You already have **Home → Advice Zone**. You only add **articles** under it.

1. Open **Pages** → **Home** → **Advice Zone**
2. **Create** → **Advice article**
3. Enter a page name and publish

You do **not** need to create another Advice Zone folder under Home unless you intentionally want a second listing section.

## After pulling these repo changes

```powershell
dotnet sitecore env set-default -n dev
dotnet sitecore ser push -i "Project.click-click-launch"
dotnet sitecore ser push -i "Project.industrielle-alliance"
```

Push **click-click-launch first** (templates and branches), then **industrielle-alliance** (content).
