export type animationSize = 'small' | 'medium' | 'large';
export type animationPosition = 'behindClouds' : 'aheadClouds';

export interface Range {
  min: number;
  max: number;
}

export interface Movement {
  position: animationPosition;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  transform?: string;
}

export interface IAnimation {
  name: string;
  size: animationSize;
  duration: Range;
  opacity: Range;
  movements: Movement[];
}
