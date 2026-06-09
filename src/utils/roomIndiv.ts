import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export const roomIndiv = () => {
  const button = document.querySelector("[func='show-room-details']");
  const section = document.querySelector('.section_room-detail');
  if (!section) return;
  const close = section?.querySelector('.overlay-close-button');
  const overlay: HTMLElement | null = section?.querySelector('.overlay.room-detail_overlay');
  const article: HTMLElement | null = section?.querySelector('.room-detail_component');
  const p = document.querySelector('.room-detail_content p');
  const img = document.querySelector('.room-detail_figure');
  if (!close || !overlay || !article) return;
  button?.addEventListener('click', () => {
    const splitText = new SplitText(p!, { type: 'lines,words' });
    const tl = gsap.timeline({
      defaults: { ease: (i) => 1 - Math.pow(1 - i, 4) },
      onComplete: () => {
        splitText.revert();
      },
    });
    gsap.set(splitText.lines, { overflow: 'hidden' });
    gsap.set(splitText.words, { yPercent: 100 });

    gsap.set(img, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    });

    article.style.transform = 'translate(0%)';
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';
    tl.to(img, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 1,
      delay: 0.2,
    }).to(
      splitText.words,
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.025,
      },
      '-=0.75'
    );
  });

  close?.addEventListener('click', () => {
    closeModal();
  });
  overlay?.addEventListener('click', () => {
    closeModal();
  });

  function closeModal() {
    article!.style.transform = 'translateX(100%)';
    overlay!.style.pointerEvents = 'none';
    overlay!.style.opacity = '0';
  }
};
