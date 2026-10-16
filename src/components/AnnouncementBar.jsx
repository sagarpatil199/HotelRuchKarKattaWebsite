import { Leaf, MapPin } from 'lucide-react';
import { restaurantConfig as c, locationLabel } from '../config/restaurantConfig.js';

export default function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement__inner">
        <p className="announcement__text">
          <Leaf size={14} aria-hidden="true" />
          <span>Welcome to {c.shortName} — Good Food, Great Company.</span>
        </p>
        <p className="announcement__place">
          <MapPin size={14} aria-hidden="true" />
          <span>{locationLabel}</span>
        </p>
      </div>
    </div>
  );
}
