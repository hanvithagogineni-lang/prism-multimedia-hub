import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, Flip);

let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initPreloader();
  initHeroVideo();
  initCornerMenu();
  initHeroStickyTimeline();
  initHeroIntroText();
  prepareMediaReveals();
  initPixelRevealGrids();
  initImageFallbacks();
  initSectionReveals();
  initCardTilt3D();
  initImageParallax();
  initStatCounters();
  initSectionLineDraws();
  initWhyChooseAnimations();
  initAlumniCarousel();
  initGoogleReviewsCarousel();
  initLatestBlogsCarousel();
  initModal();
  initInfoCards();
  initNavScrollBg();
  initWorksFilter();
  initFormHandlers();
  initBrochurePlaceholders();
  initBackToTop();
});

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenisInstance = lenis;
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  if (!preloader || !fill) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.dispatchEvent(new CustomEvent('prism:preloader-done'));
      }, 400);
    } else {
      fill.style.width = `${progress}%`;
    }
  }, 60);
}

function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.loop = true;

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        const unlock = () => {
          video.play().catch(() => {});
          window.removeEventListener('pointerdown', unlock);
        };
        window.addEventListener('pointerdown', unlock, { once: true });
      });
    }
  };

  if (video.readyState >= 2) tryPlay();
  else video.addEventListener('loadeddata', tryPlay, { once: true });
}

function initHeroIntroText() {
  const lines = document.querySelectorAll(
    '.rr-landing-hero_eyebrow, .rr-landing-hero-text-01, .rr-landing-hero-text-02, .rr-landing-hero-text-03, .rr-landing-hero_subtext, .hero-cta-row, .hero-trust-line, .rr-landing-hero_stats'
  );
  if (!lines.length) return;

  gsap.set(lines, { opacity: 0, y: 36 });

  const play = () => {
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 1.05,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.15,
    });
  };

  document.addEventListener('prism:preloader-done', play, { once: true });
  setTimeout(() => {
    if (document.getElementById('preloader')?.classList.contains('fade-out')) play();
  }, 1800);
}

function initCornerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const menuFull = document.getElementById('menuFull');
  const menuOverlay = document.getElementById('menuOverlay');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');

  if (!hamburgerBtn || !menuFull || !menuOverlay) return;

  let isOpen = false;

  hamburgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isOpen = !isOpen;

    const state = Flip.getState(menuFull);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      menuFull.classList.add('is-fullscreen');
      menuOverlay.classList.add('is-visible');

      gsap.to(line1, { rotation: 45, y: 4, duration: 0.4, ease: 'power2.inOut' });
      gsap.to(line2, { rotation: -45, y: -4, duration: 0.4, ease: 'power2.inOut' });

      Flip.from(state, {
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          const links = document.querySelectorAll('.menu_link');
          gsap.fromTo(
            links,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
          );
        },
      });
    } else {
      closeMenu(state);
    }
  });

  menuOverlay.addEventListener('click', () => {
    if (isOpen) {
      isOpen = false;
      const state = Flip.getState(menuFull);
      closeMenu(state);
    }
  });

  document.querySelectorAll('.menu_link').forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        const state = Flip.getState(menuFull);
        closeMenu(state);
      }
    });
  });

  function closeMenu(state) {
    document.body.style.overflow = '';
    menuFull.classList.remove('is-fullscreen');
    menuOverlay.classList.remove('is-visible');

    gsap.to(line1, { rotation: 0, y: 0, duration: 0.4, ease: 'power2.inOut' });
    gsap.to(line2, { rotation: 0, y: 0, duration: 0.4, ease: 'power2.inOut' });

    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
    });
  }
}

function initHeroStickyTimeline() {
  const heroSticky = document.getElementById('top');
  const heroPinned = document.getElementById('heroPinned');
  const heroForeground = document.getElementById('heroForeground');
  const heroFullscreenRows = document.getElementById('heroFullscreenRows');
  const heroBg = document.querySelector('.rr-landing-hero-bg-video');
  const rowLines = document.querySelectorAll('.rr-landing-hero_fullscreen-row-line');
  const rowContents = document.querySelectorAll('.rr-landing-hero_fullscreen-row_content');
  const rowTitles = document.querySelectorAll('.rr-landing-hero_fullscreen-row_title');

  if (!heroSticky || !heroPinned || !heroForeground || !heroFullscreenRows) return;

  gsap.set(rowContents, { opacity: 0, y: 28 });
  gsap.set(rowTitles, { opacity: 0, y: 20 });
  gsap.set(rowLines, { width: '0%' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSticky,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.85,
      pin: heroPinned,
      pinSpacing: false,
    },
  });

  tl.to(heroForeground, {
    opacity: 0,
    y: -70,
    scale: 0.94,
    duration: 1.1,
    ease: 'none',
  });

  if (heroBg) {
    tl.to(
      heroBg,
      {
        scale: 1.14,
        duration: 2.4,
        ease: 'none',
      },
      0
    );
  }

  tl.to(
    heroFullscreenRows,
    {
      opacity: 1,
      duration: 0.45,
      onStart: () => heroFullscreenRows.classList.add('active'),
      onReverseComplete: () => heroFullscreenRows.classList.remove('active'),
    },
    '-=0.35'
  );

  rowLines.forEach((line, i) => {
    tl.to(line, { width: '100%', duration: 0.85, ease: 'none' }, `<+0.08`);
    if (rowTitles[i]) {
      tl.to(rowTitles[i], { opacity: 1, y: 0, duration: 0.55, ease: 'none' }, `<`);
    }
    if (rowContents[i]) {
      tl.to(rowContents[i], { opacity: 1, y: 0, duration: 0.55, ease: 'none' }, `<+0.12`);
    }
  });
}

function prepareMediaReveals() {
  document
    .querySelectorAll('.work-card-img-wrap, .content-card-img, .leader-avatar-lg, .program-card-img-wrap')
    .forEach((wrap) => {
      wrap.classList.add('pixel-reveal-wrapper');
      wrap.setAttribute('data-pixel-reveal', 'true');
      if (!wrap.querySelector('.pixel-reveal-grid')) {
        const grid = document.createElement('div');
        grid.className = 'pixel-reveal-grid';
        wrap.appendChild(grid);
      }
    });
}

function shatterPixels(pixels, gridContainer) {
  const shuffled = [...pixels].sort(() => Math.random() - 0.5);
  shuffled.forEach((pixel, index) => {
    setTimeout(() => {
      pixel.classList.add('shattered');
      if (index === shuffled.length - 1 && gridContainer) {
        setTimeout(() => {
          gridContainer.classList.add('is-done');
        }, 420);
      }
    }, index * 8);
  });
}

function initPixelRevealGrids() {
  const targetWrappers = document.querySelectorAll('[data-pixel-reveal="true"]');

  targetWrappers.forEach((wrapper) => {
    const gridContainer = wrapper.querySelector('.pixel-reveal-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';
    gridContainer.classList.remove('is-done');
    const pixels = [];
    const cols = wrapper.classList.contains('leader-avatar-lg') ? 6 : 7;
    const rows = cols;

    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p = document.createElement('div');
        p.classList.add('pixel');
        gridContainer.appendChild(p);
        pixels.push(p);
      }
    }

    if (prefersReducedMotion()) {
      pixels.forEach((pixel) => pixel.classList.add('shattered'));
      gridContainer.classList.add('is-done');
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      shatterPixels(pixels, gridContainer);
    };

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top 90%',
      onEnter: reveal,
      onEnterBack: reveal,
    });

    // Safety: never leave cards permanently black
    setTimeout(reveal, 2200);
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function initImageFallbacks() {
  document.querySelectorAll('.program-card-img, .work-card-img-wrap img, .content-card-img img, .leader-avatar').forEach((img, index) => {
    img.addEventListener(
      'error',
      () => {
        const seed = encodeURIComponent(img.alt || `prism-${index}`);
        img.src = `https://picsum.photos/seed/${seed}/900/560`;
      },
      { once: true }
    );
  });
}

function initSectionReveals() {
  if (prefersReducedMotion()) return;

  const headings = document.querySelectorAll(
    '.section-heading, .home-view-heading, .section-title-tag'
  );
  headings.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 44, rotateX: 10, transformPerspective: 900 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none play reset',
        },
      }
    );
  });

  const animatedCards = [];

  document.querySelectorAll('.section-padding, .footer').forEach((section) => {
    const cards = section.querySelectorAll(
      '.program-card, .work-card, .content-card, .alumni-card, .testimonial-card, .faq-item, .process-step, .stat-card, .vm-card, .why-item, .course-track-item, .contact-card, .brochure-banner, .leader-two-col, .student-grid-card, .why-choose-feature-item, [data-rr-reveal]'
    );
    if (!cards.length) return;

    animatedCards.push(...cards);

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 48,
        rotateX: 8,
        scale: 0.96,
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none play reset',
        },
      }
    );
  });

  // Safety: never leave section cards permanently invisible
  setTimeout(() => {
    animatedCards.forEach((card) => {
      const opacity = Number(getComputedStyle(card).opacity);
      if (opacity < 0.2) {
        gsap.set(card, { opacity: 1, y: 0, rotateX: 0, scale: 1, clearProps: 'transform' });
      }
    });
    headings.forEach((el) => {
      const opacity = Number(getComputedStyle(el).opacity);
      if (opacity < 0.2) {
        gsap.set(el, { opacity: 1, y: 0, rotateX: 0, clearProps: 'transform' });
      }
    });
  }, 3500);
}

function initCardTilt3D() {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll(
    '.program-card, .work-card, .content-card, button.info-card, .alumni-card-rich'
  );

  cards.forEach((card) => {
    card.classList.add('rr-tilt-card');

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 8,
        y: -4,
        duration: 0.35,
        transformPerspective: 900,
        transformOrigin: 'center',
        ease: 'power2.out',
      });
    });

    card.addEventListener('pointerleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
      });
    });
  });
}

function initImageParallax() {
  if (prefersReducedMotion()) return;

  document
    .querySelectorAll('.program-card-img, .work-card-img-wrap img, .content-card-img img, .leader-avatar-lg .leader-avatar')
    .forEach((img) => {
      gsap.set(img, { scale: 1.08, transformOrigin: 'center center' });
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.program-card, .work-card, .content-card, .leader-portrait') || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
}

function initStatCounters() {
  document.querySelectorAll('.stat-value').forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/(\d[\d,]*)/);
    if (!match) return;

    const target = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = raw.replace(match[1], '');

    const play = () => {
      if (prefersReducedMotion()) {
        el.textContent = raw;
        return;
      }
      const state = { val: 0 };
      gsap.to(state, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(state.val)}${suffix}`;
        },
      });
    };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: play,
      onEnterBack: play,
    });
  });
}

function initWhyChooseAnimations() {
  if (prefersReducedMotion()) return;

  const emoji = document.querySelector('.why-choose-emoji-svg');
  if (emoji) {
    // Levitating floating loop
    gsap.to(emoji, {
      y: -14,
      rotate: 2.5,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // 3D tilt on hover / pointermove
    const wrap = document.querySelector('.why-choose-emoji-wrap');
    if (wrap) {
      wrap.addEventListener('pointermove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(emoji, {
          rotateY: x * 20,
          rotateX: -y * 15,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      });

      wrap.addEventListener('pointerleave', () => {
        gsap.to(emoji, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    }
  }

  // Feature list item entrance on scroll up and down
  const items = document.querySelectorAll('.why-choose-feature-item');
  if (items.length) {
    gsap.fromTo(
      items,
      { opacity: 0, x: 45, rotateY: 15 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#why-choose-us-feature',
          start: 'top 75%',
          toggleActions: 'play none play reset',
        },
      }
    );
  }
}

function initAlumniCarousel() {
  const prevBtn = document.getElementById('alumniPrevBtn');
  const nextBtn = document.getElementById('alumniNextBtn');
  const grid = document.querySelector('.alumni-grid-4col');
  if (!prevBtn || !nextBtn || !grid) return;

  const cards = grid.querySelectorAll('.alumni-card-v2');
  if (!cards.length) return;

  let index = 0;

  const update = () => {
    cards.forEach((card, i) => {
      if (window.innerWidth <= 580) {
        card.style.display = i === index ? 'flex' : 'none';
      } else if (window.innerWidth <= 1024) {
        card.style.display = (i === index || i === index + 1) ? 'flex' : 'none';
      } else {
        card.style.display = (i >= index && i < index + 4) ? 'flex' : 'none';
      }
    });
  };

  prevBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 580 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    index = Math.max(0, index - step);
    update();
  });

  nextBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 580 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    const maxIndex = cards.length - step;
    index = Math.min(maxIndex, index + step);
    update();
  });

  window.addEventListener('resize', update);
  update();
}

function initGoogleReviewsCarousel() {
  const prevBtn = document.getElementById('gReviewPrevBtn');
  const nextBtn = document.getElementById('gReviewNextBtn');
  const grid = document.getElementById('gReviewsGrid');
  const dot1 = document.getElementById('gDot1');
  const dot2 = document.getElementById('gDot2');
  if (!prevBtn || !nextBtn || !grid) return;

  const cards = grid.querySelectorAll('.google-review-card');
  if (!cards.length) return;

  let index = 0;

  const update = () => {
    cards.forEach((card, i) => {
      if (window.innerWidth <= 640) {
        card.style.display = i === index ? 'flex' : 'none';
      } else if (window.innerWidth <= 1024) {
        card.style.display = (i === index || i === index + 1) ? 'flex' : 'none';
      } else {
        card.style.display = (i >= index && i < index + 4) ? 'flex' : 'none';
      }
    });

    if (dot1 && dot2) {
      if (index === 0) {
        dot1.classList.add('active');
        dot2.classList.remove('active');
      } else {
        dot1.classList.remove('active');
        dot2.classList.add('active');
      }
    }
  };

  prevBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    index = Math.max(0, index - step);
    update();
  });

  nextBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    const maxIndex = cards.length - step;
    index = Math.min(maxIndex, index + step);
    update();
  });

  window.addEventListener('resize', update);
  update();
}

function initLatestBlogsCarousel() {
  const prevBtn = document.getElementById('blogPrevBtn');
  const nextBtn = document.getElementById('blogNextBtn');
  const grid = document.getElementById('blogGrid');
  const bDot1 = document.getElementById('bDot1');
  const bDot2 = document.getElementById('bDot2');
  const bDot3 = document.getElementById('bDot3');
  if (!prevBtn || !nextBtn || !grid) return;

  const cards = grid.querySelectorAll('.latest-blog-card');
  if (!cards.length) return;

  let index = 0;

  const update = () => {
    cards.forEach((card, i) => {
      if (window.innerWidth <= 640) {
        card.style.display = i === index ? 'flex' : 'none';
      } else if (window.innerWidth <= 1024) {
        card.style.display = (i === index || i === index + 1) ? 'flex' : 'none';
      } else {
        card.style.display = (i >= index && i < index + 4) ? 'flex' : 'none';
      }
    });

    [bDot1, bDot2, bDot3].forEach((dot, idx) => {
      if (dot) {
        if (idx === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      }
    });
  };

  prevBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    index = Math.max(0, index - step);
    update();
  });

  nextBtn.addEventListener('click', () => {
    const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    const maxIndex = cards.length - step;
    index = Math.min(maxIndex, index + step);
    update();
  });

  window.addEventListener('resize', update);
  update();
}

function initSectionLineDraws() {
  if (prefersReducedMotion()) return;

  document.querySelectorAll('.section-title-tag').forEach((tag) => {
    tag.classList.add('rr-line-tag');
    ScrollTrigger.create({
      trigger: tag,
      start: 'top 90%',
      once: true,
      onEnter: () => tag.classList.add('is-drawn'),
    });
  });
}

function initNavScrollBg() {
  const navWrap = document.getElementById('navWrap');
  if (!navWrap) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navWrap.classList.add('scrolled');
    } else {
      navWrap.classList.remove('scrolled');
    }
  });
}

function initModal() {
  const modal = document.getElementById('enquireModal');
  const openBtn = document.getElementById('openEnquireModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const closeBg = document.getElementById('closeModalBg');
  const triggers = document.querySelectorAll('.trigger-enquire');
  const form = document.getElementById('enquiryForm');

  if (!modal) return;

  function openModal() {
    document.getElementById('infoModal')?.classList.remove('is-visible');
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-visible');
    if (!document.getElementById('infoModal')?.classList.contains('is-visible') &&
        !document.getElementById('menuFull')?.classList.contains('is-fullscreen')) {
      document.body.style.overflow = '';
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBg) closeBg.addEventListener('click', closeModal);

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      form.reset();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
      closeModal();
    }
  });
}

const INFO_CONTENT = {
  'graphic-design': {
    tag: 'Course',
    title: 'Graphic Design',
    summary: 'Develop professional visual communication skills through typography, layouts, branding, digital artwork and creative design projects.',
    points: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Layout Design',
      'Typography',
      'Branding',
      'Digital Artwork',
    ],
  },
  'motion-graphics': {
    tag: 'Course',
    title: 'Motion Graphics',
    summary: 'Learn how to transform static designs into engaging animated visuals for advertising, social media, presentations and digital content.',
    points: [
      'Motion Design',
      'Animation Principles',
      'Title Design',
      'Visual Effects',
      'Video Composition',
      'Software: Adobe After Effects, Adobe Premiere Pro',
    ],
  },
  'ui-design-dev': {
    tag: 'Course',
    title: 'UI Design & Development',
    summary: 'Learn to design modern digital interfaces and understand how professional designs are transformed into responsive web experiences.',
    points: [
      'UI Design',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive Design',
      'Bootstrap',
      'jQuery',
      'Front-End Fundamentals',
    ],
  },
  'digital-marketing': {
    tag: 'Course',
    title: 'Digital Marketing',
    summary: 'Understand how businesses build their online presence through search, social media, content, advertising and digital analytics.',
    points: [
      'SEO',
      'Social Media Marketing',
      'Content Marketing',
      'Search Advertising',
      'Online Branding',
      'Analytics',
    ],
  },
  'ux-design': {
    tag: 'Course',
    title: 'UX Design',
    summary: 'Learn how to create meaningful digital experiences by understanding users, solving problems and designing intuitive interfaces.',
    points: [
      'User Research',
      'User Personas',
      'User Flows',
      'Wireframes',
      'Prototyping',
      'Usability',
      'Interface Design',
    ],
  },
  'anim-2d': {
    tag: 'Course',
    title: '2D Animation',
    summary: 'Develop skills in character design, illustration, movement and storytelling to create engaging two-dimensional animations.',
    points: [
      'Character Design',
      'Illustration',
      'Animation Principles',
      'Storyboarding',
      'Motion',
      'Digital Animation',
    ],
  },
  'anim-3d': {
    tag: 'Course',
    title: '3D Animation',
    summary: 'Explore the complete 3D production process from modeling and texturing to lighting, animation and rendering.',
    points: [
      '3D Modeling',
      'Texturing',
      'Lighting',
      'Rigging',
      'Animation',
      'Rendering',
      'Software: Autodesk Maya, Blender',
    ],
  },
  'av-editing': {
    tag: 'Course',
    title: 'Audio & Video Editing',
    summary: 'Learn professional post-production techniques for creating polished video and audio content.',
    points: [
      'Video Editing',
      'Audio Editing',
      'Color Correction',
      'Transitions',
      'Motion Graphics',
      'Sound Design',
      'Software: Premiere Pro, Audition, After Effects, Media Encoder',
    ],
  },
  vfx: {
    tag: 'Course',
    title: 'Visual Effects',
    summary: 'Learn the fundamentals of creating visual effects and combining real footage with digital elements.',
    points: [
      'Compositing',
      'Green Screen',
      'Motion Tracking',
      'Visual Effects',
      'Post Production',
    ],
  },
  edp: {
    tag: 'Course',
    title: 'EDP',
    summary: 'A professional development-oriented program designed to help learners strengthen their practical creative and technology skills.',
    points: [
      'Practical learning',
      'Project-based assignments',
      'Professional tools',
      'Portfolio development',
      'Career preparation',
    ],
  },
  pgdim: {
    tag: 'Course',
    title: 'PGDIM — Professional Multimedia Program',
    summary: 'Build a broad foundation across graphic design, web development, animation, video production and digital media through a structured professional program.',
    points: [
      'Photoshop, Illustrator, HTML, CSS, JavaScript',
      'Bootstrap, jQuery, Angular, Adobe Animate',
      'Premiere Pro, After Effects, Media Encoder, Audition',
      'Autodesk Maya, Blender',
      'Practical assignments and portfolio projects',
      'Industry-oriented learning and career preparation',
    ],
  },
  'experienced-faculty': {
    tag: 'Why Choose Us',
    title: 'Experienced Faculty',
    summary: 'Learn with guidance from experienced trainers and professionals.',
    points: [
      'Industry-aware mentoring',
      'Practical project feedback',
      'Guidance beyond theory',
      'Support for portfolio and career preparation',
    ],
  },
  'industry-curriculum': {
    tag: 'Why Choose Us',
    title: 'Industry-Relevant Curriculum',
    summary: 'Develop skills aligned with current creative and digital industry requirements.',
    points: [
      'Tools used in studios and digital teams',
      'Structured blend of theory and practice',
      'Career-focused learning outcomes',
      'Updated modules for modern workflows',
    ],
  },
  'practical-learning': {
    tag: 'Why Choose Us',
    title: 'Practical Learning',
    summary: 'Work on assignments and projects instead of relying only on theoretical learning.',
    points: [
      'Hands-on classroom practice',
      'Project-based assignments',
      'Real-world creative briefs',
      'Mentor reviews at key milestones',
    ],
  },
  portfolio: {
    tag: 'Why Choose Us',
    title: 'Portfolio Development',
    summary: 'Build projects that demonstrate your creative and technical abilities.',
    points: [
      'Curated project selection',
      'Case-study presentation guidance',
      'Showreel and portfolio reviews',
      'Assets ready for interviews',
    ],
  },
  'career-guidance': {
    tag: 'Why Choose Us',
    title: 'Career Guidance',
    summary: 'Receive support with career preparation, portfolio development and interview readiness.',
    points: [
      'Course and path counseling',
      'Resume and portfolio checks',
      'Interview preparation support',
      'Opportunity exploration guidance',
    ],
  },
  certification: {
    tag: 'Why Choose Us',
    title: 'Certification',
    summary: 'Receive certification after successfully completing the relevant program.',
    points: [
      'Program completion certificate',
      'Supports job and freelance pathways',
      'Adds credibility to portfolios',
      'Recognized across creative learning tracks',
    ],
  },
  'alumni-community': {
    tag: 'Why Choose Us',
    title: 'Alumni Community',
    summary: 'Connect with learners who have progressed into different creative careers.',
    points: [
      'Alumni across design and media roles',
      'Networking and peer learning',
      'Inspiration from real career journeys',
      'Community of creative professionals',
    ],
  },
  'creative-environment': {
    tag: 'Why Choose Us',
    title: 'Creative Learning Environment',
    summary: 'Learn in an environment that encourages experimentation, creativity and practical problem solving.',
    points: [
      'Space to experiment and iterate',
      'Collaborative learning culture',
      'Focus on craft and presentation',
      'Practical problem-solving mindset',
    ],
  },
};

function initInfoCards() {
  const modal = document.getElementById('infoModal');
  const titleEl = document.getElementById('infoModalTitle');
  const tagEl = document.getElementById('infoModalTag');
  const summaryEl = document.getElementById('infoModalSummary');
  const listEl = document.getElementById('infoModalList');
  const closeBtn = document.getElementById('closeInfoModalBtn');
  const closeBg = document.getElementById('closeInfoModalBg');
  const enquireBtn = document.getElementById('infoModalEnquire');
  const cards = document.querySelectorAll('[data-info]');

  if (!modal || !titleEl || !summaryEl || !listEl || !cards.length) return;

  function openInfo(key) {
    const data = INFO_CONTENT[key];
    if (!data) return;

    tagEl.textContent = data.tag;
    titleEl.textContent = data.title;
    summaryEl.textContent = data.summary;
    listEl.innerHTML = data.points.map((point) => `<li>${point}</li>`).join('');
    modal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeInfo() {
    modal.classList.remove('is-visible');
    if (!document.getElementById('menuFull')?.classList.contains('is-fullscreen')) {
      document.body.style.overflow = '';
    }
  }

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openInfo(card.dataset.info);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeInfo);
  if (closeBg) closeBg.addEventListener('click', closeInfo);

  if (enquireBtn) {
    enquireBtn.addEventListener('click', () => {
      closeInfo();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
      closeInfo();
    }
  });
}

function initWorksFilter() {
  const buttons = document.querySelectorAll('[data-filter-btn]');
  const cards = document.querySelectorAll('[data-filter]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter-btn');
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));

      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-filter') === filter;
        card.classList.toggle('is-filtered-out', !match);
      });

      ScrollTrigger.refresh();
    });
  });
}

function bindFormSuccess(formId, successId) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    if (success) {
      success.hidden = false;
      setTimeout(() => {
        success.hidden = true;
      }, 5000);
    }
  });
}

function initFormHandlers() {
  bindFormSuccess('corporateForm', 'corporateFormSuccess');
  bindFormSuccess('registerForm', 'registerFormSuccess');
  bindFormSuccess('contactForm', 'contactFormSuccess');
}

function initBrochurePlaceholders() {
  const triggers = document.querySelectorAll('.trigger-brochure');
  if (!triggers.length) return;

  triggers.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const brochure = document.getElementById('brochure');
      if (brochure) {
        if (lenisInstance) {
          lenisInstance.scrollTo(brochure, { offset: -80 });
        } else {
          brochure.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

