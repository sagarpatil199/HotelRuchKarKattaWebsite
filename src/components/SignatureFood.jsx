import { CookingPot, Fish, Flame, Wheat } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

// The categories below are the ones printed on the restaurant's signboard
// ("Maharashtrian Thali · North Indian · Sea Food · Tandoor · Biryani").
// No dish names or prices are invented: the menu website is the source of truth.
const categories = [
  { title: 'North Indian', text: 'Familiar North Indian dishes for the table.', Icon: CookingPot },
  { title: 'Sea Food', text: 'For those who love sea food.', Icon: Fish },
  { title: 'Tandoor', text: 'Tandoor dishes made for sharing.', Icon: Flame },
  { title: 'Biryani', text: 'Biryani, a meal in itself.', Icon: Wheat },
];

export default function SignatureFood() {
  return (
    <section id="food" className="section food" aria-labelledby="food-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal="up">
            Signature Food
          </p>
          <h2 id="food-title" className="section-title" data-reveal="words">
            <SplitWords text="Plates Worth Sharing." />
          </h2>
          <p className="section-lead" data-reveal="up">
            These are the kinds of food listed on our signboard. For dishes, availability and
            prices, the menu always has the latest word.
          </p>
        </div>

        <ul className="food__grid" data-reveal="stagger">
          <li className="food-card food-card--feature">
            <div className="food-card__media">
              <Photo img={c.heroFood} />
              <span className="media-tag">Illustrative image</span>
            </div>
            <div className="food-card__body">
              <p className="food-card__tag">On our signboard</p>
              <h3>Maharashtrian Thali</h3>
              <p>A full plate to share around the table.</p>
            </div>
          </li>

          {categories.map(({ title, text, Icon }) => (
            <li key={title} className="food-card">
              <span className="food-card__icon">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <p className="food-card__tag">On our signboard</p>
            </li>
          ))}
        </ul>

        <p className="food__cta" data-reveal="up">
          <a className="btn btn--green btn--lg" href={c.fullMenuUrl} {...externalProps}>
            View Full Menu
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
