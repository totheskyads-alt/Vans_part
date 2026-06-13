(function () {
  // Version bump clears any old stored value from previous testing
  var CONSENT_KEY = 'cookieConsent_v1';

  // Migrate old key if present
  if (localStorage.getItem('cookieConsent') && !localStorage.getItem(CONSENT_KEY)) {
    localStorage.setItem(CONSENT_KEY, localStorage.getItem('cookieConsent'));
  }

  // Push consent choice to Google Consent Mode v2
  function applyConsent(consent) {
    var granted = (consent === 'accepted');
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage':         granted ? 'granted' : 'denied',
        'analytics_storage':  granted ? 'granted' : 'denied',
        'ad_user_data':       granted ? 'granted' : 'denied',
        'ad_personalization': granted ? 'granted' : 'denied'
      });
    }
  }

  // Already consented — apply stored choice to Consent Mode, don't show banner
  var storedConsent = localStorage.getItem(CONSENT_KEY);
  if (storedConsent) { applyConsent(storedConsent); return; }

  /* ---- Build banner ---- */
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;max-width:1320px;margin:0 auto;">' +
      '<div style="flex:1;min-width:260px;">' +
        '<div style="font-size:0.64rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#F5C518;margin-bottom:6px;">Your Privacy</div>' +
        '<p style="font-size:0.9rem;font-weight:600;color:#F0F0F0;margin:0 0 6px;line-height:1.5;">We use cookies to ensure our website works correctly and to understand how it is used.</p>' +
        '<p style="font-size:0.8rem;color:#C0C0C0;margin:0;line-height:1.6;">Essential cookies are always active. You can accept or decline optional analytics cookies. Read our <a href="cookies.html" style="color:#F5C518;text-decoration:underline;">Cookie Policy</a>.</p>' +
      '</div>' +
      '<div id="cookie-btns" style="display:flex;gap:12px;flex-shrink:0;flex-wrap:wrap;">' +
        '<button id="cookie-accept" style="background:#F5C518;color:#000;border:none;font-family:inherit;font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:13px 28px;border-radius:4px;cursor:pointer;white-space:nowrap;min-height:44px;">Accept All</button>' +
        '<button id="cookie-essential" style="background:#0d0d0d;color:#fff;border:2px solid #F5C518;font-family:inherit;font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:13px 28px;border-radius:4px;cursor:pointer;white-space:nowrap;min-height:44px;">Essential Only</button>' +
      '</div>' +
    '</div>';

  /* ---- Styles: start hidden, animate in ---- */
  Object.assign(banner.style, {
    position:   'fixed',
    bottom:     '0',
    left:       '0',
    right:      '0',
    zIndex:     '99999',
    background: '#1a1a1a',
    borderTop:  '1px solid rgba(245,197,24,0.2)',
    borderLeft: '3px solid #F5C518',
    padding:    '20px 32px',
    boxSizing:  'border-box',
    transform:  'translateY(100%)',
    opacity:    '0',
    transition: 'transform 0.4s ease, opacity 0.4s ease'
  });

  /* ---- Dismiss helper ---- */
  function dismiss(consent) {
    localStorage.setItem(CONSENT_KEY, consent);
    applyConsent(consent);
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity   = '0';
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 450);
  }

  /* ---- Inject & animate in after 1 s ---- */
  function show() {
    document.body.appendChild(banner);

    // Wire buttons
    var btnAccept    = document.getElementById('cookie-accept');
    var btnEssential = document.getElementById('cookie-essential');
    if (btnAccept)    btnAccept.addEventListener('click',    function () { dismiss('accepted'); });
    if (btnEssential) btnEssential.addEventListener('click', function () { dismiss('essential'); });

    // Trigger slide-up animation on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.style.transform = 'translateY(0)';
        banner.style.opacity   = '1';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(show, 1000); });
  } else {
    setTimeout(show, 1000);
  }
})();
