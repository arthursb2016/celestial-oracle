export const state = () => ({
  angels: [],  
});

export const mutations = {
  setAngels(state, angels) {
    state.angels = [...angels];
  },
};

export const getters = {
  angels(state) {
    return state.angels;
  },
  getAngel: (state) => (slug) => {
    return state.angels.find(angel => angel.slug === slug);
  },
};
