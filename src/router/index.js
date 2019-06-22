import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Landing from '@/components/Landing'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import CreateCompany from '@/components/user/CreateCompany'
import Diary from '@/components/diary/diary'
import Customers from '@/components/customers/customers'
import Customer from '@/components/customers/customer'
import Staff from '@/components/staff/staff'
import Enquiries from '@/components/enquiries/enquiries'
import Products from '@/components/products/products'
import Analytics from '@/components/analytics/analytics'
import Marketing from '@/components/marketing/marketing'
import FindStore from '@/components/store/findStore'
import Store from '@/components/store/store'

import { store } from '@/store'

//SETTINGS
import Settings from '@/components/settings'
import AccountSettings from '@/components/settings/account/account'
import UsersSettings from '@/components/settings/users'
import DefaultsSettings from '@/components/settings/defaults/defaults'
import BillingSettings from '@/components/settings/billing/billing'
import Plans from '@/components/settings/plans'
import Upgrade from '@/components/settings/plans/upgrade'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Landing, meta: { } },
    { path: '/dashboard', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    { path: '/register', component: Register, meta: { requiresAuth: false } },
    { path: '/create-company', component: CreateCompany, meta: { requiresAuth: true } },
    { path: '/diary', component: Diary, meta: { requiresAuth: true } },
    { path: '/customers', component: Customers, meta: { requiresAuth: true }, props: true },
    { path: '/customers/:id', component: Customer, props: true, meta: { requiresAuth: true } },
    { path: '/enquiries', component: Enquiries, props: true, meta: { requiresAuth: true } },
    { path: '/products', component: Products, meta: { requiresAuth: true } },
    { path: '/staff', component: Staff, meta: { requiresAuth: true } },
    { path: '/analytics', component: Analytics, meta: { requiresAuth: true } },
    { path: '/marketing', component: Marketing, meta: { requiresAuth: true } },
    { path: '/store', component: FindStore, meta: { requiresAuth: false } },
    { path: '/store/:postcode', component: Store, props: true, meta: { requiresAuth: false } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true },
        children: [
            { path: 'account', component: AccountSettings , name: 'AccountSettings', meta: { requiresAuth: true } },
            { path: 'users', component: UsersSettings, name: 'UsersSettings', meta: { requiresAuth: true } },
            { path: 'defaults', component: DefaultsSettings, name: 'DefaultsSettings', meta: { requiresAuth: true } },
            { path: 'billing', component: BillingSettings, name: 'BillingSettings', meta: { requiresAuth: true } }
        ]
    },
    { path: '/billing/plans', component: Plans, meta: { requiresAuth: true } },
    { path: '/billing/upgrade', component: Upgrade, meta: { requiresAuth: true } },

    //Otherwise redirect to login
    { path: '*', redirect: '/', meta: { requiresAuth: true } }
  ]
})

// const publicPages = ['/login', '/register', '/store'];

router.beforeEach((to, from, next) => {

  const authRequired = to.meta.requiresAuth
  const adminPages = ['/analytics']
  const adminRequired = adminPages.includes(to.path);
  const user = JSON.parse(localStorage.getItem('user'));
  const company = localStorage.getItem('company');

  //Check if public
  if(!authRequired){
    return next();
  }

  if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
  }

  //Check if logged in
  if (authRequired && !user) {
    store.dispatch('account/logout');
    return next('/login');
  }

  //Check if company has been created
  if (authRequired && !company && to.path !== '/create-company'){
    console.log("redirect")
    return next('/create-company')
  }

  //Already logged in
  if(!authRequired && user) {

      return next('/');
  }

  const isAdmin = user.role !== 'user'

  //Check for admin pages
  if(adminRequired && !isAdmin) {
      return next('/');
  }

  next();
})
