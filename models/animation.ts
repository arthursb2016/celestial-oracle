import { getRandFromRange } from '~/lib/functions/utils';
import {
  IAnimation,
  Movement,
  Position,
  animationSize,
} from '~/types/animation';

export class Animation {
  public name: string;
  public size: animationSize;
  public duration: number;
  public opacity: number;
  public movement: Movement;
  public position: Position;

  constructor(data: IAnimation, wWidth: number, wHeight: number) {
    this.name = data.name;

    const aSizes: animationSize[] = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].filter((aS: any) => {
      return data.sizes && Array.isArray(data.sizes) ? data.sizes.includes(aS) : true;
    }) as animationSize[];
    const aSizeIndex = Math.floor(Math.random() * aSizes.length);
    this.size = aSizes[aSizeIndex];

    this.duration = getRandFromRange(data.duration);
    this.opacity = getRandFromRange(data.opacity) / 10;

    const movIndex = Math.floor(Math.random() * data.movements.length);
    this.movement = { ...data.movements[movIndex] };

    this.position = {
      top: this.movement.start.top === null ? null : (this.movement.start.top * wHeight) / 100,
      right: this.movement.start.right === null ? null : (this.movement.start.right * wWidth) / 100,
      bottom: this.movement.start.bottom === null ? null : (this.movement.start.bottom * wHeight) / 100,
      left: this.movement.start.left === null ? null : (this.movement.start.left * wWidth) / 100,
    };
  }

  public move(wWidth: number, wHeight: number, step: number) {
    if (this.movement.distance.horizontal !== null) {
      const xDistance = (wWidth * getRandFromRange(this.movement.distance.horizontal)) / 100;
      const direction = this.movement.start.left !== null ? 'left' : 'right';
      if (this.position[direction] !== null) {
        this.position[direction]! += xDistance / step;
        if (this.position[direction]! > xDistance) {
          return false;
        }
      }
    }
    if (this.movement.distance.vertical !== null) {
      const yDistance = (wHeight * getRandFromRange(this.movement.distance.vertical)) / 100;
      const direction = this.movement.start.top !== null ? 'top' : 'bottom';
      if (this.position[direction] !== null) {
        this.position[direction]! += yDistance / step;
        if (this.position[direction]! > yDistance) {
          return false;
        }
      }
    }
    return true;
  }
}
