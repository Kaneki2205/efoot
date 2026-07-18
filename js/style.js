/* ============================================
   AL-BAWABA — Main JavaScript
   Form Handler | Live Clock | Navbar | Scroll FX
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initLiveClock();
  initContactForm();
});


/* ------------------------------------------
   NAVBAR — Scroll effect
   ------------------------------------------ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Check initial state
}


/* ------------------------------------------
   MOBILE MENU — Hamburger toggle
   ------------------------------------------ */
function initMobileMenu() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close mobile menu when a link is clicked
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


/* ------------------------------------------
   SCROLL ANIMATIONS — Fade-in on intersection
   ------------------------------------------ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ------------------------------------------
   LIVE CLOCK — Morocco Time (UTC+1)
   ------------------------------------------ */
function initLiveClock() {
  const clockEl = document.querySelector('.live-clock');
  if (!clockEl) return;

  const timeEl = clockEl.querySelector('.live-clock__time');
  if (!timeEl) return;

  function updateClock() {
    const now = new Date();

    // Convert to Morocco timezone (UTC+1 / Africa/Casablanca)
    const moroccoTime = new Date(now.toLocaleString('en-US', {
      timeZone: 'Africa/Casablanca'
    }));

    const hours = String(moroccoTime.getHours()).padStart(2, '0');
    const minutes = String(moroccoTime.getMinutes()).padStart(2, '0');
    const seconds = String(moroccoTime.getSeconds()).padStart(2, '0');

    timeEl.textContent = `${hours}:${minutes}:${seconds} — Morocco`;
  }

  // Show clock after a short delay
  setTimeout(() => {
    clockEl.classList.add('visible');
    updateClock();
    setInterval(updateClock, 1000);
  }, 800);
}


/* ------------------------------------------
   CONTACT FORM — Prevent default, show success
   ------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successEl = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');

    if (name && !name.value.trim()) {
      name.focus();
      return;
    }

    if (email && !email.value.trim()) {
      email.focus();
      return;
    }

    // Hide form, show success
    form.style.display = 'none';
    if (successEl) {
      successEl.classList.add('visible');
    }
  });
}