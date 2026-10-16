import { Star } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';

function StarRating({ value }) {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (fill) =>
    [0, 1, 2, 3, 4].map((n) => (
      <Star key={n} size={30} fill={fill ? 'currentColor' : 'none'} aria-hidden="true" />
    ));
  return (
    <div className="stars" role="img" aria-label={`Rated ${value} out of 5 stars`}>
      <div className="stars__row stars__row--empty">{row(false)}</div>
      <div className="stars__row stars__row--full" style={{ width: `${percent}%` }}>
        {row(true)}
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-title">
      <div className="container reviews__inner" data-reveal="up">
        <p className="eyebrow eyebrow--light">Google Reviews</p>
        <h2 id="reviews-title" className="section-title section-title--light">
          Loved by <span className="gold">Our Guests</span>
        </h2>

        <div className="reviews__score">
          <span className="reviews__number">{c.rating}</span>
          <StarRating value={c.rating} />
        </div>
        <p className="reviews__count">Based on {c.reviewCount} Google reviews</p>

        <a className="btn btn--gold btn--lg" href={c.googleReviewsUrl} {...externalProps}>
          Read Reviews on Google
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <p className="reviews__note">
          Rating and review count come from the restaurant's Google listing at the time this
          website was prepared and may have changed. This website is not affiliated with or
          endorsed by Google.
        </p>
      </div>
    </section>
  );
}
