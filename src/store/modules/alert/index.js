import { router } from '../../../router';

const state = {
    type: null,
    message: null,
    timeout: 0
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ dispatch, commit }, error) {
        console.log(error)
        if(error.status === 401) {
          // localStorage.removeItem('user');
          // localStorage.removeItem('company');
          // axios.defaults.headers.common['Authorization'] = null;
          dispatch('account/logout', null, { root: true });
        }
        commit('error', error);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.type = 'success';
        state.message = message;
        state.timeout = 6000
    },
    error(state, error) {
        state.type = 'error';
        console.log(error)
        if(error.data.message) {
          state.message = error.data.message
        } else {
          state.message = error.data.error.message;
        }
        state.timeout = 0
    },
    clear(state) {
        state.type = null;
        state.message = null;
        state.timeout = 0;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};