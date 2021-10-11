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
};
