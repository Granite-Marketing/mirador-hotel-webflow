/**
 * Lenis + GSAP wiring — default smooth-scroll for the bundle.
 *
 * Lenis is loaded as a CDN ambient global (declared in `src/types/gsap.d.ts`).
 * Importing `lenis` from this module gives other modules a handle to call
 * `lenis.stop()` / `lenis.start()` — used by `modals.ts` to lock page scroll
 * when a modal is open.
 *
 * Lifted from editoria/src/utils/lenisGsap.ts with explicit param types to
 * satisfy strict TypeScript.
 */

let instance: LenisInstance | null = null

export const lenis = {
  get raw(): LenisInstance | null {
    return instance
  },
  stop(): void {
    instance?.stop()
  },
  start(): void {
    instance?.start()
  },
}

export const lenisGsap = (
  gsapInstance: GsapInstance,
  scrollTrigger: ScrollTriggerStatic,
): void => {
  instance = new Lenis({})

  gsapInstance.registerPlugin(scrollTrigger)

  instance.on('scroll', scrollTrigger.update)

  gsapInstance.ticker.add((time: number) => {
    instance?.raf(time * 1000)
  })

  gsapInstance.ticker.lagSmoothing(0)
}
