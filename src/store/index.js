import Vue from 'vue'
import Vuex from 'vuex'

import loginPage from './modules/login/login'
import goods from './modules/goods/goods'
import order from './modules/orderManagement/orderManagement'
import comment from './modules/comment/comment'
import user from './modules/user/user'
import admin from './modules/admin/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginPage,
    goods,
    order,
    comment,
    user,
    admin
  }
})