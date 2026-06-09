import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const bookingButtonOnScroll = () => {
    const bookingButton = document.querySelector(".section_floating-booking-button");
    const footerElement = document.querySelector(".section_cta");
    
    if (!bookingButton || !footerElement) return;

    let mm = gsap.matchMedia();

    // Set initial opacity
    gsap.set(bookingButton, { opacity: 0, visibility: "hidden" });    

    mm.add(
        {
          isMobile: 'screen and (max-width: 767px)',
          isDesktop: 'screen and (min-width: 768px)',
        },
        (context) => {
          const { conditions } = context;

          // Create the scroll-triggered animation
          gsap.to(bookingButton, {
            opacity: 1,
            visibility: "visible",
            scrollTrigger: {
                trigger: ".page-wrapper",
                endTrigger: ".section_cta",
                start: "top top-=800",
                end: "top bottom",
                toggleActions: "play reverse play reverse",
            }
          });
        })    
}