import { useRef } from 'react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { runParallax, useGsap } from '../motion.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

// Section D: the real exterior photos (day and night) reveal as you scroll.
export default function Place() {
  const ref = useRef(null);

  useGsap(ref, (ctx) => {
    const { q, gsap } = ctx;
    const media = q('.place__media')[0];
    const scrub = (start, end) => ({ trigger: media, start, end, scrub: true });

    gsap.fromTo(
      q('.place__day .place__photo'),
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: scrub('top 90%', 'top 45%'),
      },
    );
    gsap.fromTo(
      q('.place__night .place__photo'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: scrub('top 70%', 'top 20%'),
      },
    );
    gsap.fromTo(
      q('.place__day img'),
      { scale: 1.25 },
      { scale: 1, ease: 'none', scrollTrigger: scrub('top bottom', 'bottom 40%') },
    );
    runParallax(ctx, '.place__media');
  });

  return (
    <section id="place" ref={ref} className="section place" aria-labelledby="place-title">
      <div className="container place__inner">
        <div className="place__media">
          <div className="place__day">
            <div className="place__photo">
              <Photo img={c.placeImages.day} />
            </div>
          </div>
          <div className="place__night" data-speed="-5">
            <div className="place__photo">
              <Photo img={c.placeImages.night} />
            </div>
          </div>
        </div>

        <div className="place__text">
          <p className="eyebrow" data-reveal="up">
            Our Place
          </p>
          <h2 id="place-title" className="section-title" data-reveal="words">
            <SplitWords text="A Place to Come Together." />
          </h2>
          <p className="place__lead" data-reveal="up">
            From the first glimpse of our entrance, by day or by night, {c.shortName} is made
            for family meals, easy conversation and time together.
          </p>
          <p data-reveal="up">
            <a className="btn btn--green btn--lg" href="#contact">
              Plan Your Visit
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
