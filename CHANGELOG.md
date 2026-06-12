# Changelog

## 0.1.3

### Patch Changes

- Sliders section: sort `.sliders_item`s by `data-custom-sort` so groups stack contiguously, then alternate item backgrounds across the sorted list (continuous alternation so two transparent items can never sit back-to-back at a group boundary). Coloured items use the inner `.background-colour-selector[data-color]` value or fall back to `#3a3e24`, and inline `color: #e7e5d9` for inherited light text.

  Section nav: new `sectionLinks` module wires every `.section-links_link` button to smooth-scroll to the first `.sliders_item` whose `data-custom-sort` matches its `href` via `ScrollSmoother.scrollTo`. New `sectionLinksActive` module toggles `is-active` on the matching button when the section is in the viewport's centre band (via ScrollTrigger, with per-slug counting so adjacent same-slug items don't flicker the state). On mobile, the active button is auto-scrolled into the centre of its horizontally-scrolling strip — no-op on desktop where the strip fits.

  Hero animation: `homeAlternativeHero` now falls back to any `h1` inside `.section_hero` when `.hero_title2` isn't present, so the hero entrance animation works on pages that use the semantic heading directly.

## 0.1.2

### Patch Changes

- fix booking form

## 0.1.1

### Patch Changes

- Re-cut v0.1.0 as v0.1.1 to escape jsDelivr's negative cache. The v0.1.0 tag was pushed while the repo was still private; jsDelivr indexed it before the repo went public and poisoned the per-tag cache, leaving `@v0.1.0` permanently 404 on the CDN edge even though the SHA-pinned URL works. No code changes — `dist/index.js` is byte-for-byte identical to v0.1.0.

## 0.1.0

### Minor Changes

- Initial working release for staging.

  - Wire up the full Editoria animation module set in `src/index.ts` (was previously only running the MCP starter baseline: accordion, scroll-reveal, modals, swiper). All inherited Editoria modules now run in the same order Editoria uses, with the 100ms settling delay before the heavier animations.
  - Swap page smooth-scroll from Lenis to GSAP ScrollSmoother to match Editoria. `src/utils/gsapSmoothScroll.ts` is now the authoritative init; `src/utils/lenisGsap.ts` is removed. Modal page-scroll lock (`modals.ts`) now uses `smoothScroll.stop()` / `.start()` instead of `lenis.stop()` / `.start()`.
  - Fix the pin-spacer regression on `/rooms/*` and blog detail pages. ScrollSmoother applies a `transform` to `.main-wrapper`, which breaks `position: fixed` for ScrollTrigger pins. Initialising `gsapSmoothScroll()` first inside `Webflow.push` lets ScrollTrigger auto-select `pinType: 'transform'` for every later pin.
  - Update `CLAUDE.md`, `README.md`, and `src/types/gsap.d.ts` to reflect the ScrollSmoother default and drop stale Lenis references.

This file tracks releases of your project once you've used this template to bootstrap it.

The starter ships at `0.0.0`. When you cut your first changeset and tag a release, entries will be appended here automatically by `changesets/changelog-git`.
