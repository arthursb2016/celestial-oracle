import { Range } from '~/types/range';
import { frequency } from '~/types/frequency';
import { getRandFromRange } from '~/lib/functions/utils';

export class FrequencyRange {
  private type: frequency;

  private low: Range = {
    min: 8000,
    max: 15000,
  }
  private medium: Range = {
    min: 3000,
    max: 8000,
  }
  private high: Range = {
    min: 1000,
    max: 2000,
  }

  constructor(type: frequency) {
    this.type = type;
  }

  public getValue() {
    return getRandFromRange(this[this.type]);
  }
}