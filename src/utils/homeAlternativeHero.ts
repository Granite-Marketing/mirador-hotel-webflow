import { gsap } from 'gsap';
import SplitType from 'split-type';

export const homeAlternativeHero = () => {
  if (!document.querySelector('.section_hero-booking')) return;

  const splitTexTitle = new SplitType('.hero_title2', {
    types: 'words,chars',
  });

  const ems = document.querySelectorAll('.hero_title2 em');
  gsap.set(ems, {
    display: 'unset',
  });
  gsap.set(splitTexTitle.chars, {
    yPercent: 100,
    opacity: 0,
  });

  splitTexTitle.words?.forEach((word) => {
    (word as HTMLElement).style.display = 'inline-block';
    (word as HTMLElement).style.whiteSpace = 'normal';
  });

  splitTexTitle.lines?.forEach((line) => {
    (line as HTMLElement).style.display = 'inline-block';
    // (line as HTMLElement).style.whiteSpace = 'nowrap';
  });
  const tl = gsap.timeline({
    defaults: {
      ease: (i) => 1 - Math.pow(1 - i, 4),
      duration: 1,
    },
  });
  tl  
  .to(
      splitTexTitle.chars,
      {
        duration: 1,
        yPercent: 0,
        stagger: 0.025,
        opacity: 1,
      },
      '-=.5'
    )
    .from(
        ['.hero_tag', '.hero_booking-engine-wrapper', '.open-modal'],
        {        
          opacity: 0,
          stagger: 0.05,
        },
        '-=.5'
      )
};
