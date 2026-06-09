import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

export const slidersSections = () => {
  const sections = document.querySelectorAll('.section_sliders');

  sections.forEach((section) => {
    const blocks = section.querySelectorAll('.sliders_item');

    blocks.forEach((block) => {
      const slider = block.querySelector('.swiper');

      if (!slider) return;
      console.log(slider);
      const pagination = block.querySelector('.swiper-pagination-bullets');
      const newSwiper = new Swiper(slider, {
        modules: [Autoplay, Pagination],
        loop: true,
        autoplay: true,
        grabCursor: true,
        pagination: {
          el: pagination,
        },
        slidesPerView: 1,
      });
      console.log(newSwiper);
    });
  });
};
