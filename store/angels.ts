import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

import { IAngel } from '../types/angel';

@Module({
  name: 'angels',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  items: IAngel[] = []

  @Mutation
  setAngels(items: IAngel[]) {
    this.items = [...items];
  }

  get angels() {
    return this.items;
  }
  get getAngel() {
    return (slug: string) => {
      return this.items.find((item: IAngel) => item.slug === slug);
    }
  }
}
