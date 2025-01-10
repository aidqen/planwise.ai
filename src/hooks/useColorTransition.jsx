import { useMemo } from 'react';

export const colors = [
  'hsl(340, 82%, 52%)',
  'hsl(230, 89%, 62%)',
  'hsl(142, 90%, 61%)',
  'hsl(39, 89%, 49%)',
];

export function useColorTransition(duration = 10) {
  const colorSequence = useMemo(() => {
    return colors.map((color, index) => {
      const nextColor = colors[(index + 1) % colors.length];
      return `${color}, ${nextColor}`;
    }).join(', ');
  }, []);

  return { colorSequence, duration, colors };
}

