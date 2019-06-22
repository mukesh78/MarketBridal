import { service } from '../../../services';
import { router } from '../../../router';
import moment, { min } from 'moment'

const user = JSON.parse(localStorage.getItem('user'));
const company = null;
const state = {
  loading: false,
  user,
  company,
  status: {},
  users: [],
  store: null
}

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit('setLoading', true);

    service.login(email, password)
      .then(
        result => {
          commit('setLoading', false);
          commit('setUser', result.user)
          commit('setCompany', result.company)
          commit('setStore')
          router.push('/dashboard');
        }
      );
  },
  logout({ commit }) {
    service.logout();
    commit('logout');
  },
  register({ dispatch, commit }, user) {
    commit('setLoading', true);

    service.register(user)
      .then(
        result => {
          commit('setLoading', false);
          commit('setUser', result.user)
          router.push('/create-company');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', { root: true });
          })
        },
        error => {
          dispatch('alert/error', error.response.data.message, { root: true });
        }
      );
  },
  createCompany({ dispatch, commit }, company) {
    commit('setLoading', true);

    service.createCompany(company)
      .then(
        result => {
          commit('setLoading', false);
          commit('setUser', result.user)
          result.company.settings = result.settings
          commit('setCompany', result.company)
          commit('orderStores')
          commit('setStore')
          router.push('/');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Company created', { root: true });
          })
        },
        error => {
          dispatch('alert/error', error.response.data.message, { root: true });
        }
      );
  },
  getUsers({commit}) {
    return service.get('/users').then(
      result => {
        commit('setUsers', result.users)
        return
      }
    )
  },
  createUser({ dispatch, commit }, user) {
    commit('setLoading', true);

    return service.post(`/users`, user).then(
      result => {
        commit('newUser', result.user)
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },
  updateUser({ dispatch, commit }, user){
    return service.updateUser(user).then(
      result => {
        commit('updateUser', result.user)
        commit('orderStores')
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },
  deleteUser({ dispatch, commit }, user) {
    return service.delete(`/users/${id}`).then(
      result => {
        commit('deleteUser', result.id)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },

  createStore({ dispatch, commit }, store) {
    commit('setLoading', true);

    return service.post(`/companies/stores`, store).then(
      result => {
        commit('setCompany', result.company)
        commit('orderStores')
        dispatch('alert/success', result.message, { root: true });
        return
      }
    )
  },
  updateUser({ dispatch, commit }, payload) {
    return service.patch(`/users/${payload._id}`, payload).then(
      result => {
        commit('updateUser', result.user)
        commit('orderStores')
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },
  deleteUser({ dispatch, commit }, user) {
    return service.delete(`/users/${id}`).then(
      result => {
        commit('deleteUser', result.id)
        dispatch('alert/success', result.message, { root: true });
      }
    )
  },

  getCompany({ dispatch, commit }) {
    return service.get('/companies').then(result => {
      commit('setCompany', result.company)
      commit('orderStores')
    },
      error => {
        router.push('/login')
      })
  },
  getStore({ dispatch, commit }, postcode) {
    return service.get(`/companies/store?postcode=${postcode}`)
  },
  changeStore({ commit }, store) {
    commit('changeStore', store)
  },


  newSettingsAppointmentType({ dispatch, commit, rootState }, payload) {
    return service.post(`/settings/${rootState.account.company.settings._id}/appointmentTypes`, payload.category)
      .then(result => {
        commit('newAppointmentType', result.category)
        dispatch('alert/success', result.message, { root: true });
      })
  },
  newSettingsBookingType({ dispatch, commit, rootState }, payload) {
    return service.post(`/settings/${rootState.account.company.settings._id}/appointmentBookingTypes`, payload)
      .then(result => {
        commit('newBookingType', result.bookingType)
        dispatch('alert/success', result.message, { root: true });
      })
  },
  newSettingsProductSupplier({ dispatch, commit, rootState }, payload) {
    return service.post(`/settings/${rootState.account.company.settings._id}/productSuppliers`, payload)
      .then(result => {
        commit('newProductSupplier', result.supplier)
        dispatch('alert/success', result.message, { root: true });
      })
  },
  newSettingsProductCategory({ dispatch, commit, rootState }, payload) {
    return service.post(`/settings/${rootState.account.company.settings._id}/productCategories`, payload)
      .then(result => {
        commit('newProductCategory', result.category)
        dispatch('alert/success', result.message, { root: true });
      })
  },
  newSettingsProductColour({ dispatch, commit, rootState }, payload) {
    return service.post(`/settings/${rootState.account.company.settings._id}/productColours`, payload)
      .then(result => {
        commit('newProductColour', result.colour)
        dispatch('alert/success', result.message, { root: true });
      })
  },
  logout({ commit }) {
    commit('logout')
  }
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },
  setUser(state, user) {
    state.user = user
    localStorage.setItem("user", JSON.stringify(state.user))
  },
  setStore(state) {
    var defaultStore = state.company.stores.find(store => {
      return store._id == state.user._default_store_id;
    });
    state.store = defaultStore;
  },
  setCompany(state, company) {

    state.company = company
    if(!company) {
      localStorage.removeItem('company');
      return
    } else {
      localStorage.setItem("company", JSON.stringify(state.company))
    }

    if (company.stripe_subscription_id != null && company.current_period_ends > Date.now()) {
      state.isPayingCustomer = true
    } else {
      state.isPayingCustomer = false
      var days = moment(state.company.current_period_ends).diff(Date.now(), 'days')
      // days = -2
      state.expiryStatus = {
        daysTillTrialExpires: days,
        planHasExpired: days < 0 ? true : false
      }
    }
  },

  orderStores(state) {

    var stores = state.company.stores
    var defaultStore = null
    var testStore = null
    var newStores = []

    stores.forEach(store => {
      if(store.storeName === 'Demo') {
        testStore = store
      } else if(store._id === state.user._default_store_id) {
        defaultStore = store
      } else {
        newStores.push(store)
      }
    })

    if(defaultStore) {
      newStores.unshift(defaultStore)
    }
    if(testStore){
      newStores.push(testStore)
    }

    state.company.stores = newStores
  },

  logout(state) {
    state.user = null;
    state.company = null;
    state.loading = false,
    state.expiryStatus = null
    localStorage.removeItem('user');
    localStorage.removeItem('company');
  },
  changeStore(state, store) {
    state.store = store
  },
  setUsers(state, users) {
    users.forEach(user => {
      var defaultStore = state.company.stores.find(store => {
        return store._id == user._default_store_id;
      });
      user.store = defaultStore;
    });
    state.users = users
  },
  newUser(state, user) {
    var defaultStore = state.company.stores.find(store => {
      return store._id == user._default_store_id;
    });
    user.store = defaultStore;
    state.users.push(user)
  },
  updateUser(state, user) {
    var defaultStore = state.company.stores.find(store => {
      return store._id == user._default_store_id;
    });
    user.store = defaultStore;
    var index = state.users.findIndex(item => {
      return item._id === user._id
    })
    if (index !== -1) {
      state.users.splice(index, 1, user)
    }
    state.loading = false
    if(state.user._id === user._id) {
      state.user = user
      localStorage.setItem("user", JSON.stringify(state.user))
    }
  },
  deleteUser(state, id) {
    var index = state.items.findIndex(item => {
      return item._id === id
    })
    if (index !== -1) {
      state.items.splice(index, 1)
    }
    state.loading = false
  },
  newStore(state, id) {

  },
  newAppointmentType(state, category) {
    state.company.settings.appointmentTypes.push(category)
    localStorage.setItem("company", JSON.stringify(state.company))
  },
  newBookingType(state, bookingType) {
    state.company.settings.appointmentBookingTypes.push(bookingType)
    localStorage.setItem("company", JSON.stringify(state.company))
  },
  newProductSupplier(state, supplier) {
    state.company.settings.productSuppliers.push(supplier)
    localStorage.setItem("company", JSON.stringify(state.company))
  },
  newProductCategory(state, category) {
    state.company.settings.productCategories.push(category)
    localStorage.setItem("company", JSON.stringify(state.company))
  },
  newProductColour(state, colour) {
    state.company.settings.productColours.push(colour)
    localStorage.setItem("company", JSON.stringify(state.company))
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
