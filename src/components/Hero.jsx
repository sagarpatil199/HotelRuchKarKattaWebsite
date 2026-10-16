import { useRef } from 'react';
import { MapPin, Star, UtensilsCrossed } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';
import { useGsap } from '../motion.js';
import SplitWords from './SplitWords.jsx';
import HeroFoodVisual from './HeroFoodVisual.jsx';
import { BananaLeaf, Fort, Gopuram, Palm } from './HeritageArt.jsx';

export default function Hero() {
  const ref = useRef(null);

  useGsap(ref, ({ q, wide, gsap }) => {
    const hero = ref.current;
    const stage = q('.food-visual__stage')[0];
    gsap.set(stage, { transformPerspective: 1100 });

    // Intro sequence: sky -> heritage layers -> headline -> thali -> buttons
    let introDone = false;
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        introDone = true;
      },
    });
    tl.from(q('[data-hero="sky"]'), { opacity: 0, duration: 1.1, ease: 'power2.out' })
      .from(q('[data-hero="layer"]'), { opacity: 0, y: 36, duration: 1.3, stagger: 0.12 }, 0.15)
      .from(q('[data-hero="eyebrow"]'), { opacity: 0, y: 12, duration: 0.7 }, 0.55)
      .from(
        q('.hero__title .split__inner'),
        { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.1 },
        0.7,
      )
      .from(
        stage,
        {
          scale: 0.86,
          opacity: 0,
          rotationY: wide ? -16 : 0,
          rotationX: wide ? 7 : 0,
          y: 30,
          duration: 1.5,
        },
        0.95,
      )
      .from(q('[data-hero="fade"]'), { opacity: 0, y: 16, duration: 0.8, stagger: 0.12 }, 1.25)
      .from(q('[data-hero="cta"] > *'), { opacity: 0, y: 16, duration: 0.7, stagger: 0.12 }, 1.65);

    // Heritage layers drift at different speeds as the page scrolls (far = slowest).
    q('[data-speed]').forEach((el) => {
      gsap.to(el, {
        yPercent: parseFloat(el.dataset.speed) * (wide ? 1 : 0.5),
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    // Subtle 3D tilt that follows the pointer (mouse devices on wide screens only).
    if (wide && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const rotX = gsap.quickTo(stage, 'rotationX', { duration: 0.9, ease: 'power3.out' });
      const rotY = gsap.quickTo(stage, 'rotationY', { duration: 0.9, ease: 'power3.out' });
      const onMove = (e) => {
        if (!introDone) return;
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        rotY(nx * 8);
        rotX(-ny * 6);
      };
      hero.addEventListener('pointermove', onMove);
      return () => hero.removeEventListener('pointermove', onMove);
    }
    return undefined;
  });

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__sky" data-hero="sky" aria-hidden="true" />

      {/* Heritage scene: South Indian temple and palms on the left, a Maharashtrian
          fort with a saffron flag on the right. Original vector illustrations. */}
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__sun" data-hero="layer" data-speed="14" />
        <Fort className="art hero__fort" data-hero="layer" data-speed="8" />
        <Gopuram className="art hero__gopuram" data-hero="layer" data-speed="8" />
        <Palm className="art hero__palm" data-hero="layer" data-speed="4" />
        <BananaLeaf className="art hero__leaf" data-hero="layer" data-speed="2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light" data-hero="eyebrow">
            South India × Maharashtra
          </p>
          <h1 id="hero-title" className="hero__title">
            <SplitWords text="Two Cultures." />
            <br />
            <SplitWords text="One Taste." className="gold" />
          </h1>
          <p className="hero__lead" data-hero="fade">
            Discover the rich flavours of South India and Maharashtra at {c.shortName},{' '}
            {c.city}.
          </p>

          <p className="hero__meta" data-hero="fade">
            <span className="hero__rating">
              <Star size={16} fill="currentColor" aria-hidden="true" />
              <strong>{c.rating}</strong>
            </span>
            <span className="hero__divider" aria-hidden="true">
              |
            </span>
            <span>{c.reviewCount} Google reviews</span>
            {c.priceRange && (
              <>
                <span className="hero__divider" aria-hidden="true">
                  |
                </span>
                <span>{c.priceRange} approx.</span>
              </>
            )}
          </p>

          <div className="hero__actions" data-hero="cta">
            <a className="btn btn--gold btn--lg" href={c.fullMenuUrl} {...externalProps}>
              <UtensilsCrossed size={18} aria-hidden="true" />
              View Full Menu
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn--outline-light btn--lg" href={c.googleMapsUrl} {...externalProps}>
              <MapPin size={18} aria-hidden="true" />
              Find Us on Google Maps
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <HeroFoodVisual food={c.heroFood} />
      </div>
    </section>
  );
}
