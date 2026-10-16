import { MapPin } from 'lucide-react';
import { restaurantConfig as c, locationLabel } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src={c.logo.src}
            width={c.logo.width}
            height={c.logo.height}
            alt={c.logo.alt}
            loading="lazy"
            decoding="async"
          />
          <span className="brand__sub">{c.subtitle}</span>
          <p className="footer__place">
            <MapPin size={14} aria-hidden="true" />
            {locationLabel}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {c.nav.map((item) => (
              <li key={item.label}>
                <a href={item.href} {...(item.external ? externalProps : {})}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--gold" href={c.fullMenuUrl} {...externalProps}>
          View Menu
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} {c.name}. All rights reserved.
      </p>
    </footer>
  );
}
