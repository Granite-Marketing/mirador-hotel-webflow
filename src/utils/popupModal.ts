export const popupModal = () => {
    const modalWrapper = document.querySelector(".pop-up_component");
  
    if (modalWrapper) {
      const modal = modalWrapper.querySelector(".pop-up-wrapper");
      const overlay = modalWrapper.querySelector(".overlay-bg");
      const closeButton = modalWrapper.querySelector(".close-modal-button");
      // Get the duration from the data attribute, default to 1 day if not set
      const duration = parseInt(modal.getAttribute("data-duration")) || 1;
      const lastShown = localStorage.getItem("modalLastShown");
      const now = new Date().getTime();
  
      // Check if the modal was shown more than `duration` days ago
      if (!lastShown || now - lastShown > duration * 24 * 60 * 60 * 1000) {            
        // Get the display time from the data attribute, default to 5 seconds if not set
        const displayTime = parseInt(modal.getAttribute("data-timer")) || 5;
        
        setTimeout(() => {
          localStorage.setItem("modalLastShown", now);
          modalWrapper.classList.remove("hide");
          modalWrapper.setAttribute("aria-hidden", "false");
        }, displayTime * 1000);
      }
  
      overlay.addEventListener("click", () => {
        modalWrapper.classList.add("hide");
        modalWrapper.setAttribute("aria-hidden", "true");
      });

      closeButton?.addEventListener("click", () => {
        modalWrapper.classList.add("hide");
        modalWrapper.setAttribute("aria-hidden", "true");
      });
    }
  }