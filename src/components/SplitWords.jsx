import { Fragment } from 'react';

// Splits text into words so each can slide up out of a mask (see setupReveals / Hero).
// The words stay in normal text order, so screen readers read the sentence as usual.
export default function SplitWords({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`split ${className}`.trim()}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split__word">
            <span className="split__inner">{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}
