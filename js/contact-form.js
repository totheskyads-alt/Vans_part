/* Contact form → WhatsApp (static site, GitHub Pages).
   Builds a pre-filled WhatsApp message and opens a chat with Vans Parts Midlands.
   Anti-bot: hidden honeypot field + minimum fill-time check. */
(function () {
  var form = document.querySelector('form.contact-form');
  if (!form) return;

  var WHATSAPP = '447417555201';
  var loadedAt = Date.now();

  function val(name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot — if a bot filled the hidden field, stop silently.
    var hp = form.querySelector('[name="website_url"]');
    if (hp && hp.value.trim() !== '') return;

    // Time trap — ignore submissions faster than 2.5s (bots).
    if (Date.now() - loadedAt < 2500) return;

    // Basic required-field check (form uses novalidate).
    var required = ['name', 'phone', 'service', 'message'];
    for (var i = 0; i < required.length; i++) {
      var el = form.querySelector('[name="' + required[i] + '"]');
      if (el && !el.value.trim()) { el.focus(); return; }
    }

    var serviceSel = form.querySelector('[name="service"]');
    var service = (serviceSel && serviceSel.selectedOptions && serviceSel.selectedOptions.length)
      ? serviceSel.selectedOptions[0].text
      : val('service');

    var lines = [
      'New enquiry from vanspartsmidlands.co.uk',
      '',
      'Name: ' + val('name'),
      'Phone: ' + val('phone'),
      'Service: ' + service,
      'Van: ' + (val('van') || '-'),
      '',
      'Message:',
      val('message')
    ];

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });
})();
