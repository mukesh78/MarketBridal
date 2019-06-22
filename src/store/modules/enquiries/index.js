import { service } from '../../../services';
import { stat } from 'fs';

const state = {
  loading: false,
  items: [],
  enquiry: null
};

const actions = {
  fetchEnquiries({ commit, rootState }) {
    commit('setLoading')

    return service.get(`/enquiries/${rootState.account.store._id}`).then(
      resp => commit('setEnquiries', resp.enquiries)
    )
  },

  createEnquiry({ commit, dispatch, rootState }, enquiry) {
    return service.post(`/enquiries/${rootState.account.store._id}`, enquiry).then(
      result => {
        commit('newEnquiry', result.enquiry)
        if(result.app) {
          commit('diary/updateApp', result.app, { root: true });
        }
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },

  createStoreEnquiry({ commit, dispatch }, payload) {
    return service.post(`/enquiries/${payload.storeId}`, payload.enquiry).then(
      result => {
        commit('newEnquiry', result.enquiry)
        if(result.app) {
          commit('diary/updateApp', result.app, { root: true });
        }
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },

  updateEnquiry({commit, dispatch}, enquiry) {
      return service.patch(`/enquiries/${enquiry._id}`, enquiry).then(
        result => {
          commit('updateEnquiry', result.enquiry)
          dispatch('alert/success', result.message, { root: true });
        }
      )
  },

  deleteEnquiry({commit, dispatch}, id) {
      return service.delete(`/enquiries/${_id}`).then(
        result => {
          commit('deleteEnquiry', result.id)
          dispatch('alert/success', result.message, { root: true });
        }
      )
  }
};

const mutations = {
  setLoading(state) {
    state.loading = true
  },
  setEnquiries(state, enquiries) {
    state.items = enquiries
    state.loading = false
  },
  setEnquiry(state, enquiry) {
    state.enquiry = enquiry
  },
  newEnquiry(state, enquiry) {
    state.items.push(enquiry)
    state.loading = false
  },
  updateEnquiry(state, enquiry) {
    var index = state.items.findIndex(item => {
      return item._id === enquiry._id
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
};

export const enquiries = {
    namespaced: true,
    state,
    actions,
    mutations
};