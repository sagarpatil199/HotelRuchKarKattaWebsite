# Hotel Ruchkar Katta Family Restaurant — Website

A static React + Vite website for Hotel Ruchkar Katta Family Restaurant, Sankeshwar,
Karnataka. It introduces the restaurant and sends visitors to the existing digital menu:
<https://sagarpatil199.github.io/Hotel-Ruchkar-Katta/>

No backend, database, paid API or external API call is needed. Fonts (Playfair Display and
Inter) are bundled locally.

## Run it

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## IMPORTANT: do not deploy over the menu website

Your digital menu already lives at `https://sagarpatil199.github.io/Hotel-Ruchkar-Katta/`,
which is served by a repository named **Hotel-Ruchkar-Katta**. A GitHub Pages site for a
repository uses exactly that address, so deploying this project into the same repository
would **replace the menu**.

Use a **new repository** for this website, for example `Ruchkar-Katta-Website`. Its address
will then be `https://sagarpatil199.github.io/Ruchkar-Katta-Website/`. (Alternatively use a
custom domain later.) The menu buttons keep pointing at the existing menu URL.

## Photos

The three supplied photographs are in `public/images/` and are used unchanged:

| File | Where it appears |
| --- | --- |
| `mutton-thali-hero.png` / `.webp` | Hero food visual (cropped from the supplied hero artwork; illustrative, not a photo of your dish) |
| `hotel-ruchkar-katta-exterior.png` / `.webp` | "Our Place" section and first gallery photo (night entrance) |
| `hotel-ruchkar-katta-daytime.png` / `.webp` | "Our Place" section and gallery |
| `hotel-ruchkar-katta-food-interior.png` | Gallery |

To replace a photo, overwrite the file with the same name, or edit the paths in
`src/config/restaurantConfig.js` (`heroFood`, `placeImages`, `gallery`).

The supplied images are small (the night photo is 335 × 597 px). They look fine at the sizes
used, but please swap in higher-resolution originals (1600 px wide or more) when you have
them. The food/dining collage is the smallest and also carries a small icon from its original
source; replace it with your own photos when possible.

To add gallery photos: copy the image into `public/images/`, then add an entry to the
`gallery` list in `restaurantConfig.js` (give it `src`, `width`, `height`, `alt`,
`caption`). The two dashed "coming soon" tiles are placeholders. Replace them by giving the
entries a `src` and removing `placeholder`.

## Update business details

Everything editable is in `src/config/restaurantConfig.js`:

- `fullMenuUrl`: the menu website used by every menu button
- `phone`, `whatsappNumber`, `address`, `openingHours`: leave empty until verified. Items
  with an empty value are hidden, and no WhatsApp link is created without a number
  (`whatsappNumber` format: digits with country code, e.g. `919876543210`)
- `googleMapsUrl`, `googleReviewsUrl`: swap in the direct Google Maps listing link when you
  have it
- `rating`, `reviewCount`, `priceRange`: reference values from the Google listing, not live
  data. Update them occasionally.

Before launch also: edit the canonical URL, `og:image` and the structured data (JSON-LD) in
`index.html`, and replace `YOUR-SITE-URL` in `public/sitemap.xml` and `public/robots.txt`.

## Deploy to GitHub Pages

1. Create a new repository (see the warning above) and push this project to its `main` branch.
2. In the repository go to **Settings → Pages**, and under **Build and deployment** set
   **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). The workflow in
   `.github/workflows/deploy.yml` builds the site with the correct base path
   (`/<repository-name>/`) and publishes it.
4. Open the address shown at the end of the workflow run and check it.

Manual build for a given repository name:

```bash
VITE_BASE=/Ruchkar-Katta-Website/ npm run build
```

## Troubleshooting

- **Blank page / 404 for JS and CSS files on Pages:** the base path is wrong. The workflow
  sets it from the repository name; for manual builds set `VITE_BASE=/<repo-name>/`.
- **Images missing after deploy:** file names are case-sensitive on Pages. Check that the
  name in `restaurantConfig.js` matches the file in `public/images/` exactly.
- **Workflow fails at `npm ci`:** commit `package-lock.json` (created by `npm install`).
- **Pages shows the README instead of the site:** Source is not set to **GitHub Actions**.
- **Menu replaced by this site:** you deployed into the menu repository. Restore the menu
  from that repository's history and use a separate repository for this website.

## Project structure

```
public/            favicon, robots.txt, sitemap.xml, images/
src/components/    one file per page section
src/config/        restaurantConfig.js (all editable details)
src/styles/        global.css
src/App.jsx, main.jsx, utils.js
```

## Hero steam animation

The hero food visual is `src/components/HeroFoodVisual.jsx` with its styles in
`HeroFoodVisual.css`. The steam, floating spices, glow and gentle float are pure CSS and are
turned off automatically for visitors who prefer reduced motion. Steam and spice positions are
percentages near the top of the CSS file; if you swap in a different dish photo, adjust the
`--x` values of the four steam wisps so they sit above the curry bowl. The photo is labelled
"Illustrative image" because it is not a photograph of the restaurant's dish; remove the
`note` in `restaurantConfig.js` only if you replace it with a real photo of your own dish.

## Cinematic page structure and animation

Sections, in order: Hero, Heritage ("Two Cultures, One Table"), Signature Food, From the
Kitchen, Our Place, Gallery, Reviews, Visit. The heritage scenes (gopuram, palms, banana leaf,
fort with saffron flag) are original vector illustrations in `src/components/HeritageArt.jsx`.

- Scroll animation uses **GSAP + ScrollTrigger** (the only added dependency, about 30 KB
  gzipped). Helpers are in `src/motion.js`; every animation is created inside a GSAP
  context and is reverted automatically when a component unmounts.
- Nothing pins or hijacks scrolling. Animations are scrubbed to the normal scroll position.
- Steam, floating spices, glow and the flag are plain CSS.
- With "reduce motion" turned on, no GSAP animation runs and all content is visible. On
  phones the effects are simplified (no pointer tilt, gentler parallax, fewer particles).
- Add `data-reveal="up" | "words" | "stagger"` to any element to give it a scroll reveal.

### Honest imagery

- The thali image and the close-up in "From the Kitchen" are illustrative and labelled
  "Illustrative image". No kitchen photos were supplied; add yours to `kitchenImages` in
  `restaurantConfig.js` and that section will use them (and drop the label).
- The Signature Food cards (Maharashtrian Thali, North Indian, Sea Food, Tandoor, Biryani) come
  from the restaurant signboard. Please confirm this list; the menu stays the source of
  truth and no dish names or prices are shown.
