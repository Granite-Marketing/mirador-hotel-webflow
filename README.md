# Mirador Hotel — Webflow

Studio Circa hotel project, Editoria-derived. Bootstrapped from [`webflow-mcp-starter`](https://github.com/Granite-Marketing/webflow-mcp-starter) at `v1.0.0` with all of Editoria's animation modules layered on top of the MCP framework.

The page smooth-scroll defaults to Lenis (template default). Editoria's `gsapSmoothScroll.ts` ships in `src/utils/` as an alternate but is not currently wired into `src/index.ts`.

The sections below were inherited from the starter template — adapt them for Mirador's specifics as you build.

## What's included

- **Seven Claude Code skills** under `.claude/skills/` — `asset-metadata`, `build-component`, `content-ingest`, `export-assets`, `type-sync`, `update-seo`, `upload-copy`
- **Figma + Webflow REST API scripts** under `scripts/api/` — asset export, asset upload, asset metadata, SEO updates, copy parsing
- **Docs library** under `docs/reference/` — Client-First class naming, breakpoints, modal pattern, swiper pattern, scroll-pin, Finsweet CMS filter, style guide tokens, Webflow ID lookup, plus a curated `docs/solutions/` of cross-project gotchas
- **TypeScript + esbuild bundle pipeline** — single `src/index.ts` entry, esbuild bundle into `dist/index.js`, served via jsDelivr by git tag
- **Baseline animation modules** under `src/utils/` — Lenis smooth-scroll, accessible modals, Swiper sliders, accordion, GSAP scroll-reveal
- **Playwright visual regression** scaffold for `build-component`'s capture-and-compare loop
- **Changesets** versioning + release workflow

## Prerequisites

- Node 18+ and pnpm 9+
- [Claude Code](https://claude.com/claude-code) CLI installed
- [Webflow MCP companion app](https://developers.webflow.com/docs/mcp) connected
- [Figma MCP server](https://www.figma.com/developers/mcp) authenticated
- A Webflow site (preferably bootstrapped from a Relume template)
- A Figma file with design specs and a Style Guide frame

## Use this template

1. On GitHub, click **Use this template** → **Create a new repository** under your account or `Granite-Marketing`.
2. Clone locally and `cd` into the new project.
3. Install dependencies and Playwright browsers:

   ```bash
   pnpm install
   pnpm run setup
   ```

## First-run setup

1. **Copy `.env.example` to `.env`** and fill in:
   - `WEBFLOW_SITE_URL` — your staging subdomain
   - `WEBFLOW_API_TOKEN` — Webflow site or workspace API token
   - `WEBFLOW_SITE_ID` — found in Site Settings → General
   - `FIGMA_API_TOKEN` — personal access token with `file_content:read` scope
2. **Update `package.json`** with your project's `name`, set `version` to `0.0.0`, and adjust `repository.url` / `homepage` / `bugs` to your repo URL.
3. **Populate `docs/reference/webflow-ids.md`** with your project's site, page, and CMS collection IDs. The starter ships with `REPLACE_ME` placeholders — fill these in once and all skills + scripts read from this file.
4. **Connect Figma MCP + Webflow MCP companion app** in Claude Code. Confirm with `/mcp` inside Claude Code that both servers list as connected.
5. **Run `/export-assets`** against your Figma file to extract images, icons, and logos into `assets/` and upload them to Webflow's asset library.
6. **Run `/build-component`** to start the Figma → Webflow build loop on your first component.
7. **(If ingesting bulk content)** Configure `.claude/skills/content-ingest/config.json` from `config.example.json`, then run `/content-ingest audit` to walk your content folder.
8. **Cut your first changeset**:

   ```bash
   pnpm changeset
   pnpm changeset version
   git push --follow-tags
   ```

   Once tagged, jsDelivr serves the bundle at:

   ```
   https://cdn.jsdelivr.net/gh/<your-org>/<your-repo>@vX.Y.Z/dist/index.js
   ```

   Paste this URL into Webflow → Site Settings → Custom Code → Footer.

## Project structure

```
.
├── .claude/skills/         # Seven Claude Code skills
├── .changeset/             # Changesets versioning
├── bin/build.js            # esbuild bundler entry
├── docs/
│   ├── brainstorms/        # ce-brainstorm outputs land here
│   ├── plans/              # ce-plan outputs land here
│   ├── component-maps/     # build-component artefacts
│   ├── reference/          # Conventions library (Client-First, modal, swiper, etc.)
│   └── solutions/          # Documented gotchas (cross-project)
├── playwright.config.ts    # Visual regression config
├── scripts/api/            # Figma + Webflow REST helpers
├── src/
│   ├── index.ts            # Single bundle entry; wires modules into Webflow.push
│   ├── types/              # Ambient declarations for CDN globals
│   └── utils/              # One file per module (named exports)
└── tests/                  # Playwright tests
```

## Skills reference

| Skill | When to use |
|---|---|
| `/build-component` | Build a component from a Figma frame into a live Webflow page. The main Figma → Webflow loop. |
| `/export-assets` | Extract images/icons/logos from Figma and upload to Webflow's asset library. |
| `/asset-metadata` | Generate alt text for uploaded assets via Claude vision. |
| `/update-seo` | Draft page-level SEO meta titles + descriptions. |
| `/upload-copy` | Parse copy from docx/Word and seed CMS items. |
| `/type-sync` | Sync TypeScript ambient declarations with current Webflow MCP shapes. |
| `/content-ingest` | Bulk content drop (folders of docx + images) → Webflow CMS. Project-configurable. |

## Where to go next

- **Conventions:** read `CLAUDE.md` and `docs/reference/component-patterns.md`.
- **Architecture:** read `docs/reference/style-guide.md` for design tokens, `docs/reference/breakpoints.md` for responsive rules.
- **Patterns that recur:** browse `docs/solutions/` — every entry is a gotcha worth knowing before it bites you.
- **Adapt the template:** the skills, scripts, and docs are starting points. Edit them per-project.

---

This starter snapshots Granite's mature framework as of NGA v1.1.12. Improvements to the framework happen on consuming projects first and are back-ported here when stable.
