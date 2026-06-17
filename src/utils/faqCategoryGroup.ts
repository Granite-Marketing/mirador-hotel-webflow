export const faqCategoryGroup = () => {
  const items = document.querySelectorAll<HTMLElement>(
    '.bg-accordion_names-item-wrapper.u-full'
  )
  if (!items.length) return

  let lastCategory = ''

  items.forEach((item, i) => {
    const heading = item.querySelector<HTMLElement>('.heading-style-h3.u-smaller')
    const category = heading?.textContent?.trim() ?? ''

    if (category === lastCategory) {
      if (heading) heading.style.display = 'none'
      return
    }

    lastCategory = category

    if (i > 0) {
      const margin = item.getAttribute('data-margin-top')
      if (margin) item.style.marginTop = `${margin}rem`
    }
  })

}
