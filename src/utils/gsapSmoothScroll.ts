/**
 * GSAP ScrollSmoother — page smooth-scroll for the bundle.
 *
 * Requires the Webflow page to have `.page-wrapper` (wrapper) and
 * `.main-wrapper` (content) — Webflow's default body structure provides both.
 *
 * ScrollSmoother applies a `transform: matrix3d(...)` to `.main-wrapper` to
 * drive smooth scroll. That transform creates a new containing block for
 * `position: fixed` descendants — which means any ScrollTrigger pin inside
 * `.main-wrapper` must use `pinType: 'transform'`, otherwise the pin spacer
 * is created but the element doesn't visually pin (it scrolls with the page
 * and snaps to the spacer's end). ScrollTrigger auto-detects this when
 * ScrollSmoother is initialised BEFORE the pin is created — so call
 * `gsapSmoothScroll()` first in `src/index.ts`.
 *
 * `smoothScroll.stop()` / `.start()` pause and resume the scroller — used by
 * `modals.ts` to lock page scroll while a modal is open.
 */

let instance: ScrollSmootherInstance | null = null

export const smoothScroll = {
  get raw(): ScrollSmootherInstance | null {
    return instance
  },
  stop(): void {
    instance?.paused(true)
  },
  start(): void {
    instance?.paused(false)
  },
}

export const gsapSmoothScroll = (): void => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  instance = ScrollSmoother.create({
    content: '.main-wrapper',
    wrapper: '.page-wrapper',
    smooth: 1.5,
    effects: true,
  })
}
