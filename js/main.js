/* ============================================================
   BLUE STAR LAWN SERVICES — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Header scroll effect ---- */
  const header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav   = document.getElementById('main-nav');

  navToggle.addEventListener('click', function () {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Smooth active nav highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('#main-nav a[href^="#"]');

  function highlightNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= 90) current = sec.id;
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active-link', href === current);
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ---- Contact form submission (front-end placeholder) ---- */
  const contactForm    = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  const contactError   = document.getElementById('contact-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactSuccess.hidden = true;
      contactError.hidden   = true;

      const name    = contactForm.querySelector('#cf-name').value.trim();
      const phone   = contactForm.querySelector('#cf-phone').value.trim();
      const address = contactForm.querySelector('#cf-address').value.trim();

      if (!name || !phone || !address) {
        contactError.hidden = false;
        contactError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      /*
       * TODO: Wire up to a form backend or email service here.
       * Options: Formspree, EmailJS, Netlify Forms, or a custom endpoint.
       * For now we show a success message.
       */
      contactSuccess.hidden = false;
      contactForm.reset();
      contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---- Pay-notify form (email capture placeholder) ---- */
  const payNotifyForm = document.getElementById('pay-notify-form');
  const notifySuccess = document.getElementById('notify-success');

  if (payNotifyForm) {
    payNotifyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = payNotifyForm.querySelector('#notify-email').value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

      /*
       * TODO: Send email to your mailing list / CRM here.
       * Options: Mailchimp embedded form, ConvertKit, or your backend.
       */
      notifySuccess.hidden = false;
      payNotifyForm.querySelector('#notify-email').value = '';
    });
  }

  /* ---- Pay phone button: replace placeholder number ---- */
  // Update the href when you have a real phone number.
  // Example: document.getElementById('pay-phone-btn').href = 'tel:+12145550100';

  /* ---- Animate cards on scroll (Intersection Observer) ---- */
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.service-card, .pay-card, .contact-form');

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(function (card) {
      card.classList.add('fade-in');
      observer.observe(card);
    });
  }

})();
