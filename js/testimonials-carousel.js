(function () {
  function initReviewCarousel() {
    if (window.innerWidth > 768) return;

    var grid = document.querySelector('.reviews-grid');
    if (!grid || grid.dataset.mobCarousel) return;
    grid.dataset.mobCarousel = '1';

    var cards = Array.from(grid.querySelectorAll('.t-card-lg'));
    if (cards.length < 2) return;

    var current = 0;

    /* ---- build DOM ---- */
    var wrapper = document.createElement('div');
    wrapper.className = 'mob-carousel';

    var viewport = document.createElement('div');
    viewport.className = 'mob-carousel-viewport';

    var track = document.createElement('div');
    track.className = 'mob-carousel-track';

    cards.forEach(function (card) {
      var slide = document.createElement('div');
      slide.className = 'mob-carousel-slide';
      slide.appendChild(card);
      track.appendChild(slide);
    });

    viewport.appendChild(track);

    /* arrows */
    function arrow(label, svgPath) {
      var btn = document.createElement('button');
      btn.className = 'mob-carousel-arrow';
      btn.setAttribute('aria-label', label);
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="' + svgPath + '"></polyline></svg>';
      return btn;
    }
    var prev = arrow('Previous review', '15 18 9 12 15 6');
    var next = arrow('Next review',     '9 18 15 12 9 6');

    /* dots */
    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'mob-carousel-dots';
    var dots = cards.map(function (_, i) {
      var d = document.createElement('button');
      d.className = 'mob-carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Review ' + (i + 1));
      d.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(d);
      return d;
    });

    /* nav row */
    var nav = document.createElement('div');
    nav.className = 'mob-carousel-nav';
    nav.appendChild(prev);
    nav.appendChild(dotsWrap);
    nav.appendChild(next);

    wrapper.appendChild(viewport);
    wrapper.appendChild(nav);

    /* replace grid */
    grid.parentNode.insertBefore(wrapper, grid);
    grid.style.display = 'none';

    /* ---- logic ---- */
    function goTo(n) {
      current = ((n % cards.length) + cards.length) % cards.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    prev.addEventListener('click', function () { goTo(current - 1); });
    next.addEventListener('click', function () { goTo(current + 1); });

    /* swipe support */
    var startX = 0;
    viewport.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewCarousel);
  } else {
    initReviewCarousel();
  }
})();
