# FreshPhool — React exact component migration

This project converts the HTML pages from the original FreshPhool `site/` directory into React components while preserving the original DOM structure, classes, inline styles, asset paths, CSS and legacy JavaScript behavior.

## Important design rule

The original CSS and JS are retained intentionally. Rewriting the visual system into Tailwind utilities would risk changing spacing, alignment, typography, breakpoints, animations or browser behavior. Tailwind is installed and available for future additions, but the existing storefront is not restyled.

## Run

```bash
npm install
npm run dev
```

## Main entry

`src/index.ts` is the application entry point.

## Components

Every top-level element in each original HTML body is represented by a named React component in `src/components/pages/`. There are no storefront HTML pages under `public/`. Only the original runtime assets (`css`, `js`, `images`) remain there because the existing CSS/JS references them directly.

## Routing

The original `.html` URLs are retained, e.g. `/daily-flowers.html`, `/puja.html`, `/garlands.html`, `/delivery.html`, so links continue to behave like the original site.
