import { service } from '../../../services';

const state = {
  loading: false,
  items: []
}

const actions = {
  getCredits({ commit }, payload) {
    return service.get(`/texting/credits`)
  },
  sendSMS({ commit}, app) {
    return service.post(`/texting/sendsms`, app).then(
      result => {
        commit('diary/updateApp', result.app, { root: true })
        return result.app
      }
    )
  }
};

const mutations = {
  
};

export const texting = {
  namespaced: true,
  state,
  actions,
  mutations
};