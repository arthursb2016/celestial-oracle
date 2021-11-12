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

export interface Animation {
  name: string;
  durationRage: Range;
  opacityRange: Range;
  movements: Movement[];
}
