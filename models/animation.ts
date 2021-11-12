import {
  IAnimation,
  Movement,
  Range,
} from '~/types/animation';

export class Animation {
  public name: string;
  public duration: number;
  public opacity: number;
  public movement: Movement;

  constructor(data: IAnimation) {
    const getRandFromRange = (range: Range) => { 
      return Math.floor(Math.random() * (range.max - range.min + 1) + range.min)
    }
    this.name = data.name;
    this.duration = getRandFromRange(data.duration);
    this.opacity = getRandFromRange(data.opacity) / 10;
    const movIndex = Math.floor(Math.random() * data.movements.length);
    this.movement = { ...data.movements[movIndex] };
  }

  public move(wWidth: number, wHeight: number, step: number) {
    if (typeof this.movement.left != 'undefined') {
      this.movement.left += wWidth / step;
      if (this.movement.left > wWidth) {
        return false;
      }
    }
    if (typeof this.movement.bottom != 'undefined') {
      this.movement.bottom += wHeight / step;
      if (this.movement.bottom > wHeight) {
        return false;
      }
    }
    return true;
  }
}
