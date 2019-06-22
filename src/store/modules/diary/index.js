import { service } from '../../../services';

const state = {
  loading: false,
  items: [],
  app: null,
  enquiry: null,
}

const actions = {
  fetchAppointments({ commit, rootState }, payload) {
    commit('setLoading')

    return service.get(`/appointments/${rootState.account.store._id}?start=${payload.start}&end=${payload.end}`).then(
      result => {
        commit('setApps', result)
        return
      }
    );
  },
  fetchStoreAppointments({ commit}, payload) {
    commit('setLoading')

    return service.get(`/appointments/${payload.storeId}?start=${payload.start}&end=${payload.end}`);
  },
  createAppointment({ commit, dispatch, rootState }, app) {
    return service.post(`/appointments/${rootState.account.store._id}`, app).then(
      result => {
        commit('newApp', result.app)
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },
  updateAppointment({ commit, dispatch }, app) {
    return service.patch(`/appointments/${app._id}`, app).then(
      result => {
        commit('updateApp', result.app)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },
  deleteAppointment({ commit, dispatch }, id) {
    return service.delete(`/appointments/${id}`).then(
      result => {
        commit('deleteApp', result.id)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },
  addApp({commit}, app) {
    commit('setApp', app)
  },
  getEnquiry({ commit, rootState }, enquiryId) {
    commit('setLoading')

    return service.get(`/enquiries/${rootState.account.store._id}/${enquiryId}`).then(
      result => {
        commit('setEnquiry', result.enquiry)
        return
      }
    )
  }
};

const mutations = {
  setLoading(state) {
    state.loading = true
  },
  setApps(state, result) {
    state.items = result.apps;
    state.loading = false
  },
  newApp(state, app) {
    state.items.push(app)
    state.loading = false
  },
  updateApp(state, app) {
    var index = state.items.findIndex(item => {
      return item._id === app._id
    })
    if (index !== -1) {
      state.items.splice(index, 1, app)
    }
    state.loading = false
  },
  deleteApp(state, id) {
    var index = state.items.findIndex(item => {
      return item._id === id
    })
    if (index !== -1) {
      state.items.splice(index, 1)
    }
    state.loading = false
  },
  setApp(state, app) {
    state.app = app
  },
  setEnquiry(state, enquiry) {
    state.enquiry = enquiry
    state.loading = false
  }
};

export const diary = {
  namespaced: true,
  state,
  actions,
  mutations
};
