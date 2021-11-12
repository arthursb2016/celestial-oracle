import {
  Animation as AnimationInterface,
  Movement,
  Range,
} from '~/types/animation';

export class Animation {
  public name: string;
  public duration: number;
  public opacity: number;
  public movement: Movement;

  constructor(data: AnimationInterface) {
    const getRandFromRange = (range: Range) => { 
      return Math.floor(Math.random() * (range.max - range.min + 1) + range.min)
    }
    this.name = data.name;
    this.duration = getRandFromRange(data.duration);
    this.opacity = getRandFromRange(data.opacity) / 10;
    const movIndex = Math.floor(Math.random() * data.movements.length);
    this.movement = { ...data.movements[movIndex] };
  }
}
