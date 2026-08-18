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
  initBlogsCarousel();
  initBlogReaderModal();
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

function initBlogsCarousel() {
  const prevBtn = document.getElementById('blogPrevBtn');
  const nextBtn = document.getElementById('blogNextBtn');
  const grid = document.getElementById('blogsGrid');
  const dot1 = document.getElementById('bDot1');
  const dot2 = document.getElementById('bDot2');
  const dot3 = document.getElementById('bDot3');
  if (!prevBtn || !nextBtn || !grid) return;

  const cards = grid.querySelectorAll('.blog-card-item');
  if (!cards.length) return;

  let index = 0;

  const update = () => {
    const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
    cards.forEach((card, i) => {
      card.style.display = (i >= index && i < index + step) ? 'flex' : 'none';
    });

    const activeDot = Math.min(2, Math.floor(index / step));
    [dot1, dot2, dot3].forEach((dot, idx) => {
      if (dot) {
        if (idx === activeDot) dot.classList.add('active');
        else dot.classList.remove('active');
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

  [dot1, dot2, dot3].forEach((dot, idx) => {
    if (dot) {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        const step = window.innerWidth <= 640 ? 1 : (window.innerWidth <= 1024 ? 2 : 4);
        index = idx * step;
        update();
      });
    }
  });

  window.addEventListener('resize', update);
  update();
}

function initBlogReaderModal() {
  const modal = document.getElementById('blogReaderModal');
  const backdrop = document.getElementById('blogReaderBackdrop');
  const closeBtn = document.getElementById('blogReaderCloseBtn');
  const catEl = document.getElementById('blogReaderCat');
  const titleEl = document.getElementById('blogReaderTitle');
  const contentEl = document.getElementById('blogReaderContent');
  const recentEl = document.getElementById('blogSidebarRecent');
  if (!modal || !backdrop || !closeBtn) return;

  const blogPostsData = [
    {
      id: 1,
      cat: 'INDESIGN',
      title: 'Master Adobe InDesign: Top 100 Essential Keyboard Shortcuts',
      img: './blog-poster-1.jpg',
      content: `
        <p>In the world of digital design, Adobe InDesign is a titan, renowned for its robust feature set that caters to everything from magazine layouts to interactive PDFs. However, even the most seasoned designers might not be tapping into InDesign's full potential. How? By not utilizing keyboard shortcuts. That's right, those little keystrokes that could shave precious seconds off your tasks, cumulating into hours of saved time on projects. In this blog, we're unlocking the door to efficiency with the top 100 keyboard shortcuts for Adobe InDesign. Whether you're laying out a brochure, designing a newsletter, or creating digital publications, these shortcuts will have you working like an InDesign wizard in no time. Let's boost your productivity and make your design process as seamless as your creations.</p>
        
        <h3>Navigating and Viewing Documents</h3>
        <ol>
          <li><strong>Cmd/Ctrl + 0</strong> – Fit Page in Window</li>
          <li><strong>Cmd/Ctrl + 1</strong> – Actual Size</li>
          <li><strong>Cmd/Ctrl + 2</strong> – Zoom to 200%</li>
          <li><strong>Cmd/Ctrl + +/-</strong> – Zoom In/Out</li>
          <li><strong>Cmd/Ctrl + J</strong> – Go to Page</li>
          <li><strong>Cmd/Ctrl + Page Up/Page Down</strong> – Previous/Next Page</li>
          <li><strong>Cmd/Ctrl + Alt + 0</strong> – Fit Spread in Window</li>
          <li><strong>Cmd/Ctrl + Shift + E</strong> – Preview Mode</li>
          <li><strong>W</strong> (with no text selected) – Switch between Normal and Preview Mode</li>
          <li><strong>Cmd/Ctrl + Y</strong> – Story Editor</li>
        </ol>

        <h3>Text and Typography</h3>
        <ol start="11">
          <li><strong>T</strong> – Type Tool</li>
          <li><strong>Cmd/Ctrl + Shift + T</strong> – Character Panel</li>
          <li><strong>Cmd/Ctrl + Option/Alt + T</strong> – Tabs Panel</li>
          <li><strong>Cmd/Ctrl + B</strong> – Text Frame Options</li>
          <li><strong>Cmd/Ctrl + Shift + &lt; or &gt;</strong> – Decrease/Increase Font Size</li>
          <li><strong>Cmd/Ctrl + Shift + K</strong> – Toggle All Caps</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + K</strong> – Toggle Small Caps</li>
          <li><strong>Cmd/Ctrl + L</strong> – Align Left</li>
          <li><strong>Cmd/Ctrl + R</strong> – Align Right</li>
          <li><strong>Cmd/Ctrl + Shift + C</strong> – Align Center</li>
        </ol>

        <h3>Working with Objects</h3>
        <ol start="21">
          <li><strong>V</strong> – Selection Tool</li>
          <li><strong>A</strong> – Direct Selection Tool</li>
          <li><strong>Cmd/Ctrl + D</strong> – Place</li>
          <li><strong>Cmd/Ctrl + Shift + M</strong> – Move</li>
          <li><strong>E</strong> – Free Transform Tool</li>
          <li><strong>Cmd/Ctrl + B</strong> – Text Frame Options</li>
          <li><strong>Cmd/Ctrl + Shift + [</strong> – Send to Back</li>
          <li><strong>Cmd/Ctrl + Shift + ]</strong> – Bring to Front</li>
          <li><strong>Cmd/Ctrl + [</strong> – Send Backward</li>
          <li><strong>Cmd/Ctrl + ]</strong> – Bring Forward</li>
        </ol>

        <h3>Layers and Colors</h3>
        <ol start="31">
          <li><strong>F7</strong> – Layers Panel</li>
          <li><strong>F6</strong> – Color Panel</li>
          <li><strong>F5</strong> – Swatches Panel</li>
          <li><strong>Cmd/Ctrl + Shift + F5</strong> – Gradient Panel</li>
          <li><strong>Cmd/Ctrl + F8</strong> – Stroke Panel</li>
          <li><strong>Cmd/Ctrl + Shift + F10</strong> – Effects Panel</li>
          <li><strong>Cmd/Ctrl + M</strong> – New Color Swatch</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + M</strong> – New Gradient Swatch</li>
          <li><strong>Cmd/Ctrl + 3</strong> – Hide Selection</li>
          <li><strong>Cmd/Ctrl + Alt + 3</strong> – Show All</li>
        </ol>

        <h3>Tables and Data</h3>
        <ol start="41">
          <li><strong>Cmd/Ctrl + Alt + Shift + T</strong> – Table Panel</li>
          <li><strong>Cmd/Ctrl + T</strong> – Tabs Panel</li>
          <li><strong>Cmd/Ctrl + Shift + F8</strong> – Text Wrap Panel</li>
          <li><strong>Cmd/Ctrl + B</strong> – Table Options</li>
          <li><strong>Cmd/Ctrl + Alt + B</strong> – Table Cell Options</li>
          <li><strong>Cmd/Ctrl + Shift + F9</strong> – Table Styles</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + F9</strong> – Cell Styles</li>
          <li><strong>Cmd/Ctrl + Option/Alt + Up/Down Arrow</strong> – Increase/Decrease Row Height</li>
          <li><strong>Cmd/Ctrl + Option/Alt + Left/Right Arrow</strong> – Increase/Decrease Column Width</li>
          <li><strong>Cmd/Ctrl + Shift + L</strong> – Convert Text to Table</li>
        </ol>

        <h3>Panels and Windows</h3>
        <ol start="51">
          <li><strong>F9</strong> – Pages Panel</li>
          <li><strong>F10</strong> – Paragraph Styles Panel</li>
          <li><strong>F11</strong> – Character Styles Panel</li>
          <li><strong>Cmd/Ctrl + F11</strong> – Glyphs Panel</li>
          <li><strong>Cmd/Ctrl + F12</strong> – Scripts Panel</li>
          <li><strong>Cmd/Ctrl + 6</strong> – Links Panel</li>
          <li><strong>Cmd/Ctrl + 7</strong> – Layers Panel</li>
          <li><strong>Cmd/Ctrl + F7</strong> – Object Styles Panel</li>
          <li><strong>Cmd/Ctrl + F10</strong> – Stroke Panel</li>
          <li><strong>Cmd/Ctrl + Shift + F7</strong> – Effects Panel</li>
        </ol>

        <h3>Productivity Boosters</h3>
        <ol start="61">
          <li><strong>Cmd/Ctrl + Alt + Shift + N</strong> – New Document</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + S</strong> – Save All</li>
          <li><strong>Cmd/Ctrl + Shift + Option/Alt + V</strong> – Paste in Place</li>
          <li><strong>Cmd/Ctrl + Shift + W</strong> – Close All Windows</li>
          <li><strong>Cmd/Ctrl + Option/Alt + W</strong> – Close All But This Window</li>
          <li><strong>Cmd/Ctrl + ' (apostrophe)</strong> – Show/Hide Guides</li>
          <li><strong>Cmd/Ctrl + ; (semicolon)</strong> – Lock/Unlock Guides</li>
          <li><strong>Cmd/Ctrl + Shift + P</strong> – Page Tool</li>
          <li><strong>Cmd/Ctrl + Shift + B</strong> – Text Frame Baseline Options</li>
          <li><strong>Cmd/Ctrl + Option/Alt + J</strong> – Content Collector Tool</li>
        </ol>

        <h3>Exporting and Sharing</h3>
        <ol start="71">
          <li><strong>Cmd/Ctrl + E</strong> – Export</li>
          <li><strong>Cmd/Ctrl + Alt + E</strong> – Export for Digital Editions</li>
          <li><strong>Cmd/Ctrl + Shift + Option/Alt + E</strong> – Quick Export as PNG</li>
          <li><strong>Cmd/Ctrl + P</strong> – Print</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + P</strong> – Package</li>
          <li><strong>Cmd/Ctrl + H</strong> – Hide InDesign</li>
          <li><strong>Cmd/Ctrl + Q</strong> – Quit InDesign</li>
          <li><strong>Cmd/Ctrl + Shift + M</strong> – Export to Adobe PDF (Print)</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + M</strong> – Export to Adobe PDF (Interactive)</li>
          <li><strong>Cmd/Ctrl + T</strong> – Export to EPUB</li>
        </ol>

        <h3>Efficiency and Customization</h3>
        <ol start="81">
          <li><strong>Cmd/Ctrl + K</strong> – Preferences</li>
          <li><strong>Cmd/Ctrl + Alt + K</strong> – Keyboard Shortcuts</li>
          <li><strong>Cmd/Ctrl + Shift + K</strong> – Customize Menus</li>
          <li><strong>Cmd/Ctrl + Shift + J</strong> – Object Export Options</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + O</strong> – Preflight</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + X</strong> – Index</li>
          <li><strong>Cmd/Ctrl + Shift + X</strong> – Cross-References</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + V</strong> – Variables</li>
          <li><strong>Cmd/Ctrl + Shift + V</strong> – Paste Without Formatting</li>
          <li><strong>Cmd/Ctrl + Option/Alt + Shift + J</strong> – Conditional Text</li>
        </ol>

        <h3>Advanced Techniques</h3>
        <ol start="91">
          <li><strong>Cmd/Ctrl + Option/Alt + G</strong> – Grep Search</li>
          <li><strong>Cmd/Ctrl + Shift + F</strong> – Font Search</li>
          <li><strong>Cmd/Ctrl + Shift + H</strong> – Hidden Characters</li>
          <li><strong>Cmd/Ctrl + Option/Alt + Shift + K</strong> – Kerning and Tracking</li>
          <li><strong>Cmd/Ctrl + B</strong> – Frame Fitting Options</li>
          <li><strong>Cmd/Ctrl + Shift + N</strong> – New Layer</li>
          <li><strong>Cmd/Ctrl + Shift + U</strong> – Update Content</li>
          <li><strong>Cmd/Ctrl + Alt + U</strong> – Update Links</li>
          <li><strong>Cmd/Ctrl + Option/Alt + Shift + S</strong> – Dynamic Spelling</li>
          <li><strong>Cmd/Ctrl + Shift + Y</strong> – Transparency Effects</li>
        </ol>

        <h3>Conclusion</h3>
        <p>With these 100 keyboard shortcuts for Adobe InDesign at your fingertips, you're well-equipped to streamline your design process, ensuring you work more efficiently and productively. While it might take some time to memorize these shortcuts, incorporating them into your daily workflow will drastically reduce the time spent on routine tasks, allowing you to focus more on the creative aspects of your projects. Remember, the key to mastering InDesign is not just in knowing what each tool does, but in learning how to access those tools at the speed of thought. So, start practicing these shortcuts, and watch your productivity soar!</p>
      `
    },
    {
      id: 2,
      cat: 'ILLUSTRATOR',
      title: 'Unlock Efficiency: Top 100 Adobe Illustrator Keyboard Shortcuts',
      img: './blog-poster-2.jpg',
      content: `
        <p>Ever feel like your workflow could use a turbo boost? Master these 100 Illustrator shortcuts for seamless vector creation. From precision pen tool path adjustment to instant alignment and color palette swatches, mastering keyboard hotkeys in Adobe Illustrator will accelerate your digital artwork output tenfold.</p>
        
        <h3>Essential Vector Drawing Shortcuts</h3>
        <ol>
          <li><strong>P</strong> – Pen Tool</li>
          <li><strong>Shift + C</strong> – Anchor Point Tool</li>
          <li><strong>A</strong> – Direct Selection Tool</li>
          <li><strong>V</strong> – Selection Tool</li>
          <li><strong>M</strong> – Rectangle Tool</li>
          <li><strong>L</strong> – Ellipse Tool</li>
          <li><strong>N</strong> – Pencil Tool</li>
          <li><strong>Shift + B</strong> – Blob Brush Tool</li>
          <li><strong>Shift + E</strong> – Eraser Tool</li>
          <li><strong>R</strong> – Rotate Tool</li>
        </ol>

        <h3>Artboard & Canvas Navigation</h3>
        <ol start="11">
          <li><strong>Shift + O</strong> – Artboard Tool</li>
          <li><strong>Cmd/Ctrl + 0</strong> – Fit Artboard in Window</li>
          <li><strong>Cmd/Ctrl + Alt + 0</strong> – Fit All in Window</li>
          <li><strong>Spacebar (Hold)</strong> – Hand Tool / Pan Canvas</li>
          <li><strong>Cmd/Ctrl + Y</strong> – Toggle Outline View Mode</li>
          <li><strong>Cmd/Ctrl + Shift + D</strong> – Show/Hide Transparency Grid</li>
          <li><strong>Cmd/Ctrl + U</strong> – Toggle Smart Guides</li>
          <li><strong>Cmd/Ctrl + "</strong> – Toggle Grid</li>
          <li><strong>Cmd/Ctrl + R</strong> – Show/Hide Rulers</li>
          <li><strong>Cmd/Ctrl + 5</strong> – Make Guides</li>
        </ol>
      `
    },
    {
      id: 3,
      cat: 'PHOTOSHOP',
      title: 'Master Adobe Photoshop: Top 100 Time-Saving Shortcuts',
      img: './blog-poster-3.jpg',
      content: `
        <p>Ever find yourself in the thick of a creative project? Boost your editing productivity with these essential Photoshop shortcuts. Whether you are retouching commercial portraits, compositing multi-layer digital art, or color grading cinema stills, shortcuts save hours of mouse movements.</p>

        <h3>Layer & Masking Essentials</h3>
        <ol>
          <li><strong>Cmd/Ctrl + Shift + N</strong> – Create New Layer</li>
          <li><strong>Cmd/Ctrl + J</strong> – Duplicate Selected Layer</li>
          <li><strong>Cmd/Ctrl + Shift + J</strong> – Layer via Cut</li>
          <li><strong>Cmd/Ctrl + E</strong> – Merge Selected Layers</li>
          <li><strong>Cmd/Ctrl + Shift + E</strong> – Merge Visible Layers</li>
          <li><strong>Cmd/Ctrl + Alt + Shift + E</strong> – Stamp Visible Layers</li>
          <li><strong>Cmd/Ctrl + G</strong> – Group Selected Layers</li>
          <li><strong>Cmd/Ctrl + Shift + G</strong> – Ungroup Layers</li>
          <li><strong>Cmd/Ctrl + Alt + G</strong> – Create Clipping Mask</li>
          <li><strong>D</strong> – Reset Colors to Default Black/White</li>
        </ol>
      `
    },
    {
      id: 4,
      cat: 'SOCIAL MEDIA',
      title: 'Exploring the Intersection of Multimedia and Social Media',
      img: './blog-poster-4.jpg',
      content: `
        <p>The significance of multimedia has further amplified the reach, engagement, and potential of modern digital brand campaigns. From micro-animations on Instagram Reels to high-fidelity 3D motion graphics on TikTok and YouTube Shorts, visual storytelling has transformed digital advertising into an immersive experience.</p>

        <h3>Key Trends in Social Media Visual Strategy</h3>
        <ul>
          <li><strong>Short-form Video Motion</strong>: 15-second animated infographics drive 3x higher retention.</li>
          <li><strong>3D Brand Assets</strong>: Hyper-realistic product renders enhance conversion rates on ad campaigns.</li>
          <li><strong>Dynamic Micro-Interactions</strong>: Custom Lottie animations increase app engagement metrics.</li>
        </ul>
      `
    },
    {
      id: 5,
      cat: 'COMPANY',
      title: 'Why should I opt for PRISM MULTIMEDIA to boost my career?',
      img: './blog-poster-5.jpg',
      content: `
        <p>Choosing the right institute or coaching is the first step for building a successful career in graphic design, motion graphics, and VFX. Prism Multimedia in Hyderabad stands out with 24+ years of industry experience, 100% placement support, certified master trainers, and hands-on live studio projects.</p>

        <h3>Key Highlights of Prism Multimedia</h3>
        <ul>
          <li><strong>24+ Years of Industry Leadership</strong>: Training over 15,000+ successful alumni placed at top MNCs & studios worldwide.</li>
          <li><strong>Live Studio Workflow</strong>: Practical training on real client projects with Adobe, Autodesk, & Unreal Engine pipelines.</li>
          <li><strong>Dedicated Placement Cell</strong>: 100% placement assistance with top design agencies, game studios, and IT firms.</li>
        </ul>
      `
    },
    {
      id: 6,
      cat: 'UI DESIGN',
      title: 'Motion Graphics in User Interface (UI) Design.',
      img: './blog-poster-6.jpg',
      content: `
        <p>Motion graphics play an important role in modern user interface (UI) design by making interactions fluid, intuitive, and visually captivating. Motion guides user attention, provides instant feedback, and enhances overall product usability across mobile apps and web platforms.</p>

        <h3>Core UI Motion Principles</h3>
        <ul>
          <li><strong>Easing & Timing</strong>: Custom cubic-bezier curves for natural element transitions.</li>
          <li><strong>Visual Feedback</strong>: Micro-animations on button clicks and state changes.</li>
          <li><strong>Spatial Orientation</strong>: Smooth slide and scale transitions for tab navigation.</li>
        </ul>
      `
    },
    {
      id: 7,
      cat: 'DESIGN',
      title: 'Top 10 Creative Skill to learn in 2023',
      img: './blog-poster-7.jpg',
      content: `
        <p>As digital usage has exponentially increased, creative skills have become paramount for modern digital careers. Here are the top 10 high-demand skills to master: Graphic Design, UI/UX Architecture, 3D Animation, Motion Design, VFX Compositing, Video Editing, Brand Storytelling, Prompt Engineering, Interactive Layouts, and Digital Painting.</p>
      `
    },
    {
      id: 8,
      cat: 'CAREER',
      title: 'Is Multimedia a Good Career Choice in 2023?',
      img: './blog-poster-8.jpg',
      content: `
        <p>In today's digital age, the demand for multimedia professionals has skyrocketed across media, tech, advertising, gaming, and creative industries. Career paths in multimedia offer high salary packages, creative freedom, global remote opportunities, and rapid career progression.</p>
      `
    },
    {
      id: 9,
      cat: 'DESIGN',
      title: 'Top 10 Qualities of Graphic Designer – What Makes You a Good Designer',
      img: './blog-poster-9.jpg',
      content: `
        <p>Graphic design is part of every human on this planet. Learn the essential qualities that distinguish top professional designers: Keen Eye for Detail, Mastery of Color Theory, Strong Typographic Sense, Problem-Solving Mindset, Adaptability, Communication Skills, Technical Proficiency, Curiosity, Time Management, and Passion for Creativity.</p>
      `
    },
    {
      id: 10,
      cat: 'INSIGHTS',
      title: 'Graphic Designing – Expectations Vs. Reality',
      img: './blog-poster-10.jpg',
      content: `
        <p>Recent years have seen significant demand for visual graphics, and understanding industry realities prepares you for real client work. Learn how to bridge the gap between creative artistic freedom and real-world commercial client expectations.</p>
      `
    },
    {
      id: 11,
      cat: 'PORTFOLIO',
      title: 'Mastering the Art of Portfolio Creation in the Design Industry',
      img: './blog-poster-11.jpg',
      content: `
        <p>Building an effective portfolio is crucial for any designer looking to showcase their work and secure top agency opportunities. A great portfolio highlights problem-solving processes, case studies, visual craft, and personal brand identity.</p>
      `
    },
    {
      id: 12,
      cat: 'MOTION GRAPHICS',
      title: 'The Evolution of Motion Graphics: From Cinema to Digital Media',
      img: './blog-poster-12.jpg',
      content: `
        <p>Motion graphics have transformed from simple cinematic opening titles into complex interactive visual storytelling across digital media, streaming platforms, broadcast television, and mobile applications.</p>
      `
    }
  ];

  const openModal = (postIndex) => {
    const post = blogPostsData[postIndex] || blogPostsData[0];
    catEl.textContent = post.cat;
    titleEl.textContent = post.title;
    contentEl.innerHTML = post.content;

    // Render Recent Posts Sidebar
    const recents = blogPostsData.filter((_, idx) => idx !== postIndex).slice(0, 4);
    recentEl.innerHTML = recents.map((r, rIdx) => `
      <div class="sidebar-recent-item" data-post-idx="${blogPostsData.indexOf(r)}">
        <img src="${r.img}" alt="${r.title}" class="sidebar-recent-img" />
        <div class="sidebar-recent-info">
          <h4>${r.title.length > 45 ? r.title.substring(0, 45) + '...' : r.title}</h4>
        </div>
      </div>
    `).join('');

    // Sidebar recent post click handlers
    recentEl.querySelectorAll('.sidebar-recent-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetIdx = parseInt(item.getAttribute('data-post-idx'), 10);
        openModal(targetIdx);
        modal.querySelector('.blog-reader-container').scrollTop = 0;
      });
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach click events to all blog card read-more buttons & cards
  const cards = document.querySelectorAll('.blog-card-item');
  cards.forEach((card, idx) => {
    const readMoreBtn = card.querySelector('.blog-read-more-btn');
    const posterWrap = card.querySelector('.blog-poster-wrap');
    const cardTitle = card.querySelector('.blog-card-title');

    [readMoreBtn, posterWrap, cardTitle].forEach(el => {
      if (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(idx);
        });
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  const knowMoreBtn = document.getElementById('blogSidebarKnowMore');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', () => {
      closeModal();
    });
  }
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

