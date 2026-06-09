import { gsap } from 'gsap';
export const header = () => {
  const navBtn = document.querySelector('.nav_menu-button');

  if (navBtn) {
    let mm = gsap.matchMedia();
    let tl = gsap.timeline({ paused: true, reversed: true });

    mm.add(
      {
        isMobile: 'screen and (max-width: 767px)',
        isDesktop: 'screen and (min-width: 768px)',
      },
      (context) => {
        let { isMobile, isDesktop } = context.conditions;

        if (isDesktop) {
          tl.from('.nav_menu', {
            opacity: 0,
            // duration: 1,
            ease: 'expo.out',
          }),
            tl.from(
              '.nav_menu-bg',
              {
                scale: 1.1,
                duration: 2,
                opacity: 0,
                ease: 'expo.out',
              },
              '<+=0.25'
            );
          tl.from(
            ['.nav_link', '.nav_list-sub-link', '.circa_nav-link'],
            {
              y: 8,
              opacity: 0,
              duration: 1,
              // delay: 0.45,
              stagger: 0.05,
            },
            '<+=1'
          );
        }

        if (isMobile) {
          tl.from(['.nav_link', '.nav_list-sub-link', '.circa_nav-link'], {
            y: 8,
            opacity: 0,
            delay: 0.45,
            stagger: 0.05,
          });
        }
      }
    );

    navBtn.addEventListener('click', () => {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.reverse();
      }
    });
  }
};
