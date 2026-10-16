// Central, editable business information.
// Leave a value as an empty string ("") when it is unknown: the website
// will simply hide that item. Never put guessed details here.

const BASE = import.meta.env.BASE_URL; // "/" locally, "/<repo>/" on GitHub Pages

const FULL_MENU_URL = 'https://sagarpatil199.github.io/Hotel-Ruchkar-Katta/';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Hotel+Ruchkar+Katta+Family+Restaurant+Sankeshwar';
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=hotel+ruchkar+katta+sankeshwar';

export const restaurantConfig = {
  // Identity
  name: 'Hotel Ruchkar Katta Family Restaurant',
  shortName: 'Hotel Ruchkar Katta',
  subtitle: 'FAMILY RESTAURANT',
  city: 'Sankeshwar',
  state: 'Karnataka',
  country: 'India',

  // Contact (leave empty until verified by the owner)
  address: '', // e.g. full street address
  phone: '+919535758777', // e.g. "+91 98765 43210"
  whatsappNumber: '+919535758777', // digits with country code, e.g. "919876543210"
  whatsappMessage: 'Hello Hotel Ruchkar Katta, I would like to know more about your menu.',
  openingHours: '12:30 PM – 3:30 PM, 7:00 PM – 11:00 PM', // e.g. "Daily, 11:00 AM - 11:00 PM"
  social: {
    instagram: 'https://www.instagram.com/ruchkarkatta/',
    facebook: '',
  },

  // Links
  fullMenuUrl: FULL_MENU_URL,
  googleMapsUrl: GOOGLE_MAPS_URL,
  googleReviewsUrl: GOOGLE_REVIEWS_URL,
  siteUrl: '', // final website address, once deployed

  // Reference values from the supplied Google listing (not live data)
  rating: 4.4,
  reviewCount: 413,
  priceRange: '₹200–₹400',

  // Brand logo (white on transparent, made from the supplied logo; shown on the dark green header)
  logo: {
    src: `${BASE}images/logo.png`,
    width: 520,
    height: 463,
    alt: 'Hotel Ruchkar Katta logo',
  },

  // Photographs (files live in /public/images)
  // Hero food visual. This is an illustrative image, not a photo of the restaurant's dish,
  // so it is labelled as such. Replace the files with your own dish photo when you have one.
  heroFood: {
    src: `${BASE}images/mutton-thali-hero.png`,
    srcWebp: `${BASE}images/mutton-thali-hero.webp`,
    width: 1019,
    height: 865,
    alt: 'Illustration of a mutton thali: mutton curry in a steel bowl with rice, flatbread, onions, lime and side curries on a banana leaf',
    note: 'Illustrative image',
  },
  // Real photographs of the restaurant entrance (Our Place section)
  placeImages: {
    day: {
      src: `${BASE}images/Festive Golden-Lit Venue Entrance.png`,
      srcWebp: `${BASE}images/Festive Golden-Lit Venue Entrance.webp`,
      width: 638,
      height: 480,
      alt: 'Daytime view of the Hotel Ruchkar Katta entrance, decorated with flowers, white drapes and wooden wheels',
    },
    night: {
      src: `${BASE}images/hotel-ruchkar-katta-exterior.png`,
      srcWebp: `${BASE}images/hotel-ruchkar-katta-exterior.webp`,
      width: 335,
      height: 597,
      alt: 'Hotel Ruchkar Katta Family Restaurant entrance at night, with its illuminated Kannada signboard',
    },
  },

  // Real kitchen / food-preparation photos. None have been supplied yet.
  // Add entries like { src, srcWebp, width, height, alt } and the "From the Kitchen"
  // section will use the first one instead of the illustrative image.
  kitchenImages: [],

  // Gallery: real photos first. Entries without `src` render as branded placeholders.
  gallery: [
    {
      id: 'night-exterior',
      src: `${BASE}images/hotel-ruchkar-katta-exterior.png`,
      width: 335,
      height: 597,
      alt: 'Hotel Ruchkar Katta Family Restaurant entrance at night, with its illuminated Kannada signboard',
      caption: 'The entrance at night',
      size: 'tall',
    },
    {
      id: 'day-exterior',
      src: `${BASE}images/Festive Golden-Lit Venue Entrance.png`,
      width: 638,
      height: 480,
      alt: 'Daytime view of the restaurant entrance decorated with flowers, white drapes and wooden wheels',
      caption: 'A daytime welcome',
      size: 'wide',
    },
    {
      id: 'food-interior',
      src: `${BASE}images/hotel-ruchkar-katta-food-interior.png`,
      width: 196,
      height: 258,
      alt: 'A thali served with curries and flatbread above, and the restaurant dining hall below',
      caption: 'Food and dining hall',
      size: 'column',
    },
    { id: 'placeholder-interior', placeholder: 'Interior photo coming soon', size: 'banner' },
    { id: 'placeholder-food', placeholder: 'Food photo coming soon', size: 'cell' },
  ],

  // Navigation
  nav: [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Heritage', href: '#cultures', id: 'cultures' },
    { label: 'Food', href: '#food', id: 'food' },
    { label: 'Menu', href: FULL_MENU_URL, external: true },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Visit', href: '#contact', id: 'contact' },
  ],
};

export const locationLabel = `${restaurantConfig.city}, ${restaurantConfig.state}`;

// Returns a working wa.me link only when a number is configured.
export function getWhatsappLink() {
  const digits = (restaurantConfig.whatsappNumber || '').replace(/\D/g, '');
  if (digits.length < 8) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(restaurantConfig.whatsappMessage)}`;
}

// Returns a tel: link only when a phone number is configured.
export function getPhoneLink() {
  const phone = (restaurantConfig.phone || '').replace(/[^\d+]/g, '');
  return phone ? `tel:${phone}` : '';
}
