import { service } from '../../../services';

const state = {
  loading: false,
  sales: [],
  enquiries: [],
  jobs: [],
  payments: [],
  appointments: [],
  date: new Date().toISOString().substr(0, 10)
}

const actions = {
  fetchData({ commit, rootState }, date) {
    commit('setLoading')
    
    return service.get(`/dashboard/${rootState.account.store._id}?date=${date}`).then(
      result => {
        commit('setDashboard', result)
        return
      }
    );
  },
};

const mutations = {
  setLoading(state) {
    state.loading = true
  },
  setDashboard(state, result) {
    console.log(result)
    state.sales = result.sales;
    state.enquiries = result.enquiries;
    state.jobs = result.jobs;
    state.payments = result.payments;
    state.appointments = result.appointments;
    state.loading = false
  }
};

export const dashboard = {
  namespaced: true,
  state,
  actions,
  mutations
};