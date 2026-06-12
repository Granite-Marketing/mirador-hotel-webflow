/**
 * Active-state companion for `sectionLinks`. Adds/removes `is-active` on
 * `.section-links_link` buttons based on whether any `.sliders_item` with
 * the matching `data-custom-sort` slug is in the viewport's centre band.
 *
 * Multiple items can share a slug, so we count how many items of each slug
 * are currently "in band" and only toggle the button(s) when the count
 * crosses 0 ↔ n. This avoids the button flickering off between adjacent
 * same-slug items.
 *
 * Uses ScrollTrigger to stay consistent with the rest of the repo and to
 * pick up `ScrollTrigger.refresh()` for free when CMS / accordion content
 * changes page geometry.
 */
export const sectionLinksActive = (): void => {
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>('.section-links_link')
  );
  const items = Array.from(
    document.querySelectorAll<HTMLElement>('.sliders_item[data-custom-sort]')
  );
  if (buttons.length === 0 || items.length === 0) return;

  const buttonsBySlug = new Map<string, HTMLElement[]>();
  buttons.forEach((button) => {
    const slug = button.getAttribute('href');
    if (!slug) return;
    const bucket = buttonsBySlug.get(slug) ?? [];
    bucket.push(button);
    buttonsBySlug.set(slug, bucket);
  });

  const activeCount = new Map<string, number>();

  const setActive = (slug: string, active: boolean) => {
    const targets = buttonsBySlug.get(slug);
    if (!targets) return;
    targets.forEach((button) => button.classList.toggle('is-active', active));
    if (active && targets[0]) followInStrip(targets[0]);
  };

  items.forEach((item) => {
    const slug = item.getAttribute('data-custom-sort');
    if (!slug || !buttonsBySlug.has(slug)) return;

    ScrollTrigger.create({
      trigger: item,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        const next = (activeCount.get(slug) ?? 0) + (self.isActive ? 1 : -1);
        activeCount.set(slug, next);
        if (self.isActive && next === 1) setActive(slug, true);
        if (!self.isActive && next === 0) setActive(slug, false);
      },
    });
  });
};

/**
 * Scroll the button's horizontally-scrolling ancestor so the button is
 * centred within it. No-op if no ancestor actually scrolls horizontally
 * (e.g., on desktop where the strip fits). Touches only `scrollLeft` so
 * page scroll is never affected.
 */
const followInStrip = (button: HTMLElement) => {
  const strip = findHorizontalScroller(button);
  if (!strip) return;

  const buttonRect = button.getBoundingClientRect();
  const stripRect = strip.getBoundingClientRect();
  const offsetWithin = buttonRect.left - stripRect.left + strip.scrollLeft;
  const target = offsetWithin - (strip.clientWidth - button.clientWidth) / 2;
  const max = strip.scrollWidth - strip.clientWidth;
  const clamped = Math.max(0, Math.min(target, max));

  strip.scrollTo({ left: clamped, behavior: 'smooth' });
};

const findHorizontalScroller = (from: HTMLElement): HTMLElement | null => {
  let node: HTMLElement | null = from.parentElement;
  while (node && node !== document.body) {
    if (node.scrollWidth > node.clientWidth) {
      const overflowX = getComputedStyle(node).overflowX;
      if (overflowX === 'auto' || overflowX === 'scroll') return node;
    }
    node = node.parentElement;
  }
  return null;
};
