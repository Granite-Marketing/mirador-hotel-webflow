interface BookNowClickData {
  event: string;
  buttonText: string;
  buttonURL: string;
  buttonID: string;
  buttonClass: string;
  section: string;
  trackingAttribute: string;
}

function addBookNowClickTracking(
  element: HTMLElement,
  trackingAttr: string,
  index: number
) {
  const sectionClass = getSectionClass(element, index);
  
  element.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLElement;
    const data: BookNowClickData = {
      'event': 'book_now_click',
      'buttonText': target.textContent?.trim() || '',
      'buttonURL': (target as HTMLAnchorElement).href || '',
      'buttonID': target.id || '',
      'buttonClass': target.className,
      'section': sectionClass || '',
      'trackingAttribute': trackingAttr
    };
    window.dataLayer.push(data);
  });
}

export const gaTagging = () => {
  // Initialize data layer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // for nav button
  const siteWideNavButton = document.querySelector('[rooms-page="false"]');
  if (siteWideNavButton) {
    const trackingAttr = "book-nav";
    addBookNowClickTracking(siteWideNavButton as HTMLElement, trackingAttr, 1);
  }

  // for floating booking button
  const floatingBookingButton = document.querySelector('#floating-button');
  if (floatingBookingButton) {    
    const trackingAttr = "book-sticky";
    addBookNowClickTracking(floatingBookingButton as HTMLElement, trackingAttr, 1);
  }

  // for listing pages
  const targetLinks = document.querySelectorAll('[ga4]');
  if (targetLinks) {
    targetLinks.forEach((link, index) => {
      const trackingAttr = link.getAttribute('ga4');
      if (!trackingAttr) return;
      link.setAttribute(trackingAttr, '');      
      addBookNowClickTracking(link as HTMLElement, trackingAttr, index + 1);
    });
  }

  // Get the data-page attribute value from the page
  const pageGaValue = document.querySelector('[data-page]')?.getAttribute('data-page');
  if (!pageGaValue) return;

  const pageName = pageGaValue.split('-').pop();
  const navBookingButton = document.querySelector('[book-nav]');

  // update nav booking data attribute and add tracking
  if (navBookingButton) {
    const trackingAttr = `book-room-${pageName}-nav`;
    navBookingButton.setAttribute(trackingAttr, '');
    navBookingButton.removeAttribute('book-nav');
    addBookNowClickTracking(navBookingButton as HTMLElement, trackingAttr, 1);
  }

  // detail pages booking button targets
  const bookNowButtons = document.querySelectorAll('[ga4-inner]');

  // Set the attribute on all Book Now buttons and add tracking
  bookNowButtons.forEach((button, index) => {
    const trackingAttr = `book-room-${pageName}-sec${index + 1}`;
    button.setAttribute(trackingAttr, '');
    addBookNowClickTracking(button as HTMLElement, trackingAttr, index + 1);
  });
};

// Get section class
function getSectionClass(link: HTMLElement, index : number) {
  const section = link.closest('section') || link.closest('header');
  if (section) {
    const sectionClass = section.getAttribute('class')?.split(' ')[0] || '';
    const sectionClassWithIndex = `${sectionClass}-${index}`;
    return sectionClassWithIndex;
  }
}

// Add TypeScript type definition for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}