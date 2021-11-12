export type animationSize = 'small' | 'medium' | 'large';

export interface Range {
  min: number;
  max: number;
}

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
  sizes?: animationSize[];
  duration: Range;
  opacity: Range;
  movements: Movement[];
}
