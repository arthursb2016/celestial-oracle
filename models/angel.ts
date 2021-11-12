import { IAngel } from '~/types/angel';

export class Angel implements IAngel {
  public name: string = '';
  public slug: string = '';
  public img_author: string = '';
  public img_author_link: string = '';
  public description: string = '';
  public phrase: string = '';

  constructor(data?: IAngel) {
    if (!data) return;
    this.name = data.name;
    this.slug = data.slug;
    this.img_author = data.img_author;
    this.img_author_link = data.img_author_link;
    this.description = data.description;
    this.phrase = data.phrase;
  }
}
