import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
};

export function useBreakpoint(): Breakpoint {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    // Create media query lists
    const mediaQueries = Object.entries(breakpoints).map(([key, query]) => ({
      key: key as Breakpoint,
      mql: window.matchMedia(query),
    }));

    // Initial check
    const initialBreakpoint = mediaQueries.find(({ mql }) => mql.matches)?.key || 'desktop';
    setCurrentBreakpoint(initialBreakpoint);

    // Create event handlers
    const handlers = mediaQueries.map(({ key, mql }) => {
      const handler = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setCurrentBreakpoint(key);
        }
      };
      mql.addEventListener('change', handler);
      return { mql, handler };
    });

    // Cleanup
    return () => {
      handlers.forEach(({ mql, handler }) => {
        mql.removeEventListener('change', handler);
      });
    };
  }, []);

  return currentBreakpoint;
}