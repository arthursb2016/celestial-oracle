import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import angels from '~/store/angels'

let angelsStore: angels

function initialiseStores(store: Store<any>): void {
  angelsStore = getModule(angels, store)
}

export { initialiseStores, angelsStore }