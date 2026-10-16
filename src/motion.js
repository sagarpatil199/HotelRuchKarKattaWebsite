import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Runs GSAP setup code for one component, with automatic cleanup.
 *
 * - Everything created inside `setup` is reverted when the component unmounts
 *   (and again if the screen size or motion preference changes), so React
 *   StrictMode and hot reloads never leave duplicate animations behind.
 * - `setup` is NOT called when the visitor prefers reduced motion. All content
 *   is visible by default in CSS, so nothing is hidden in that case.
 * - `wide` is true on screens wider than 860px; use it to simplify effects on phones.
 */
export function useGsap(scopeRef, setup) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        wide: '(min-width: 861px)',
      },
      (context) => {
        if (!context.conditions.motion) return undefined;
        const q = gsap.utils.selector(scopeRef);
        return setup({ q, wide: context.conditions.wide, gsap, ScrollTrigger });
      },
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Shared scroll reveals, driven by data attributes in the markup:
 *   data-reveal="up"       fade and slide up
 *   data-reveal="words"    staggered word reveal (element must contain <SplitWords />)
 *   data-reveal="stagger"  children appear one after another
 * Each plays once when it enters the viewport. Normal scrolling is never blocked.
 */
export function setupReveals({ q, gsap: g }) {
  q('[data-reveal="up"]').forEach((el) => {
    g.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
  q('[data-reveal="words"]').forEach((el) => {
    g.from(el.querySelectorAll('.split__inner'), {
      yPercent: 115,
      duration: 0.95,
      ease: 'power4.out',
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
  q('[data-reveal="stagger"]').forEach((el) => {
    g.from(el.children, {
      y: 38,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
  });
}

// Recalculate scroll positions after fonts and images have loaded.
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Parallax drift: inside every element matching `scopeSelector`, elements with
 * data-speed="n" move from 0 to n% of their own height while the scope scrolls
 * through the viewport (scrubbed, so it always follows the scroll bar).
 * Silhouettes use positive values (they sink slightly, so no gap appears under them).
 */
export function runParallax({ q, gsap: g, wide }, scopeSelector) {
  q(scopeSelector).forEach((scope) => {
    scope.querySelectorAll('[data-speed]').forEach((el) => {
      g.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: parseFloat(el.dataset.speed) * (wide ? 1 : 0.5),
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });
}
