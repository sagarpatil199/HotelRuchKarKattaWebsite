// Props for links that open in a new tab safely.
export const externalProps = { target: '_blank', rel: 'noopener noreferrer' };

// If an image fails to load, hide it so the green fallback behind it shows
// instead of a broken-image icon.
export function hideBrokenImage(event) {
  event.currentTarget.style.visibility = 'hidden';
}
