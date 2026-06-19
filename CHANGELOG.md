# Changelog

## 0.1.9

### Patch Changes

- Polish the FAQ accordion behaviour:

  - Smooth the first accordion transition by syncing the initially-active item's sizer on init (gated on `document.fonts.ready` so the initial measurement uses final font metrics). Previously the first click animated from `height: auto` and snapped instead of transitioning.
  - Prevent cross-group layout shift. Wrap each category's rows in a `bg-accordion_group-wrapper` and apply a `min-height` equal to the group's collapsed height plus its tallest paragraph. The browser enforces the reservation every frame, so opening or closing an item in one group no longer drifts the labels of the other.
  - Make the FAQ category margin-top responsive via `clamp()` instead of a fixed `rem` value, so the inter-group gap scales sensibly across viewports.

## 0.1.8

### Patch Changes

- Update booking engine CSS filter families and form fonts

## 0.1.7

### Patch Changes

- update form font family

## 0.1.6

### Patch Changes

- Cross-page scroll now animates smoothly. On arrival, snap back to the top first (to undo any native browser hash-jump), hold on the hero for 700 ms, then animate down to the target via ScrollSmoother. Previously the scroll appeared instant because the browser had already jumped near the target before our handler ran.

## 0.1.5

### Patch Changes

- Add cross-page scroll-to-section support. Links carrying both an `href` (destination page) and a `scroll-target` attribute (a `data-custom-sort` slug) navigate to the target page and smooth-scroll to the matching `.sliders_item` on arrival via ScrollSmoother. Mirrors the same-page contract used by `sectionLinks`.

## 0.1.4

### Patch Changes

- Scope the sliders sort/paint pass to `.sliders_collection.is-experiences` so it no longer applies to every sliders collection on the site — previously it grouped and alternated backgrounds on any `.sliders_collection` it found.

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
