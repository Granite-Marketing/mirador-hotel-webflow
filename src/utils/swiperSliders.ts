export const swiperSliders = () => {
  const sliderWrapper = document.querySelectorAll('.swiper_slider');

  if (sliderWrapper) {
    sliderWrapper.forEach((slider) => {
      const defaultSlider = slider.querySelector('.swiper.default');
      const nextButton = slider.querySelector('.swiper_button.swiper-button-next');
      const splitSlider = slider.querySelector('.swiper.split');
      const children = slider.querySelectorAll('.image-slider_item');

      if (defaultSlider) {
        if (children.length === 1) {
          nextButton?.classList.add('hide');
          nextButton?.setAttribute('aria-hidden', 'true');
        }
        const swiper = new Swiper(defaultSlider, {
          loop: true,
          speed: 1000,
          slidesPerView: 'auto',
          navigation: {
            nextEl: nextButton,
          },
        });
      }

      if (splitSlider) {
        const swiper = new Swiper(splitSlider, {
          loop: false,
          speed: 1000,
          freeMode: true,
          grabCursor: true,
          mousewheel: {
            forceToAxis: 'horizontal',
          },
          navigation: {
            nextEl: nextButton,
          },
          breakpoints: {
            0: {
              /* when window >=0px - webflow mobile landscape/portriat */ slidesPerView: 1.05,
            },
            767: {
              /* when window >= 767px - webflow tablet */ slidesPerView: 1.25,
            },
            992: {
              slidesPerView: 1.25,
            },
          },
        });
      }
    });
  }
};
