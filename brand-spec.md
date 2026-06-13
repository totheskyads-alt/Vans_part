# Brand Spec — Vans Parts Midlands

Extracted from logo (mpljfva6) and workshop photo (mpljfva8).

## System summary
Jet-black automotive canvas, signal-red accent at `#CC1010`, clean white type. Bold condensed display (Oswald), system sans body. Feels like a professional UK garage, not a generic website template.

## Color tokens

```css
:root {
  --bg:           #0A0A0A;   /* near-black — hero and footer backgrounds */
  --surface:      #141414;   /* slightly lifted dark — cards, nav */
  --surface-alt:  #1C1C1C;   /* mid dark — hover states, alternating sections */
  --bg-light:     #F5F5F5;   /* light sections (Why Us, Parts categories) */
  --fg:           #FFFFFF;   /* primary text on dark */
  --fg-muted:     #AAAAAA;   /* secondary text on dark */
  --fg-dark:      #111111;   /* primary text on light */
  --fg-dark-muted:#666666;   /* secondary text on light */
  --border:       #2A2A2A;   /* dark section borders */
  --border-light: #E0E0E0;   /* light section borders */
  --accent:       #CC1010;   /* logo red — CTAs, highlights, top borders */
  --accent-dark:  #A80D0D;   /* pressed/active state */
  --accent-hover: #E81414;   /* hover state */
}
```

## Typography
- **Display:** `'Oswald', 'Arial Narrow', Arial, sans-serif` — condensed, bold, uppercase-friendly; matches the logo's PARTS letterform weight
- **Body:** `'Inter', system-ui, sans-serif`

## Layout posture
- Dark-dominant: majority of page is black/dark-grey; white sections are deliberate contrast moments
- Red used sparingly: top-border accents on hover cards, CTA buttons, eyebrow labels. Never as a large fill.
- Cards: dark bg `#141414`, 1px border `#2A2A2A`, red top-border on hover (3px scaleX transition)
- Buttons: red filled primary, green WhatsApp, ghost outline on dark sections
- Zero border-radius on primary CTAs (angular = confident, automotive). Moderate radius (10px) on cards and form fields.
- Section alternation: dark hero → red stats bar → dark services grid → light why-us → dark testimonials → dark cta → dark footer
