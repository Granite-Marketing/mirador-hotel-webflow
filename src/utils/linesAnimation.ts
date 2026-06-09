import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const lineSetup = (
  line: HTMLElement,
  scrub: boolean,
  duration?: number,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const innerLine = document.createElement('div');
  innerLine.classList.add('section-line-inner');
  // get the background color of the line
  const { backgroundColor } = getComputedStyle(line);
  innerLine.style.cssText = `
      width: 100%;
      height: 100%;
      background: ${backgroundColor};
    `;
  line.style.backgroundColor = 'transparent';
  line.appendChild(innerLine);
  if (direction === 'vertical') {
    gsap.set(innerLine, { transformOrigin: 'top', scaleY: 0 });

    ScrollTrigger.create({
      trigger: line,
      start: '0% 65%',
      end: '100% 65%',
      markers: false,
      scrub,
      animation: gsap.to(innerLine, { duration: duration || 1, scaleY: 1 }),
    });
  } else if (direction === 'horizontal') {
    gsap.set(innerLine, { transformOrigin: 'left', scaleX: 0 });

    ScrollTrigger.create({
      trigger: line,
      start: '0% 95%',
      end: '100% 95%',
      markers: false,
      scrub,
      animation: gsap.to(innerLine, { duration: duration || 1, scaleX: 1 }),
    });
  }
};

gsap.registerPlugin(ScrollTrigger);
function animate() {
  const lines = document.querySelectorAll<HTMLElement>('.vertical-line');
  const scrubLines = Array.from(lines).filter((line) => line.classList.contains('scrub'));
  const enterLines = Array.from(lines).filter((line) => line.classList.contains('enter'));

  if (scrubLines.length > 0) {
    scrubLines.forEach((line) => lineSetup(line, true));
  }
  if (enterLines.length > 0) {
    enterLines.forEach((line) => {
      const duration = line.getAttribute('data-duration');
      lineSetup(line, false, duration ? parseInt(duration) : undefined);
    });
  }
}

function animateHorizontal() {
  const horizontalLines = document.querySelectorAll<HTMLElement>('.horizontal-line');
  horizontalLines.forEach((line) => {
    const duration = line.getAttribute('data-duration');
    lineSetup(line, false, duration ? parseInt(duration) : undefined, 'horizontal');
  });
}

const linesAnimation = () => {
  animate();
  animateHorizontal();
};

export { linesAnimation };
