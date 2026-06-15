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

const handleIncoming = (): void => {
  const slug = window.location.hash.slice(1);
  if (!slug) return;

  const target = document.querySelector<HTMLElement>(
    `.sliders_item[data-custom-sort="${slug}"]`
  );
  if (!target) return;

  // Clean the hash first so a refresh / back-nav doesn't re-trigger.
  history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search
  );

  // Defer one frame so layout, font swap, and ScrollTrigger measurements
  // settle before we ask the smoother to scroll.
  requestAnimationFrame(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};
