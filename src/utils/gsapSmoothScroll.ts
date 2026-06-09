import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const gsapSmoothScroll = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    content: '.main-wrapper',
    wrapper: '.page-wrapper',
    smooth: 1.5,
    effects: true,
  });
};
