import { useEffect, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';

export default function Header({ activeId }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="brand" href="#home" onClick={close} aria-label={`${c.shortName} ${c.subtitle.toLowerCase()}, back to top`}>
          <img
            className="brand__logo"
            src={c.logo.src}
            width={c.logo.width}
            height={c.logo.height}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <span className="brand__sub">{c.subtitle}</span>
        </a>

        <nav
          id="primary-nav"
          className={`nav${open ? ' nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="nav__list">
            {c.nav.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a className="nav__link" href={item.href} onClick={close} {...externalProps}>
                    {item.label}
                    <ExternalLink size={12} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a
                    className={`nav__link${activeId === item.id ? ' is-active' : ''}`}
                    href={item.href}
                    onClick={close}
                    aria-current={activeId === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--gold header__cta" href={c.fullMenuUrl} {...externalProps}>
          Explore Menu
          <span className="sr-only"> (opens in a new tab)</span>
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
