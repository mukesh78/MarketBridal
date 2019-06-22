import { service } from '../../../services';

const state = {
    loading: false,
    items: []
};

const actions = {
  fetchProducts({ commit }) {
    commit('setLoading')

    return service.get(`/products`).then(
      resp => commit('setProducts', resp.products)
    )
  },

  createProduct({ commit }, product) {
    return service.post(`/products`, product);
  },

  updateProduct({commit}, payload) {
    return service.patch(`/products/${payload._id}`, payload);
  },

  deleteProduct({commit}, id) {
    return service.delete(`/products/${id}`);
  },

  fetchProductsWithCategory({ commit }, category) {
    return service.get(`/products/${category}`)
  }
};

const mutations = {
  setLoading(state) {
    state.loading = true
  },
  setProducts(state, products) {
    state.items = products
    state.loading = false
  }
};

export const products = {
    namespaced: true,
    state,
    actions,
    mutations
};
