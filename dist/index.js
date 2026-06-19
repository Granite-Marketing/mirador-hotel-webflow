"use strict";
(() => {
  // src/utils/accordion.ts
  var accordion = () => {
    const accordionTrigger = document.querySelectorAll(".accordion_header");
    if (accordionTrigger) {
      accordionTrigger.forEach((item, index) => {
        let accordionId = `accordion-${index}`;
        let accordionTargetId = `accordion-target-${index}`;
        item.id = accordionId;
        item.setAttribute("aria-controls", accordionTargetId);
        item.nextSibling.id = accordionTargetId;
        item.nextSibling.setAttribute("labelledby", accordionId);
        item.addEventListener("click", () => {
          toggleAccordion(item);
        });
      });
    }
    function toggleAccordion(item) {
      let ariaExpanded = item.getAttribute("aria-expanded");
      ariaExpanded = ariaExpanded === "true" ? "false" : "true";
      item.setAttribute("aria-expanded", ariaExpanded);
      item.classList.toggle("is-active");
      const text = item.nextSibling;
      text.classList.toggle("is-active");
    }
  };

  // src/utils/bgAccordion.ts
  var bgAccordion = () => {
    const section = document.querySelector(".section_bg-accordion");
    if (!section) return;
    const radios = Array.from(
      section.querySelectorAll(".bg-accordion_item-radio-field")
    );
    const groupsByCategory = /* @__PURE__ */ new Map();
    const groupOrder = [];
    const radioToGroup = /* @__PURE__ */ new Map();
    radios.forEach((radio) => {
      const row = radio.closest(".bg-accordion_names-item-wrapper");
      if (!row) return;
      const heading = row.querySelector(".heading-style-h3.u-smaller");
      const category = heading?.textContent?.trim() ?? "";
      const paragraph = row.querySelector(".bg-accordion_item-paragraph");
      const sizer = row.querySelector(".bg-accordion_item-sizer");
      if (!paragraph || !sizer) return;
      let group = groupsByCategory.get(category);
      if (!group) {
        group = { category, rows: [], paragraphs: [], sizers: [], maxHeight: 0 };
        groupsByCategory.set(category, group);
        groupOrder.push(group);
      }
      group.rows.push(row);
      group.paragraphs.push(paragraph);
      group.sizers.push(sizer);
      radioToGroup.set(radio, group);
    });
    const syncGroup = (group) => {
      group.sizers.forEach((s) => {
        s.style.height = "0px";
      });
      for (let i = 0; i < group.rows.length; i++) {
        const radio = group.rows[i].querySelector(".bg-accordion_item-radio-field");
        if (!radio?.classList.contains("fs-cmsfilter_active")) continue;
        const h = group.paragraphs[i].getBoundingClientRect().height;
        group.sizers[i].style.height = h + "px";
        break;
      }
    };
    document.fonts.ready.then(() => {
      groupOrder.forEach((group) => {
        const firstRow = group.rows[0];
        const parent = firstRow.parentElement;
        if (!parent) return;
        const wrapper = document.createElement("div");
        wrapper.className = "bg-accordion_group-wrapper";
        parent.insertBefore(wrapper, firstRow);
        group.rows.forEach((row) => wrapper.appendChild(row));
        group.maxHeight = group.paragraphs.reduce(
          (max, p) => Math.max(max, p.getBoundingClientRect().height),
          0
        );
        group.sizers.forEach((s) => {
          s.style.height = "0px";
        });
        const collapsedHeight = wrapper.getBoundingClientRect().height;
        wrapper.style.minHeight = collapsedHeight + group.maxHeight + "px";
        syncGroup(group);
      });
    });
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type !== "attributes" || m.attributeName !== "class") continue;
        const target = m.target;
        if (!target.classList.contains("bg-accordion_item-radio-field")) continue;
        const group = radioToGroup.get(target);
        if (!group) continue;
        syncGroup(group);
      }
    });
    observer.observe(section, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"]
    });
  };

  // src/utils/bookingButtonOnScoll.ts
  gsap.registerPlugin(ScrollTrigger);
  var bookingButtonOnScroll = () => {
    const bookingButton = document.querySelector(".section_floating-booking-button");
    const footerElement = document.querySelector(".section_cta");
    if (!bookingButton || !footerElement) return;
    let mm = gsap.matchMedia();
    gsap.set(bookingButton, { opacity: 0, visibility: "hidden" });
    mm.add(
      {
        isMobile: "screen and (max-width: 767px)",
        isDesktop: "screen and (min-width: 768px)"
      },
      (context) => {
        const { conditions } = context;
        gsap.to(bookingButton, {
          opacity: 1,
          visibility: "visible",
          scrollTrigger: {
            trigger: ".page-wrapper",
            endTrigger: ".section_cta",
            start: "top top-=800",
            end: "top bottom",
            toggleActions: "play reverse play reverse"
          }
        });
      }
    );
  };

  // src/utils/bookingModal.ts
  var bookingModal = () => {
    const modal = document.querySelector(".hero_booking-engine-wrapper");
    if (modal) {
      let closeModal2 = function() {
        if (overlay) overlay.style.visibility = "hidden";
        if (modal) modal.style.visibility = "hidden";
        if (cookies) cookies.style.visibility = "visible";
        if (chatBot) chatBot.style.visibility = "visible";
      }, openModal2 = function() {
        if (overlay) overlay.style.visibility = "visible";
        if (modal) modal.style.visibility = "visible";
        if (cookies) cookies.style.visibility = "hidden";
        if (chatBot) chatBot.style.visibility = "hidden";
      }, showModal2 = function() {
        if (overlay) overlay.style.visibility = "visible";
        if (modal) modal.style.visibility = "visible";
        if (cookies) cookies.style.visibility = "visible";
        if (chatBot) chatBot.style.visibility = "visible";
      };
      var closeModal = closeModal2, openModal = openModal2, showModal = showModal2;
      const modalCloseButton = modal.querySelector(".close-modal");
      const modalOpenButton = document.querySelector(".open-modal");
      const overlay = modal.querySelector(".modal-overlay");
      const cookies = document.querySelector(".fs-consent_open-prefs");
      const chatBot = document.querySelector(".hi-widget-container");
      let mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "screen and (max-width: 767px)",
          isDesktop: "screen and (min-width: 768px)",
          isTablet: "screen and (min-width: 992px)"
        },
        (context) => {
          const { conditions } = context;
          if (conditions?.isTablet) {
            showModal2();
          } else {
            closeModal2();
          }
        }
      );
      overlay?.addEventListener("click", closeModal2);
      modalCloseButton?.addEventListener("click", closeModal2);
      modalOpenButton?.addEventListener("click", openModal2);
    }
  };

  // src/utils/buttonAnimation.ts
  gsap.registerPlugin(SplitText);
  var buttonAnimation = () => {
    const buttons = document.querySelectorAll(".button");
    if (!buttons) return;
    buttons.forEach((button) => {
      const text = button.textContent || "";
      const originalSpan = document.createElement("span");
      const cloneSpan = document.createElement("span");
      originalSpan.textContent = text;
      cloneSpan.textContent = text;
      button.textContent = "";
      button.appendChild(originalSpan);
      button.appendChild(cloneSpan);
      gsap.set(button, {
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        display: "grid",
        gridTemplateAreas: '"layer"'
      });
      gsap.set(button.querySelectorAll("span"), {
        display: "block",
        whiteSpace: "nowrap",
        width: "100%",
        left: "0",
        gridArea: "layer"
      });
      const originalSplit = new SplitText(originalSpan, { type: "chars" });
      const cloneSplit = new SplitText(cloneSpan, { type: "chars" });
      gsap.set(originalSplit.words, { position: "relative" });
      gsap.set(cloneSplit.words, {
        position: "relative"
      });
      gsap.set(cloneSplit.chars, {
        yPercent: 208
      });
      const tl = gsap.timeline({ paused: true });
      tl.to(originalSplit.chars, {
        yPercent: -100,
        y: "-24px",
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.inOut"
      }).to(
        cloneSplit.chars,
        {
          yPercent: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.inOut"
        },
        "<0.1"
      );
      button.addEventListener("mouseenter", () => tl.play());
      button.addEventListener("mouseleave", () => tl.reverse());
    });
  };

  // src/utils/crossPageScroll.ts
  var crossPageScroll = () => {
    hookOutgoing();
    handleIncoming();
  };
  var hookOutgoing = () => {
    const links = document.querySelectorAll(
      "a[scroll-target][href]"
    );
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
          return;
        const href = link.getAttribute("href");
        const slug = link.getAttribute("scroll-target");
        if (!href || !slug) return;
        event.preventDefault();
        window.location.href = `${href}#${slug}`;
      });
    });
  };
  var HERO_HOLD_MS = 700;
  var handleIncoming = () => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
    const target = document.querySelector(
      `.sliders_item[data-custom-sort="${slug}"]`
    );
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
    window.setTimeout(() => {
      const live = ScrollSmoother.get();
      if (live) {
        live.scrollTo(target, true);
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, HERO_HOLD_MS);
  };

  // src/utils/experiences.ts
  var isMobile = window.matchMedia("(max-width: 767px)");
  var swiperArr = [];
  var experienceItems = document.querySelectorAll(".experiences_item-gallery");
  var experiences = () => {
    if (isMobile.matches) {
      console.log("init swiper");
      experienceSwiper();
    } else {
      defaultHighlights();
    }
    experienceItems?.forEach((subcollection) => {
      subcollection.addEventListener("mouseover", (event) => {
        if (isMobile.matches) return;
        const label = event.target?.closest(".experiences_subcontent");
        if (!label) return;
        updateCollectionHighlights(subcollection, label);
      });
    });
    isMobile.addEventListener("change", function() {
      console.log("change");
      if (isMobile.matches) {
        experienceSwiper();
      } else {
        defaultHighlights();
        swiperArr.forEach((swiper) => {
          swiper.destroy();
          console.log("swiper destroyed");
        });
      }
    });
  };
  var updateCollectionHighlights = (collection, label) => {
    const items = collection.querySelectorAll(".experiences_subitem");
    items?.forEach((item) => {
      const itemLabel = item.querySelector(".experiences_subcontent");
      highlightExperience(item, label == itemLabel);
    });
  };
  var highlightExperience = (item, highlight = true) => {
    const label = item.querySelector(".experiences_subcontent");
    const figure = item.querySelector(".experiences_subfigure");
    const content = item.querySelector(".experiences_item-content");
    const wrapper = item.querySelector(".experiences_subitem-aside");
    const mainHeading = item.querySelector(".experiences_item-header.is-desk");
    if (highlight) {
      figure.style.opacity = 1;
      label.classList.add("is-active");
      content.style.opacity = 1;
      content.style.pointerEvents = "auto";
      mainHeading.style.opacity = 1;
      mainHeading.style.pointerEvents = "auto";
      wrapper.style.pointerEvents = "auto";
    } else {
      figure.style.opacity = 0;
      label.classList.remove("is-active");
      content.style = {};
      wrapper.style.pointerEvents = "none";
      mainHeading.style.opacity = 0;
      mainHeading.style.pointerEvents = "none";
    }
  };
  var defaultHighlights = () => {
    experienceItems?.forEach((subcollection) => {
      const defaultLabel = subcollection.querySelector(".experiences_subcontent");
      updateCollectionHighlights(subcollection, defaultLabel);
    });
  };
  var experienceSwiper = () => {
    const sliders = document.querySelectorAll(".experiences_subcollection-wrap.swiper");
    if (!sliders) return;
    sliders.forEach((slider) => {
      const sliderItems = slider.querySelectorAll(".experiences_subitem");
      const pagination = slider.closest(".experiences_item-gallery")?.querySelector(".experiences_subcollection-pagination");
      sliderItems.forEach((item) => {
        highlightExperience(item, true);
      });
      const swiper = new Swiper(slider, {
        loop: true,
        autoplay: true,
        grabCursor: true,
        pagination: {
          el: pagination
        },
        slidesPerView: 1
      });
      console.log("swiper created");
      swiperArr.push(swiper);
    });
  };

  // src/utils/faqCategoryGroup.ts
  var faqCategoryGroup = () => {
    const items = document.querySelectorAll(
      ".bg-accordion_names-item-wrapper.u-full"
    );
    if (!items.length) return;
    let lastCategory = "";
    items.forEach((item, i) => {
      const heading = item.querySelector(".heading-style-h3.u-smaller");
      const category = heading?.textContent?.trim() ?? "";
      if (category === lastCategory) {
        if (heading) heading.style.display = "none";
        return;
      }
      lastCategory = category;
      if (i > 0) {
        const margin = item.getAttribute("data-margin-top");
        if (margin) {
          const max = parseFloat(margin);
          const min = max * 0.35;
          const vw = max / 1440 * 100;
          item.style.marginTop = `clamp(${min}rem, ${vw.toFixed(2)}vw, ${max}rem)`;
        }
      }
    });
  };

  // src/utils/gaTagging.ts
  function addBookNowClickTracking(element, trackingAttr, index) {
    const sectionClass = getSectionClass(element, index);
    element.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const data = {
        "event": "book_now_click",
        "buttonText": target.textContent?.trim() || "",
        "buttonURL": target.href || "",
        "buttonID": target.id || "",
        "buttonClass": target.className,
        "section": sectionClass || "",
        "trackingAttribute": trackingAttr
      };
      window.dataLayer.push(data);
    });
  }
  var gaTagging = () => {
    window.dataLayer = window.dataLayer || [];
    const siteWideNavButton = document.querySelector('[rooms-page="false"]');
    if (siteWideNavButton) {
      const trackingAttr = "book-nav";
      addBookNowClickTracking(siteWideNavButton, trackingAttr, 1);
    }
    const floatingBookingButton = document.querySelector("#floating-button");
    if (floatingBookingButton) {
      const trackingAttr = "book-sticky";
      addBookNowClickTracking(floatingBookingButton, trackingAttr, 1);
    }
    const targetLinks = document.querySelectorAll("[ga4]");
    if (targetLinks) {
      targetLinks.forEach((link, index) => {
        const trackingAttr = link.getAttribute("ga4");
        if (!trackingAttr) return;
        link.setAttribute(trackingAttr, "");
        addBookNowClickTracking(link, trackingAttr, index + 1);
      });
    }
    const pageGaValue = document.querySelector("[data-page]")?.getAttribute("data-page");
    if (!pageGaValue) return;
    const pageName = pageGaValue.split("-").pop();
    const navBookingButton = document.querySelector("[book-nav]");
    if (navBookingButton) {
      const trackingAttr = `book-room-${pageName}-nav`;
      navBookingButton.setAttribute(trackingAttr, "");
      navBookingButton.removeAttribute("book-nav");
      addBookNowClickTracking(navBookingButton, trackingAttr, 1);
    }
    const bookNowButtons = document.querySelectorAll("[ga4-inner]");
    bookNowButtons.forEach((button, index) => {
      const trackingAttr = `book-room-${pageName}-sec${index + 1}`;
      button.setAttribute(trackingAttr, "");
      addBookNowClickTracking(button, trackingAttr, index + 1);
    });
  };
  function getSectionClass(link, index) {
    const section = link.closest("section") || link.closest("header");
    if (section) {
      const sectionClass = section.getAttribute("class")?.split(" ")[0] || "";
      const sectionClassWithIndex = `${sectionClass}-${index}`;
      return sectionClassWithIndex;
    }
  }

  // src/utils/gsapBasicAnimations.ts
  gsap.registerPlugin(ScrollTrigger);
  var gsapBasicAnimations = () => {
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "screen and (max-width: 767px)",
        isDesktop: "screen and (min-width: 768px)"
      },
      (context) => {
        let { isMobile: isMobile3, isDesktop } = context.conditions;
        gsap.set(".slide-in", { y: 25, opacity: 0 });
        ScrollTrigger.batch(".slide-in", {
          start: isMobile3 ? "top 85%" : "top 75%",
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1 })
        });
        gsap.set(".fade-in", { opacity: 0 });
        ScrollTrigger.batch(".fade-in", {
          start: isMobile3 ? "top 85%" : "top 75%",
          onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 1 })
        });
      }
    );
  };

  // src/utils/gsapSmoothScroll.ts
  var instance = null;
  var smoothScroll = {
    get raw() {
      return instance;
    },
    stop() {
      instance?.paused(true);
    },
    start() {
      instance?.paused(false);
    }
  };
  var gsapSmoothScroll = () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    instance = ScrollSmoother.create({
      content: ".main-wrapper",
      wrapper: ".page-wrapper",
      smooth: 1.5,
      effects: true
    });
  };

  // src/utils/header.ts
  var header = () => {
    const navBtn = document.querySelector(".nav_menu-button");
    if (navBtn) {
      let mm = gsap.matchMedia();
      let tl = gsap.timeline({ paused: true, reversed: true });
      mm.add(
        {
          isMobile: "screen and (max-width: 767px)",
          isDesktop: "screen and (min-width: 768px)"
        },
        (context) => {
          let { isMobile: isMobile3, isDesktop } = context.conditions;
          if (isDesktop) {
            tl.from(".nav_menu", {
              opacity: 0,
              // duration: 1,
              ease: "expo.out"
            }), tl.from(
              ".nav_menu-bg",
              {
                scale: 1.1,
                duration: 2,
                opacity: 0,
                ease: "expo.out"
              },
              "<+=0.25"
            );
            tl.from(
              [".nav_link", ".nav_list-sub-link", ".circa_nav-link"],
              {
                y: 8,
                opacity: 0,
                duration: 1,
                // delay: 0.45,
                stagger: 0.05
              },
              "<+=1"
            );
          }
          if (isMobile3) {
            tl.from([".nav_link", ".nav_list-sub-link", ".circa_nav-link"], {
              y: 8,
              opacity: 0,
              delay: 0.45,
              stagger: 0.05
            });
          }
        }
      );
      navBtn.addEventListener("click", () => {
        if (tl.reversed()) {
          tl.play();
        } else {
          tl.reverse();
        }
      });
    }
  };

  // src/utils/homeAlternativeHero.ts
  var homeAlternativeHero = () => {
    if (!document.querySelector(".section_hero-booking")) return;
    const splitTexTitle = new SplitType(
      document.querySelector(".hero_title2") || document.querySelector(".section_hero h1"),
      {
        types: "words,chars"
      }
    );
    const ems = document.querySelectorAll(".hero_title2 em");
    gsap.set(ems, {
      display: "unset"
    });
    gsap.set(splitTexTitle.chars, {
      yPercent: 100,
      opacity: 0
    });
    splitTexTitle.words?.forEach((word) => {
      ;
      word.style.display = "inline-block";
      word.style.whiteSpace = "normal";
    });
    splitTexTitle.lines?.forEach((line) => {
      ;
      line.style.display = "inline-block";
    });
    const tl = gsap.timeline({
      defaults: {
        ease: (i) => 1 - Math.pow(1 - i, 4),
        duration: 1
      }
    });
    tl.to(
      splitTexTitle.chars,
      {
        duration: 1,
        yPercent: 0,
        stagger: 0.025,
        opacity: 1
      },
      "-=.5"
    ).from(
      [".hero_tag", ".hero_booking-engine-wrapper", ".open-modal"],
      {
        opacity: 0,
        stagger: 0.05
      },
      "-=.5"
    );
  };

  // src/utils/homeMain.ts
  var homeMain = () => {
    if (!document.querySelector(".section_hero")) return;
    const splitText = new SplitType(
      document.querySelector(".hero_title2") || document.querySelector(".section_hero h1"),
      {
        types: "words,chars"
      }
    );
    const heroFigure1 = document.querySelector(".hero_figure-1");
    const heroFigure2 = document.querySelector(".hero_figure-2");
    const ems = document.querySelectorAll(".hero_title2 em");
    gsap.set(ems, {
      display: "unset"
    });
    gsap.set(splitText.chars, {
      yPercent: 100,
      opacity: 0
    });
    splitText.words?.forEach((word) => {
      ;
      word.style.display = "inline-block";
      word.style.whiteSpace = "normal";
    });
    splitText.lines?.forEach((line) => {
      ;
      line.style.display = "inline-block";
    });
    gsap.set(heroFigure1, {
      overflow: "hidden"
    });
    const tl = gsap.timeline({
      defaults: {
        ease: (i) => 1 - Math.pow(1 - i, 4),
        duration: 1
      }
    });
    tl.fromTo(
      heroFigure1.querySelector("img"),
      {
        scale: 1.25
      },
      {
        scale: 1
      }
    ).fromTo(
      heroFigure2,
      {
        clipPath: "inset(0% 0% 100% 0%)"
      },
      {
        clipPath: "inset(0% 0% 0% 0%)"
      },
      "-=.5"
    ).to(
      splitText.chars,
      {
        duration: 1,
        yPercent: 0,
        stagger: 0.025,
        opacity: 1
      },
      "-=.5"
    );
  };

  // src/utils/linesAnimation.ts
  var lineSetup = (line, scrub, duration, direction = "vertical") => {
    const innerLine = document.createElement("div");
    innerLine.classList.add("section-line-inner");
    const { backgroundColor } = getComputedStyle(line);
    innerLine.style.cssText = `
      width: 100%;
      height: 100%;
      background: ${backgroundColor};
    `;
    line.style.backgroundColor = "transparent";
    line.appendChild(innerLine);
    if (direction === "vertical") {
      gsap.set(innerLine, { transformOrigin: "top", scaleY: 0 });
      ScrollTrigger.create({
        trigger: line,
        start: "0% 65%",
        end: "100% 65%",
        markers: false,
        scrub,
        animation: gsap.to(innerLine, { duration: duration || 1, scaleY: 1 })
      });
    } else if (direction === "horizontal") {
      gsap.set(innerLine, { transformOrigin: "left", scaleX: 0 });
      ScrollTrigger.create({
        trigger: line,
        start: "0% 95%",
        end: "100% 95%",
        markers: false,
        scrub,
        animation: gsap.to(innerLine, { duration: duration || 1, scaleX: 1 })
      });
    }
  };
  gsap.registerPlugin(ScrollTrigger);
  function animate() {
    const lines = document.querySelectorAll(".vertical-line");
    const scrubLines = Array.from(lines).filter((line) => line.classList.contains("scrub"));
    const enterLines = Array.from(lines).filter((line) => line.classList.contains("enter"));
    if (scrubLines.length > 0) {
      scrubLines.forEach((line) => lineSetup(line, true));
    }
    if (enterLines.length > 0) {
      enterLines.forEach((line) => {
        const duration = line.getAttribute("data-duration");
        lineSetup(line, false, duration ? parseInt(duration) : void 0);
      });
    }
  }
  function animateHorizontal() {
    const horizontalLines = document.querySelectorAll(".horizontal-line");
    horizontalLines.forEach((line) => {
      const duration = line.getAttribute("data-duration");
      lineSetup(line, false, duration ? parseInt(duration) : void 0, "horizontal");
    });
  }
  var linesAnimation = () => {
    animate();
    animateHorizontal();
  };

  // src/utils/map.ts
  var map;
  var markers = [];
  var infoWindow;
  var colors = {
    normal: { bg: "#FFFDF7", line: "#272516" },
    active: { bg: "#272516", line: "#FFFDF7" },
    unique: { bg: "#272516", line: "#FFFDF7" }
  };
  var pinSvgString = "";
  var activePinSvgString = "";
  var uniquePinSvgString = "";
  var initMap = async () => {
    const mapEl = document.querySelector(".the-map");
    if (!mapEl) return;
    const positions = getPositions();
    getDefaultPosition(mapEl, positions);
    const lats = positions.map((p) => p.position.lat);
    const lngs = positions.map((p) => p.position.lng);
    const centerPosition = {
      lat: (Math.max(...lats) + Math.min(...lats)) / 2,
      lng: (Math.max(...lngs) + Math.min(...lngs)) / 2
    };
    let mapZoom = mapEl.getAttribute("map-zoom");
    if (!mapZoom) mapZoom = "17";
    mapZoom = Number(mapZoom);
    const { Map: Map2 } = await google.maps.importLibrary("maps");
    map = new Map2(mapEl, {
      zoom: mapZoom,
      center: centerPosition,
      mapId: "DEMO_MAP_ID"
    });
    await setInfoWindow();
    readPinColors(mapEl);
    createPinSvgs();
    positions.forEach((p) => {
      createMarker(p, positions.length == 1, infoWindow);
    });
    mapInteractions(positions, infoWindow);
  };
  var getPositions = () => {
    const mapCoordWraps = document.querySelectorAll(".the-map-coord-wrap");
    const positions = [];
    mapCoordWraps.forEach((w) => {
      const name = w.getAttribute("title") ?? "No name";
      let lat = w.getAttribute("lat");
      let lng = w.getAttribute("lng");
      const slug = w.getAttribute("slug");
      if (!lat || !lng || !slug) return;
      lat = Number(lat);
      lng = Number(lng);
      if (isNaN(lat) || isNaN(lng)) return;
      positions.push({
        unique: false,
        name,
        slug,
        position: {
          lat,
          lng
        }
      });
    });
    return positions;
  };
  var getDefaultPosition = (mapEl, positions) => {
    let lat = mapEl.getAttribute("default-lat");
    let lng = mapEl.getAttribute("default-lng");
    if (!lat || !lng) return;
    lat = Number(lat);
    lng = Number(lng);
    if (isNaN(lat) || isNaN(lng)) return;
    const name = mapEl.getAttribute("default-title") ?? "No name";
    positions.push({
      unique: true,
      name,
      position: {
        lat,
        lng
      }
    });
  };
  var setInfoWindow = async () => {
    const { InfoWindow } = await google.maps.importLibrary("maps");
    infoWindow = new InfoWindow();
  };
  var createMarker = async (p, active, infoWindow2) => {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const parser = new DOMParser();
    let svgHtml = p.unique ? uniquePinSvgString : active ? activePinSvgString : pinSvgString;
    const pinSvg = parser.parseFromString(svgHtml, "image/svg+xml").documentElement;
    const marker = new AdvancedMarkerElement({
      map,
      position: p.position,
      content: pinSvg,
      title: p.name,
      gmpClickable: true
    });
    markers.push({ marker, slug: p.slug });
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow2.close();
      infoWindow2.setContent(marker.title);
      infoWindow2.open(marker.map, marker);
    });
    if (p.unique) {
      marker.targetElement.querySelector("svg").style.transform = "scale(1.5)";
      marker.targetElement.style.zIndex = "202020";
    }
  };
  var mapInteractions = (positions, infoWindow2) => {
    const section = document.querySelector(".section_bg-accordion.is-map-accordion");
    if (!section) return;
    const accordion2 = section.querySelector(".bg-accordion_content");
    if (!accordion2) return;
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"]
    };
    const callback = function(mutationsList, observer2) {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target;
          if (!target.classList.contains("bg-accordion_item-radio-field")) return;
          let active = accordion2.querySelector(".bg-accordion_item-radio-field.fs-cmsfilter_active");
          let slug = active ? active.getAttribute("slug") : "";
          markers.forEach((m) => {
            const uniquePin = positions.filter((p) => p.unique);
            if (uniquePin.slug == m.slug) return;
            const styles = m.slug === slug ? {
              transform: "scale(1.5)",
              stroke: colors.active.line,
              fill: colors.active.bg,
              zIndex: "101010"
            } : {
              transform: "scale(1)",
              stroke: colors.normal.line,
              fill: colors.normal.bg,
              zIndex: "1"
            };
            m.marker.targetElement.querySelector("svg").style.transform = styles.transform;
            m.marker.targetElement.style.zIndex = styles.zIndex;
            m.marker.targetElement.querySelectorAll("svg path").forEach((p) => p.style.stroke = styles.stroke);
            m.marker.targetElement.querySelectorAll("svg circle").forEach((c) => c.style.fill = styles.fill);
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(accordion2, config);
  };
  var readPinColors = (mapEl) => {
    let c0 = mapEl.getAttribute("color-pin") ?? null;
    let c1 = mapEl.getAttribute("color-pin-line") ?? null;
    let c2 = mapEl.getAttribute("color-active-pin") ?? null;
    let c3 = mapEl.getAttribute("color-active-pin-line") ?? null;
    let c4 = mapEl.getAttribute("color-unique-pin") ?? null;
    console.log("hello", c4);
    let c5 = mapEl.getAttribute("color-unique-pin-line") ?? null;
    if (c0) colors.normal.bg = c0;
    if (c1) colors.normal.line = c1;
    if (c2) colors.active.bg = c2;
    if (c3) colors.active.line = c3;
    if (c4) colors.unique.bg = c4;
    if (c5) colors.unique.line = c5;
  };
  var createPinSvgs = () => {
    pinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out;">
<circle cx="18" cy="18" r="18" fill="${colors.normal.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.normal.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.normal.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
    activePinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out; transform: scale(1.5);">
<circle cx="18" cy="18" r="18" fill="${colors.active.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.active.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.active.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
    uniquePinSvgString = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 300ms ease-in-out;">
<circle cx="18" cy="18" r="18" fill="${colors.unique.bg}" style="transition: fill 300ms ease-in-out"/>
<path d="M26 16.5555C26 22.7778 18 28.1111 18 28.1111C18 28.1111 10 22.7778 10 16.5555C10 14.4338 10.8429 12.399 12.3431 10.8987C13.8434 9.3984 15.8783 8.55554 18 8.55554C20.1217 8.55554 22.1566 9.3984 23.6569 10.8987C25.1571 12.399 26 14.4338 26 16.5555Z" stroke="${colors.unique.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
<path d="M18.0002 19.2222C19.4729 19.2222 20.6668 18.0283 20.6668 16.5555C20.6668 15.0828 19.4729 13.8889 18.0002 13.8889C16.5274 13.8889 15.3335 15.0828 15.3335 16.5555C15.3335 18.0283 16.5274 19.2222 18.0002 19.2222Z" stroke="${colors.unique.line}" stroke-linecap="round" stroke-linejoin="round" style="transition: stroke 300ms ease-in-out"/>
</svg>
`;
  };

  // src/utils/mapNeeds.ts
  var mapNeeds = () => {
    const mapEl = document.querySelector(".the-map");
    if (!mapEl) return;
    ((g) => {
      var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}), r = /* @__PURE__ */ new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
      d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
    })({ key: "AIzaSyCAnLY5ve_WLDLumyG9iGrbMQXXZatWb6A", v: "weekly" });
  };

  // src/utils/modals.ts
  var FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  var modals = () => {
    const modalElements = document.querySelectorAll('[role="dialog"]');
    if (!modalElements.length) return;
    const overlayElement = document.querySelector("[data-modal-overlay]");
    let activeModal = null;
    let activeTrigger = null;
    modalElements.forEach((modal) => {
      if (!modal.id) return;
      const titleElement = modal.querySelector("h1, h2, h3, h4, h5, h6");
      if (titleElement) {
        if (!titleElement.id) titleElement.id = `${modal.id}-title`;
        modal.setAttribute("aria-labelledby", titleElement.id);
      }
      const descriptionElement = modal.querySelector(
        '.w-richtext, [role="document"], p'
      );
      if (descriptionElement) {
        if (!descriptionElement.id) descriptionElement.id = `${modal.id}-desc`;
        modal.setAttribute("aria-describedby", descriptionElement.id);
      }
    });
    function getFocusableElements(root) {
      return Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hasAttribute("disabled") && element.offsetParent !== null
      );
    }
    function openModal(modal, trigger) {
      if (activeModal) closeModal();
      activeModal = modal;
      activeTrigger = trigger;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      trigger.setAttribute("aria-expanded", "true");
      const overlayEnabled = overlayElement && !modal.hasAttribute("data-modal-no-overlay");
      if (overlayEnabled) {
        overlayElement.classList.add("is-open");
        overlayElement.setAttribute("aria-hidden", "false");
      }
      smoothScroll.stop();
      focusAfterTransition(modal);
    }
    function focusAfterTransition(modal) {
      const computed = getComputedStyle(modal);
      const duration = parseSecondsList(computed.transitionDuration);
      const delay = parseSecondsList(computed.transitionDelay);
      const waitMs = Math.max(50, (duration + delay) * 1e3 + 50);
      window.setTimeout(() => {
        if (activeModal !== modal) return;
        const focusable = getFocusableElements(modal);
        const firstFocusable = focusable[0] ?? modal;
        firstFocusable.focus({ preventScroll: true });
      }, waitMs);
    }
    function parseSecondsList(value) {
      return Math.max(
        0,
        ...value.split(",").map((v) => {
          const trimmed = v.trim();
          if (trimmed.endsWith("ms")) return parseFloat(trimmed) / 1e3;
          if (trimmed.endsWith("s")) return parseFloat(trimmed);
          return 0;
        })
      );
    }
    function closeModal() {
      if (!activeModal) return;
      const modal = activeModal;
      const trigger = activeTrigger;
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      trigger?.setAttribute("aria-expanded", "false");
      if (overlayElement) {
        overlayElement.classList.remove("is-open");
        overlayElement.setAttribute("aria-hidden", "true");
      }
      smoothScroll.start();
      trigger?.focus({ preventScroll: true });
      activeModal = null;
      activeTrigger = null;
    }
    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target?.closest("[data-modal-open]");
      if (trigger) {
        event.preventDefault();
        const modalId = trigger.getAttribute("data-modal-open");
        if (!modalId) return;
        const modal = document.getElementById(modalId);
        if (modal && modal.getAttribute("role") === "dialog") {
          openModal(modal, trigger);
        }
        return;
      }
      const closeButton = target?.closest("[data-modal-close]");
      if (closeButton && activeModal) {
        event.preventDefault();
        closeModal();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (!activeModal) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === "Tab") {
        const focusable = getFocusableElements(activeModal);
        if (!focusable.length) {
          event.preventDefault();
          return;
        }
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        const currentFocus = document.activeElement;
        if (event.shiftKey && currentFocus === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus({ preventScroll: true });
        } else if (!event.shiftKey && currentFocus === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus({ preventScroll: true });
        }
      }
    });
  };

  // src/utils/popupModal.ts
  var popupModal = () => {
    const modalWrapper = document.querySelector(".pop-up_component");
    if (modalWrapper) {
      const modal = modalWrapper.querySelector(".pop-up-wrapper");
      const overlay = modalWrapper.querySelector(".overlay-bg");
      const closeButton = modalWrapper.querySelector(".close-modal-button");
      const duration = parseInt(modal.getAttribute("data-duration")) || 1;
      const lastShown = localStorage.getItem("modalLastShown");
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (!lastShown || now - lastShown > duration * 24 * 60 * 60 * 1e3) {
        const displayTime = parseInt(modal.getAttribute("data-timer")) || 5;
        setTimeout(() => {
          localStorage.setItem("modalLastShown", now);
          modalWrapper.classList.remove("hide");
          modalWrapper.setAttribute("aria-hidden", "false");
        }, displayTime * 1e3);
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
  };

  // src/utils/roomIndiv.ts
  gsap.registerPlugin(SplitText);
  var roomIndiv = () => {
    const button = document.querySelector("[func='show-room-details']");
    const section = document.querySelector(".section_room-detail");
    if (!section) return;
    const close = section?.querySelector(".overlay-close-button");
    const overlay = section?.querySelector(".overlay.room-detail_overlay");
    const article = section?.querySelector(".room-detail_component");
    const p = document.querySelector(".room-detail_content p");
    const img = document.querySelector(".room-detail_figure");
    if (!close || !overlay || !article) return;
    button?.addEventListener("click", () => {
      const splitText = new SplitText(p, { type: "lines,words" });
      const tl = gsap.timeline({
        defaults: { ease: (i) => 1 - Math.pow(1 - i, 4) },
        onComplete: () => {
          splitText.revert();
        }
      });
      gsap.set(splitText.lines, { overflow: "hidden" });
      gsap.set(splitText.words, { yPercent: 100 });
      gsap.set(img, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
      });
      article.style.transform = "translate(0%)";
      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = "1";
      tl.to(img, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        delay: 0.2
      }).to(
        splitText.words,
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.025
        },
        "-=0.75"
      );
    });
    close?.addEventListener("click", () => {
      closeModal();
    });
    overlay?.addEventListener("click", () => {
      closeModal();
    });
    function closeModal() {
      article.style.transform = "translateX(100%)";
      overlay.style.pointerEvents = "none";
      overlay.style.opacity = "0";
    }
  };

  // src/utils/roomsHeroAnimation.ts
  var roomsHeroAnimation = () => {
    const heroTitle = document.querySelector(".sticky-hero_header");
    const heroSubtitle = document.querySelector(".sticky-hero_paragraph");
    const heroStats = document.querySelectorAll(".sticky-hero_sub-richtext li");
    const heroButton = document.querySelector(".sticky-hero_button-wrapper .button");
    const heroModalButton = document.querySelector(".sticky-hero_footer .cta-simple");
    if (!heroTitle || !heroSubtitle || !heroStats) return;
    gsap.set([heroTitle, heroSubtitle, heroStats, heroButton, heroModalButton], {
      opacity: 0
    });
    const tl = gsap.timeline();
    tl.fromTo(heroTitle, { opacity: 0 }, { duration: 0.75, ease: "power2.inOut", opacity: 1 });
    tl.fromTo(heroSubtitle, { opacity: 0 }, { duration: 0.75, ease: "power2.inOut", opacity: 1 }, "<+=0.05");
    tl.fromTo(heroStats, { opacity: 0, stagger: 0.5 }, { duration: 0.75, ease: "power2.inOut", opacity: 1 }, "<+=0.05");
    tl.fromTo(heroButton, { opacity: 0 }, { duration: 0.75, ease: "power2.inOut", opacity: 1 }, "<+=0.05");
    tl.fromTo(heroModalButton, { opacity: 0 }, { duration: 0.75, ease: "power2.inOut", opacity: 1 }, "<+=0.05");
  };

  // src/utils/sectionLinks.ts
  var sectionLinks = () => {
    const links = document.querySelectorAll(".section-links_link");
    if (links.length === 0) return;
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        const slug = link.getAttribute("href");
        if (!slug) return;
        const target = document.querySelector(
          `.sliders_item[data-custom-sort="${slug}"]`
        );
        if (!target) return;
        event.preventDefault();
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(target, true);
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  };

  // src/utils/sectionLinksActive.ts
  var sectionLinksActive = () => {
    const buttons = Array.from(
      document.querySelectorAll(".section-links_link")
    );
    const items = Array.from(
      document.querySelectorAll(".sliders_item[data-custom-sort]")
    );
    if (buttons.length === 0 || items.length === 0) return;
    const buttonsBySlug = /* @__PURE__ */ new Map();
    buttons.forEach((button) => {
      const slug = button.getAttribute("href");
      if (!slug) return;
      const bucket = buttonsBySlug.get(slug) ?? [];
      bucket.push(button);
      buttonsBySlug.set(slug, bucket);
    });
    const activeCount = /* @__PURE__ */ new Map();
    const setActive = (slug, active) => {
      const targets = buttonsBySlug.get(slug);
      if (!targets) return;
      targets.forEach((button) => button.classList.toggle("is-active", active));
      if (active && targets[0]) followInStrip(targets[0]);
    };
    items.forEach((item) => {
      const slug = item.getAttribute("data-custom-sort");
      if (!slug || !buttonsBySlug.has(slug)) return;
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          const next = (activeCount.get(slug) ?? 0) + (self.isActive ? 1 : -1);
          activeCount.set(slug, next);
          if (self.isActive && next === 1) setActive(slug, true);
          if (!self.isActive && next === 0) setActive(slug, false);
        }
      });
    });
  };
  var followInStrip = (button) => {
    const strip = findHorizontalScroller(button);
    if (!strip) return;
    const buttonRect = button.getBoundingClientRect();
    const stripRect = strip.getBoundingClientRect();
    const offsetWithin = buttonRect.left - stripRect.left + strip.scrollLeft;
    const target = offsetWithin - (strip.clientWidth - button.clientWidth) / 2;
    const max = strip.scrollWidth - strip.clientWidth;
    const clamped = Math.max(0, Math.min(target, max));
    strip.scrollTo({ left: clamped, behavior: "smooth" });
  };
  var findHorizontalScroller = (from) => {
    let node = from.parentElement;
    while (node && node !== document.body) {
      if (node.scrollWidth > node.clientWidth) {
        const overflowX = getComputedStyle(node).overflowX;
        if (overflowX === "auto" || overflowX === "scroll") return node;
      }
      node = node.parentElement;
    }
    return null;
  };

  // src/utils/slidersSections.ts
  var slidersSections = () => {
    const sections = document.querySelectorAll(".section_sliders");
    sections.forEach((section) => {
      sortAndPaintSliderItems(section);
      const blocks = section.querySelectorAll(".sliders_item");
      blocks.forEach((block) => {
        const slider = block.querySelector(".swiper");
        if (!slider) return;
        console.log(slider);
        const pagination = block.querySelector(".swiper-pagination-bullets");
        const newSwiper = new Swiper(slider, {
          loop: true,
          autoplay: true,
          grabCursor: true,
          pagination: {
            el: pagination
          },
          slidesPerView: 1
        });
        console.log(newSwiper);
      });
    });
  };
  var DEFAULT_BG = "#3a3e24";
  var LIGHT_TEXT = "#e7e5d9";
  var sortAndPaintSliderItems = (section) => {
    const collection = section.querySelector(".sliders_collection.is-experiences");
    if (!collection) return;
    const items = Array.from(collection.querySelectorAll(":scope > .sliders_item"));
    if (items.length === 0) return;
    items.slice().sort((a, b) => {
      const av = a.getAttribute("data-custom-sort") ?? "";
      const bv = b.getAttribute("data-custom-sort") ?? "";
      return av.localeCompare(bv);
    }).forEach((item) => collection.appendChild(item));
    let coloured = false;
    Array.from(collection.querySelectorAll(":scope > .sliders_item")).forEach((item) => {
      if (coloured) {
        const color = item.querySelector(".background-colour-selector")?.getAttribute("data-color") || DEFAULT_BG;
        item.style.backgroundColor = color;
        item.style.color = LIGHT_TEXT;
      } else {
        item.style.backgroundColor = "transparent";
        item.style.color = "";
      }
      coloured = !coloured;
    });
  };

  // src/utils/stickyHero.ts
  gsap.registerPlugin(ScrollTrigger);
  var isMobile2 = window.matchMedia("(max-width: 767px)");
  var swiperArr2 = [];
  var stickyHero = () => {
    const block = document.querySelector(".section_sticky-hero.js-desktop-slider");
    if (block) {
      stickyHeroSwiper();
      let mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "screen and (max-width: 767px)",
          isDesktop: "screen and (min-width: 768px)"
        },
        (context) => {
          const { conditions } = context;
          if (conditions.isDesktop) {
            const imagesSide = document.querySelector(".sticky-hero_images-side");
            if (imagesSide) {
              gsap.to(imagesSide, {
                scrollTrigger: {
                  trigger: ".section-sizer",
                  start: "top top",
                  end: "bottom bottom",
                  pin: imagesSide,
                  pinSpacing: true,
                  scrub: false
                }
              });
            }
          }
        }
      );
      return;
    }
    if (isMobile2.matches) {
      console.log("init swiper");
      stickyHeroSwiper();
    }
    isMobile2.addEventListener("change", function() {
      console.log("change");
      if (isMobile2.matches) {
        stickyHeroSwiper();
      } else {
        swiperArr2.forEach((swiper) => {
          swiper.destroy();
          console.log("swiper destroyed");
          desktopStickyHero();
        });
      }
    });
  };
  var desktopStickyHero = () => {
  };
  var stickyHeroSwiper = () => {
    const block = document.querySelector(".sticky-hero_images-side");
    if (!block) return;
    const slider = block.querySelector(".swiper");
    const pagination = block.querySelector(".sticky-hero_pagination.is-mob");
    const swiper = new Swiper(slider, {
      loop: true,
      autoplay: true,
      grabCursor: true,
      pagination: {
        el: pagination
      },
      slidesPerView: 1
    });
    console.log("swiper created");
    swiperArr2.push(swiper);
  };

  // src/utils/stickySection.ts
  gsap.registerPlugin(ScrollTrigger);
  var stickySection = () => {
    const block = document.querySelector(".section_sticky-hero.js-desktop-slider");
    if (block) return;
    const stickySection2 = document.querySelector(".section_sticky-hero");
    const stickyImages = document.querySelectorAll(".sticky-hero_item-figure");
    const checkPoint = document.querySelector(
      ".sticky-hero_pagination .sticky-hero_pagination-bullet"
    );
    const cloneLength = stickyImages.length - 1;
    if (cloneLength === 1) {
      checkPoint?.parentNode?.removeChild(checkPoint);
    } else {
      for (let i = 0; i < cloneLength; i++) {
        const clone = checkPoint?.cloneNode(true);
        if (clone) {
          checkPoint?.parentNode?.appendChild(clone);
        }
      }
    }
    const newCheckPoints = document.querySelectorAll(
      ".sticky-hero_pagination .sticky-hero_pagination-bullet"
    );
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const imagesArray = Array.from(stickyImages).reverse();
      const isSquare = stickySection2?.classList.contains("is-square");
      const innerSection = stickySection2?.querySelector(".sticky-hero_component.is-square");
      const stepSize = 1 / imagesArray.length;
      const steps = imagesArray.length;
      gsap.set(imagesArray, { opacity: 0 });
      gsap.set(imagesArray[0], { opacity: 1 });
      gsap.set(newCheckPoints, { backgroundColor: "transparent" });
      gsap.set(newCheckPoints[0], { backgroundColor: "#FFFFFF" });
      let currentImageIndex = 0;
      ScrollTrigger.create({
        trigger: isSquare ? innerSection : stickySection2,
        start: "top top",
        end: `+=${100 * steps}%`,
        pin: stickySection2,
        // markers: true,
        scrub: true,
        onUpdate: (self) => {
          const { progress } = self;
          const targetIndex = Math.floor(progress / stepSize);
          if (targetIndex !== currentImageIndex && targetIndex < imagesArray.length) {
            gsap.to(imagesArray[currentImageIndex], {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut"
            });
            gsap.to(imagesArray[targetIndex], {
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut"
            });
            gsap.to(newCheckPoints[currentImageIndex], {
              backgroundColor: "transparent",
              duration: 0.5,
              ease: "power2.inOut"
            });
            gsap.to(newCheckPoints[targetIndex], {
              backgroundColor: "#FFFFFF",
              duration: 0.5,
              ease: "power2.inOut"
            });
            currentImageIndex = targetIndex;
          }
        }
      });
    });
  };

  // src/utils/stickyText.ts
  gsap.registerPlugin(ScrollTrigger);
  var stickyText = () => {
    const stickyText2 = document.querySelector("[anim=sticky]");
    if (!stickyText2) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: stickyText2.parentElement,
        start: "top 20%",
        end: "80% 20%",
        pin: stickyText2,
        markers: false
      });
    });
  };

  // src/utils/swiperSliders.ts
  var swiperSliders = () => {
    const sliderWrapper = document.querySelectorAll(".swiper_slider");
    if (sliderWrapper) {
      sliderWrapper.forEach((slider) => {
        const defaultSlider = slider.querySelector(".swiper.default");
        const nextButton = slider.querySelector(".swiper_button.swiper-button-next");
        const splitSlider = slider.querySelector(".swiper.split");
        const children = slider.querySelectorAll(".image-slider_item");
        if (defaultSlider) {
          if (children.length === 1) {
            nextButton?.classList.add("hide");
            nextButton?.setAttribute("aria-hidden", "true");
          }
          const swiper = new Swiper(defaultSlider, {
            loop: true,
            speed: 1e3,
            slidesPerView: "auto",
            navigation: {
              nextEl: nextButton
            }
          });
        }
        if (splitSlider) {
          const swiper = new Swiper(splitSlider, {
            loop: false,
            speed: 1e3,
            freeMode: true,
            grabCursor: true,
            mousewheel: {
              forceToAxis: "horizontal"
            },
            navigation: {
              nextEl: nextButton
            },
            breakpoints: {
              0: {
                /* when window >=0px - webflow mobile landscape/portriat */
                slidesPerView: 1.05
              },
              767: {
                /* when window >= 767px - webflow tablet */
                slidesPerView: 1.25
              },
              992: {
                slidesPerView: 1.25
              }
            }
          });
        }
      });
    }
  };

  // src/utils/textMask.ts
  gsap.registerPlugin(ScrollTrigger);
  var textMask = () => {
    const texts = document.querySelectorAll(".text-mask");
    if (!texts) return;
    let mm = gsap.matchMedia();
    mm.add(
      {
        isMobile: "screen and (max-width: 767px)",
        isDesktop: "screen and (min-width: 768px)"
      },
      (context) => {
        let { isMobile: isMobile3, isDesktop } = context.conditions;
        texts.forEach((textEl) => {
          gsap.set(textEl, {
            display: "inline-block"
          });
          const splitText = new SplitType(textEl, { types: "words" });
          const ems = textEl.querySelectorAll("em");
          gsap.set(ems, {
            display: "unset"
          });
          gsap.set(splitText.words, {
            yPercent: 80,
            opacity: 0,
            autoAlpha: 0
          });
          const tl = gsap.timeline();
          tl.to(splitText.words, {
            ease: (i) => 1 - Math.pow(1 - i, 4),
            duration: 1,
            yPercent: 0,
            opacity: 1,
            autoAlpha: 1,
            stagger: 0.01
          });
          ScrollTrigger.create({
            trigger: textEl,
            markers: false,
            start: isMobile3 ? "top 85%" : "top 75%",
            animation: tl,
            toggleActions: "play reverse play reverse"
          });
        });
      }
    );
  };

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    mapNeeds();
    gsapSmoothScroll();
    modals();
    accordion();
    swiperSliders();
    header();
    setTimeout(() => {
      homeMain();
      linesAnimation();
      textMask();
      stickyHero();
      experiences();
      bookingModal();
      roomIndiv();
      slidersSections();
      sectionLinks();
      sectionLinksActive();
      crossPageScroll();
      bgAccordion();
      faqCategoryGroup();
      stickySection();
      buttonAnimation();
      roomsHeroAnimation();
      popupModal();
      stickyText();
      homeAlternativeHero();
      gsapBasicAnimations();
      gaTagging();
      bookingButtonOnScroll();
      setTimeout(() => initMap(), 1e3);
      document.querySelectorAll(".js-loading").forEach((item) => {
        item.classList.remove("js-loading");
      });
    }, 100);
  });
})();
//# sourceMappingURL=index.js.map
