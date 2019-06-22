import { service } from '../../../services';

const state = {
  loading: false
}

const actions = {
  fetchAddress({ commit }, postcode) {
    commit('setLoading', true)

    return service.get(`/address/${postcode}`).then(
      result => {
        commit('setLoading', false)
        return result.addresses
      }
    );
  },
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  }
};

export const address = {
  namespaced: true,
  state,
  actions,
  mutations
};