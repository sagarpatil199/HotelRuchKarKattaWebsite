import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import {
  restaurantConfig as c,
  getPhoneLink,
  getWhatsappLink,
  locationLabel,
} from '../config/restaurantConfig.js';
import { externalProps } from '../utils.js';

export default function ContactSection() {
  const phoneLink = getPhoneLink();
  const whatsappLink = getWhatsappLink();

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <div className="contact__intro" data-reveal="up">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">
            Visit <span className="gold-dark">Hotel Ruchkar Katta</span>
          </h2>
          <p className="section-lead">
            We would love to welcome you and your family. Find us in {c.city} and plan your
            next meal with us.
          </p>
          <p className="contact__actions">
            <a className="btn btn--green" href={c.googleMapsUrl} {...externalProps}>
              <Navigation size={18} aria-hidden="true" />
              Get Directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn--outline-dark" href={c.fullMenuUrl} {...externalProps}>
              Explore Our Menu
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <ul className="contact__details" data-reveal="up">
          <li>
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>{locationLabel}</strong>
              {c.address && <span>{c.address}</span>}
            </div>
          </li>
          {c.openingHours && (
            <li>
              <Clock size={20} aria-hidden="true" />
              <div>
                <strong>Opening hours</strong>
                <span>{c.openingHours}</span>
              </div>
            </li>
          )}
          {phoneLink && (
            <li>
              <Phone size={20} aria-hidden="true" />
              <div>
                <strong>Call us</strong>
                <a href={phoneLink}>{c.phone}</a>
              </div>
            </li>
          )}
          {whatsappLink && (
            <li>
              <MessageCircle size={20} aria-hidden="true" />
              <div>
                <strong>WhatsApp</strong>
                <a href={whatsappLink} {...externalProps}>
                  Message us on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </li>
          )}
          {!phoneLink && !whatsappLink && (
            <li className="contact__hint">
              <span>
                For the latest timings and contact details, check our Google Maps listing.
              </span>
            </li>
          )}
        </ul>

        <div className="map-card" data-reveal="up">
          <div className="map-card__art" aria-hidden="true">
            <MapPin size={44} />
          </div>
          <h3>Find {c.shortName}</h3>
          <p>{locationLabel}</p>
          <a className="btn btn--green" href={c.googleMapsUrl} {...externalProps}>
            <Navigation size={18} aria-hidden="true" />
            Get Directions
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
