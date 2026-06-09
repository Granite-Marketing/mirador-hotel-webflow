import { gsap } from "gsap";

export const bookingModal = () => {    
    const modal = document.querySelector<HTMLElement>(".hero_booking-engine-wrapper");
    
    if (modal) {      
      const modalCloseButton = modal.querySelector<HTMLElement>(".close-modal");
      const modalOpenButton = document.querySelector<HTMLElement>(".open-modal");
      const overlay = modal.querySelector<HTMLElement>(".modal-overlay");
      const cookies = document.querySelector<HTMLElement>(".fs-consent_open-prefs");
      const chatBot = document.querySelector<HTMLElement>(".hi-widget-container");
      let mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: 'screen and (max-width: 767px)',
          isDesktop: 'screen and (min-width: 768px)',
          isTablet: 'screen and (min-width: 992px)',
        },
        (context) => {
          const { conditions } = context;

          if (conditions?.isTablet) {
            showModal();
          } else {
            closeModal();
          }
        }
      );
  
      function closeModal() {   
        if (overlay) overlay.style.visibility = "hidden";        
        if (modal) modal.style.visibility = "hidden";        
        if (cookies) cookies.style.visibility = "visible";
        if (chatBot) chatBot.style.visibility = "visible";
      }
  
      function openModal() {
        if (overlay) overlay.style.visibility = "visible";        
        if (modal) modal.style.visibility = "visible";              
        if (cookies) cookies.style.visibility = "hidden";
        if (chatBot) chatBot.style.visibility = "hidden";
      }
      function showModal() {
        if (overlay) overlay.style.visibility = "visible";        
        if (modal) modal.style.visibility = "visible";              
        if (cookies) cookies.style.visibility = "visible";
        if (chatBot) chatBot.style.visibility = "visible";
      }

      overlay?.addEventListener("click", closeModal);
      modalCloseButton?.addEventListener("click", closeModal);
      modalOpenButton?.addEventListener("click", openModal);
    }
}