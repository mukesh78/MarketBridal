import { service } from '../../../services';

const state = {
  loading: false,
  items: []
};

const actions = {
  fetchEmployees({ commit }) {
    commit('setLoading')

    return service.get(`/employees`).then(
      resp => commit('setEmployees', resp.employees)
    );
  },

  createEmployee({ dispatch, commit }, employee) {
    return service.post(`/employees`, employee).then(
      result => {
        commit('newEmployee', result.employee)
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },

  updateEmployee({ dispatch, commit }, payload) {
    return service.patch(`/employees/${payload._id}`, payload).then(
      result => {
        commit('updateEmployee', result.employee)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },

  deleteEmployee({ dispatch, commit }, id) {
    return service.delete(`/employees/${id}`).then(
      result => {
        commit('deleteEmployee', result.id)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  }
};

const mutations = {
  setLoading(state) {
    state.loading = true
  },
  setEmployees(state, employees) {
    state.items = employees
    state.loading = false
  },
  newEmployee(state, employee) {
    state.items.push(employee)
    state.loading = false
  },
  updateEmployee(state, employee) {
    var index = state.items.findIndex(item => {
      return item._id === employee._id
    })
    if (index !== -1) {
      state.items.splice(index, 1, employee)
    }
    state.loading = false
  },
  deleteEmployee(state, id) {
    var index = state.items.findIndex(item => {
      return item._id === id
    })
    if (index !== -1) {
      state.items.splice(index, 1)
    }
    state.loading = false
  }
};

export const staff = {
  namespaced: true,
  state,
  actions,
  mutations
};
