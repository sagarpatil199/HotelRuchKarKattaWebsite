import { hideBrokenImage } from '../utils.js';
import './HeroFoodVisual.css';

// Decorative leaf and chili shapes (inline SVG, no external assets).
function Leaf({ className }) {
  return (
    <svg className={`spice ${className}`} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 29C15 22 14 18 10 15C6 16 3 13 4 9C7 9 9 10 10 12C9 8 11 4 15 3C16 6 16 9 16 11C17 8 19 5 23 5C24 9 22 12 20 14C24 13 28 15 28 19C24 20 21 19 19 17C20 21 18 25 16 29Z"
        fill="#74b24f"
      />
      <path d="M16 28V12" stroke="#3f7a2e" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Chili({ className }) {
  return (
    <svg className={`spice ${className}`} viewBox="0 0 48 24" aria-hidden="true" focusable="false">
      <path d="M3 20C14 22 30 18 40 8C42 6 44 4 46 3C45 7 44 10 42 13C34 22 16 26 3 20Z" fill="#c62a1f" />
      <path d="M40 8C42 5 44 3 46 2" stroke="#4e7a32" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Hero food visual: image + warm glow + CSS-only steam + a few spice accents.
 * Every animated layer is decorative (aria-hidden, pointer-events: none).
 * `food` comes from restaurantConfig.heroFood.
 */
export default function HeroFoodVisual({ food }) {
  return (
    <figure className="food-visual">
      <div className="food-visual__stage">
        <div className="food-visual__glow" aria-hidden="true" />

        <div className="food-visual__float">
          <div className="food-visual__photo">
            <picture>
              {food.srcWebp && <source srcSet={food.srcWebp} type="image/webp" />}
              <img
                src={food.src}
                width={food.width}
                height={food.height}
                alt={food.alt}
                fetchPriority="high"
                decoding="async"
                onError={hideBrokenImage}
              />
            </picture>
          </div>

          <div className="food-visual__steam" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="food-visual__spices" aria-hidden="true">
            <Leaf className="spice--leaf-a" />
            <Leaf className="spice--leaf-b" />
            <Chili className="spice--chili" />
            <span className="spice spice--dot spice--dot-a" />
            <span className="spice spice--dot spice--dot-b" />
            <span className="spice spice--dot spice--dot-c" />
          </div>
        </div>
      </div>
      {food.note && <figcaption className="food-visual__note">{food.note}</figcaption>}
    </figure>
  );
}
