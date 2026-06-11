# Changelog

## 0.1.0

### Minor Changes

- Initial working release for staging.

  - Wire up the full Editoria animation module set in `src/index.ts` (was previously only running the MCP starter baseline: accordion, scroll-reveal, modals, swiper). All inherited Editoria modules now run in the same order Editoria uses, with the 100ms settling delay before the heavier animations.
  - Swap page smooth-scroll from Lenis to GSAP ScrollSmoother to match Editoria. `src/utils/gsapSmoothScroll.ts` is now the authoritative init; `src/utils/lenisGsap.ts` is removed. Modal page-scroll lock (`modals.ts`) now uses `smoothScroll.stop()` / `.start()` instead of `lenis.stop()` / `.start()`.
  - Fix the pin-spacer regression on `/rooms/*` and blog detail pages. ScrollSmoother applies a `transform` to `.main-wrapper`, which breaks `position: fixed` for ScrollTrigger pins. Initialising `gsapSmoothScroll()` first inside `Webflow.push` lets ScrollTrigger auto-select `pinType: 'transform'` for every later pin.
  - Update `CLAUDE.md`, `README.md`, and `src/types/gsap.d.ts` to reflect the ScrollSmoother default and drop stale Lenis references.

This file tracks releases of your project once you've used this template to bootstrap it.

The starter ships at `0.0.0`. When you cut your first changeset and tag a release, entries will be appended here automatically by `changesets/changelog-git`.
