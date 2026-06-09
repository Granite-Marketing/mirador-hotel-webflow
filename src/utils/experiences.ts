import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const isMobile = window.matchMedia('(max-width: 767px)');
const swiperArr = [];
const experienceItems = document.querySelectorAll('.experiences_item-gallery');

export const experiences = () => {
  if (isMobile.matches) {
    console.log('init swiper');
    experienceSwiper();
  } else {
    defaultHighlights();
  }

  experienceItems?.forEach((subcollection) => {
    subcollection.addEventListener('mouseover', (event) => {
      if (isMobile.matches) return;
      const label = event.target?.closest('.experiences_subcontent');
      if (!label) return;
      updateCollectionHighlights(subcollection, label);
    });
  });

  isMobile.addEventListener('change', function () {
    console.log('change');
    if (isMobile.matches) {
      experienceSwiper();
    } else {
      defaultHighlights();
      swiperArr.forEach((swiper) => {
        swiper.destroy();
        console.log('swiper destroyed');
      });
    }
  });
};

const updateCollectionHighlights = (collection, label) => {
  const items = collection.querySelectorAll('.experiences_subitem');
  items?.forEach((item) => {
    const itemLabel = item.querySelector('.experiences_subcontent');
    highlightExperience(item, label == itemLabel);
  });
};

const highlightExperience = (item, highlight = true) => {
  const label = item.querySelector('.experiences_subcontent');
  const figure = item.querySelector('.experiences_subfigure');
  const content = item.querySelector('.experiences_item-content');
  const mainHeading = item.querySelector('.experiences_item-header.is-desk');
  if (highlight) {
    figure.style.opacity = 1;
    label.classList.add('is-active');

    content.style.opacity = 1;
    content.style.pointerEvents = 'auto';

    mainHeading.style.opacity = 1;
    mainHeading.style.pointerEvents = 'auto';
  } else {
    figure.style.opacity = 0;
    label.classList.remove('is-active');
    content.style = {};

    mainHeading.style.opacity = 0;
    mainHeading.style.pointerEvents = 'none';
  }
};

const defaultHighlights = () => {
  experienceItems?.forEach((subcollection) => {
    const defaultLabel = subcollection.querySelector('.experiences_subcontent');
    updateCollectionHighlights(subcollection, defaultLabel);
  });
};

const experienceSwiper = () => {
  const sliders = document.querySelectorAll('.experiences_subcollection-wrap.swiper');
  if (!sliders) return;

  sliders.forEach((slider) => {
    const sliderItems = slider.querySelectorAll('.experiences_subitem');
    const pagination = slider
      .closest('.experiences_item-gallery')
      ?.querySelector('.experiences_subcollection-pagination');

    sliderItems.forEach((item) => {
      highlightExperience(item, true);
    });

    const swiper = new Swiper(slider, {
      modules: [Autoplay, Pagination],
      loop: true,
      autoplay: true,
      grabCursor: true,
      pagination: {
        el: pagination,
      },
      slidesPerView: 1,
    });
    console.log('swiper created');
    swiperArr.push(swiper);
  });
};
