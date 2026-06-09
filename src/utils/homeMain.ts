import { gsap } from 'gsap';
import SplitType from 'split-type';
// import Splitting from 'splitting';
// This an attempt to split the text but it doesn't work
// import { nestedLineSplit } from './gsapNestedLineSplit';

// gsap.registerPlugin(SplitType);

export const homeMain = () => {
  if (!document.querySelector('.section_hero')) return;

  const splitText = new SplitType('.hero_title2', {
    types: 'words,chars',
  });

  const heroFigure1 = document.querySelector('.hero_figure-1');
  const heroFigure2 = document.querySelector('.hero_figure-2');
  const ems = document.querySelectorAll('.hero_title2 em');
  gsap.set(ems, {
    display: 'unset',
  });
  gsap.set(splitText.chars, {
    yPercent: 100,
    opacity: 0,
  });

  splitText.words?.forEach((word) => {
    (word as HTMLElement).style.display = 'inline-block';
    (word as HTMLElement).style.whiteSpace = 'normal';
  });

  splitText.lines?.forEach((line) => {
    (line as HTMLElement).style.display = 'inline-block';
    // (line as HTMLElement).style.whiteSpace = 'nowrap';
  });
  gsap.set(heroFigure1, {
    overflow: 'hidden',
  });
  const tl = gsap.timeline({
    defaults: {
      ease: (i) => 1 - Math.pow(1 - i, 4),
      duration: 1,
    },
  });
  tl.fromTo(
    heroFigure1!.querySelector('img'),
    {
      scale: 1.25,
    },
    {
      scale: 1,
    }
  )
    .fromTo(
      heroFigure2,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
      },
      '-=.5'
    )
    .to(
      splitText.chars,
      {
        duration: 1,
        yPercent: 0,
        stagger: 0.025,
        opacity: 1,
      },
      '-=.5'
    );
};
