// Swiper is a CDN-loaded ambient global. Autoplay + Pagination are bundled
// in the CDN distribution so no `modules:` config is needed.
export const slidersSections = () => {
  const sections = document.querySelectorAll('.section_sliders')

  sections.forEach((section) => {
    sortAndPaintSliderItems(section)

    const blocks = section.querySelectorAll('.sliders_item')

    blocks.forEach((block) => {
      const slider = block.querySelector('.swiper')

      if (!slider) return
      console.log(slider)
      const pagination = block.querySelector('.swiper-pagination-bullets')
      const newSwiper = new Swiper(slider, {
        loop: true,
        autoplay: true,
        grabCursor: true,
        pagination: {
          el: pagination,
        },
        slidesPerView: 1,
      })
      console.log(newSwiper)
    })
  })
}

const DEFAULT_BG = '#3a3e24'
const LIGHT_TEXT = '#e7e5d9'

const sortAndPaintSliderItems = (section: Element) => {
  const collection = section.querySelector<HTMLElement>('.sliders_collection.is-experiences')
  if (!collection) return

  const items = Array.from(collection.querySelectorAll<HTMLElement>(':scope > .sliders_item'))
  if (items.length === 0) return

  items
    .slice()
    .sort((a, b) => {
      const av = a.getAttribute('data-custom-sort') ?? ''
      const bv = b.getAttribute('data-custom-sort') ?? ''
      return av.localeCompare(bv)
    })
    .forEach((item) => collection.appendChild(item))

  // Continuous alternation across the sorted list so we never end up with
  // two transparent items next to each other at a group boundary. First
  // item is transparent, then strictly alternate.
  let coloured = false

  Array.from(collection.querySelectorAll<HTMLElement>(':scope > .sliders_item')).forEach((item) => {
    if (coloured) {
      const color =
        item
          .querySelector<HTMLElement>('.background-colour-selector')
          ?.getAttribute('data-color') || DEFAULT_BG
      item.style.backgroundColor = color
      item.style.color = LIGHT_TEXT
    } else {
      item.style.backgroundColor = 'transparent'
      item.style.color = ''
    }
    coloured = !coloured
  })
}
