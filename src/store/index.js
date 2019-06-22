import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import { alert } from './modules/alert';
import { account } from './modules/account';
import { users } from './modules/users';
import { diary } from './modules/diary';
import { staff } from './modules/staff';
import { enquiries } from './modules/enquiries';
import { products } from './modules/products';
import { customers } from './modules/customers'
import { texting } from './modules/texting'
import { dashboard } from './modules/dashboard'
import { address } from './modules/address'
import { subscriptions } from './modules/subscriptions'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        diary,
        staff,
        enquiries,
        products,
        customers,
        texting,
        dashboard,
        address,
        subscriptions
    },
    plugins: [
      createPersistedState()
    ]
});
