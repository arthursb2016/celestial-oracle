import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

import { Angel } from '../types/angel';

@Module({
  name: 'angels',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  items: Angel[] = []

  @Mutation
  setAngels(items: Angel[]) {
    this.items = [...items];
  }

  get angels() {
    return this.items;
  }
  get getAngel() {
    return (slug: string) => {
      return this.items.find((item: Angel) => item.slug === slug);
    }
  }
}
