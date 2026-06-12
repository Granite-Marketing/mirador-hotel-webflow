/**
 * Section nav buttons (`.section-links_link`) carry an `href` matching a
 * sliders_item's `data-custom-sort` slug. On click, smooth-scroll the page
 * to the first matching item via ScrollSmoother (which is already running
 * the page smooth-scroll — using its own scrollTo keeps the animation in
 * sync with the smoother and respects its transform on `.main-wrapper`).
 *
 * `<button>` doesn't natively navigate from `href`, so the only thing we
 * need to do is intercept the click and call `scrollTo`.
 */
export const sectionLinks = (): void => {
  const links = document.querySelectorAll<HTMLElement>('.section-links_link');
  if (links.length === 0) return;

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const slug = link.getAttribute('href');
      if (!slug) return;

      const target = document.querySelector<HTMLElement>(
        `.sliders_item[data-custom-sort="${slug}"]`
      );
      if (!target) return;

      event.preventDefault();

      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true);
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};
