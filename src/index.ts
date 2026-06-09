/**
 * Webflow MCP Starter — single bundle entry point.
 *
 * Loaded once via `<script src>` in Webflow Site Settings footer, after the
 * GSAP/ScrollTrigger/SplitText/Swiper/Lenis CDN tags. `Webflow.push` fires
 * after DOMContentLoaded and Webflow.js init, so every CDN global is
 * available inside the callback — no polling, no queues.
 *
 * Per-project modules live in `src/utils/` and are imported + called below.
 * The starter ships with a generic animation baseline only:
 * Lenis smooth-scroll, modals, Swiper sliders, and scroll-triggered
 * fade/slide reveals. Project-specific utilities are added per build.
 */

import { accordion } from '$utils/accordion'
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations'
import { lenisGsap } from '$utils/lenisGsap'
import { modals } from '$utils/modals'
import { swiperSliders } from '$utils/swiperSliders'

window.Webflow ||= [] as unknown as WebflowQueue
window.Webflow.push(() => {
  lenisGsap(gsap, ScrollTrigger)
  modals()
  swiperSliders()
  accordion()
  gsapBasicAnimations()
})
