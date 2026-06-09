import { gsap } from 'gsap';

export const roomsHeroAnimation = () => {
  const heroTitle = document.querySelector('.sticky-hero_header');
  const heroSubtitle = document.querySelector('.sticky-hero_paragraph');
  const heroStats = document.querySelectorAll('.sticky-hero_sub-richtext li');
  const heroButton = document.querySelector('.sticky-hero_button-wrapper .button');
  const heroModalButton = document.querySelector('.sticky-hero_footer .cta-simple');
  if (!heroTitle || !heroSubtitle || !heroStats) return;
  gsap.set([heroTitle, heroSubtitle, heroStats, heroButton, heroModalButton], {
    opacity: 0,
  });
  const tl = gsap.timeline();
  tl.fromTo(heroTitle, { opacity: 0 }, { duration: .75, ease: 'power2.inOut', opacity: 1 });
  tl.fromTo(heroSubtitle, { opacity: 0 }, { duration: .75, ease: 'power2.inOut', opacity: 1 }, '<+=0.05');
  tl.fromTo(heroStats, { opacity: 0, stagger: 0.5, }, { duration: .75, ease: 'power2.inOut', opacity: 1 }, '<+=0.05');
  tl.fromTo(heroButton, { opacity: 0 }, { duration: .75, ease: 'power2.inOut', opacity: 1 }, '<+=0.05');
  tl.fromTo(heroModalButton, { opacity: 0 }, { duration: .75, ease: 'power2.inOut', opacity: 1 }, '<+=0.05');
};
