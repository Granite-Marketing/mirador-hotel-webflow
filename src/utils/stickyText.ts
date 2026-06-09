import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const stickyText = () => {
  const stickyText = document.querySelector('[anim=sticky]');

  if (!stickyText) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    ScrollTrigger.create({
      trigger: stickyText.parentElement,
      start: 'top 20%',
      end: '80% 20%',
      pin: stickyText,
      markers: false,
    });
  });
};
