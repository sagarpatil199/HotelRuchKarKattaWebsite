# Restaurant photographs

These are the original photographs supplied by the owner. They are used as-is
(no editing); all cropping is done in CSS.

| File | Used for |
| --- | --- |
| `hotel-ruchkar-katta-exterior.png` | Hero image and first gallery photo (night exterior with signboard) |
| `hotel-ruchkar-katta-daytime.png` | "Our Story" section and gallery (daytime entrance) |
| `hotel-ruchkar-katta-food-interior.png` | Gallery (food and dining hall collage, low resolution) |

## Replacing a photo

Overwrite the file with a new one that has the **same file name**, or change the
path in `src/config/restaurantConfig.js` (`heroFood`, `placeImages`, `gallery`).

Higher-resolution originals (ideally 1600px wide or more) will look noticeably
sharper than these small copies. Please use only photographs you own or have
permission to use.

Each photo also has a `.webp` copy (same content, smaller file) that browsers use first; the
`.png` is the fallback. If you replace a photo, replace both (or remove the `srcWebp` line for
that photo in `src/config/restaurantConfig.js`).
