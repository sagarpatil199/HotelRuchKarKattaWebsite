import { useRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';
import { runParallax, useGsap } from '../motion.js';
import SplitWords from './SplitWords.jsx';
import { BananaLeaf, Fort, Gopuram, Palm } from './HeritageArt.jsx';

// Section A: two heritage scenes that slide together as you scroll.
export default function Cultures() {
  const ref = useRef(null);

  useGsap(ref, (ctx) => {
    const { q, wide, gsap } = ctx;
    const grid = q('.cultures__grid')[0];
    const south = q('.cultures__panel--south')[0];
    const maha = q('.cultures__panel--maha')[0];

    if (wide) {
      // The two panels converge as the section scrolls into view (scrubbed, never pinned).
      const trigger = { trigger: grid, start: 'top 95%', end: 'top 45%', scrub: true };
      gsap.fromTo(
        south,
        { xPercent: -12, opacity: 0.15 },
        { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: trigger },
      );
      gsap.fromTo(
        maha,
        { xPercent: 12, opacity: 0.15 },
        { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: trigger },
      );
      gsap.fromTo(
        q('.cultures__seam'),
        { scale: 0.3, rotation: -120, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: grid, start: 'top 75%', end: 'top 40%', scrub: true },
        },
      );
    } else {
      // Phones: a simple fade-and-rise per panel.
      [south, maha].forEach((panel) => {
        gsap.from(panel, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 90%', once: true },
        });
      });
    }

    runParallax(ctx, '.cultures__panel');
  });

  return (
    <section id="cultures" ref={ref} className="cultures" aria-labelledby="cultures-title">
      <div className="container">
        <div className="cultures__head">
          <p className="eyebrow eyebrow--light" data-reveal="up">
            Heritage
          </p>
          <h2 id="cultures-title" className="section-title section-title--light" data-reveal="words">
            <SplitWords text="Two Cultures, One Table." />
          </h2>
          <p className="section-lead cultures__lead" data-reveal="up">
            {c.shortName} is a family restaurant in {c.city}, inspired by the South Indian and
            Maharashtrian traditions that meet in this region.
          </p>
        </div>

        <div className="cultures__grid">
          <article className="cultures__panel cultures__panel--south">
            <div className="cultures__art" aria-hidden="true">
              <span className="cultures__glow" />
              <Gopuram className="art cultures__gopuram" data-speed="7" />
              <Palm className="art cultures__palm" data-speed="4" />
              <Palm className="art cultures__palm cultures__palm--b" data-speed="9" />
              <BananaLeaf className="art cultures__leaf" data-speed="-4" />
            </div>
            <div className="cultures__text">
              <p className="eyebrow eyebrow--light">South India</p>
              <h3>Temple towns, tropical green.</h3>
              <p>
                Gopuram skylines, banana leaves and coconut palms: the warm, earthy side of the
                table.
              </p>
            </div>
          </article>

          <article className="cultures__panel cultures__panel--maha">
            <div className="cultures__art" aria-hidden="true">
              <span className="cultures__glow cultures__glow--sun" />
              <Fort className="art cultures__fort" data-speed="6" />
            </div>
            <div className="cultures__text">
              <p className="eyebrow eyebrow--light">Maharashtra</p>
              <h3>Hill forts, saffron skies.</h3>
              <p>
                Historic forts, saffron flags and the bold colours of regional spice: the rustic
                side of the table.
              </p>
            </div>
          </article>

          <span className="cultures__seam" aria-hidden="true">
            ×
          </span>
        </div>

        <div className="cultures__close" data-reveal="up">
          <p>Two traditions, one welcome. Come share a meal with us in {c.city}.</p>
          <a className="btn btn--gold btn--lg" href={c.fullMenuUrl} {...externalProps}>
            <UtensilsCrossed size={18} aria-hidden="true" />
            Explore Our Menu
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
