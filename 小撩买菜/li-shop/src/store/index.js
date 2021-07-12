/*
* Vuex核心管理模块-Store对象
*/


import Vue from 'vue'
import Vuex from 'vuex'


import state from './state'
import actions from "./actions";
import getters from "./getters";
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
