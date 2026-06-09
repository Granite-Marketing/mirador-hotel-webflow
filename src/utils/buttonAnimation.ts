import { gsap } from 'gsap';
import SplitText from 'gsap/src/SplitText';

gsap.registerPlugin(SplitText);
export const buttonAnimation = () => {
  const buttons = document.querySelectorAll('.button');

  if (!buttons) return;

  buttons.forEach((button) => {
    const text = button.textContent || '';
    const originalSpan = document.createElement('span');
    const cloneSpan = document.createElement('span');

    originalSpan.textContent = text;
    cloneSpan.textContent = text;

    button.textContent = '';
    button.appendChild(originalSpan);
    button.appendChild(cloneSpan);

    gsap.set(button, {
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'grid',
      gridTemplateAreas: '"layer"',
    });

    gsap.set(button.querySelectorAll('span'), {
      display: 'block',
      whiteSpace: 'nowrap',
      width: '100%',
      left: '0',
      gridArea: 'layer',
    });

    const originalSplit = new SplitText(originalSpan, { type: 'chars' });
    const cloneSplit = new SplitText(cloneSpan, { type: 'chars' });

    gsap.set(originalSplit.words, { position: 'relative' });
    gsap.set(cloneSplit.words, {
      position: 'relative',
    });
    gsap.set(cloneSplit.chars, {
      yPercent: 208,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(originalSplit.chars, {
      yPercent: -100,
      y: '-24px',
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.inOut',
    }).to(
      cloneSplit.chars,
      {
        yPercent: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.inOut',
      },
      '<0.1'
    );

    button.addEventListener('mouseenter', () => tl.play());
    button.addEventListener('mouseleave', () => tl.reverse());
  });
};
