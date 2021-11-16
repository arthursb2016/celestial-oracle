import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

import { IAnimation } from '../types/animation';

@Module({
  name: 'animations',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  items: IAnimation[] = []

  @Mutation
  setAnimations(items: IAnimation[]) {
    this.items = [...items];
  }

  get animations() {
    return this.items;
  }
  get getAnimation() {
    return (name: string) => {
      return this.items.find((item: IAnimation) => item.name === name);
    }
  }
}
