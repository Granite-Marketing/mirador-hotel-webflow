import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const gsapBasicAnimations = () => {
  let mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: 'screen and (max-width: 767px)',
      isDesktop: 'screen and (min-width: 768px)',
    },
    (context) => {
      let { isMobile, isDesktop } = context.conditions;
      
      gsap.set('.slide-in', { y: 25, opacity: 0 });
      ScrollTrigger.batch('.slide-in', {
        start: isMobile ? 'top 85%' : 'top 75%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1 }),
      });

      gsap.set('.fade-in', { opacity: 0 });
      ScrollTrigger.batch('.fade-in', {
        start: isMobile ? 'top 85%' : 'top 75%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 1 }),
      });
    })  
};
