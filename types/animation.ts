export interface Range {
  min: number;
  max: number;
}

export interface Movement {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  rotate?: string;
}

export interface IAnimation {
  name: string;
  duration: Range;
  opacity: Range;
  movements: Movement[];
}
