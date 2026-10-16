import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { restaurantConfig as c } from '../config/restaurantConfig.js';
import { hideBrokenImage } from '../utils.js';

export default function Gallery() {
  const photos = c.gallery.filter((item) => item.src);
  const [index, setIndex] = useState(null); // index within `photos`, or null when closed
  const closeRef = useRef(null);
  const openerRef = useRef(null);

  const close = useCallback(() => {
    setIndex(null);
    if (openerRef.current) openerRef.current.focus();
  }, []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, next, prev]);

  const open = (item, e) => {
    openerRef.current = e.currentTarget;
    setIndex(photos.findIndex((p) => p.id === item.id));
  };

  const current = index === null ? null : photos[index];

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-head" data-reveal="up">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-title" className="section-title">
            A Glimpse of <span className="gold-dark">Ruchkar Katta</span>
          </h2>
          <p className="section-lead">
            Discover the restaurant and explore more through the available photographs.
          </p>
        </div>

        <ul className="gallery__grid" data-reveal="stagger">
          {c.gallery.map((item) => (
            <li key={item.id} className={`gallery__item gallery__item--${item.size || 'cell'}`}>
              {item.src ? (
                <button
                  type="button"
                  className="gallery__button"
                  onClick={(e) => open(item, e)}
                  aria-label={`Enlarge photo: ${item.caption || item.alt}`}
                >
                  <img
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    onError={hideBrokenImage}
                  />
                  {item.caption && <span className="gallery__caption">{item.caption}</span>}
                </button>
              ) : (
                <div className="gallery__placeholder">
                  <Camera size={28} aria-hidden="true" />
                  <span>{item.placeholder}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox__btn lightbox__close"
            onClick={close}
            aria-label="Close photo viewer"
          >
            <X size={24} aria-hidden="true" />
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox__btn lightbox__prev"
              onClick={prev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
          )}
          <figure className="lightbox__figure">
            <img src={current.src} alt={current.alt} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>
          {photos.length > 1 && (
            <button
              type="button"
              className="lightbox__btn lightbox__next"
              onClick={next}
              aria-label="Next photo"
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
