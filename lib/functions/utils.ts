import { Range } from '~/types/range';

export function isPortraitScreen(): boolean {
  return window.matchMedia('(orientation: portrait)').matches;
}

export function getRandFromRange(range: Range | number): number { 
  if (typeof range === 'number') {
    return range;
  }
  return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
}
