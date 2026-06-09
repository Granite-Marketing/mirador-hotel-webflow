export const bgAccordion = () => {
  const section = document.querySelector('.section_bg-accordion');
  if (!section) return;
  const sizers = section.querySelectorAll('.bg-accordion_item-sizer');

  const config = {
    attributes: true,
    subtree: true,
    attributeFilter: ['class'],
  };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (!target.classList.contains('bg-accordion_item-radio-field')) return;

        sizers.forEach((s) => {
          s.style.height = '0px';
        });

        let active = section.querySelector('.bg-accordion_item-radio-field.fs-cmsfilter_active');
        if (active) {
          console.log(active);
          const parent = active.parentElement;
          if (!parent) return;
          const paragraph = parent.querySelector('.bg-accordion_item-paragraph');
          if (!paragraph) return;
          const height = paragraph.getBoundingClientRect().height;
          const sizer = parent.querySelector('.bg-accordion_item-sizer');
          if (!sizer) return;
          sizer.style.height = String(height) + 'px';
        }
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(section, config);
};
