import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Cultures from './components/Cultures.jsx';
import SignatureFood from './components/SignatureFood.jsx';
import Kitchen from './components/Kitchen.jsx';
import Place from './components/Place.jsx';
import Gallery from './components/Gallery.jsx';
import ReviewsSection from './components/ReviewsSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { restaurantConfig as c } from './config/restaurantConfig.js';
import { externalProps } from './utils.js';
import { refreshScrollTriggers, setupReveals, useGsap } from './motion.js';

// Which nav item is highlighted while each section is on screen.
const SECTION_NAV = {
  home: 'home',
  cultures: 'cultures',
  food: 'food',
  kitchen: 'food',
  place: 'gallery',
  gallery: 'gallery',
  reviews: 'reviews',
  contact: 'contact',
};

export default function App() {
  const rootRef = useRef(null);
  const [activeId, setActiveId] = useState('home');

  // Shared scroll reveals (data-reveal attributes). Skipped for reduced motion.
  useGsap(rootRef, setupReveals);

  // Highlights the nav item of the section currently in view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(SECTION_NAV[entry.target.id]);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    Object.keys(SECTION_NAV).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll positions depend on image and font sizes, so recalculate once they are ready.
  useEffect(() => {
    const refresh = () => refreshScrollTriggers();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header activeId={activeId} />
      <main id="main">
        <Hero />
        <Cultures />
        <SignatureFood />
        <Kitchen />
        <Place />
        <Gallery />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Mobile-only menu shortcut */}
      <a className="mobile-menu-cta" href={c.fullMenuUrl} {...externalProps}>
        <MenuIcon size={18} aria-hidden="true" />
        View Menu
      </a>
    </div>
  );
}
