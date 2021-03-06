import { Range } from './range';

export type animationSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type movementDepth = 'behindClouds' : 'aheadClouds';

export type PositionName = 'top' | 'right' | 'bottom' | 'left';

export interface Position {
  top: number | null;
  right: number | null;
  bottom: number | null;
  left: number | null;
}

export interface movementDistance {
  horizontal: number | null;
  vertical: number | null;
}

export interface Movement {
  depth: movementDepth;
  start: Position;
  distance: movementDistance;
  transform?: string;
}

export interface IAnimation {
  name: string;
  file?: string;
  sizes?: animationSize[];
  duration: Range;
  opacity: Range;
  movements: Movement[];
}
