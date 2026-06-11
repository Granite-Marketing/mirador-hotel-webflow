/**
 * Mirador Hotel — single bundle entry point.
 *
 * Loaded once via `<script src>` in Webflow Site Settings footer. Wiring
 * mirrors Editoria's `src/index.ts`: a deterministic init order with a small
 * settling delay before the heavier animation modules run.
 *
 * `Webflow.push` fires after DOMContentLoaded and Webflow.js init, so every
 * CDN global is available inside the callback — no polling, no queues.
 *
 * `gsapSmoothScroll()` MUST run before any module that creates a
 * ScrollTrigger pin. ScrollTrigger auto-picks `pinType: 'transform'` only
 * when ScrollSmoother is already alive — pins created before it will use
 * `position: fixed` and break under ScrollSmoother's `.main-wrapper`
 * transform.
 */

import { accordion } from '$utils/accordion'
import { bgAccordion } from '$utils/bgAccordion'
import { bookingButtonOnScroll } from '$utils/bookingButtonOnScoll'
import { bookingModal } from '$utils/bookingModal'
import { buttonAnimation } from '$utils/buttonAnimation'
import { experiences } from '$utils/experiences'
import { gaTagging } from '$utils/gaTagging'
import { gsapBasicAnimations } from '$utils/gsapBasicAnimations'
import { gsapSmoothScroll } from '$utils/gsapSmoothScroll'
import { header } from '$utils/header'
import { homeAlternativeHero } from '$utils/homeAlternativeHero'
import { homeMain } from '$utils/homeMain'
import { linesAnimation } from '$utils/linesAnimation'
import { initMap } from '$utils/map'
import { mapNeeds } from '$utils/mapNeeds'
import { modals } from '$utils/modals'
import { popupModal } from '$utils/popupModal'
import { roomIndiv } from '$utils/roomIndiv'
import { roomsHeroAnimation } from '$utils/roomsHeroAnimation'
import { slidersSections } from '$utils/slidersSections'
import { stickyHero } from '$utils/stickyHero'
import { stickySection } from '$utils/stickySection'
import { stickyText } from '$utils/stickyText'
import { swiperSliders } from '$utils/swiperSliders'
import { textMask } from '$utils/textMask'

window.Webflow ||= [] as unknown as WebflowQueue
window.Webflow.push(() => {
  mapNeeds()
  gsapSmoothScroll()
  modals()
  accordion()
  swiperSliders()
  header()

  setTimeout(() => {
    homeMain()
    linesAnimation()
    textMask()
    stickyHero()
    experiences()
    bookingModal()
    roomIndiv()
    slidersSections()
    bgAccordion()
    stickySection()
    buttonAnimation()
    roomsHeroAnimation()
    popupModal()
    stickyText()
    homeAlternativeHero()
    gsapBasicAnimations()
    gaTagging()
    bookingButtonOnScroll()
    setTimeout(() => initMap(), 1000)
    document.querySelectorAll('.js-loading').forEach((item) => {
      item.classList.remove('js-loading')
    })
  }, 100)
})
