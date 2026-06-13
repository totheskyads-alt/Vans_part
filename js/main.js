/* Vans Parts Midlands — shared JS */

(function () {
  'use strict';

  /* ---- Mobile hamburger ---- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Active nav link ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- Pill toggles (radiogroup) ---- */
  document.querySelectorAll('.pill-toggles').forEach(function (group) {
    var pills = group.querySelectorAll('.pill-toggle');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) {
          p.classList.remove('active');
          p.setAttribute('aria-checked', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-checked', 'true');
      });
    });
  });

  /* ---- Contact form ---- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      btn.style.background = '#16A34A';
      btn.style.borderColor = '#16A34A';
      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3500);
    });
  }
})();
