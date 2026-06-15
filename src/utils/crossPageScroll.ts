/**
 * Cross-page scroll-to-section.
 *
 * Source-page anchors marked with both `href` (destination page) and
 * `scroll-target` (a `data-custom-sort` slug on the destination page)
 * navigate to the target page with the slug appended as a URL hash. On the
 * destination page, the hash is read and ScrollSmoother scrolls to the
 * matching `.sliders_item[data-custom-sort="<slug>"]`.
 *
 * Mirrors the same-page contract in `sectionLinks.ts`: the destination
 * element selector is identical, only the trigger differs (cross-page
 * navigation instead of an intercepted click).
 *
 * Runs after `gsapSmoothScroll()` and after the 100ms settling block in
 * `index.ts`, so `ScrollSmoother.get()` is available and section heights
 * have been measured before we scroll.
 */
export const crossPageScroll = (): void => {
  hookOutgoing();
  handleIncoming();
};

const hookOutgoing = (): void => {
  const links = document.querySelectorAll<HTMLAnchorElement>(
    'a[scroll-target][href]'
  );
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      // Let modifier-clicks (new tab, new window, middle-click) through.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;

      const href = link.getAttribute('href');
      const slug = link.getAttribute('scroll-target');
      if (!href || !slug) return;

      event.preventDefault();
      window.location.href = `${href}#${slug}`;
    });
  });
};

/**
 * Hold on the destination page's hero before animating down. The browser
 * may have already done a native hash-jump on initial load (the page
 * arrived already scrolled toward the target) — we snap back to the top
 * first so the user sees the hero, then animate from there.
 */
const HERO_HOLD_MS = 700;

const handleIncoming = (): void => {
  const slug = window.location.hash.slice(1);
  if (!slug) return;

  // Clean the hash immediately so a refresh / back-nav doesn't re-trigger
  // and so any later anchor-jump heuristic can't act on it.
  history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search
  );

  const target = document.querySelector<HTMLElement>(
    `.sliders_item[data-custom-sort="${slug}"]`
  );
  if (!target) return;

  // Snap to the top instantly — undoes any native hash-jump the browser
  // performed before our handler ran, so the hero is visible.
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(0, false);
  } else {
    window.scrollTo(0, 0);
  }

  // Hold on the hero, then animate smoothly down to the target.
  window.setTimeout(() => {
    const live = ScrollSmoother.get();
    if (live) {
      live.scrollTo(target, true);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, HERO_HOLD_MS);
};
