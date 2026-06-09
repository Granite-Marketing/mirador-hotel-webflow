import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export const stickySection = () => {
  const block = document.querySelector('.section_sticky-hero.js-desktop-slider');

  if (block) return;

  const stickySection = document.querySelector('.section_sticky-hero');
  const stickyImages = document.querySelectorAll('.sticky-hero_item-figure');
  const checkPoint = document.querySelector(
    '.sticky-hero_pagination .sticky-hero_pagination-bullet'
  );
  const cloneLength = stickyImages.length - 1;
  // duplicate the checkPoints to be as much as the stickyImages
  if (cloneLength === 1) {
    checkPoint?.parentNode?.removeChild(checkPoint);
  } else {
    for (let i = 0; i < cloneLength; i++) {
      const clone = checkPoint?.cloneNode(true);
      if (clone) {
        checkPoint?.parentNode?.appendChild(clone);
      }
    }
  }

  const newCheckPoints = document.querySelectorAll(
    '.sticky-hero_pagination .sticky-hero_pagination-bullet'
  );

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const imagesArray = Array.from(stickyImages).reverse();
    const isSquare = stickySection?.classList.contains('is-square');
    const innerSection = stickySection?.querySelector('.sticky-hero_component.is-square');

    const stepSize = 1 / imagesArray.length;
    const steps = imagesArray.length;

    gsap.set(imagesArray, { opacity: 0 });
    gsap.set(imagesArray[0], { opacity: 1 }); // Make last image visible initially
    gsap.set(newCheckPoints, { backgroundColor: 'transparent' });
    gsap.set(newCheckPoints[0], { backgroundColor: '#FFFFFF' }); // Make last checkpoint white initially

    let currentImageIndex = 0;

    ScrollTrigger.create({
      trigger: isSquare ? innerSection : stickySection,
      start: 'top top',
      end: `+=${100 * steps}%`,
      pin: stickySection,
      // markers: true,
      scrub: true,
      onUpdate: (self) => {
        const { progress } = self;
        const targetIndex = Math.floor(progress / stepSize);

        if (targetIndex !== currentImageIndex && targetIndex < imagesArray.length) {
          gsap.to(imagesArray[currentImageIndex], {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          });

          // Fade in next image
          gsap.to(imagesArray[targetIndex], {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          });

          // Update pagination
          gsap.to(newCheckPoints[currentImageIndex], {
            backgroundColor: 'transparent',
            duration: 0.5,
            ease: 'power2.inOut',
          });

          gsap.to(newCheckPoints[targetIndex], {
            backgroundColor: '#FFFFFF',
            duration: 0.5,
            ease: 'power2.inOut',
          });

          currentImageIndex = targetIndex;
        }
      },
    });
  });
};
