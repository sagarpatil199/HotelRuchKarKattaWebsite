import { useRef } from 'react';
import { ChefHat, HeartHandshake, UtensilsCrossed } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { useGsap } from '../motion.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

const points = [
  { Icon: ChefHat, text: 'Prepared for the table' },
  { Icon: UtensilsCrossed, text: 'Rooted in regional taste' },
  { Icon: HeartHandshake, text: 'Shared with family and friends' },
];

// Section C. No real kitchen photos have been supplied, so until the owner adds some
// (restaurantConfig.kitchenImages) this uses the illustrative thali image, labelled as such.
export default function Kitchen() {
  const ref = useRef(null);
  const real = c.kitchenImages[0];
  const img = real || { ...c.heroFood, alt: 'Illustration: close view of mutton curry in a steel bowl' };

  useGsap(ref, ({ q, gsap }) => {
    const frame = q('.kitchen__frame')[0];
    // Cinematic wipe reveal, tied to scroll position (the page is never pinned).
    gsap.fromTo(
      frame,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top 88%', end: 'top 40%', scrub: true },
      },
    );
    gsap.fromTo(
      q('.kitchen__frame img'),
      { scale: 1.55 },
      {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  return (
    <section id="kitchen" ref={ref} className="section kitchen" aria-labelledby="kitchen-title">
      <div className="container kitchen__inner">
        <div className="kitchen__text">
          <p className="eyebrow eyebrow--light" data-reveal="up">
            Our Kitchen
          </p>
          <h2 id="kitchen-title" className="section-title section-title--light" data-reveal="words">
            <SplitWords text="From the Kitchen." />
          </h2>
          <p className="kitchen__lead" data-reveal="up">
            Every plate is made to be shared. Come hungry, bring your people and take your time.
          </p>
          <ul className="kitchen__points" data-reveal="stagger">
            {points.map(({ Icon, text }) => (
              <li key={text}>
                <Icon size={20} aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="kitchen__figure">
          <div className="kitchen__frame">
            <Photo img={img} />
            {!real && <span className="media-tag">Illustrative image</span>}
          </div>
        </figure>
      </div>
    </section>
  );
}
