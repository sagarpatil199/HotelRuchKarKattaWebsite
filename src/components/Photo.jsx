import { hideBrokenImage } from '../utils.js';

// A real <img> (with alt text and fixed dimensions) that prefers the smaller WebP file.
// `img` is an object from restaurantConfig: { src, srcWebp, width, height, alt }.
export default function Photo({ img, className, loading = 'lazy', ...rest }) {
  return (
    <picture>
      {img.srcWebp && <source srcSet={img.srcWebp} type="image/webp" />}
      <img
        className={className}
        src={img.src}
        width={img.width}
        height={img.height}
        alt={img.alt || ''}
        loading={loading}
        decoding="async"
        onError={hideBrokenImage}
        {...rest}
      />
    </picture>
  );
}
