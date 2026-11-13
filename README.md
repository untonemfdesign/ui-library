# UI library

Interactive benefit-card playground: desktop hover, mobile press, presets, timing and easing controls, CSS export.

## Run locally
Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Production build
```sh
npm run build
npm run preview
```
Static output is in `dist/`. Relative asset paths support GitHub Pages project URLs.

## Files
- `App.jsx`: cards, pointer/keyboard handling, settings and CSS export.
- `styles.css`: neutral library shell and MegaFon card styles.
- `icon-0.svg` … `icon-4.svg`: original card icons.

Defaults: hover 1.012 / 180ms, press 0.985 / 90ms, return 220ms. Reduced motion is respected. Icons sit 16px from the left and bottom edges.

This is a motion prototype, not the official design system. Arial substitutes for MegaFon Graphik LC. Physical mobile-device verification is still needed before production integration.
