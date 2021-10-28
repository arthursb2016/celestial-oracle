import { Store } from 'vuex';
import { initialiseStores } from '~/lib/store-accessor';

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];

export * from '~/lib/store-accessor';
