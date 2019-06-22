import { service } from '../../../services';

const state = {
  loading: false,
  plans: []
};

const actions = {
  fetchPlans({ commit }) {
    commit('setLoading', true)

    return service.get(`/subscriptions/plans`).then(
      result => commit('setPlans', result.plans)
    )
  },
  generateCheckout( { commit }, payload) {
    console.log(payload)
    return service.post(`/subscriptions/generate_checkout_new_url`, payload)
  }

};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setPlans(state, plans) {
    state.plans = plans
    console.log(plans)
    state.loading = false
  },
};

export const subscriptions = {
    namespaced: true,
    state,
    actions,
    mutations
};
