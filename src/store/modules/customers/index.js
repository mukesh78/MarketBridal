import { service } from '../../../services';

const state = {
  loading: false,
  items: []
};

const actions = {
  fetchCustomers({ commit, rootState }) {
    commit('setLoading', true)

    return service.get(`/customers/${rootState.account.store._id}`).then(
      result => commit('setCustomers', result.customers)
    )
  },

  fetchCustomerByNo({ commit, rootState }, customerNo) {
    commit('setLoading', true)

    return service.get(`/customers/${rootState.account.store._id}/${customerNo}`)
  },

  createCustomer({ dispatch, commit, rootState }, sale) {
    commit('setLoading', true)

    return service.post(`/customers/${rootState.account.store._id}`, sale).then(
      result => {
        commit('newCustomer', result.customer)
        dispatch('alert/success', result.message, { root: true });
        return result.customer
      })
  },

  updateCustomer({ dispatch, commit}, customer) {
    return service.patch(`/customers/${customer._id}`, customer).then(
      result => {
        commit('updateCustomer', result.customer)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },

  deleteCustomer({}, id) {
    return service.delete(`/customer/${id}`);
  },

  fetchPayments({ rootState }) {
    return service.get(`/payments/${rootState.account.store._id}`)
  },
  createPayment({ rootState }, payment) {
    return service.post(`/payments/${rootState.account.store._id}`, payment);
  },
  updatePayment({}, payment) {
      return service.patch(`/payments/${payment._id}`, payment);
  },
  deletePayment({}, payment) {
      return service.delete(`/payments/${payment._id}`);
  },
  createComment({}, payload) {
    console.log(payload)
    return service.post(`/customers/${payload.customerId}/comments`, payload)
  }
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setCustomers(state, customers) {
    state.items = customers
    state.loading = false
  },
  newCustomer(state, customer) {
    state.items.push(customer)
    state.loading = false
  }
};

export const customers = {
    namespaced: true,
    state,
    actions,
    mutations
};
